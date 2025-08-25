import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, Html } from "@react-three/drei";

export type GachaItem = {
  id: string;
  label: string;
  color?: string;   // 공 색
  weight?: number;  // 확률 가중치
};

type Props = {
  items: GachaItem[];
  onResult?: (item: GachaItem) => void;
  width?: number | string;
  height?: number | string;
  className?: string;
  modelScale?: number; // 3D 모델 스케일
};

// -------- 유틸: 이징 --------
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// -------- 애니메이션 훅 --------
function useValueAnimator() {
  const animRef = useRef<{
    active: boolean;
    from: number;
    to: number;
    start: number;
    duration: number;
    ease: (t: number) => number;
    onUpdate?: (v: number) => void;
    onComplete?: () => void;
  } | null>(null);

  useFrame(() => {
    const a = animRef.current;
    if (!a || !a.active) return;
    const t = (performance.now() - a.start) / a.duration;
    const clamped = Math.min(1, Math.max(0, t));
    const v = THREE.MathUtils.lerp(a.from, a.to, a.ease(clamped));
    a.onUpdate?.(v);
    if (clamped >= 1) {
      a.active = false;
      a.onComplete?.();
    }
  });

  const start = (
    opt: Omit<NonNullable<typeof animRef.current>, "active" | "start">
  ) => {
    animRef.current = { active: true, ...opt, start: performance.now() };
  };

  return { start };
}

// -------- 공(구체) 메쉬 --------
function BallMesh({ color = "#FFD54F" }: { color?: string }) {
  return (
    <mesh>
      <sphereGeometry args={[0.18, 32, 32]} />
      <meshStandardMaterial metalness={0.1} roughness={0.35} color={color} />
    </mesh>
  );
}

// -------- 본체 --------
function Machine3D({
  items,
  onResult,
}: {
  items: GachaItem[];
  onResult?: (item: GachaItem) => void;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const chosenRef = useRef<THREE.Mesh>(null!);

  const [spinning, setSpinning] = useState(false);
  const [dropping, setDropping] = useState(false);
  const [resultIdx, setResultIdx] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<string | null>(null);

  const ringRadius = 0.55;
  const ringY = 0.2;
  const step = (Math.PI * 2) / items.length;
  const baseAngles = useMemo(
    () => items.map((_, i) => i * step),
    [items.length, step]
  );

  const { start: startSpinAnim } = useValueAnimator();
  const { start: startDropAnim } = useValueAnimator();

  useFrame((_, dt) => {
    if (!spinning) groupRef.current.rotation.y += dt * 0.2;
  });

  useEffect(() => {
    if (!showResult) return;
    const t = setTimeout(() => setShowResult(null), 2200);
    return () => clearTimeout(t);
  }, [showResult]);

  const pickWeightedIndex = () => {
    const total = items.reduce((s, it) => s + (it.weight ?? 1), 0);
    let r = Math.random() * total;
    for (let i = 0; i < items.length; i++) {
      r -= items[i].weight ?? 1;
      if (r <= 0) return i;
    }
    return items.length - 1;
  };

  const handleSpin = () => {
    if (spinning || dropping) return;
    const idx = pickWeightedIndex();
    setResultIdx(idx);
    setSpinning(true);

    const current = groupRef.current.rotation.y;
    const turns = 6 + Math.floor(Math.random() * 3); // 6~8바퀴
    const targetBase = -baseAngles[idx];
    const target = targetBase + turns * Math.PI * 2;

    startSpinAnim({
      from: current,
      to: target,
      duration: 2200,
      ease: easeOutCubic,
      onUpdate: (v) => (groupRef.current.rotation.y = v),
      onComplete: () => {
        setSpinning(false);
        startDrop(idx);
      },
    });
  };

  const startDrop = (idx: number) => {
    setDropping(true);

    const startPos = new THREE.Vector3(0, ringY + 0.1, ringRadius * 0.9);
    const endPos = new THREE.Vector3(0, -0.85, 0.7);
    const control = new THREE.Vector3(0.15, -0.2, 0.85);

    const color = items[idx].color ?? "#FFD54F";
    (chosenRef.current.material as THREE.MeshStandardMaterial).color.set(color);

    const getBezier = (t: number) => {
      const inv = 1 - t;
      return new THREE.Vector3(
        inv * inv * startPos.x + 2 * inv * t * control.x + t * t * endPos.x,
        inv * inv * startPos.y + 2 * inv * t * control.y + t * t * endPos.y,
        inv * inv * startPos.z + 2 * inv * t * control.z + t * t * endPos.z
      );
    };

    startDropAnim({
      from: 0,
      to: 1,
      duration: 900,
      ease: easeInOutCubic,
      onUpdate: (t) => {
        const p = getBezier(t);
        chosenRef.current.position.set(p.x, p.y, p.z);
        chosenRef.current.rotation.x = THREE.MathUtils.lerp(0, Math.PI * 2, t);
      },
      onComplete: () => {
        setDropping(false);
        setShowResult(items[idx].label);
        onResult?.(items[idx]);
      },
    });
  };

  const RingBalls = () => (
    <group ref={groupRef}>
      {items.map((it, i) => {
        const a = baseAngles[i];
        const x = Math.cos(a) * ringRadius;
        const z = Math.sin(a) * ringRadius;
        const hidden = dropping && resultIdx === i;
        return (
          <group
            key={it.id}
            position={[x, ringY, z]}
            rotation={[0, -a + Math.PI / 2, 0]}
            visible={!hidden}
          >
            <BallMesh color={it.color} />
          </group>
        );
      })}
    </group>
  );

  return (
    <>
      {/* 바닥(그림자 제거: shadowMaterial 사용 안 함) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <circleGeometry args={[2, 32]} />
        <meshStandardMaterial color="#eef3f9" />
      </mesh>

      {/* 베이스(그림자 비활성) */}
      <group>
        <mesh position={[0, -0.95, 0]}>
          <cylinderGeometry args={[0.55, 0.65, 0.2, 32]} />
          <meshStandardMaterial color="#5BB0FF" />
        </mesh>
        <mesh position={[0, -0.75, 0]}>
          <cylinderGeometry args={[0.5, 0.55, 0.3, 32]} />
          <meshStandardMaterial color="#61B6FF" />
        </mesh>
        <mesh position={[0, -0.82, 0.7]}>
          <torusGeometry args={[0.18, 0.04, 16, 64, Math.PI]} />
          <meshStandardMaterial color="#2E7CCB" />
        </mesh>
      </group>

      {/* 돔 */}
      <mesh>
        <sphereGeometry args={[0.95, 48, 48]} />
        <meshPhysicalMaterial
          transmission={0.9}
          thickness={0.2}
          roughness={0.05}
          transparent
          opacity={0.5}
          color="#FFFFFF"
        />
      </mesh>

      {/* 링 & 드랍 */}
      <RingBalls />
      <mesh ref={chosenRef} visible={dropping}>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshStandardMaterial color="#FFD54F" />
      </mesh>

      {/* 조명 (그림자 끔) */}
      <hemisphereLight intensity={0.6} groundColor={new THREE.Color("#bcd")} />
      <directionalLight position={[2, 3, 2]} intensity={1.1} />

      <Environment preset="city" />

      {/* 결과 텍스트 */}
      <Html center>
        {showResult && (
          <div
            style={{
              position: "absolute",
              top: "-280px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(0,0,0,0.7)",
              color: "white",
              padding: "8px 12px",
              borderRadius: 8,
              fontSize: 14,
            }}
          >
            🎉 결과: {showResult}
          </div>
        )}
      </Html>

      <OrbitControls enableZoom={false} enablePan={false} />

      {/* Spin 버튼 */}
      <Html position={[0, -1.15, 0]}>
        <button
          onClick={handleSpin}
          disabled={spinning || dropping}
          style={{
            padding: "8px 14px",
            borderRadius: 12,
            background: spinning || dropping ? "#aaa" : "#4f9dff",
            color: "white",
            fontWeight: 700,
            cursor: spinning || dropping ? "not-allowed" : "pointer",
          }}
        >
          {spinning || dropping ? "Spinning..." : "Spin"}
        </button>
      </Html>
    </>
  );
}

// -------- 최종 Export --------
export default function GachaMachine3D({
  items,
  onResult,
  width = "100%",
  height = 520,
  className,
  modelScale = 0.6,
}: Props) {
  const deviceRatio =
    typeof window !== "undefined"
      ? Math.min(window.devicePixelRatio, 2)
      : 1.5;

  const safeItems =
    items.length > 0
      ? items
      : [
          { id: "1", label: "포인트 100" },
          { id: "2", label: "쿠폰 1장" },
          { id: "3", label: "꽝" },
        ];

  return (
    <div style={{ width, height }} className={className}>
      <Canvas
        dpr={deviceRatio}
        // shadows 제거
        camera={{ position: [0.6, 0.6, 2.2], fov: 45 }}
      >
        <group scale={[modelScale, modelScale, modelScale]}>
          <Machine3D items={safeItems} onResult={onResult} />
        </group>
      </Canvas>
    </div>
  );
}
