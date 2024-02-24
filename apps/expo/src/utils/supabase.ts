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
	process.env.EXPO_PUBLIC_SUPABASE_URL ??
		"https://nbyhwzvwvpwikgzoyank.supabase.co",
	process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ??
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ieWh3enZ3dnB3aWtnem95YW5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQwMDQyNTIsImV4cCI6MjAxOTU4MDI1Mn0.ytShtlo0sjKyGCeyqzdVXWpGe-9frCevLXAq1gdjG0w",
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
