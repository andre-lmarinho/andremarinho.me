import { useEffect, RefObject } from 'react';

export function useGradientText(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    if (!ref.current) return;

    const gradients: [string, string][] = [
      ['#2563eb', '#a855f7'],
      ['#f97316', '#ec4899'],
      ['#10b981', '#3b82f6']
    ];

    let i = 0;
    const node = ref.current;

    const tick = () => {
      i = (i + 1) % gradients.length;
      const [c1, c2] = gradients[i];
      node.style.background = `linear-gradient(to right, ${c1}, ${c2})`;
      node.style.animation = 'none';
      // força reflow para reiniciar a animação
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      node.offsetWidth;
      node.style.animation = 'gradient-x 3s ease infinite';
    };

    const id = window.setInterval(tick, 3000);

    return () => {
      clearInterval(id);
      // restaura gradiente original
      node.style.background = `linear-gradient(to right, ${gradients[0][0]}, ${gradients[0][1]})`;
    };
  }, [ref]);
}
