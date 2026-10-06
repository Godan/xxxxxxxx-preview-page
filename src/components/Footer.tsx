import { Link } from "react-router";
import { NAV_ITEMS } from "../data/nav";
import { useIntentComment } from "./Section";

export function Footer() {
  const ref = useIntentComment<HTMLElement>("全ページ共通。ページ末尾で迷わせないよう、Contact導線と全ページへのナビを置く");
  return (
    <footer ref={ref} className="site-footer">
      <div className="container">
        <div className="footer-cta">
          <p className="eyebrow">Contact</p>
          <p className="footer-cta__title">ああ・0XXXああああああああああああ</p>
          <Link to="/contact" className="btn btn--primary">
            お問い合わせ
          </Link>
        </div>

        <div className="footer-main">
          <Link to="/" className="logo">
            Xxxxxxxx
          </Link>
          <nav aria-label="フッターナビゲーション">
            <ul className="footer-nav">
              <li>
                <Link to="/">TOP</Link>
              </li>
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="footer-bottom">
          <span>プライバシーポリシー（ページ未定）</span>
          <small>© Xxxxxxxx Xxx.</small>
        </div>
      </div>
    </footer>
  );
}
