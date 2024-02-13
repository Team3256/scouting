// the v2 config imports the css driver on web and react-native on native
// for reanimated: @tamagui/config/v2-reanimated
// for react-native only: @tamagui/config/v2-native
import { config } from "@tamagui/config/v2";
import { createInterFont } from "@tamagui/font-inter";
import { color, radius, size, space, themes, zIndex } from "@tamagui/themes";
import { createTamagui, createTokens } from "tamagui"; // or '@tamagui/core'

const headingFont = createInterFont({
  size: {
    6: 15,
  },
  transform: {
    6: "uppercase",
    7: "none",
  },
  weight: {
    6: "400",
    7: "700",
  },
  color: {
    6: "$colorFocus",
    7: "$color",
  },
  letterSpacing: {
    5: 2,
    6: 1,
    7: 0,
    8: -1,
    9: -2,
    10: -3,
    12: -4,
    14: -5,
    15: -6,
  },
  face: {
    700: { normal: "InterBold" },
  },
});

const bodyFont = createInterFont(
  {
    face: {
      700: { normal: "InterBold" },
    },
  },
  {
    sizeSize: (size) => Math.round(size * 1.1),
    sizeLineHeight: (size) => Math.round(size * 1.1 + (size > 20 ? 10 : 10)),
  },
);
const tokens = createTokens({
  size,
  space,
  zIndex,
  color,
  radius,
});

const appConfig = createTamagui({
  ...config,
  tokens,
  fonts: {
    body: bodyFont,
    heading: headingFont,
  },
});

export type AppConfig = typeof appConfig;

declare module "tamagui" {
  // or '@tamagui/core'
  // overrides TamaguiCustomConfig so your custom types
  // work everywhere you import `tamagui`
  type TamaguiCustomConfig = AppConfig;
}

export default appConfig;
