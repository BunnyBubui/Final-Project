import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRoute } from "@react-navigation/native";
import { loginStyle } from "./Style/Login Style";
import { getBaseURL } from "./BaseEndpoint";

export default function Sign({ navigation }) {
  const route = useRoute();
  const role = route.params?.role ?? null;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState("");

  const onRegister = async () => {
    if (!username.trim() || !password.trim() || !confirm.trim()) {
      setErr("กรุณากรอกข้อมูลให้ครบ");
      return;
    }
    if (password !== confirm) {
      setErr("รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }
    setErr("");
    try {
      const res = await fetch(`${getBaseURL()}/api/signUp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          confirmPassword: confirm,
        })
      })

      if (!res.ok) {
        setErr("ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง");
        return;
      }

      if (res.ok) {
        navigation.replace("Otp", { role, username });
      }
    } catch {
      setErr("เครือข่ายอาจมีปัญหา กรุณาลองใหม่อีกครั้ง");
      console.log(res)
    }
  };

  if (!role) {
    return (
      <LinearGradient colors={["#4863a1", "#bd7ae1"]} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }} style={loginStyle.bg}>
        <View style={loginStyle.container}>
          <Text style={loginStyle.h1}>Choose your role first</Text>
          <Pressable onPress={() => navigation.replace("Select")} style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}>
            <Text style={loginStyle.p}>← Back to role selection</Text>
          </Pressable>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={["#4863a1", "#bd7ae1"]} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }} style={loginStyle.bg}>
      <View style={loginStyle.container}>
        <Text style={loginStyle.h1}>
          {role === "customer" ? "Register as Customer" : "Register as Worker"}
        </Text>
        <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]} onPress={() => navigation.navigate("Login")}>
          <Text style={[loginStyle.p, { textDecorationLine: "underline" }]}>Already Registered? Log in here.</Text>
        </Pressable>

        <View style={loginStyle.card}>
          <View style={loginStyle.group}>
            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholder="Username"
              autoCapitalize="none"
              style={loginStyle.input}
            />
          </View>

          <View style={loginStyle.group}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry
              style={loginStyle.input}
            />
          </View>

          <View style={loginStyle.group}>
            <TextInput
              value={confirm}
              onChangeText={setConfirm}
              placeholder="Confirm Password"
              secureTextEntry
              style={loginStyle.input}
            />
          </View>

          {!!err && <Text style={loginStyle.error}>{err}</Text>}

          <Pressable onPress={onRegister} hitSlop={8}>
            {({ pressed }) => (
              <LinearGradient
                colors={[pressed ? "#f3a66f" : "#f19a5c", pressed ? "#fde386" : "#f9db6f"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={loginStyle.btnGrad}
              >
                <Text style={[loginStyle.pBox, { color: "#fff" }]}>Sign up</Text>
              </LinearGradient>
            )}
          </Pressable>

          <Pressable onPress={() => navigation.replace("Select")} style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1, marginTop: 10 }]}>
            <Text style={[loginStyle.p, { color: "#111" }]}>← Change role</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}
