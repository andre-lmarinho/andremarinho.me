export type Bridge = {
  fromId: string;
  toId: string;
};

export type OpacityConfig = {
  baseOpacity: number;
  maxOpacity: number;
  thresholdRatioStart: number;
  thresholdRatioEnd: number;
};

/**
 * Split a paragraph into tokens while preserving punctuation and spacing semantics.
 */
export function tokenize(text: string): string[] {
  return text.trim().split(/\s+/).filter(Boolean);
}

/**
 * Create logical bridges between the last word of each paragraph and the first
 * word of the following paragraph. The resulting structure is later used to
 * keep opacities in sync across paragraph boundaries.
 */
export function createBridges(paragraphWordIds: string[][]): Bridge[] {
  const bridges: Bridge[] = [];

  for (let index = 0; index < paragraphWordIds.length; index += 1) {
    const currentWords = paragraphWordIds[index];
    if (currentWords.length === 0) {
      continue;
    }

    let nextIndex = index + 1;
    while (nextIndex < paragraphWordIds.length && paragraphWordIds[nextIndex].length === 0) {
      nextIndex += 1;
    }

    if (nextIndex >= paragraphWordIds.length) {
      continue;
    }

    const nextWords = paragraphWordIds[nextIndex];
    bridges.push({
      fromId: currentWords[currentWords.length - 1],
      toId: nextWords[0],
    });
  }

  return bridges;
}

/**
 * Calculate the opacity assigned to each word based on its vertical position
 * relative to the viewport and the configured thresholds.
 */
export function calculateWordOpacities(
  wordCenters: number[],
  viewportHeight: number,
  config: OpacityConfig
): number[] {
  if (!wordCenters.length) {
    return [];
  }

  const { baseOpacity, maxOpacity, thresholdRatioStart, thresholdRatioEnd } = config;

  const lastIndex = Math.max(1, wordCenters.length - 1);
  let activeIndex = -1;

  wordCenters.forEach((centerY, index) => {
    const interpolation = index / lastIndex;
    const thresholdRatio =
      thresholdRatioStart + interpolation * (thresholdRatioEnd - thresholdRatioStart);
    const cutoff = viewportHeight * thresholdRatio;

    if (centerY <= cutoff) {
      activeIndex = index;
    }
  });

  return wordCenters.map((_, index) => (index <= activeIndex ? maxOpacity : baseOpacity));
}
