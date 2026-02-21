import type { Preview } from "@storybook/react-vite";
import { create } from "storybook/theming/create";
import "./preview.css";

const darkTheme = create({
  base: "dark",
  appBg: "#1a1a2e",
  appContentBg: "#0f0f23",
  appPreviewBg: "#0f0f23",
  appBorderColor: "rgba(97, 218, 251, 0.12)",
  colorPrimary: "#61dafb",
  colorSecondary: "#61dafb",
  textColor: "#e2e8f0",
  textMutedColor: "#94a3b8",
  barTextColor: "#94a3b8",
  barSelectedColor: "#61dafb",
  barBg: "#16213e",
  fontBase: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  fontCode: '"JetBrains Mono", "Fira Code", monospace',
});

const preview: Preview = {
  parameters: {
    docs: {
      theme: darkTheme,
      source: {
        language: "tsx",
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
  },
};

export default preview;
