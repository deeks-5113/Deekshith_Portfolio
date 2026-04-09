import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Environment,
  Grid,
  MeshPortalMaterial,
  Sparkles,
  Stars,
} from '@react-three/drei';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CatmullRomCurve3, Color, DoubleSide, Vector3, type Mesh } from 'three';
import { useNavigate } from 'react-router-dom';
import { useDeepDive } from '@/contexts/DeepDiveContext';
import { useCameraFlight } from '@/hooks/useCameraFlight';
import { ProjectDeepNav } from '@/components/ProjectDeepNav';
import type { ProjectData } from '@/data/projects';
import { useLens } from '@/context/LensContext';

interface DeepDiveTunnelTransitionProps {
  projectId: string;
  projectData: ProjectData;
  children: ReactNode;
}

type TransitionPhase = 'tunnel' | 'content';
type FlightDirection = 'forward' | 'backward';

interface ProjectTunnelSceneProps {
  projectData: ProjectData;
  direction: FlightDirection;
  durationMs: number;
  onFlightComplete: () => void;
}

function CameraFlightRig({
  durationMs,
  direction,
  onFlightComplete,
}: {
  durationMs: number;
  direction: FlightDirection;
  onFlightComplete: () => void;
}) {
  useCameraFlight({
    durationMs,
    direction,
    onComplete: onFlightComplete,
  });

  return null;
}

function TunnelRings({ projectData }: { projectData: ProjectData }) {
  const ringConfigs = useMemo(
    () =>
      Array.from({ length: 30 }, (_, index) => {
        const radius = 1.9 + (index % 4) * 0.22;
        const z = -index * 3.35 - 3;
        const x = Math.sin(index * 0.42) * 0.85;
        const y = Math.cos(index * 0.31) * 0.65;
        const color = projectData.theme.ringPalette[index % projectData.theme.ringPalette.length];

        return { radius, z, x, y, color };
      }),
    [projectData.theme.ringPalette]
  );

  return (
    <>
      {ringConfigs.map((ring, index) => (
        <mesh key={`${projectData.slug}-ring-${index}`} position={[ring.x, ring.y, ring.z]}>
          <torusGeometry args={[ring.radius, 0.06, 18, 72]} />
          <meshStandardMaterial
            color={ring.color}
            emissive={ring.color}
            emissiveIntensity={2.4}
            toneMapped={false}
          />
        </mesh>
      ))}
    </>
  );
}

function TunnelParticles({ projectData }: { projectData: ProjectData }) {
  const particleRefs = useRef<Array<Mesh | null>>([]);
  const particleSeeds = useMemo(
    () =>
      Array.from({ length: 120 }, (_, index) => ({
        radius: 2.2 + (index % 5) * 0.35,
        theta: index * 0.45,
        z: -index * 0.95,
        size: 0.035 + (index % 4) * 0.012,
      })),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const styleBias =
      projectData.theme.particleStyle === 'neural-node'
        ? 0.72
        : projectData.theme.particleStyle === 'funnel-flow'
          ? 0.38
          : 0.55;

    particleSeeds.forEach((seed, index) => {
      seed.theta += 0.0025 + styleBias * 0.0004 + (index % 3) * 0.0003;
      seed.z += 0.008;

      if (seed.z > 8) {
        seed.z = -110;
      }

      seed.radius = 2.1 + Math.sin(t * 0.7 + index * 0.2) * 0.24 + (index % 5) * 0.34;

      const particle = particleRefs.current[index];
      if (particle) {
        particle.position.set(
          Math.sin(seed.theta) * seed.radius,
          Math.cos(seed.theta * 0.9) * seed.radius * 0.6,
          seed.z
        );
      }
    });
  });

  return (
    <group>
      {particleSeeds.map((seed, index) => {
        const color = projectData.theme.ringPalette[index % projectData.theme.ringPalette.length];

        return (
          <mesh
            key={`${projectData.slug}-particle-${index}`}
            ref={(node) => {
              particleRefs.current[index] = node;
            }}
            position={[
              Math.sin(seed.theta) * seed.radius,
              Math.cos(seed.theta * 0.9) * seed.radius * 0.6,
              seed.z,
            ]}
          >
            <sphereGeometry args={[seed.size, 10, 10]} />
            <meshBasicMaterial color={color} toneMapped={false} />
          </mesh>
        );
      })}
    </group>
  );
}

function TunnelTube({ projectData }: { projectData: ProjectData }) {
  const curve = useMemo(() => {
    const points = Array.from({ length: 18 }, (_, index) => {
      const z = -index * 6;
      return new Vector3(Math.sin(index * 0.45) * 0.7, Math.cos(index * 0.3) * 0.42, z);
    });

    return new CatmullRomCurve3(points, false, 'catmullrom', 0.2);
  }, []);

  return (
    <mesh>
      <tubeGeometry args={[curve, 220, 3.2, 48, false]} />
      <MeshPortalMaterial side={DoubleSide} blend={1} blur={0} resolution={512}>
        <color attach="background" args={['#050505']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 4]} intensity={18} color={projectData.theme.secondary} />
        <pointLight position={[0, 0, -52]} intensity={26} color={projectData.theme.primary} />
        <Stars radius={100} depth={80} count={900} factor={1.8} fade speed={0.5} />
        <Sparkles
          count={80}
          color={projectData.theme.accent}
          scale={[9, 4, 110]}
          size={2.4}
          speed={0.35}
        />
      </MeshPortalMaterial>
    </mesh>
  );
}

function ProjectTunnelScene({
  projectData,
  direction,
  durationMs,
  onFlightComplete,
}: ProjectTunnelSceneProps) {
  const fogColor = useMemo(() => new Color('#0a0a0a'), []);

  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 68 }} dpr={[1, 1.75]} gl={{ antialias: true }}>
      <color attach="background" args={['#0a0a0a']} />
      <fog attach="fog" args={[fogColor, 18, 100]} />
      <Environment preset="night" />

      <ambientLight intensity={0.15} />
      <pointLight position={[0, 0, 6]} intensity={12} color={projectData.theme.secondary} />
      <pointLight position={[0, 3, -24]} intensity={20} color={projectData.theme.primary} />

      <Grid
        position={[0, -3.6, -16]}
        args={[60, 60]}
        cellSize={0.8}
        cellThickness={0.5}
        cellColor={projectData.theme.secondary}
        sectionSize={4}
        sectionThickness={0.9}
        sectionColor={projectData.theme.primary}
        fadeDistance={48}
        fadeStrength={1.3}
        infiniteGrid
      />

      <Suspense fallback={null}>
        <TunnelTube projectData={projectData} />
        <TunnelRings projectData={projectData} />
        <TunnelParticles projectData={projectData} />
        <Sparkles
          count={120}
          color={projectData.theme.hud}
          scale={[16, 8, 120]}
          size={1.7}
          speed={0.45}
        />
      </Suspense>

      <CameraFlightRig
        direction={direction}
        durationMs={durationMs}
        onFlightComplete={onFlightComplete}
      />
    </Canvas>
  );
}

export function DeepDiveTunnelTransition({
  projectId,
  projectData,
  children,
}: DeepDiveTunnelTransitionProps) {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const { enterDeepDive, exitDeepDive } = useDeepDive();
  const { setActiveProject, setCommentaryProject } = useLens();
  const [phase, setPhase] = useState<TransitionPhase>('tunnel');
  const [flightDirection, setFlightDirection] = useState<FlightDirection>('forward');

  const enterDuration = shouldReduceMotion ? 180 : 2800;
  const exitDuration = shouldReduceMotion ? 150 : 1800;

  useEffect(() => {
    enterDeepDive(projectId);
    setActiveProject(projectData.commentaryKey);
    setCommentaryProject(projectData.commentaryKey);
  }, [enterDeepDive, projectData.commentaryKey, projectId, setActiveProject, setCommentaryProject]);

  const finishEntrance = useCallback(() => {
    setPhase('content');
  }, []);

  const finalizeExit = useCallback(() => {
    setCommentaryProject('none');
    exitDeepDive();
    navigate('/', { replace: true });
  }, [exitDeepDive, navigate, setCommentaryProject]);

  const handleExit = useCallback(() => {
    setFlightDirection('backward');
    setPhase('tunnel');
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleExit();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [handleExit]);

  const handleFlightComplete = useCallback(() => {
    if (flightDirection === 'forward') {
      finishEntrance();
      return;
    }

    finalizeExit();
  }, [finalizeExit, finishEntrance, flightDirection]);

  const hudLabel = `ENTERING ${projectData.title.toUpperCase()} SYSTEM...`;

  return (
    <AnimatePresence mode="wait" initial={false}>
      {phase === 'tunnel' ? (
        <motion.div
          key={`${projectId}-${flightDirection}-tunnel`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.18 : 0.45 }}
          className="fixed inset-0 z-[120] bg-[#050505]"
          aria-live="polite"
          aria-label={`${projectData.title} transition tunnel`}
        >
          <ProjectTunnelScene
            projectData={projectData}
            direction={flightDirection}
            durationMs={flightDirection === 'forward' ? enterDuration : exitDuration}
            onFlightComplete={handleFlightComplete}
          />

          <div className="pointer-events-none absolute inset-x-0 bottom-7 flex justify-center px-4">
            <div className="w-full max-w-3xl rounded-full border border-white/10 bg-black/45 px-5 py-3 text-center shadow-[0_0_60px_rgba(0,0,0,0.55)] backdrop-blur-md">
              <p
                className="text-[11px] font-mono uppercase tracking-[0.35em] md:text-sm"
                style={{ color: projectData.theme.hud }}
              >
                {flightDirection === 'forward' ? hudLabel : 'RETURNING TO PORTFOLIO GRID...'}
              </p>
              <p className="mt-2 text-[10px] font-mono uppercase tracking-[0.22em] text-gray-500">
                Sound hook reserved for future Web Audio integration
              </p>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key={`${projectId}-content`}
          initial={{ opacity: 0, y: 32, filter: 'blur(18px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -24, filter: 'blur(16px)' }}
          transition={{ duration: shouldReduceMotion ? 0.18 : 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-h-screen overflow-hidden bg-transparent"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-80"
            style={{
              background: `radial-gradient(circle at top left, ${projectData.theme.primary}18, transparent 30%), radial-gradient(circle at top right, ${projectData.theme.secondary}16, transparent 28%), linear-gradient(180deg, rgba(255,255,255,0.025), rgba(0,0,0,0))`,
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:42px_42px] [mask-image:radial-gradient(circle_at_center,black,transparent_82%)]" />

          <ProjectDeepNav project={projectData} onExit={handleExit} />
          <div className="relative z-10">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
