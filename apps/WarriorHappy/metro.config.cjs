const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const { withTamagui } = require("@tamagui/metro-plugin");

const config = getDefaultConfig(__dirname);

module.exports = withTamagui(
  withNativeWind(config, { input: "./global.css" }),
  {
    components: ["tamagui"],
    config: "./tamagui.config.ts",
    outputCSS: "./tamagui-web.css",
  },
);
