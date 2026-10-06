import { PageHeader, WorkGrid } from "../components/Parts";
import { Section } from "../components/Section";
import { WORKS, WORK_TYPES } from "../data/works";

export function WorksList() {
  return (
    <>
      <PageHeader en="Works" title="制作実績" crumbs={[{ label: "Works" }]} />

      <Section intent="絞り込みUI。種別で実績を探せる位置と形だけを示す（動作は未実装）" className="section--tight">
        <div className="filter" role="group" aria-label="種別で絞り込む">
          <span className="filter__label">種別</span>
          <ul className="filter__list">
            {WORK_TYPES.map((t, i) => (
              <li key={t}>
                <button type="button" className={`chip${i === 0 ? " is-active" : ""}`} aria-pressed={i === 0}>
                  {t}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section intent="カードグリッド。実績を一覧し、気になる作品の詳細ページへ送る">
        <WorkGrid works={WORKS} />
        <div className="center">
          <button type="button" className="btn btn--lg">
            もっと見る
          </button>
        </div>
      </Section>
    </>
  );
}
