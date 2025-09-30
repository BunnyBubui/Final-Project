import { Platform, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getBaseURL } from "../Login/BaseEndpoint";

const confirmLogout = async () => {
  if (Platform.OS === "web") {
    return window.confirm("ต้องการออกจากระบบหรือไม่คะ?");
  }
  return await new Promise((resolve) => {
    Alert.alert("ออกจากระบบ", "ต้องการออกจากระบบหรือไม่คะ?", [
      { text: "ยกเลิก", style: "cancel", onPress: () => resolve(false) },
      { text: "ตกลง", style: "destructive", onPress: () => resolve(true) },
    ]);
  });
};

const Logout = async (navigation) => {
  const ok = await confirmLogout();
  if (!ok) return;

  try {
    const stored = await AsyncStorage.getItem("profile");
    const username = stored ? JSON.parse(stored)?.username : null;

    if (username) {
      try {
        await fetch(`${getBaseURL()}/api/logout`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username }),
        });
      } catch {
      }
    }

    await AsyncStorage.removeItem("profile");
    navigation.reset({ index: 0, routes: [{ name: "Login" }] });
  } catch (e) {
    console.log("Logout error:", e);
  }
};

export {Logout};