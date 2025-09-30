import { View, Text, TextInput, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker"; // ต้องติดตั้งก่อน
import Index from "../Content/Index";

export default function WorkerMarket({ navigation }) {
  return (
    <Index navigation={navigation}>
      <View style={styles.card}>
        {/* ประเภท */}
        <Text style={styles.label}>ประเภท</Text>
        <Picker style={styles.picker}>
          <Picker.Item label="เครื่องเขียน" value="stationery" />
          <Picker.Item label="อาหาร" value="food" />
          <Picker.Item label="เสื้อผ้า" value="clothes" />
        </Picker>

        {/* ชื่อสินค้า */}
        <Text style={styles.label}>ชื่อสินค้า</Text>
        <TextInput placeholder="พิมพ์ชื่อสินค้า" style={styles.input} />

        {/* ราคา */}
        <Text style={styles.label}>ราคา</Text>
        <Picker style={styles.picker}>
          <Picker.Item label="0-50" value="0-50" />
          <Picker.Item label="50-100" value="50-100" />
          <Picker.Item label="100-200" value="100-200" />
        </Picker>

        {/* การส่ง */}
        <Text style={styles.label}>การส่ง</Text>
        <Picker style={styles.picker}>
          <Picker.Item label="มอเตอร์ไซค์" value="bike" />
          <Picker.Item label="รถยนต์" value="car" />
          <Picker.Item label="รับเอง" value="self" />
        </Picker>

        {/* การชำระเงิน */}
        <Text style={styles.label}>การชำระเงิน</Text>
        <Picker style={styles.picker}>
          <Picker.Item label="เงินสด" value="cash" />
          <Picker.Item label="โอน" value="transfer" />
          <Picker.Item label="พร้อมเพย์" value="promptpay" />
        </Picker>

        {/* สินค้า */}
        <Text style={styles.label}>สินค้า</Text>
        <View style={styles.productBox}>
          <Text style={{ color: "#666" }}>ยังไม่มีสินค้า</Text>
        </View>
      </View>
    </Index>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 20,
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    marginTop: 8,
    marginBottom: 4,
    color: "#000",
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  productBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
});
