import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "./components/Layout";
import { Loader } from "./components/Loader";
import { usePageTransition } from "./components/PageTransition";
import { Top } from "./pages/Top";
import { About } from "./pages/About";
import { WorksList } from "./pages/WorksList";
import { WorksDetail } from "./pages/WorksDetail";
import { Brand } from "./pages/Brand";
import { NewsListPage } from "./pages/NewsList";
import { NewsDetail } from "./pages/NewsDetail";
import { Company } from "./pages/Company";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";

function AppRoutes() {
  const { displayLocation, wipe } = usePageTransition();
  return (
    <>
      <Routes location={displayLocation}>
        <Route element={<Layout />}>
          <Route index element={<Top />} />
          <Route path="about" element={<About />} />
          <Route path="works" element={<WorksList />} />
          <Route path="works/:id" element={<WorksDetail />} />
          <Route path="brand" element={<Brand />} />
          <Route path="news" element={<NewsListPage />} />
          <Route path="news/:id" element={<NewsDetail />} />
          <Route path="company" element={<Company />} />
          <Route path="contact" element={<Contact />} />
          {/* 項目追加時（例：Recruit）: ここにルートを追加し、data/nav.ts に1行追加する */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      {wipe}
    </>
  );
}

export function App() {
  return (
    // GitHub Pages ではサブパス（/リポジトリ名/）配下で配信されるため、ビルド時の base をルーターにも渡す
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "") || "/"}>
      <Loader />
      <AppRoutes />
    </BrowserRouter>
  );
}
