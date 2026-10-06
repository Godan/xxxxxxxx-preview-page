import { NewsList, PageHeader } from "../components/Parts";
import { Section } from "../components/Section";
import { NEWS } from "../data/news";

const PER_PAGE = 10;
const TOTAL_PAGES = 3;

export function NewsListPage() {
  return (
    <>
      <PageHeader en="News" title="お知らせ" crumbs={[{ label: "News" }]} />

      <Section intent="記事リスト。新しい順に並べ、日付・カテゴリ・タイトルで記事を探せるようにする">
        <NewsList items={NEWS.slice(0, PER_PAGE)} />

        {/* ページャは配置確認用の表示のみ（1ページ目を表示中という想定） */}
        <nav className="pager" aria-label="ページ送り">
          <button type="button" className="pager__btn" disabled>
            前へ
          </button>
          <ol className="pager__list">
            {Array.from({ length: TOTAL_PAGES }, (_, i) => (
              <li key={i}>
                <button type="button" className={`pager__num${i === 0 ? " is-current" : ""}`} aria-current={i === 0 ? "page" : undefined}>
                  {i + 1}
                </button>
              </li>
            ))}
          </ol>
          <button type="button" className="pager__btn">
            次へ
          </button>
        </nav>
      </Section>
    </>
  );
}
