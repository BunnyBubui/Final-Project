import { useState } from "react";
import { View, Text, TextInput, Pressable, Switch, ScrollView, Image, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { loginStyle } from "./Style/Login Style";
import { previewStyles } from "./Style/PreviewStyle";

export default function VehicleUpload({ navigation, route }) {
  const kyc = route?.params?.kyc ?? null;

  const [regNo, setRegNo] = useState("");
  const [plate, setPlate] = useState("");
  const [carPhoto, setCarPhoto] = useState(null);       
  const [dlDoc, setDlDoc] = useState(null);         
  const [dlExpire, setDlExpire] = useState("");
  const [dlForever, setDlForever] = useState(false);

  const pickCarPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") return;
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.9,
      allowsMultipleSelection: false,  
      selectionLimit: 1,
    });
    if (!res.canceled && res.assets?.length) {
      setCarPhoto({ uri: res.assets[0].uri });
    }
  };

  const pickDriverLicense = async () => {
    const res = await DocumentPicker.getDocumentAsync({
      type: ["image/*", "application/pdf"],
      multiple: false,
      copyToCacheDirectory: true,
    });
    if (res.canceled) return;
    const file = res.assets?.[0];
    if (file) {
      setDlDoc({ uri: file.uri, name: file.name, mimeType: file.mimeType });
    }
  };

  const isImage = (mime) => typeof mime === "string" && mime.startsWith("image/");

  const finish = () => {
    if (!regNo.trim() || !plate.trim()) {
      Alert.alert("Missing info", "Please fill Registration Number and License Plate.");
      return;
    }
    if (!carPhoto?.uri) {
      Alert.alert("Missing photo", "Please upload a vehicle photo.");
      return;
    }
    if (!dlDoc?.uri) {
      Alert.alert("Missing license", "Please upload your driving license (image/PDF).");
      return;
    }
    if (!dlForever && !dlExpire.trim()) {
      Alert.alert("Missing expiry", "Please fill driving license expiry date or mark as Permanent.");
      return;
    }

    navigation.replace("WorkerHome", {
      vehicle: {
        regNo,
        plate,
        carPhoto, 
        dlDoc,
        dlExpire: dlForever ? "PERMANENT" : dlExpire,
      },
      kyc,
    });
  };

  return (
    <LinearGradient colors={["#4863a1", "#bd7ae1"]} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }} style={loginStyle.bg}>
      <ScrollView contentContainerStyle={[loginStyle.container, { paddingBottom: 24 }]}>
        <Text style={loginStyle.h1}>Vehicle & Driving License Info</Text>

        <View style={loginStyle.card}>
          <View style={loginStyle.group}>
            <TextInput
              value={regNo}
              onChangeText={setRegNo}
              placeholder="Registration Number"
              autoCapitalize="characters"
              style={loginStyle.input}
            />
          </View>

          <View style={loginStyle.group}>
            <TextInput
              value={plate}
              onChangeText={setPlate}
              placeholder="License Plate"
              style={loginStyle.input}
            />
          </View>

          <View style={loginStyle.group}>
            <Pressable onPress={pickCarPhoto}>
              {({ pressed }) => (
                <LinearGradient
                  colors={[pressed ? "#6fa8ff" : "#5d8aff", pressed ? "#b0c7ff" : "#90a8ff"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={loginStyle.btnGrad}
                >
                  <Text style={[loginStyle.pBox, { color: "#fff" }]}>
                    {carPhoto ? "Change Vehicle Photo" : "Upload Vehicle Photo"}
                  </Text>
                </LinearGradient>
              )}
            </Pressable>

            <View style={previewStyles.box}>
              {carPhoto?.uri ? (
                <ScrollView style={previewStyles.scroll} contentContainerStyle={previewStyles.content}>
                  <Image source={{ uri: carPhoto.uri }} style={previewStyles.imageTall} />
                </ScrollView>
              ) : (
                <Text style={previewStyles.placeholder}>No photo selected</Text>
              )}
            </View>
          </View>

          <View style={loginStyle.group}>
            <Pressable onPress={pickDriverLicense}>
              {({ pressed }) => (
                <LinearGradient
                  colors={[pressed ? "#f3a66f" : "#f19a5c", pressed ? "#fde386" : "#f9db6f"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={loginStyle.btnGrad}
                >
                  <Text style={[loginStyle.pBox, { color: "#fff" }]}>
                    {dlDoc ? "Change Driving License" : "Upload Driving License (IMG/PDF)"}
                  </Text>
                </LinearGradient>
              )}
            </Pressable>

            <View style={previewStyles.box}>
              {dlDoc?.uri ? (
                isImage(dlDoc.mimeType) ? (
                  <ScrollView style={previewStyles.scroll} contentContainerStyle={previewStyles.content}>
                    <Image source={{ uri: dlDoc.uri }} style={previewStyles.imageTall} />
                  </ScrollView>
                ) : (
                  <Text style={previewStyles.fileName}>{dlDoc.name ?? "Selected document"}</Text>
                )
              ) : (
                <Text style={previewStyles.placeholder}>No file selected</Text>
              )}
            </View>
          </View>

          <View style={[loginStyle.group, { gap: 8 }]}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text style={[loginStyle.p, { color: "#111" }]}>Permanent License</Text>
              <Switch value={dlForever} onValueChange={setDlForever} />
            </View>

            {!dlForever && (
              <TextInput
                value={dlExpire}
                onChangeText={setDlExpire}
                placeholder="License Expiry Date (DD/MM/YYYY)"
                style={loginStyle.input}
              />
            )}
          </View>

          <Pressable onPress={finish} style={{ marginTop: 10 }}>
            {({ pressed }) => (
              <LinearGradient
                colors={[pressed ? "#1f9a6f" : "#1abc9c", pressed ? "#51d0b1" : "#4cd8c1"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={loginStyle.btnGrad}
              >
                <Text style={[loginStyle.pBox, { color: "#fff" }]}>Apply and Start</Text>
              </LinearGradient>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

