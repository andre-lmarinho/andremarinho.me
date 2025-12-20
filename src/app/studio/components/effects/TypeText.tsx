'use client';

import {
  ElementType,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

type TypingPhase = 'initial' | 'typing' | 'pausing' | 'deleting';

interface Props extends HTMLAttributes<HTMLElement> {
  text: string | string[];
  as?: ElementType;
  className?: string;
  initialText?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  initialDelay?: number;
  loop?: boolean;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorCharacter?: string | ReactNode;
  cursorClassName?: string;
  cursorBlinkDuration?: number;
}

export const TypeText = ({
  text,
  as: Component = 'div',
  className = '',
  initialText,
  typingSpeed = 70,
  deletingSpeed = 30,
  pauseDuration = 2400,
  initialDelay = 0,
  loop = true,
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = '_',
  cursorClassName = '',
  cursorBlinkDuration = 0.4,
  ...props
}: Props) => {
  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);
  const resolvedInitialText = initialText ?? textArray[0] ?? '';
  const resolvedInitialIndex = Math.max(
    0,
    textArray.findIndex((value) => value === resolvedInitialText)
  );
  const cursorRef = useRef<HTMLSpanElement>(null);
  const [displayedText, setDisplayedText] = useState(resolvedInitialText);
  const [textIndex, setTextIndex] = useState(resolvedInitialIndex);
  const [phase, setPhase] = useState<TypingPhase>(resolvedInitialText ? 'pausing' : 'initial');

  useEffect(() => {
    const timeout = setTimeout(() => {
      const nextText = initialText ?? textArray[0] ?? '';
      const nextIndex = Math.max(
        0,
        textArray.findIndex((value) => value === nextText)
      );
      setDisplayedText(nextText);
      setTextIndex(nextIndex);
      setPhase(nextText ? 'pausing' : 'initial');
    }, 0);

    return () => clearTimeout(timeout);
  }, [textArray, initialText]);

  useEffect(() => {
    if (phase !== 'initial') {
      return;
    }

    const timeout = setTimeout(() => setPhase('typing'), initialDelay);

    return () => clearTimeout(timeout);
  }, [phase, initialDelay]);

  useEffect(() => {
    if (!showCursor) {
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor || typeof cursor.animate !== 'function') {
      return;
    }

    cursor.style.opacity = '1';
    const animation = cursor.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: cursorBlinkDuration * 1000,
      direction: 'alternate',
      iterations: Infinity,
      easing: 'ease-in-out',
    });

    return () => {
      animation.cancel();
      cursor.style.removeProperty('opacity');
    };
  }, [showCursor, cursorBlinkDuration]);

  useEffect(() => {
    if (phase === 'initial') {
      return;
    }

    const currentText = textArray[textIndex] ?? '';
    let timeout: ReturnType<typeof setTimeout> | undefined;

    if (phase === 'typing') {
      if (displayedText === currentText) {
        const shouldContinue = textArray.length > 1 || loop;
        if (!shouldContinue) {
          return;
        }

        timeout = setTimeout(() => {
          setPhase('pausing');
        }, 0);
        return;
      }

      timeout = setTimeout(() => {
        setDisplayedText(currentText.slice(0, displayedText.length + 1));
      }, typingSpeed);
    } else if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('deleting'), pauseDuration);
    } else if (phase === 'deleting') {
      if (displayedText === '') {
        const nextIndex = (textIndex + 1) % textArray.length;

        if (nextIndex === 0 && !loop) {
          timeout = setTimeout(() => {
            setPhase('typing');
          }, 0);
          return;
        }

        timeout = setTimeout(() => {
          setTextIndex(nextIndex);
          setPhase('typing');
        }, 0);
      } else {
        timeout = setTimeout(() => {
          setDisplayedText((value) => value.slice(0, -1));
        }, deletingSpeed);
      }
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [phase, textArray, textIndex, displayedText, typingSpeed, deletingSpeed, pauseDuration, loop]);

  const currentText = textArray[textIndex] ?? '';
  const isTyping = phase === 'typing' && displayedText.length < currentText.length;
  const isDeleting = phase === 'deleting';
  const shouldHideCursor = hideCursorWhileTyping && (isTyping || isDeleting);

  return (
    <Component
      className={`inline-block tracking-tight whitespace-pre-wrap ${className}`}
      {...props}
    >
      <span className="inline">{displayedText}</span>
      {showCursor && (
        <span
          ref={cursorRef}
          className={`ml-1 inline-block opacity-100 ${
            shouldHideCursor ? 'hidden' : ''
          } ${cursorClassName}`}
        >
          {cursorCharacter}
        </span>
      )}
    </Component>
  );
};
