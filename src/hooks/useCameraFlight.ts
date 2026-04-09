import { useEffect, useRef } from 'react';
import { useFrame, type RootState } from '@react-three/fiber';

interface UseCameraFlightOptions {
  durationMs: number;
  direction?: 'forward' | 'backward';
  onComplete?: () => void;
}

export function useCameraFlight({
  durationMs,
  direction = 'forward',
  onComplete,
}: UseCameraFlightOptions) {
  const startedAtRef = useRef<number | null>(null);
  const finishedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    startedAtRef.current = null;
    finishedRef.current = false;
  }, [direction, durationMs]);

  useFrame((state: RootState) => {
    const now = state.clock.getElapsedTime() * 1000;

    if (startedAtRef.current === null) {
      startedAtRef.current = now;
    }

    const elapsed = now - startedAtRef.current;
    const clamped = Math.min(elapsed / durationMs, 1);
    const eased = 1 - Math.pow(1 - clamped, 3);
    const progress = direction === 'forward' ? eased : 1 - eased;

    // The tunnel is modeled around a slightly wavy centerline, so we bias
    // the camera into matching sinusoidal offsets while pushing down -Z.
    state.camera.position.z = 8 - progress * 96;
    state.camera.position.x = Math.sin(progress * Math.PI * 2.4) * 0.7;
    state.camera.position.y = Math.cos(progress * Math.PI * 1.8) * 0.35;
    state.camera.lookAt(
      Math.sin((progress + 0.03) * Math.PI * 2.4) * 0.45,
      Math.cos((progress + 0.02) * Math.PI * 1.8) * 0.18,
      state.camera.position.z - 10
    );

    if (clamped === 1 && !finishedRef.current) {
      finishedRef.current = true;
      onCompleteRef.current?.();
    }
  });
}
