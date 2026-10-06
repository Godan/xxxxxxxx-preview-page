import { Link, useParams } from "react-router";
import { InfoTable, PageHeader, Placeholder, WorkGrid } from "../components/Parts";
import { Section, SectionHead } from "../components/Section";
import { findWork, relatedWorks } from "../data/works";
import { NotFound } from "./NotFound";

export function WorksDetail() {
  const { id } = useParams();
  const work = findWork(id);
  if (!work) return <NotFound />;

  return (
    <>
      <PageHeader en="Works" title={work.title} crumbs={[{ label: "Works", to: "/works" }, { label: work.title }]} />

      <Section intent="メインビジュアル。作品の印象を一目で伝える（動画埋め込みの可能性あり）" className="section--tight">
        <Placeholder label="メインビジュアル（画像または動画）" ratio="16:9" />
      </Section>

      <Section intent="タイトル・概要。どんな作品で、何を工夫したのかを伝える">
        <div className="split">
          <div>
            <p className="eyebrow">{work.type}</p>
            <h2 className="work-title">{work.title}</h2>
          </div>
          <div>
            <p className="text text--lead">{work.summary}</p>
            {work.body.map((p) => (
              <p key={p} className="text">
                {p}
              </p>
            ))}
          </div>
        </div>
        <div className="gallery">
          <Placeholder label="場面カット 1" ratio="16:9" />
          <Placeholder label="場面カット 2" ratio="16:9" />
        </div>
      </Section>

      <Section intent="メタ情報。制作年・担当範囲・権利表記を正確に掲示する">
        <SectionHead en="Credit" title="作品情報" />
        <InfoTable
          rows={[
            ["制作年", work.year],
            ["種別", work.type],
            ["担当パート", work.parts],
            ["発注元", work.client],
            ["権利表記", work.rights],
          ]}
        />
      </Section>

      <Section intent="関連作品。回遊を促し、他の実績も見てもらう">
        <SectionHead en="Related" title="関連作品" />
        <WorkGrid works={relatedWorks(work.id)} />
        <div className="center">
          <Link to="/works" className="btn">
            実績一覧へ戻る
          </Link>
        </div>
      </Section>
    </>
  );
}
