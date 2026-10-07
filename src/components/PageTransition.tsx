import { useEffect, useId, useState } from "react";
import { useLocation, type Location } from "react-router";

/** ワイプ片道の時間（覆う → 開く でこの2倍）。本番の演出に差し替える際はここを変更する */
export const WIPE_MS = 600;

/** 波紋の中心を画面外のどこに置くか（弧が横切る辺の長さに対する倍率）。大きいほど弧がゆるやかになる */
const ORIGIN_OFFSET_RATIO = 2;

/** この幅以下（SP）では下から上、それより広い画面では左から右へ波紋を広げる。CSS のブレークポイントと合わせる */
const SP_QUERY = "(max-width: 767px)";

/** 塗りの先を走る「線だけの円弧」の間隔（px）。外側ほど薄くする */
const RINGS = [20, 48, 88];

/** 開始時に、塗りの先端を画面の端からどれだけ外側に置くか（px）。線の円弧も画面外に収まる値にする */
const START_OUTSIDE_PX = 160;


type Phase = "idle" | "cover" | "reveal";
type Point = { x: number; y: number };

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * 波紋の中心。PC は画面の左外（縦中央）、SP は画面の下外（横中央）。
 * 弧が横切る辺（PC は縦の辺、SP は横の辺）の長さに比例して離すことで、どちらも同じくらいのカーブになる。
 */
export const rippleOrigin = (): Point => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  return window.matchMedia(SP_QUERY).matches
    ? { x: w / 2, y: h + w * ORIGIN_OFFSET_RATIO }
    : { x: -h * ORIGIN_OFFSET_RATIO, y: h / 2 };
};

/** 中心点から画面の一番近い点までの距離（＝円が画面に触れ始める半径） */
const touchRadius = ({ x, y }: Point) => {
  const dx = Math.max(-x, 0, x - window.innerWidth);
  const dy = Math.max(-y, 0, y - window.innerHeight);
  return Math.hypot(dx, dy);
};

/** 中心点から画面の一番遠い角までの距離（＝画面を覆い切る半径） */
const coverRadius = ({ x, y }: Point) => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  return Math.max(Math.hypot(x, y), Math.hypot(w - x, y), Math.hypot(x, h - y), Math.hypot(w - x, h - y));
};

/**
 * ページ遷移時の仮ワイプアニメーション（波紋）。
 * URL が変わったら、画面外に中心を置いた大きな黒い円が広がって画面を覆い（PC は左→右、SP は下→上）、
 * 覆い切った時点で表示ページを切り替え、その後同じ方向から円形に穴が広がって新しいページが現れる。
 * どちらも先端の外側を線だけの円弧が走る。
 * 円は画面の外から入ってくる。中心が遠いので弧はゆるやかで、画面に入ってすぐ縦は画面いっぱいになる。
 * 戻り値の displayLocation を <Routes location> に渡すことで、ページの切り替えを覆っている間まで遅らせる。
 */
export function usePageTransition() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState<Location>(location);
  const [phase, setPhase] = useState<Phase>("idle");
  const [origin, setOrigin] = useState<Point>({ x: 0, y: 0 });

  useEffect(() => {
    if (location.key === displayLocation.key) return;
    setOrigin(rippleOrigin());
    setPhase("cover");
    const timer = window.setTimeout(() => {
      setDisplayLocation(location);
      setPhase("reveal");
    }, WIPE_MS);
    return () => window.clearTimeout(timer);
  }, [location, displayLocation.key]);

  useEffect(() => {
    if (phase !== "reveal") return;
    const timer = window.setTimeout(() => setPhase("idle"), WIPE_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  // key に phase を渡し、覆う／開くの切り替えで進捗を 0 から始め直す
  const wipe = phase === "idle" ? null : <RippleWipe key={phase} phase={phase} origin={origin} />;

  return { displayLocation, wipe };
}

export function RippleWipe({ phase, origin }: { phase: "cover" | "reveal"; origin: Point }) {
  const maskId = useId();
  const [t, setT] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / WIPE_MS);
      setT(easeInOutCubic(progress));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // 開始半径：塗りも線の円弧も完全に画面左外にある大きさから始める。
  // イージングの動き出し（遅い区間）を画面外で消化し、ある程度速度が乗った状態で画面に入ってくるようにする。
  // 中心が十分遠いので、画面に入ってから数十px進んだ時点で黒の縦幅は画面いっぱいになる。
  const startR = touchRadius(origin) - START_OUTSIDE_PX;
  const r = startR + t * (coverRadius(origin) - startR);
  // 線の円弧は塗りの半径より外側を走る。進むにつれて間隔が少し開き、波紋が広がって見えるようにする
  const rings = RINGS.map((gap, i) => (
    <circle
      key={gap}
      className={`wipe__ring wipe__ring--${phase}`}
      cx={origin.x}
      cy={origin.y}
      r={r + gap * (0.6 + t)}
      strokeOpacity={1 - i * 0.3}
    />
  ));

  return (
    <svg className="wipe" aria-hidden="true">
      {phase === "cover" ? (
        <circle className="wipe__fill" cx={origin.x} cy={origin.y} r={r} />
      ) : (
        <>
          <mask id={maskId}>
            <rect width="100%" height="100%" fill="#fff" />
            <circle cx={origin.x} cy={origin.y} r={r} fill="#000" />
          </mask>
          <rect className="wipe__fill" width="100%" height="100%" mask={`url(#${maskId})`} />
        </>
      )}
      {rings}
    </svg>
  );
}
