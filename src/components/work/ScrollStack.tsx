import React, {
  Children,
  ReactNode,
  isValidElement,
  useCallback,
  useLayoutEffect,
  useRef,
} from 'react';

type ScrollStackItemProps = {
  children: ReactNode;
  itemClassName?: string;
};

type ScrollStackProps = {
  children: ReactNode;
  className?: string;
      itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  rotationAmount?: number;
  blurAmount?: number;
  onStackComplete?: () => void;
};

export function ScrollStackItem({ children, itemClassName = '' }: ScrollStackItemProps) {
  return (
    <div
      className={`scroll-stack-card relative w-full origin-top will-change-transform ${itemClassName}`.trim()}
      style={{
        backfaceVisibility: 'hidden',
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  );
}

export default function ScrollStack({
  children,
  className = '',
  itemDistance = 72,
  itemScale = 0.03,
  itemStackDistance = 20,
  stackPosition = '18%',
  scaleEndPosition = '12%',
  baseScale = 0.91,
  rotationAmount = 0,
  blurAmount = 0,
  onStackComplete,
}: ScrollStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const frameRef = useRef<number | null>(null);
  const currentScrollRef = useRef(0);
  const targetScrollRef = useRef(0);
  const stackCompletedRef = useRef(false);
  const lastTransformsRef = useRef(
    new Map<number, { translateY: number; scale: number; rotation: number; blur: number }>()
  );
  const isUpdatingRef = useRef(false);

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string, containerHeight: number) => {
    if (value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  const updateCardTransforms = useCallback((scrollTopOverride?: number) => {
    const container = containerRef.current;
    if (!container || !cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const scrollTop = scrollTopOverride ?? window.scrollY;
    const containerHeight = window.innerHeight;
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
    const endElement = container.querySelector('.scroll-stack-end') as HTMLElement | null;
    const endElementTop = endElement
      ? endElement.getBoundingClientRect().top + window.scrollY
      : 0;

    cardsRef.current.forEach((card, i) => {
      const cardTop = card.getBoundingClientRect().top + window.scrollY;
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = triggerStart;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jCardTop = cardsRef.current[j].getBoundingClientRect().top + window.scrollY;
          const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) topCardIndex = j;
        }

        if (i < topCardIndex) {
          blur = Math.max(0, (topCardIndex - i) * blurAmount);
        }
      }

      let translateY = 0;
      if (scrollTop >= pinStart && scrollTop <= pinEnd) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const nextTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      };

      const prevTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !prevTransform ||
        Math.abs(prevTransform.translateY - nextTransform.translateY) > 0.1 ||
        Math.abs(prevTransform.scale - nextTransform.scale) > 0.001 ||
        Math.abs(prevTransform.rotation - nextTransform.rotation) > 0.1 ||
        Math.abs(prevTransform.blur - nextTransform.blur) > 0.1;

      if (hasChanged) {
        card.style.transform = `translate3d(0, ${nextTransform.translateY}px, 0) scale(${nextTransform.scale}) rotate(${nextTransform.rotation}deg)`;
        card.style.filter = nextTransform.blur > 0 ? `blur(${nextTransform.blur}px)` : '';
        lastTransformsRef.current.set(i, nextTransform);
      }

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    baseScale,
    blurAmount,
    calculateProgress,
    itemScale,
    itemStackDistance,
    onStackComplete,
    parsePercentage,
    rotationAmount,
    scaleEndPosition,
    stackPosition,
  ]);

  const animateScroll = useCallback(() => {
    const delta = targetScrollRef.current - currentScrollRef.current;
    currentScrollRef.current += delta * 0.14;

    if (Math.abs(delta) < 0.1) {
      currentScrollRef.current = targetScrollRef.current;
    }

    updateCardTransforms(currentScrollRef.current);

    if (Math.abs(targetScrollRef.current - currentScrollRef.current) > 0.1) {
      frameRef.current = window.requestAnimationFrame(animateScroll);
    } else {
      frameRef.current = null;
    }
  }, [updateCardTransforms]);

  const scheduleUpdate = useCallback(() => {
    targetScrollRef.current = window.scrollY;
    if (frameRef.current === null) {
      frameRef.current = window.requestAnimationFrame(animateScroll);
    }
  }, [animateScroll]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    cardsRef.current = Array.from(container.querySelectorAll('.scroll-stack-card')) as HTMLDivElement[];
    lastTransformsRef.current.clear();

    cardsRef.current.forEach((card, i, allCards) => {
      if (i < allCards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translate3d(0, 0, 0)';
      card.style.perspective = '1000px';
    });

    currentScrollRef.current = window.scrollY;
    targetScrollRef.current = window.scrollY;
    updateCardTransforms(window.scrollY);

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      stackCompletedRef.current = false;
      cardsRef.current = [];
      lastTransformsRef.current.clear();
      isUpdatingRef.current = false;
    };
  }, [itemDistance, scheduleUpdate, updateCardTransforms]);

  const renderedChildren = Children.map(children, (child, index) => {
    if (!isValidElement(child)) return child;
    return React.cloneElement(child, {
      key: child.key ?? index,
    });
  });

  return (
    <div ref={containerRef} className={`relative w-full ${className}`.trim()}>
      <div className="scroll-stack-inner min-h-screen px-0 pt-[10vh] pb-[42vh]">
        {renderedChildren}
        <div className="scroll-stack-end h-px w-full" />
      </div>
    </div>
  );
}
