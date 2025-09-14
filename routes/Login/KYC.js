import { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { loginStyle } from "./Style/Login Style";

export default function KycUpload({ navigation }) {
  const [idNumber, setIdNumber] = useState("");
  const [idExpire, setIdExpire] = useState(""); 
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [income, setIncome] = useState("");
  const [idCardImages, setIdCardImages] = useState([]);
  const [idCardDoc, setIdCardDoc] = useState(null);   

  const pickIdCardImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") return;
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    if (!res.canceled) {
      setIdCardImages((prev) => [...prev, ...res.assets.map(a => ({ uri: a.uri }))]);
    }
  };

  const pickIdCardDoc = async () => {
    const res = await DocumentPicker.getDocumentAsync({
      type: ["image/*", "application/pdf"],
      multiple: false,
      copyToCacheDirectory: true,
    });
    if (res.canceled) return;
    setIdCardDoc(res.assets?.[0] ?? null);
  };

  const proceed = () => {
    if (!idNumber.trim() || !idExpire.trim() || !address.trim()) return;
    navigation.navigate("VehicleUpload", {
      kyc: { idNumber, idExpire, address, location, income, idCardImages, idCardDoc },
    });
  };

  return (
    <LinearGradient colors={["#4863a1", "#bd7ae1"]} start={{x:0,y:1}} end={{x:0,y:0}} style={loginStyle.bg}>
      <ScrollView contentContainerStyle={[loginStyle.container, { paddingBottom: 24 }]}>
        <Text style={loginStyle.h1}>Personal Info</Text>
        <View style={loginStyle.card}>
          <View style={loginStyle.group}>
            <TextInput
              value={idNumber}
              onChangeText={setIdNumber}
              placeholder="เลขบัตรประชาชน"
              keyboardType="number-pad"
              style={loginStyle.input}
            />
          </View>

          <View style={loginStyle.group}>
            <TextInput
              value={idExpire}
              onChangeText={setIdExpire}
              placeholder="วันหมดอายุบัตร (DD/MM/YYYY)"
              style={loginStyle.input}
            />
          </View>

          <View style={loginStyle.group}>
            <TextInput
              value={address}
              onChangeText={setAddress}
              placeholder="ที่อยู่ตามบัตร / ที่อยู่ปัจจุบัน"
              multiline
              style={[loginStyle.input, { height: 90, textAlignVertical: "top" }]}
            />
          </View>

          <View style={loginStyle.group}>
            <TextInput
              value={location}
              onChangeText={setLocation}
              placeholder="ตำแหน่ง/อำเภอ/จังหวัด (หรือพิกัดแบบคร่าว ๆ)"
              style={loginStyle.input}
            />
          </View>

          <View style={loginStyle.group}>
            <TextInput
              value={income}
              onChangeText={setIncome}
              placeholder="รายได้ต่อเดือน (บาท)"
              keyboardType="number-pad"
              style={loginStyle.input}
            />
          </View>

          <View style={loginStyle.group}>
            <Pressable onPress={pickIdCardImage}>
              {({ pressed }) => (
                <LinearGradient
                  colors={[pressed ? "#f3a66f" : "#f19a5c", pressed ? "#fde386" : "#f9db6f"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={loginStyle.btnGrad}
                >
                  <Text style={[loginStyle.pBox, { color: "#fff" }]}>อัปโหลดรูปบัตรประชาชน (หน้า/หลัง)</Text>
                </LinearGradient>
              )}
            </Pressable>
            {!!idCardImages?.length && (
              <Text style={[loginStyle.p, { color: "#111", marginTop: 6 }]}>
                อัปโหลดแล้ว {idCardImages.length} รูป
              </Text>
            )}
          </View>

          <View style={loginStyle.group}>
            <Pressable onPress={pickIdCardDoc}>
              {({ pressed }) => (
                <LinearGradient
                  colors={[pressed ? "#6fa8ff" : "#5d8aff", pressed ? "#b0c7ff" : "#90a8ff"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={loginStyle.btnGrad}
                >
                  <Text style={[loginStyle.pBox, { color: "#fff" }]}>อัปโหลดเอกสารบัตร (PDF/รูป)</Text>
                </LinearGradient>
              )}
            </Pressable>
            {idCardDoc && (
              <Text style={[loginStyle.p, { color: "#111", marginTop: 6 }]}>
                เอกสาร: {idCardDoc.name ?? "selected"}
              </Text>
            )}
          </View>

          <Pressable onPress={proceed} style={{ marginTop: 10 }}>
            {({ pressed }) => (
              <LinearGradient
                colors={[pressed ? "#1f9a6f" : "#1abc9c", pressed ? "#51d0b1" : "#4cd8c1"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={loginStyle.btnGrad}
              >
                <Text style={[loginStyle.pBox, { color: "#fff" }]}>Next</Text>
              </LinearGradient>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
