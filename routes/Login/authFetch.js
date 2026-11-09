import AsyncStorage from "@react-native-async-storage/async-storage";
export async function authFetch(url, options = {}) {
  const stored = await AsyncStorage.getItem("profile");
  const profile = stored ? JSON.parse(stored) : null;
  return fetch(url, { ...options, headers: { ...options.headers, Authorization: `Bearer ${profile?.token || ""}` } });
}
