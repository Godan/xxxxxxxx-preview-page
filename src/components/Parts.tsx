import type { ReactNode } from "react";
import { Link } from "react-router";
import type { Work } from "../data/works";
import type { News } from "../data/news";

/** 画像・動画が入る予定の領域。枠線と中央のラベルのみで表現する */
export function Placeholder({ label, ratio }: { label: string; ratio: string }) {
  return (
    <div className="ph" style={{ aspectRatio: ratio.replace(":", " / ") }}>
      <span className="ph__label">
        {label} / {ratio}
      </span>
    </div>
  );
}

export function WorkCard({ work }: { work: Work }) {
  return (
    <Link to={`/works/${work.id}`} className="work-card">
      <Placeholder label="作品サムネイル" ratio="16:9" />
      <p className="work-card__type">{work.type}</p>
      <h3 className="work-card__title">{work.title}</h3>
    </Link>
  );
}

export function WorkGrid({ works }: { works: Work[] }) {
  return (
    <ul className="work-grid">
      {works.map((w) => (
        <li key={w.id}>
          <WorkCard work={w} />
        </li>
      ))}
    </ul>
  );
}

export function NewsList({ items }: { items: News[] }) {
  return (
    <ul className="news-list">
      {items.map((n) => (
        <li key={n.id}>
          <Link to={`/news/${n.id}`} className="news-list__item">
            <time className="news-list__date">{n.date}</time>
            <span className="news-list__cat">{n.category}</span>
            <span className="news-list__title">{n.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** 2列の定義テーブル（会社概要・作品メタ情報で共通） */
export function InfoTable({ rows }: { rows: [string, ReactNode][] }) {
  return (
    <table className="info-table">
      <tbody>
        {rows.map(([th, td]) => (
          <tr key={th}>
            <th scope="row">{th}</th>
            <td>{td}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

type Crumb = { label: string; to?: string };

/** 下層ページ共通のページタイトル＋パンくず */
export function PageHeader({ en, title, crumbs }: { en: string; title: string; crumbs: Crumb[] }) {
  return (
    <div className="page-header">
      <div className="container">
        <nav aria-label="パンくずリスト">
          <ol className="breadcrumb">
            <li>
              <Link to="/">TOP</Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label}>{c.to ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}</li>
            ))}
          </ol>
        </nav>
        <p className="eyebrow">{en}</p>
        <h1 className="page-header__title">{title}</h1>
      </div>
    </div>
  );
}
