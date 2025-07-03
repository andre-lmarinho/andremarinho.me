// src/components/ui/SteppingBackground

import React from 'react';

const SteppingBackground: React.FC = () => {
  // Static text for each line
  const baseText = `E2039DE1847774F7953A36A20DE1C56B0F E03A1F E38A1F E2991F E37A0F E47A0F D46C0F D46C0F D3892E F DD1F65966A1E E1A83E F1A73E F1A83E`;

  const numberOfLines = 10; // Number of vertical lines
  const repeatCount = 20; // How many times to repeat text per line to fill width
  const stepCount = baseText.length * repeatCount; // Total steps for animation

  return (
    <div className="absolute container-ultra-narrow pointer-events-none">
      <div
        className="w-full flex flex-col gap-2"
        // Elliptical fade effect centered in the container
        style={{
          maskImage:
            'radial-gradient(ellipse at center, black 10%, transparent 70%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 10%, transparent 70%)',
        }}
      >
        {Array.from({ length: numberOfLines }).map((_, lineIndex) => (
          <div
            key={lineIndex}
            className="whitespace-nowrap opacity-10 animate-type font-mono text-sm text-color-01"
            // Stepping animation: move one character at a time
            style={{
              animation: `type 30s steps(${stepCount}, end) infinite`,
              animationDuration: `${30 + lineIndex * 3}s`, // slight speed variance
            }}
          >
            {Array.from({ length: repeatCount })
              .map(() => baseText)
              .join(' ')}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SteppingBackground;
