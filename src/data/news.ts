export type News = {
  id: string;
  date: string;
  category: string;
  title: string;
};

export const NEWS: News[] = [
  { id: "n012", date: "0000.00.00", category: "実績", title: "ああXX「あああ」ああああああああああああああ" },
  { id: "n011", date: "0000.00.00", category: "お知らせ", title: "ああああああああああああああああああああああああ" },
  { id: "n010", date: "0000.00.00", category: "実績", title: "「ああああああああ」あああああああああああああああああ" },
  { id: "n009", date: "0000.00.00", category: "メディア", title: "あああああああああ、あああああああああXXああああああああああああああ" },
  { id: "n008", date: "0000.00.00", category: "お知らせ", title: "あああああああああああああ" },
  { id: "n007", date: "0000.00.00", category: "イベント", title: "ああああああXXあああああああああああああ" },
  { id: "n006", date: "0000.00.00", category: "実績", title: "ああああ「ああああああ」ああああああああああああ" },
  { id: "n005", date: "0000.00.00", category: "お知らせ", title: "あああああああああああああああああああああああ" },
  { id: "n004", date: "0000.00.00", category: "実績", title: "『あああああ・あああ』ああああああああああああああああああああ" },
  { id: "n003", date: "0000.00.00", category: "メディア", title: "Xxxあああああああああああああああああああああ" },
  { id: "n002", date: "0000.00.00", category: "お知らせ", title: "ああああああああああああああああああああ" },
  { id: "n001", date: "0000.00.00", category: "お知らせ", title: "ああああああ" },
];

export const findNews = (id: string | undefined) => NEWS.find((n) => n.id === id);
