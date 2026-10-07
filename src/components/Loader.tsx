import { useEffect, useState } from "react";
import { RippleWipe, WIPE_MS, rippleOrigin } from "./PageTransition";
import { useIntentComment } from "./Section";

/** 仮ローディングの表示時間。フッテージ（映像）に差し替える際は尺に合わせて変更する */
const LOADING_MS = 3000;

/** loading：ローディング表示 → cover：ワイプで覆う → reveal：ローディングを外してワイプが開く → done */
type Stage = "loading" | "cover" | "reveal" | "done";

/**
 * サイト初回読込み時のローディング。
 * 本番ではフッテージ（映像）が入る予定のため、ここでは線だけの仮アニメーションを置いている。
 * ローディング終了後はページ遷移と同じ波紋ワイプで覆い、開いたところでサイトを見せる。
 * App の直下に置いているので、ページ遷移では再表示されない。
 */
export function Loader() {
  const ref = useIntentComment<HTMLDivElement>("初回読込み時のローディング。本番はフッテージに差し替える前提の仮アニメーション（3秒）");
  const [stage, setStage] = useState<Stage>("loading");
  const [origin, setOrigin] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (stage === "done") return;
    const next = {
      loading: () => {
        setOrigin(rippleOrigin());
        setStage("cover");
      },
      cover: () => setStage("reveal"),
      reveal: () => setStage("done"),
    }[stage];
    const timer = window.setTimeout(next, stage === "loading" ? LOADING_MS : WIPE_MS);
    return () => window.clearTimeout(timer);
  }, [stage]);

  // ワイプが開き切るまでは背面のスクロールを止めておく
  useEffect(() => {
    if (stage === "done") return;
    document.body.classList.add("is-loading");
    return () => document.body.classList.remove("is-loading");
  }, [stage]);

  if (stage === "done") return null;

  return (
    <>
      {(stage === "loading" || stage === "cover") && (
        <div ref={ref} className="loader" role="status" aria-label="読み込み中" style={{ ["--loading-ms" as string]: `${LOADING_MS}ms` }}>
          <div className="loader__inner">
            <svg className="loader__orbit" viewBox="0 0 120 120" aria-hidden="true">
              <circle className="loader__orbit-base" cx="60" cy="60" r="56" />
              <circle className="loader__orbit-line" cx="60" cy="60" r="56" pathLength="100" />
            </svg>
            <p className="loader__logo">Xxxxxxxx</p>
            <div className="loader__bar" aria-hidden="true">
              <span />
            </div>
          </div>
          <p className="loader__label">ローディング（フッテージ差し替え予定）/ 仮アニメーション {LOADING_MS / 1000}s</p>
        </div>
      )}
      {(stage === "cover" || stage === "reveal") && <RippleWipe key={stage} phase={stage} origin={origin} />}
    </>
  );
}
