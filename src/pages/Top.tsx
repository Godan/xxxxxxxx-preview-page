import { Link } from "react-router";
import { Section, SectionHead, useIntentComment } from "../components/Section";
import { NewsList, Placeholder, WorkGrid } from "../components/Parts";
import { WORKS } from "../data/works";
import { NEWS } from "../data/news";

function FirstView() {
  const ref = useIntentComment<HTMLElement>("ファーストビュー。キャッチコピーと一本の弧で第一印象を決める");
  return (
    <section ref={ref} className="fv">
      <svg className="fv__orbit" viewBox="0 0 1440 640" preserveAspectRatio="none" aria-hidden="true">
        <path d="M -40 160 Q 720 -60 1480 120" fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="container fv__inner">
        <p className="eyebrow">0XXX / Xxxxxx Xxxxxxx Xxxxxx</p>
        <h1 className="fv__copy">
          あああ、ああああ
          <br />
          あああああ。
        </h1>
        <p className="fv__sub">0XXXああああああああ、あああああああああああああああああああああ。</p>
      </div>
      <p className="fv__label">キービジュアル領域 / 横100% × 縦100%</p>
    </section>
  );
}

export function Top() {
  return (
    <>
      <FirstView />

      <Section intent="About抜粋。会社の姿勢を短く伝え、詳しく知りたい人をAboutページへ送る">
        <div className="split">
          <SectionHead en="About" title="ああああああ、ああああああああああ。" />
          <div>
            <p className="text">
              ああああ0XXXああああああああ、あああああああああああああ、あああ、ああああああああああああああああああああああああああ。ああああああああああ、あああああああああああああああああああああ。
            </p>
            <Link to="/about" className="btn">
              About を見る
            </Link>
          </div>
        </div>
      </Section>

      <Section intent="Works抜粋。代表的な実績を見せて信頼を得て、Works一覧へ送る">
        <SectionHead en="Works" title="制作実績" />
        <WorkGrid works={WORKS.slice(0, 6)} />
        <div className="center">
          <Link to="/works" className="btn">
            実績一覧を見る
          </Link>
        </div>
      </Section>

      <Section intent="Xxxxx抜粋。受託制作とは別軸の自社ブランドがあることを伝え、Xxxxxページへ送る">
        <div className="split split--media">
          <div>
            <SectionHead en="Brand" title="自社ブランド" />
            <p className="text">
              ああああああああああああああ、ああああああああああああああああああああああ。ああああああ、ああああ、ああああああああああ、Xxxxxxxxあああああああああああああああああ。
            </p>
            <Link to="/brand" className="btn">
              Brand を見る
            </Link>
          </div>
          <Placeholder label="ブランドイメージ" ratio="4:3" />
        </div>
      </Section>

      <Section intent="Xxxx。更新されている会社であることを示し、最新情報への入口にする">
        <div className="split">
          <SectionHead en="News" title="お知らせ" />
          <div>
            <NewsList items={NEWS.slice(0, 3)} />
            <div className="right">
              <Link to="/news" className="btn">
                お知らせ一覧へ
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section intent="Contact導線。ページを読み終えた人を問い合わせへ誘導する" className="section--cta">
        <div className="cta-box">
          <p className="eyebrow">Contact</p>
          <h2 className="cta-box__title">お仕事のご相談・お見積もり</h2>
          <p className="text">ああああああああああああああ、あああああああああああ。</p>
          <Link to="/contact" className="btn btn--primary btn--lg">
            お問い合わせへ
          </Link>
        </div>
      </Section>
    </>
  );
}
