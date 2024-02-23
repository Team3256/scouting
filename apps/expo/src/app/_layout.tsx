import { useFonts } from "expo-font";
import { Slot, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { TamaguiProvider } from "tamagui";

import tamaguiConfig from "@acme/tamagui-config";

import { HeaderBackButton, HeaderTitle } from "../components/header";
import { TRPCProvider } from "../utils/api";
import { supabase } from "../utils/supabase";

import "../styles.css";

import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { cssInterop } from "nativewind";

cssInterop(SafeAreaView, { className: "style" });

// This is the main layout of the app
// It wraps your pages with the providers they need
export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    if (loaded) {
      // can hide splash screen here
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <TRPCProvider>
      <TamaguiProvider config={tamaguiConfig}>
        <SessionContextProvider supabaseClient={supabase}>
          {/*
           * The Stack component displays the current page.
           * It also allows you to configure your screens
           */}
          <Stack
            screenOptions={{
              headerLeft: HeaderBackButton,
              headerTitle: HeaderTitle,
              headerStyle: {
                backgroundColor: "#18181A",
                // backgroundColor: "#008000",
                // backgroundColor: "#FFFF00",
              },
              contentStyle: {
                // backgroundColor: "#334155",
              },
            }}
          >
            {/*
             * Present the profile screen as a modal
             * @see https://expo.github.io/router/docs/guides/modals
             */}
            <Stack.Screen
              name="profile"
              options={{
                presentation: "modal",
                headerTitle: () => <></>,
              }}
            />
            {/* <Slot /> */}
          </Stack>
          <StatusBar />
        </SessionContextProvider>
      </TamaguiProvider>
    </TRPCProvider>
  );
}
