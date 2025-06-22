import React, { useRef, useEffect } from 'react';

/**
 * Matrix-style falling binary (0/1) background using HTML canvas.
 * Covers full viewport and uses Tailwind utility classes for positioning.
 */
const MatrixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Characters (0 and 1)
    const binaryChars = ['0', '1'];

    // Font size and columns count
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);

    // An array of y positions for each column
    const drops: number[] = Array(columns).fill(0);

    // Draw function
    const draw = () => {
      if (!ctx) return;
      // Semi-transparent black background to create trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0'; // Matrix green
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y, idx) => {
        // Pick random binary char
        const text = binaryChars[Math.floor(Math.random() * binaryChars.length)];
        const x = idx * fontSize;
        ctx.fillText(text, x, y * fontSize);

        // Reset drop to top randomly after it passes bottom
        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[idx] = 0;
        }

        drops[idx]++;
      });
    };

    // Animate at ~30fps
    const intervalId = setInterval(draw, 33);

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
};

export default MatrixBackground;
