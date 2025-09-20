'use client';

import { useEffect, useMemo, useState, type HTMLAttributes } from 'react';

type Phase = 'typing' | 'pausing' | 'deleting';

interface TextTypeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  texts: string[];
  typingDelay?: number;
  pauseDuration?: number;
}

const TextType = ({
  texts,
  className,
  typingDelay = 80,
  pauseDuration = 1500,
  ...rest
}: TextTypeProps) => {
  const textList = useMemo(() => texts.map((item) => item ?? ''), [texts]);

  const [state, setState] = useState<{
    textIndex: number;
    visibleLength: number;
    phase: Phase;
    pauseTicksRemaining: number;
  }>({ textIndex: 0, visibleLength: 0, phase: 'typing', pauseTicksRemaining: 0 });

  useEffect(() => {
    setState({ textIndex: 0, visibleLength: 0, phase: 'typing', pauseTicksRemaining: 0 });
  }, [textList]);

  useEffect(() => {
    if (textList.length === 0) {
      return;
    }

    const intervalDelay = Math.max(Number.isFinite(typingDelay) ? typingDelay : 0, 1);
    const pauseTicks = Math.max(Math.round(pauseDuration / intervalDelay), 0);

    const interval = setInterval(() => {
      setState((prev) => {
        const currentIndex = prev.textIndex % textList.length;
        const currentText = textList[currentIndex] ?? '';

        if (prev.phase === 'typing') {
          if (prev.visibleLength < currentText.length) {
            return { ...prev, visibleLength: prev.visibleLength + 1 };
          }

          return { ...prev, phase: 'pausing', pauseTicksRemaining: pauseTicks };
        }

        if (prev.phase === 'pausing') {
          if (prev.pauseTicksRemaining > 0) {
            return { ...prev, pauseTicksRemaining: prev.pauseTicksRemaining - 1 };
          }

          return { ...prev, phase: 'deleting' };
        }

        if (prev.visibleLength > 0) {
          return { ...prev, visibleLength: prev.visibleLength - 1 };
        }

        return {
          textIndex: (prev.textIndex + 1) % textList.length,
          visibleLength: 0,
          phase: 'typing',
          pauseTicksRemaining: 0,
        };
      });
    }, intervalDelay);

    return () => clearInterval(interval);
  }, [textList, typingDelay, pauseDuration]);

  const currentText = textList.length > 0 ? textList[state.textIndex % textList.length] : '';
  const displayedText = currentText.slice(0, state.visibleLength);
  const baseClassName = 'inline-block whitespace-pre-wrap';
  const combinedClassName = className ? `${baseClassName} ${className}` : baseClassName;

  return (
    <span className={combinedClassName} {...rest}>
      {displayedText}
    </span>
  );
};

export default TextType;
