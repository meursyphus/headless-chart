import { addons } from "storybook/manager-api";
import { create } from "storybook/theming/create";

const theme = create({
  base: "dark",
  brandTitle: "Headless Chart",
  brandUrl: "/",

  // Colors
  colorPrimary: "#61dafb",
  colorSecondary: "#61dafb",

  // UI
  appBg: "#1a1a2e",
  appContentBg: "#16213e",
  appPreviewBg: "#0f0f23",
  appBorderColor: "rgba(97, 218, 251, 0.12)",
  appBorderRadius: 8,

  // Text
  textColor: "#e2e8f0",
  textInverseColor: "#1a1a2e",
  textMutedColor: "#94a3b8",

  // Toolbar
  barTextColor: "#94a3b8",
  barHoverColor: "#61dafb",
  barSelectedColor: "#61dafb",
  barBg: "#16213e",

  // Form
  inputBg: "#0f3460",
  inputBorder: "rgba(97, 218, 251, 0.2)",
  inputTextColor: "#e2e8f0",
  inputBorderRadius: 6,

  // Buttons
  buttonBg: "#0f3460",
  buttonBorder: "rgba(97, 218, 251, 0.2)",

  // Fonts
  fontBase: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontCode: '"JetBrains Mono", "Fira Code", monospace',
});

addons.setConfig({
  theme,
});
