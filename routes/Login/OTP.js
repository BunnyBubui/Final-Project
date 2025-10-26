import { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginStyle } from "./Style/Login Style";
import { getBaseURL } from "./BaseEndpoint";

export default function OTP({ navigation }) {
  const route = useRoute();
  const role = route.params?.role ?? null;
  const username = route.params?.username ?? null;

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [mockOtp, setMockOtp] = useState("");
  const [step, setStep] = useState("request");
  const [err, setErr] = useState("");
  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startCountdown = (sec = 30) => {
    setCountdown(sec);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCountdown((s) => {
        if (s <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  };

  const genMockOtp = () => String(Math.floor(100000 + Math.random() * 900000));

  const handleGetOtp = () => {
    setErr("");
    if (!phone.trim()) {
      setErr("กรุณากรอกหมายเลขโทรศัพท์");
      return;
    }
    const code = genMockOtp();
    setMockOtp(code);
    setStep("verify");
    setOtp("");
    startCountdown(30);
  };

  const handleResend = () => {
    const code = genMockOtp();
    setMockOtp(code);
    startCountdown(30);
  };

  const handleConfirm = async () => {
    setErr("");

    const onlyDigits = otp.replace(/\D/g, "");
    if (!onlyDigits) {
      setErr("กรุณากรอกรหัส OTP");
      return;
    }
    if (onlyDigits !== mockOtp) {
      setErr("รหัส OTP ไม่ถูกต้อง");
      return;
    }

    try {
      const res = await fetch(`${getBaseURL()}/api/member`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          type: role,
          phone,
        }),
      });

      if (!res.ok) {
        setErr("ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง");
        return;
      }

      await AsyncStorage.setItem(
        "profile",
        JSON.stringify({ username, type: role, phone })
      );

      if (role === "customer") {
        navigation.replace("UserHome", { role, phone, username });
      } else {
        navigation.replace("WorkerHome", { role, phone, username });
      }
      return;
    } catch (error) {
      setErr("เครือข่ายอาจมีปัญหา กรุณาลองใหม่อีกครั้ง");
      console.log("OTP confirm error:", error);
      return;
    }
  };

  if (!role) {
    return (
      <LinearGradient
        colors={["#4863a1", "#bd7ae1"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={loginStyle.bg}
      >
        <View style={loginStyle.container}>
          <Text style={loginStyle.h1}>Choose your role first</Text>
          <Pressable
            onPress={() => navigation.replace("Select")}
            style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
          >
            <Text style={loginStyle.p}>← Back to role selection</Text>
          </Pressable>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={["#4863a1", "#bd7ae1"]}
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0 }}
      style={loginStyle.bg}
    >
      <View style={loginStyle.container}>
        <Text style={loginStyle.h1}>
          {role === "customer" ? "Register as Customer" : "Register as Worker"}
        </Text>

        <Pressable
          style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={loginStyle.p}>Already Registered? Log in here.</Text>
        </Pressable>

        {step === "request" && (
          <View style={loginStyle.card}>
            <View style={loginStyle.group}>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                style={loginStyle.input}
              />
            </View>

            {!!err && <Text style={loginStyle.error}>{err}</Text>}

            <Pressable onPress={handleGetOtp} hitSlop={8}>
              {({ pressed }) => (
                <LinearGradient
                  colors={[
                    pressed ? "#f3a66f" : "#f19a5c",
                    pressed ? "#fde386" : "#f9db6f",
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={loginStyle.btnGrad}
                >
                  <Text style={[loginStyle.pBox, { color: "#fff" }]}>
                    Get OTP
                  </Text>
                </LinearGradient>
              )}
            </Pressable>
          </View>
        )}

        {step === "verify" && (
          <View style={loginStyle.card}>
            <Text style={[loginStyle.p, { color: "#111", marginBottom: 8 }]}>
              Demo OTP <Text style={{ fontWeight: "bold" }}>{mockOtp}</Text>
            </Text>

            <View style={loginStyle.group}>
              <TextInput
                value={otp}
                onChangeText={(t) => setOtp(t.replace(/\D/g, "").slice(0, 6))}
                placeholder="Enter OTP"
                keyboardType="number-pad"
                maxLength={6}
                style={loginStyle.input}
              />
            </View>

            {!!err && <Text style={loginStyle.error}>{err}</Text>}

            <Pressable onPress={handleConfirm} hitSlop={8}>
              {({ pressed }) => (
                <LinearGradient
                  colors={[
                    pressed ? "#f3a66f" : "#f19a5c",
                    pressed ? "#fde386" : "#f9db6f",
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={loginStyle.btnGrad}
                >
                  <Text style={[loginStyle.pBox, { color: "#fff" }]}>
                    Confirm
                  </Text>
                </LinearGradient>
              )}
            </Pressable>

            <View style={{ marginTop: 12, alignItems: "center" }}>
              {countdown > 0 ? (
                <Text style={[loginStyle.p, { color: "#111" }]}>
                  Resend in {countdown}s
                </Text>
              ) : (
                <Pressable
                  onPress={handleResend}
                  style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
                >
                  <Text style={[loginStyle.p, { color: "#111" }]}>
                    Resend OTP
                  </Text>
                </Pressable>
              )}
            </View>

            <Pressable
              onPress={() => {
                if (timerRef.current) clearInterval(timerRef.current);
                setCountdown(0);
                setStep("request");
                setErr("");
              }}
              style={({ pressed }) => [
                { opacity: pressed ? 0.8 : 1, marginTop: 10 },
              ]}
            >
              <Text style={[loginStyle.p, { color: "#111" }]}>
                ← Change phone number
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </LinearGradient>
  );
}
