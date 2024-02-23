import type { ExpoConfig } from "@expo/config";

if (
  !process.env.EXPO_PUBLIC_SUPABASE_URL ||
  !process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY
) {
  throw new Error(
    "Please provide SUPABASE_URL and SUPABASE_ANON_KEY in your .env file",
  );
}

const defineConfig = (): ExpoConfig => ({
  name: "WarriorHappy",
  slug: "create-t3-turbo",
  scheme: "team3256",
  version: "2.0.2",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "dark",
  splash: {
    image: "./assets/icon.png",
    resizeMode: "contain",
    backgroundColor: "#18181A",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    bundleIdentifier: "co.team3256.warriorhappy",
    supportsTablet: true,
    usesAppleSignIn: true,
  },
  android: {
    package: "co.team3256.warriorhappy",
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#18181A",
    },
  },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  extra: {
    eas: {
      projectId: "c7faf499-0164-4466-ba2a-46cf3b1047d7",
      owner: "warriorborgs",
    },
  },
  plugins: [
    "./expo-plugins/with-modify-gradle.js",
    "expo-apple-authentication",
  ],
  owner: "warriorborgs",
});

export default defineConfig;