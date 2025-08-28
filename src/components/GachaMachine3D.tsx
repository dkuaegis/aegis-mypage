import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, Html } from "@react-three/drei";
import GachaResultCard from "./GachaResultCard";
import type { GachaItem, GachaMachine3DProps } from "../model/Gacha";

// 유틸 -> easing
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// 애니메이션 훅
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

// 공 (구체)
function BallMesh({ color = "#FFD54F" }: { color?: string }) {
  return (
    <mesh>
      <sphereGeometry args={[0.18, 32, 32]} />
      <meshStandardMaterial metalness={0.1} roughness={0.35} color={color} />
    </mesh>
  );
}

// 본체
function Machine3D({
  items,
  onResult,
  onShowResult,
  isOverlayOpen,
}: {
  items: GachaItem[];
  onResult?: (item: GachaItem) => void;
  onShowResult: (item: GachaItem | null) => void;
  isOverlayOpen: boolean;
}) {
  const groupRef = useRef<THREE.Group | null>(null);
  const chosenRef = useRef<THREE.Mesh | null>(null);

  const [spinning, setSpinning] = useState(false);
  const [dropping, setDropping] = useState(false);
  const [resultIdx, setResultIdx] = useState<number | null>(null);

  const ringRadius = 0.55;
  const ringY = 0.2;
  const step = (Math.PI * 2) / items.length;
  const baseAngles = useMemo(
    () => items.map((_, i) => i * step),
    [items.length, step]
  );

  const { start: startSpinAnim } = useValueAnimator();
  const { start: startDropAnim } = useValueAnimator();

  // 대기 중 천천히 회전
  useFrame((_, dt) => {
    if (!spinning && groupRef.current) groupRef.current.rotation.y += dt * 0.2;
  });

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
    if (spinning || dropping || !groupRef.current) return;

    const idx = pickWeightedIndex();
    setResultIdx(idx);
    setSpinning(true);

    const current = groupRef.current.rotation.y;
    const turns = 6 + Math.floor(Math.random() * 3);
    const targetBase = -baseAngles[idx];
    const target = targetBase + turns * Math.PI * 2;

    startSpinAnim({
      from: current,
      to: target,
      duration: 2200,
      ease: easeOutCubic,
      onUpdate: (v) => {
        if (groupRef.current) groupRef.current.rotation.y = v;
      },
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
    if (chosenRef.current) {
      const mat = chosenRef.current.material as THREE.MeshStandardMaterial;
      mat.color.set(color);
    }

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
        if (chosenRef.current) {
          chosenRef.current.position.set(p.x, p.y, p.z);
          chosenRef.current.rotation.x = THREE.MathUtils.lerp(0, Math.PI * 2, t);
        }
      },
      onComplete: () => {
        setDropping(false);
        const item = items[idx];
        onShowResult(item);
        onResult?.(item);
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
      {/* 바닥 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <circleGeometry args={[2, 32]} />
        <meshStandardMaterial color="#eef3f9" />
      </mesh>

      {/* 베이스 */}
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

      {/* 조명 */}
      <hemisphereLight intensity={0.6} groundColor={new THREE.Color("#bcd")} />
      <directionalLight position={[2, 3, 2]} intensity={1.1} />
      <Environment preset="city" />

      <OrbitControls enableZoom={false} enablePan={false} />

      {/* 뽑기 버튼 */}
      {!isOverlayOpen && (
        <Html position={[0, -1.4, 0]} center>
          <button
            onClick={handleSpin}
            disabled={spinning || dropping}
            style={{
              width: "120px",
              height: "50px",
              borderRadius: "20px",
              background: "#000000",
              color: "white",
              fontWeight: 700,
              fontSize: "16px",
              cursor: spinning || dropping ? "not-allowed" : "pointer",
            }}
          >
            {spinning || dropping ? "상품 추첨 중..." : "당첨 뽑기!"}
          </button>
        </Html>
      )}
    </>
  );
}

export default function GachaMachine3D({
  items,
  onResult,
  width = "100%",
  height = 520,
  className,
  modelScale = 0.7,
}: GachaMachine3DProps) {
  const deviceRatio =
    typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1.5;

  const safeItems =
    items.length > 0
      ? items
      : [
          { id: "1", label: "핫식스", weight: 61},
          { id: "2", label: "컴포즈커피", weight: 32 },
          { id: "3", label: "회비 할인 쿠폰", weight: 5.5 },
          { id: "4", label: "스타벅스 1만원권", weight: 1.0 },
          { id: "5", label: "치킨", weight: 0.5 },
        ];

  const [resultItem, setResultItem] = useState<GachaItem | null>(null);

  return (
    <div style={{ width, height, position: "relative" }} className={className}>
      <Canvas dpr={deviceRatio} camera={{ position: [0.6, 0.6, 2.2], fov: 45 }}>
        <group scale={[modelScale, modelScale, modelScale]}>
          <Machine3D
            items={safeItems}
            onResult={onResult}
            onShowResult={setResultItem}
            isOverlayOpen={!!resultItem}
          />
        </group>
      </Canvas>

      {/* 결과 카드 */}
      {resultItem && (
        <GachaResultCard
          item={resultItem}
          onClose={() => setResultItem(null)}
        />
      )}
    </div>
  );
}