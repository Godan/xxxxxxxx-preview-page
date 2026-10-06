import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // WSL から Windows ドライブ（/mnt/c, /mnt/d）上のファイルを扱うと
    // ファイル変更の通知が届かず HMR が効かないため、ポーリングで監視する
    watch: { usePolling: true, interval: 300 },
  },
});
