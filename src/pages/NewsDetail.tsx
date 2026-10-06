import { Link, useParams } from "react-router";
import { PageHeader, Placeholder } from "../components/Parts";
import { Section } from "../components/Section";
import { findNews } from "../data/news";
import { NotFound } from "./NotFound";

export function NewsDetail() {
  const { id } = useParams();
  const news = findNews(id);
  if (!news) return <NotFound />;

  return (
    <>
      <PageHeader en="News" title="お知らせ" crumbs={[{ label: "News", to: "/news" }, { label: news.title }]} />

      <Section intent="記事本文。日付・タイトルのあとに、読みやすい記事型のタイポグラフィで本文を見せる">
        <article className="article">
          <header className="article__header">
            <div className="article__meta">
              <time>{news.date}</time>
              <span className="news-list__cat">{news.category}</span>
            </div>
            <h2 className="article__title">{news.title}</h2>
          </header>

          <div className="article__body">
            <p>
              あああああああああああああ、ああああああああああああ。ああああ、ああああああああああああああああああああああああ、あああああああああ。あああああ、ああああああああああああああああああああ。
            </p>

            <Placeholder label="記事内画像" ratio="16:9" />

            <h2>あああああ</h2>
            <p>
              ああああああああ、あああああああああ「ああああああああああああああ」ああああああああああああああ。ああああああああああああああああああああ、ああああああああああああああああああああああ。
            </p>
            <p>
              ああああああああ、ああああああ。ああああああああああああああああああああああ、あああああああああああああ0あああああああああ。
            </p>

            <h3>ああああああ</h3>
            <ul>
              <li>ああ・あああああああ</li>
              <li>0XXXあああああ、あああああ</li>
              <li>あああああああ、あああああ</li>
              <li>ああああああ、ああああああああああ</li>
            </ul>

            <blockquote>
              <p>
                「あああああああああああ、あああああああああああああああああああああああ。」（あああああああああああああああああ）
              </p>
            </blockquote>

            <h2>ああああああ</h2>
            <p>
              あああああああ、0XXXあああああああああああああああああああああああ。ああああああああああああ、
              <Link to="/contact">お問い合わせページ</Link>
              あああああああああああああ。
            </p>
          </div>

          <footer className="article__footer">
            <Link to="/news" className="btn">
              お知らせ一覧へ戻る
            </Link>
          </footer>
        </article>
      </Section>
    </>
  );
}
