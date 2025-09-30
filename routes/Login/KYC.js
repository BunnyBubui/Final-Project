import { useState } from "react";
import { View, Text, TextInput, Pressable, Image, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { loginStyle } from "./Style/Login Style";
import { ScrollView } from "react-native";
import { previewStyles } from "./Style/PreviewStyle";

export default function KycUpload({ navigation }) {
  const [idNumber, setIdNumber] = useState("");
  const [idExpire, setIdExpire] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [income, setIncome] = useState("");

  const [idCardImage, setIdCardImage] = useState(null); 
  const [idCardDoc, setIdCardDoc] = useState(null);  

  const pickIdCardImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") return;
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.9,
      allowsMultipleSelection: false,
      selectionLimit: 1,
    });
    if (!res.canceled && res.assets?.length) {
      setIdCardImage({ uri: res.assets[0].uri });
    }
  };

  const pickIdCardDoc = async () => {
    const res = await DocumentPicker.getDocumentAsync({
      type: ["image/*", "application/pdf"],
      multiple: false,
      copyToCacheDirectory: true,
    });
    if (res.canceled) return;
    const file = res.assets?.[0];
    if (file) setIdCardDoc({ uri: file.uri, name: file.name, mimeType: file.mimeType });
  };

  const isImage = (mime) => typeof mime === "string" && mime.startsWith("image/");

  const proceed = () => {
    if (!idNumber.trim() || !idExpire.trim() || !address.trim() || !location.trim() || !income.trim()) {
      Alert.alert("ข้อมูลไม่ครบ", "กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }
    if (!idCardImage?.uri) {
      Alert.alert("ยังไม่อัปโหลดรูปบัตร", "กรุณาอัปโหลดรูปบัตรประชาชน (หน้า/หลังรวมเป็นรูปเดียวได้)");
      return;
    }
    if (!idCardDoc?.uri) {
      Alert.alert("ยังไม่อัปโหลดเอกสาร", "กรุณาอัปโหลดเอกสารบัตร (รูปหรือ PDF)");
      return;
    }

    navigation.navigate("WorkerHome", {
      kyc: { idNumber, idExpire, address, location, income, idCardImage, idCardDoc },
    });
  };

  return (
    <LinearGradient colors={["#4863a1", "#bd7ae1"]} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }} style={loginStyle.bg}>
      <ScrollView >
      <View style={[loginStyle.container, { paddingBottom: 24 }]}>
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
                  <Text style={[loginStyle.pBox, { color: "#fff" }]}>
                    {idCardImage ? "เปลี่ยนรูปบัตรประชาชน" : "อัปโหลดรูปบัตรประชาชน"}
                  </Text>
                </LinearGradient>
              )}
            </Pressable>

            <View style={previewStyles.box}>
              {idCardImage?.uri ? (
                <ScrollView style={previewStyles.scroll} contentContainerStyle={previewStyles.content}>
                  <Image source={{ uri: idCardImage.uri }} style={previewStyles.imageTall} />
                </ScrollView>
              ) : (
                <Text style={previewStyles.placeholder}>No photo selected</Text>
              )}
            </View>
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
                  <Text style={[loginStyle.pBox, { color: "#fff" }]}>
                    {idCardDoc ? "เปลี่ยนเอกสารบัตร (IMG/PDF)" : "อัปโหลดเอกสารบัตร (IMG/PDF)"}
                  </Text>
                </LinearGradient>
              )}
            </Pressable>

            <View style={previewStyles.box}>
              {idCardDoc?.uri ? (
                isImage(idCardDoc.mimeType) ? (
                  <ScrollView style={previewStyles.scroll} contentContainerStyle={previewStyles.content}>
                    <Image source={{ uri: idCardDoc.uri }} style={previewStyles.imageTall} />
                  </ScrollView>
                ) : (
                  <Text style={previewStyles.fileName}>{idCardDoc.name ?? "Selected document"}</Text>
                )
              ) : (
                <Text style={previewStyles.placeholder}>No file selected</Text>
              )}
            </View>
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
      </View>
      </ScrollView>
    </LinearGradient>
  );
}
