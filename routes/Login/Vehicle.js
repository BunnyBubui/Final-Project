import { useState } from "react";
import { View, Text, TextInput, Pressable, Switch, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { loginStyle } from "./Style/Login Style";

export default function VehicleUpload({ navigation, route }) {
  const kyc = route?.params?.kyc ?? null;

  const [regNo, setRegNo] = useState("");   
  const [plate, setPlate] = useState("");  
  const [carPhotos, setCarPhotos] = useState([]); 
  const [dlDoc, setDlDoc] = useState(null);    
  const [dlExpire, setDlExpire] = useState(""); 
  const [dlForever, setDlForever] = useState(false);

  const pickCarPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") return;
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsMultipleSelection: true,
      selectionLimit: 5,
    });
    if (!res.canceled) {
      setCarPhotos((prev) => [...prev, ...res.assets.map(a => ({ uri: a.uri }))]);
    }
  };

  const pickDriverLicense = async () => {
    const res = await DocumentPicker.getDocumentAsync({
      type: ["image/*", "application/pdf"],
      multiple: false,
      copyToCacheDirectory: true,
    });
    if (res.canceled) return;
    setDlDoc(res.assets?.[0] ?? null);
  };

  const finish = () => {
    if (!plate.trim() || (!dlForever && !dlExpire.trim())) return;
    navigation.replace("UserHome", {
      vehicle: { regNo, plate, carPhotos, dlDoc, dlExpire: dlForever ? "PERMANENT" : dlExpire },
      kyc,
    });
  };

  return (
    <LinearGradient colors={["#4863a1", "#bd7ae1"]} start={{x:0,y:1}} end={{x:0,y:0}} style={loginStyle.bg}>
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
                  <Text style={[loginStyle.pBox, { color: "#fff" }]}>Upload Vehicle Photos</Text>
                </LinearGradient>
              )}
            </Pressable>
            {!!carPhotos?.length && (
              <Text style={[loginStyle.p, { color: "#111", marginTop: 6 }]}>
                {carPhotos.length} photo(s) selected
              </Text>
            )}
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
                  <Text style={[loginStyle.pBox, { color: "#fff" }]}>Upload Driving License (IMG/PDF)</Text>
                </LinearGradient>
              )}
            </Pressable>
            {dlDoc && (
              <Text style={[loginStyle.p, { color: "#111", marginTop: 6 }]}>
                Driving License: {dlDoc.name ?? "selected"}
              </Text>
            )}
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
                placeholder="License Expiry Date (01/11/2025)"
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
