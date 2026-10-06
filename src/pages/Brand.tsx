import { PageHeader, Placeholder, WorkGrid } from "../components/Parts";
import { Section, SectionHead } from "../components/Section";
import { relatedWorks } from "../data/works";

const PRODUCTS = ["A", "B", "C"];

export function Brand() {
  return (
    <>
      <PageHeader en="Brand" title="ブランド" crumbs={[{ label: "Brand" }]} />

      <Section intent="ブランドKV。ブランドの世界観を一枚で伝える" className="section--tight">
        <Placeholder label="ブランドKV" ratio="21:9" />
      </Section>

      <Section intent="ステートメント。ブランドが何を目指すのかを伝える">
        <div className="statement">
          <p className="eyebrow">Statement</p>
          <h2 className="statement__title">ああああああああああああああああああああ</h2>
          <div className="statement__body">
            <p className="text">
              あああああああああああああああああああああああああああああ。0〜0ああ、あああ000〜000あああああああああああ。あああああああああ、Xxxxxxxxああああああああああああああああああああああああああ。
            </p>
          </div>
        </div>
      </Section>

      <Section intent="プロダクト一覧。ブランドから生まれた製品・作品を並べる">
        <SectionHead en="Products" title="プロダクト一覧" />
        <ul className="product-grid">
          {PRODUCTS.map((p) => (
            <li key={p} className="product-card">
              <Placeholder label={`プロダクト画像 ${p}`} ratio="1:1" />
              <h3 className="product-card__title">ああああああ {p}（あ）</h3>
              <p className="text text--small">ああああああああああああああああ。00〜00あああああああああああ。</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section intent="外部リンク。ブランド専用サイトやストアへ送り出す">
        <div className="link-buttons">
          <a href="#" className="btn btn--lg" onClick={(e) => e.preventDefault()}>
            ブランド公式サイト（外部・リンク先未定）
          </a>
          <a href="#" className="btn btn--lg" onClick={(e) => e.preventDefault()}>
            オンラインストア（外部・リンク先未定）
          </a>
        </div>
      </Section>

      <Section intent="関連Works。ブランドに関わる制作実績へ回遊させる">
        <SectionHead en="Related Works" title="関連する制作実績" />
        <WorkGrid works={relatedWorks(undefined, 3)} />
      </Section>
    </>
  );
}
