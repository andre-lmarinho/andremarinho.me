/**
 * Tokenize a paragraph into word-like tokens.
 * - Trims leading/trailing whitespace.
 * - Splits on one-or-more whitespace characters.
 * - Removes empty tokens (defensive).
 *
 * NOTE: This is intentionally simple because punctuation is expected to stay
 * attached to its word (e.g., "team." remains a single token).
 */
export function tokenize(text: string): string[] {
  return text.trim().split(/\s+/).filter(Boolean);
}

/**
 * Create logical "bridges" between paragraph boundaries.
 *
 * Given a list of paragraphs where each paragraph is represented by the ordered
 * list of span IDs (one span per token), this function links:
 *   - the last word of a non-empty paragraph
 *   - to the first word of the next non-empty paragraph
 *
 * These bridges allow the UI logic to mirror "active" state across paragraphs,
 * so the visual progression remains continuous at boundaries.
 *
 * @param paragraphWordIds Array of paragraphs; each item is the list of span IDs for that paragraph.
 * @returns Array of { fromId, toId } pairs representing cross-paragraph links.
 *
 * Example:
 *   Input: [
 *     ["p0w0", "p0w1"],
 *     [], // empty paragraph (ignored)
 *     ["p2w0", "p2w1", "p2w2"]
 *   ]
 *   Output: [{ fromId: "p0w1", toId: "p2w0" }]
 */

export type Bridge = {
  fromId: string;
  toId: string;
};

export function createBridges(paragraphWordIds: string[][]): Bridge[] {
  const bridges: Bridge[] = [];

  for (let i = 0; i < paragraphWordIds.length; i += 1) {
    const current = paragraphWordIds[i];
    if (current.length === 0) continue;

    // Find the next non-empty paragraph
    let j = i + 1;
    while (j < paragraphWordIds.length && paragraphWordIds[j].length === 0) {
      j += 1;
    }
    if (j >= paragraphWordIds.length) continue;

    const next = paragraphWordIds[j];
    bridges.push({
      fromId: current[current.length - 1],
      toId: next[0],
    });
  }

  return bridges;
}
