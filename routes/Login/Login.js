import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { loginStyle } from "./Style/Login Style";
import { getBaseURL } from "./Base";

function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const onLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setErr("กรุณากรอก username และ password");
      return;
    }
    setErr("");

    try {
      const res = await fetch(`${getBaseURL()}/api/signIn`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      if (!res.ok) {
        setErr("ไม่สามารถเข้าล็อกอินได้ กรุณาลองใหม่อีกครั้ง");
        return;
      }

      const data = await res.json();
      if (res.ok) {
        navigation.replace("UserHome");
      }
    } catch {
      setErr("เครือข่ายอาจมีปัญหา กรุณาลองใหม่อีกครั้ง")
    }
  };

  return (
    <LinearGradient
      colors={["#4863a1", "#bd7ae1"]}
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0 }}
      style={loginStyle.bg}
    >
      <View style={loginStyle.container}>
        <Text style={loginStyle.h1}>Login</Text>
        <Text style={loginStyle.p}>Sign in to continue.</Text>

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

          {!!err && <Text style={loginStyle.error}>{err}</Text>}

          <Pressable
            onPress={onLogin}
            hitSlop={8}
          >
            {({ pressed }) => (
              <LinearGradient
                colors={[pressed ? "#f3a66fff" : "#f19a5c", pressed ? "#fde386ff" : "#f9db6f"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={loginStyle.btnGrad}
              >
                <Text
                  style={[
                    loginStyle.pBox,
                    { color: pressed ? "#fff" : "#ffffffff" },
                  ]}
                >
                  Login
                </Text>
              </LinearGradient>
            )}
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              loginStyle.btnBase,
              {
                marginTop: 8,
                borderWidth: 1,
                borderColor: pressed ? "#fff" : "#ff6739ff",
                backgroundColor: pressed ? "#ffa149ff" : "#fff"
              },
            ]}
            onPress={() => navigation.navigate("Select")}
            hitSlop={8}
          >
            {({ pressed }) => (
              <Text
                style={[
                  loginStyle.pBox,
                  { color: pressed ? "#fff" : "#ff6739ff" },
                ]}
              >
                Sign up
              </Text>
            )}
          </Pressable>

          <Pressable style={{ marginTop: 16 }}>
            {({ pressed }) => (
              <Text style={[loginStyle.pBox, { fontWeight: "normal", color: pressed ? "#b7b7b7ff" : "#949494", textDecorationLine: "underline" }]}>forgot password?</Text>
            )}
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}

export default Login;
