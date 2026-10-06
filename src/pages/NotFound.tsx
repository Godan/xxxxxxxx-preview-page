import { Link } from "react-router";
import { PageHeader } from "../components/Parts";
import { Section } from "../components/Section";

export function NotFound() {
  return (
    <>
      <PageHeader en="404" title="ページが見つかりません" crumbs={[{ label: "404" }]} />
      <Section intent="404。存在しないURLから主要ページへ戻す">
        <p className="text">お探しのページは移動または削除された可能性があります。</p>
        <Link to="/" className="btn">
          TOPへ戻る
        </Link>
      </Section>
    </>
  );
}
