import { defineConfig } from "oxlint";

export default defineConfig({
  options: {
    typeAware: true,
  },
  plugins: ["node", "oxc", "react", "react-perf", "typescript", "unicorn"],
});
