# Xxxxxxxx コーポレートサイト 骨組みサイト

デザインカンプ前に、**ページ構成と導線だけをクライアントと合意する**ための確認用サイトです。

- 画像・動画・アイコン素材は一切使っていません。表現は「線（border / SVG stroke）」と「文字」のみです
- 画像が入る予定の場所は「枠線＋中央ラベル（例：`メインビジュアル / 16:9`）」で示しています
- 配色はカンプ段階で決めるため、白・黒・グレーのみのモノクロで構成しています
- アニメーション・演出は入れていません（例外：初回ローディングとページ遷移の**仮**アニメーションのみ）
- 掲載内容はすべて意味を持たないダミーです（社名は `Xxxxxxxx`、文章は同じ文字数の「あ」、英字は `X`、数字は `0` に置き換え済み。ナビ・見出し・ボタンなどの一般的なUI要素はそのまま）

## 起動手順

Node.js 20 以上を想定しています（動作確認は v24）。

```bash
npm install
npm run dev        # http://localhost:5173 でローカル確認
```

| コマンド | 内容 |
| --- | --- |
| `npm run dev` | 開発サーバー起動 |
| `npm run build` | 型チェック＋本番ビルド（`dist/` に出力） |
| `npm run preview` | ビルド結果をローカルで確認 |
| `npm run typecheck` | 型チェックのみ |

> WSL から Windows ドライブ（`/mnt/c` や `/mnt/d`）上で作業する場合、シンボリックリンクが作れず `npm install` が失敗することがあります。
> その場合は `npm install --no-bin-links` を使ってください。npm scripts は `node_modules/.bin` に依存しない書き方にしてあります。
> また同じ環境ではファイル変更の通知が届かないため、`vite.config.ts` でファイル監視をポーリングにしています。

## 公開（GitHub Pages）

`main` ブランチに push すると、GitHub Actions（`.github/workflows/deploy.yml`）がビルドして GitHub Pages に公開します。

- 公開URL：`https://<ユーザー名>.github.io/<リポジトリ名>/`
- ビルド時に `--base=/<リポジトリ名>/` を指定し、ルーターの basename にも同じ値を使っています
- `/works/w001` などへの直接アクセス・リロードに対応するため、`index.html` を `404.html` として複製しています
- GitHub Pages には認証機能がないため、URL を知っていれば誰でも閲覧できます（`noindex` は設定済み）

## 技術構成

- Vite + React + TypeScript
- ルーティング：react-router
- スタイル：素の CSS（`src/styles/global.css` の1ファイル）。UIライブラリ・Tailwind は使っていません

## ページ構成

| # | パス | ページ | 主なセクション |
| --- | --- | --- | --- |
| 1 | `/` | TOP | FV（キャッチコピー＋軌道線）／About 抜粋／Works 抜粋（6件）／Brand 抜粋／News（最新3件）／Contact 導線 |
| 2 | `/about` | About | ステートメント／提供領域／体制・強み |
| 3 | `/works` | Works 一覧 | ページタイトル／絞り込みUI（枠のみ）／カードグリッド（PC 3列・タブレット 2列・SP 1列）／もっと見る |
| 4 | `/works/:id` | Works 詳細 | メインビジュアル枠／タイトル・概要／メタ情報（制作年・種別・担当パート・発注元・権利表記）／関連作品 |
| 5 | `/brand` | Brand | ブランドKV枠／ステートメント／プロダクト一覧／外部リンクボタン／関連Works |
| 6 | `/news` | News 一覧 | ページタイトル／記事リスト／ページャ |
| 7 | `/news/:id` | News 詳細 | 日付・タイトル／本文（記事型タイポグラフィ） |
| 8 | `/company` | Company | 会社概要テーブル（商号・設立・所在地・代表者・事業内容）／アクセス（地図は枠のみ） |
| 9 | `/contact` | Contact | フォーム項目（枠のみ・送信しない） |

詳細ページのサンプル URL：`/works/w001` 〜 `/works/w009`、`/news/n001` 〜 `/news/n012`

共通要素：
- 初回ローディング：サイト読込み時に3秒間、線だけの仮アニメーションを表示し、終わったらページ遷移と同じ波紋ワイプで覆ってからサイトを見せます（本番はフッテージに差し替え予定。`src/components/Loader.tsx` の `LOADING_MS` で尺を変更）
- ページ遷移：仮のワイプアニメーション（波紋）を入れています。画面外に中心を置いた大きな黒い円が広がって画面を覆い、ページ切替後に同じ方向から円形に開きます。方向は PC が左→右、SP（767px 以下）が下→上です。塗りの先端の外側を線だけの円弧が走ります（片道 0.6秒。`src/components/PageTransition.tsx` の `WIPE_MS`）
- ヘッダー：ロゴ＋グローバルナビ＋Contact ボタン。SP（767px 以下）ではハンバーガーメニューに切り替わります（開閉、Esc で閉じる、ページ遷移で閉じる、展開中は背面スクロール停止）
- フッター：Contact 導線＋全ページへのナビ
- 最上部に「骨組みサイトである」旨の帯を表示しています

## 確認時のポイント

- **セクションの意図**：各セクションの冒頭に、意図を1行書いた HTML コメントを入れています。ブラウザの開発者ツール（Elements）で `<!-- 意図: ... -->` として確認できます（`src/components/Section.tsx` の `useIntentComment`）
- **動作しない UI**：Works の絞り込み、もっと見る、News のページャ、Contact の送信、Brand の外部リンクは、配置確認用の見た目だけです
- **レスポンシブ**：PC 1440px / SP 375px で横スクロールが出ないことを確認済みです

## ナビ項目の追加方法（例：Recruit）

ヘッダー・SPメニュー・フッターのナビは、すべて `src/data/nav.ts` の配列から生成しています。

1. `src/pages/Recruit.tsx` を作成
2. `src/App.tsx` に `<Route path="recruit" element={<Recruit />} />` を追加
3. `src/data/nav.ts` の配列に `{ label: "Recruit", ja: "採用情報", to: "/recruit" }` を1行追加

## ディレクトリ構成

```
src/
├── App.tsx              ルーティング定義
├── main.tsx
├── components/
│   ├── Layout.tsx       ヘッダー・フッターを含む共通レイアウト
│   ├── Header.tsx       グローバルナビ・ハンバーガーメニュー
│   ├── Footer.tsx
│   ├── Loader.tsx       初回ローディング（仮アニメーション 3秒）
│   ├── PageTransition.tsx ページ遷移の仮ワイプ
│   ├── Section.tsx      セクション枠（意図コメントの出力）
│   └── Parts.tsx        画像枠・カード・テーブル・ページヘッダーなど
├── data/
│   ├── nav.ts           ナビ定義
│   ├── works.ts         Works ダミーデータ
│   └── news.ts          News ダミーデータ
├── pages/               各ページ
└── styles/global.css    全スタイル（モノクロ）
```
