import { defineConfig } from "vite";

import { resolve } from "path";

console.log("vite config loaded");

export default defineConfig({

  base: "/",

  build: {

    rollupOptions: {

      input: {

        main:
          resolve(__dirname, "index.html"),

        works:
          resolve(__dirname, "works.html"),

        results:
          resolve(__dirname, "results.html"),

        detail:
          resolve(__dirname, "detail.html"),
      },
    },
  },
});