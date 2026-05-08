import { defineConfig } from "vite";

import { resolve } from "path";

console.log("vite config loaded");

export default defineConfig({

  base: "/V-code_Creative_Awards/",

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