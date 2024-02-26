import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
	process.env.EXPO_PUBLIC_SUPABASE_URL ??
	"https://nbyhwzvwvpwikgzoyank.supabase.co";

const supabaseAnonKey =
	process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ??
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ieWh3enZ3dnB3aWtnem95YW5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQwMDQyNTIsImV4cCI6MjAxOTU4MDI1Mn0.ytShtlo0sjKyGCeyqzdVXWpGe-9frCevLXAq1gdjG0w";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	auth: {
		storage: AsyncStorage,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
});
