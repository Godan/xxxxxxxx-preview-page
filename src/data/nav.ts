export type NavItem = {
  label: string;
  ja: string;
  to: string;
};

/**
 * グローバルナビの定義。ヘッダー・SPメニュー・フッターすべてがこの配列を参照する。
 * 項目を増やす場合（例：Recruit）は、ここに1行追加し、App.tsx にルートを追加する。
 */
export const NAV_ITEMS: NavItem[] = [
  { label: "About", ja: "私たちについて", to: "/about" },
  { label: "Works", ja: "制作実績", to: "/works" },
  { label: "Brand", ja: "ブランド", to: "/brand" },
  { label: "News", ja: "お知らせ", to: "/news" },
  { label: "Company", ja: "会社情報", to: "/company" },
];
