import { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, FlatList, Image, StyleSheet, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Picker } from "@react-native-picker/picker";
import Index from "../Content/Index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getBaseURL } from "../Login/BaseEndpoint";

export default function UserMarket({ navigation }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([
    { id: "1", name: "ปากกาน้ำเงิน", type: "เครื่องเขียน", price: 25, image: "https://cdn-icons-png.flaticon.com/512/29/29302.png" },
    { id: "2", name: "สมุดไม่มีเส้น", type: "เครื่องเขียน", price: 25, image: "https://cdn-icons-png.flaticon.com/512/29/29302.png" },
  ]);

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const storage = await AsyncStorage.getItem("profile");
        if (storage) setProfile(JSON.parse(storage));
      } catch (e) {
        console.log("Isn't get item.", e);
      }
    };
    loadProfile();
  }, []);

  const handleAdd = async () => {
    setErr("");

    if (!profile?.username) {
      setErr("ไม่พบข้อมูลผู้ใช้ กรุณาเข้าสู่ระบบใหม่");
      return;
    }
    if (!type.trim()) {
      setErr("กรุณาเลือกหมวดหมู่");
      return;
    }
    if (!name.trim()) {
      setErr("กรุณากรอกชื่อสินค้า");
      return;
    }
    if (!price.trim() || isNaN(Number(price))) {
      setErr("กรุณากรอกราคาเป็นตัวเลข");
      return;
    }

    const body = {
      username: profile.username,
      item_name: name.trim(),
      item_type: type.trim(),
      price: Number(price),
    };

    setLoading(true);
    try {
      const res = await fetch(`${getBaseURL()}/api/market`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || data.confirm === false) {
        setErr(data?.error || "บันทึกไม่สำเร็จ กรุณาลองใหม่");
        setLoading(false);
        return;
      }

      // ✅ อัปเดตรายการในแอป (optimistic)
      const newProduct = {
        id: Date.now().toString(),
        name: body.item_name,
        type: body.item_type,
        price: body.price,
        image: "https://cdn-icons-png.flaticon.com/512/29/29302.png",
      };
      setProducts((prev) => [...prev, newProduct]);

      // ✅ reset form
      setName("");
      setPrice("");
      setType("");

      setLoading(false);
    } catch (error) {
      setErr("เครือข่ายอาจมีปัญหา กรุณาลองใหม่อีกครั้ง");
      console.log("add_market error:", error);
      setLoading(false);
    }
  };

  return (
    <Index navigation={navigation}>
      <View style={styles.card}>
        {!!err && <Text style={{ color: "#b00020", marginBottom: 8 }}>{err}</Text>}

        {/* หมวดหมู่สินค้า */}
        <Text style={styles.label}>หมวดหมู่</Text>
        <View style={styles.pickerWrap}>
          <Picker selectedValue={type} onValueChange={(val) => setType(val)}>
            <Picker.Item label="-- เลือกหมวดหมู่ --" value="" />
            <Picker.Item label="เครื่องเขียน" value="เครื่องเขียน" />
            <Picker.Item label="อาหาร" value="อาหาร" />
            <Picker.Item label="เสื้อผ้า" value="เสื้อผ้า" />
            <Picker.Item label="อุปกรณ์อิเล็กทรอนิกส์" value="อุปกรณ์อิเล็กทรอนิกส์" />
          </Picker>
        </View>

        {/* ชื่อสินค้า */}
        <Text style={styles.label}>ชื่อสินค้า</Text>
        <TextInput value={name} onChangeText={setName} placeholder="ชื่อสินค้า" style={styles.input} />

        {/* ราคา */}
        <Text style={styles.label}>ราคา</Text>
        <TextInput
          value={price}
          onChangeText={(t) => setPrice(t.replace(/[^\d.]/g, ""))}
          placeholder="ราคา"
          keyboardType="numeric"
          style={styles.input}
        />

        {/* ปุ่ม ADD */}
        <Pressable onPress={handleAdd} disabled={loading}>
          {({ pressed }) => (
            <LinearGradient
              colors={pressed || loading ? ["#f3a66f", "#fde386"] : ["#f19a5c", "#f9db6f"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.btnGrad, loading && { opacity: 0.7 }]}
            >
              <Text style={styles.btnText}>{loading ? "ADDING..." : "ADD"}</Text>
            </LinearGradient>
          )}
        </Pressable>
      </View>

      {/* แสดงสินค้า */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => (
          <View style={styles.productBox}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={{ flex: 1 }}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>
                {item.type} · {item.price} THB
              </Text>
            </View>
          </View>
        )}
      />
    </Index>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 6,
    marginBottom: 2,
    color: "#000",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    backgroundColor: "#f9f9f9",
  },
  pickerWrap: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 8,
    overflow: "hidden",
    backgroundColor: "#f9f9f9",
  },
  btnGrad: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  btnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  productBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 12,
    resizeMode: "contain",
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  productPrice: {
    fontSize: 14,
    color: "#444",
  },
});
