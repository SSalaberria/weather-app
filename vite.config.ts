import * as path from "path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["fonts/*.ttf", "images/*.png", "icons/*.svg", "weather-icons/*.svg", "*.svg"],
      manifest: {
        name: "Weathery - for all your weather needs",
        short_name: "Weathery",
        description: "Weathery is another weather app you didn't need nor did you ask for.",
        theme_color: "#1F1F42",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      devOptions: {
        enabled: true,
        /* other options */
      },
      workbox: {
        importScripts: ["/sw-fetch.js"],
      },
    }),
  ],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
});
