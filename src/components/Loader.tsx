import { useEffect, useState } from "react";
import { useIntentComment } from "./Section";

/** 仮ローディングの表示時間。フッテージ（映像）に差し替える際は尺に合わせて変更する */
const LOADING_MS = 3000;

/**
 * サイト初回読込み時のローディング。
 * 本番ではフッテージ（映像）が入る予定のため、ここでは線だけの仮アニメーションを置いている。
 * App の直下に置いているので、ページ遷移では再表示されない。
 */
export function Loader() {
  const ref = useIntentComment<HTMLDivElement>("初回読込み時のローディング。本番はフッテージに差し替える前提の仮アニメーション（3秒）");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!visible) return;
    document.body.classList.add("is-loading");
    const timer = window.setTimeout(() => setVisible(false), LOADING_MS);
    return () => {
      window.clearTimeout(timer);
      document.body.classList.remove("is-loading");
    };
  }, [visible]);

  if (!visible) return null;

  return (
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
  );
}
