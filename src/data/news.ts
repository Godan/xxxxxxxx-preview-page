export type News = {
  id: string;
  date: string;
  category: string;
  title: string;
};

export const NEWS: News[] = [
  { id: "n012", date: "0000.00.00", category: "ああ", title: "ああXX「あああ」ああああああああああああああ" },
  { id: "n011", date: "0000.00.00", category: "ああああ", title: "ああああああああああああああああああああああああ" },
  { id: "n010", date: "0000.00.00", category: "ああ", title: "「ああああああああ」あああああああああああああああああ" },
  { id: "n009", date: "0000.00.00", category: "ああああ", title: "あああああああああ、あああああああああXXああああああああああああああ" },
  { id: "n008", date: "0000.00.00", category: "ああああ", title: "あああああああああああああ" },
  { id: "n007", date: "0000.00.00", category: "ああああ", title: "ああああああXXあああああああああああああ" },
  { id: "n006", date: "0000.00.00", category: "ああ", title: "ああああ「ああああああ」ああああああああああああ" },
  { id: "n005", date: "0000.00.00", category: "ああああ", title: "あああああああああああああああああああああああ" },
  { id: "n004", date: "0000.00.00", category: "ああ", title: "『あああああ・あああ』ああああああああああああああああああああ" },
  { id: "n003", date: "0000.00.00", category: "ああああ", title: "Xxxあああああああああああああああああああああ" },
  { id: "n002", date: "0000.00.00", category: "ああああ", title: "ああああああああああああああああああああ" },
  { id: "n001", date: "0000.00.00", category: "ああああ", title: "ああああああ" },
];

export const findNews = (id: string | undefined) => NEWS.find((n) => n.id === id);
