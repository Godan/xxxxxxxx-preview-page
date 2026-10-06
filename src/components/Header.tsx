import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { NAV_ITEMS } from "../data/nav";
import { useIntentComment } from "./Section";

export function Header() {
  const ref = useIntentComment<HTMLElement>("全ページ共通。ロゴでTOPへ戻り、グローバルナビとContactボタンで主要ページへ移動させる");
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // ページ遷移したらメニューを閉じる
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // メニュー展開中は背面のスクロールを止め、Esc で閉じられるようにする
  useEffect(() => {
    if (!open) return;
    document.body.classList.add("is-menu-open");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("is-menu-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header ref={ref} className={`site-header${open ? " is-open" : ""}`}>
      <div className="preview-bar">
        骨組みサイト（構造・導線確認用）<span className="preview-bar__sub">｜掲載の社名・作品名・文章はすべてダミーです</span>
      </div>
      <div className="site-header__inner">
        <Link to="/" className="logo" aria-label="Xxxxxxxx TOPへ">
          Xxxxxxxx
        </Link>

        <nav id="global-nav" className="gnav" aria-label="グローバルナビゲーション">
          <ul className="gnav__list">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className="gnav__link">
                  <span className="gnav__en">{item.label}</span>
                  <span className="gnav__ja">{item.ja}</span>
                </NavLink>
              </li>
            ))}
          </ul>
          <Link to="/contact" className="btn btn--primary gnav__contact">
            Contact
          </Link>
        </nav>

        <button
          type="button"
          className="menu-btn"
          aria-controls="global-nav"
          aria-expanded={open}
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="menu-btn__lines" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className="menu-btn__text">{open ? "CLOSE" : "MENU"}</span>
        </button>
      </div>
    </header>
  );
}
