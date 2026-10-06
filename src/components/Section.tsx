import { useLayoutEffect, useRef, type ReactNode } from "react";

/**
 * 要素の先頭に「このセクションの意図」を HTML コメントとして挿入する。
 * JSX のコメントは DOM に残らないため、DOM ノードとして直接差し込んでいる。
 * ブラウザの開発者ツール（Elements）で確認できる。
 */
export function useIntentComment<T extends Element>(intent: string) {
  const ref = useRef<T>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const comment = document.createComment(` 意図: ${intent} `);
    el.prepend(comment);
    return () => comment.remove();
  }, [intent]);
  return ref;
}

type SectionProps = {
  /** このセクションの意図（1行）。HTML コメントとして出力される */
  intent: string;
  className?: string;
  children: ReactNode;
};

export function Section({ intent, className, children }: SectionProps) {
  const ref = useIntentComment<HTMLElement>(intent);
  return (
    <section ref={ref} className={["section", className].filter(Boolean).join(" ")}>
      <div className="container">{children}</div>
    </section>
  );
}

type SectionHeadProps = {
  en: string;
  title: string;
  lead?: string;
};

export function SectionHead({ en, title, lead }: SectionHeadProps) {
  return (
    <div className="section-head">
      <p className="eyebrow">{en}</p>
      <h2 className="section-head__title">{title}</h2>
      {lead && <p className="section-head__lead">{lead}</p>}
    </div>
  );
}
