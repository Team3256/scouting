import * as SecureStore from "expo-secure-store";
import { createClient } from "@supabase/supabase-js";

import "react-native-url-polyfill/auto";

const ExpoSecureStoreAdapter = {
	getItem: (key: string) => SecureStore.getItemAsync(key),
	setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
	removeItem: (key: string) => SecureStore.deleteItemAsync(key),
};

export const supabase = createClient(
	// App Throws if these are not defined, so we can safely cast
	process.env.EXPO_PUBLIC_SUPABASE_URL ?? "http://127.0.0.1:54321",
	process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ??
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",
	{
		auth: {
			storage: ExpoSecureStoreAdapter,
			autoRefreshToken: true,
			persistSession: true,
			// detectSessionInUrl: true,
			detectSessionInUrl: false, // set to false bc https://supabase.com/blog/react-native-authentication#OAuth
			// flowType: "pkce", // no. pita to implement
		},
	},
);
