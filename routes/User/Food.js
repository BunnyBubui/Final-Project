import { useState, useEffect, useCallback } from "react";
import {View,Text,Pressable,FlatList,RefreshControl,Alert} from "react-native";
import Index from "../Content/Index";
import { getBaseURL } from "../Login/BaseEndpoint";
import { Utensils } from "lucide-react-native";
import Back from "../Content/Back";
import { FoodStyle } from "./Style/FoodStyle";
const FOOD_TYPE = "อาหาร";

export default function UserFood({ navigation }) {
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadFoods = useCallback(async () => {
    try {
      setRefreshing(true);
      const res = await fetch(`${getBaseURL()}/api/all_market`);
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.confirm === false) {
        Alert.alert("Error", data?.error || "โหลดรายการอาหารไม่สำเร็จ");
        setProducts([]);
        return;
      }

      const rows = Array.isArray(data?.data) ? data.data : [];
      const foods = rows
        .filter((r) => r.item_type === FOOD_TYPE)
        .map((row) => ({
          id: String(row.id ?? row.market_id),
          name: row.item_name,
          type: row.item_type,
          price: Number(row.price),
          quantity: Number(row.quantity ?? 0),
          createdAt: row.create_at,
        }));

      setProducts(foods);
    } catch (e) {
      console.log("all_market(food) error:", e);
      Alert.alert("Network", "เครือข่ายมีปัญหา กรุณาลองใหม่");
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadFoods();
  }, [loadFoods]);

  const handleBuy = (item) => {
    if ((item.quantity ?? 0) <= 0) {
      Alert.alert("หมดสต็อก", "อาหารรายการนี้หมดแล้วน้า");
      return;
    }
    Alert.alert(
      "ยืนยันการสั่งซื้อ",
      `สั่งซื้อ ${item.name} ราคา ${item.price} THB ใช่ไหมคะ?`,
      [
        { text: "ยกเลิก" },
        {
          text: "ซื้อเลย",
          onPress: async () => {
            try {
              const res = await fetch(`${getBaseURL()}/api/update_market/${item.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  item_name: item.name,
                  item_type: item.type,  
                  price: Number(item.price),
                  quantity: Number(item.quantity) - 1,
                }),
              });
              const data = await res.json().catch(() => ({}));
              if (!res.ok || data?.confirm === false) {
                Alert.alert("Error", data?.error || "สั่งซื้อไม่สำเร็จ");
                return;
              }
              await loadFoods();
              Alert.alert("สำเร็จ", "สั่งซื้อเรียบร้อยแล้ว 🥡");
            } catch (e) {
              console.log("buy(food) error:", e);
              Alert.alert("Network", "เครือข่ายมีปัญหา กรุณาลองใหม่");
            }
          },
        },
      ]
    );
  };

  return (
    <Index navigation={navigation}>
        <Back navigation={navigation}/>
      <FlatList
        data={products}
        style={{ marginBottom: 75 }}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadFoods} />}
        ListEmptyComponent={
          <View style={{ padding: 20, alignItems: "center" }}>
            <Text style={{ color: "#333" }}>ยังไม่มีรายการอาหารในตอนนี้</Text>
          </View>
        }
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => (
          <View style={FoodStyle.row}>
            <Utensils size={40} color="#ff7a00" style={{ marginRight: 12 }} />
            <View style={{ flex: 1 }}>
              <Text style={FoodStyle.name}>{item.name}</Text>
              <Text style={FoodStyle.meta}>
                {item.type} · {item.price} THB · x{item.quantity}
              </Text>
              <Pressable
                style={[FoodStyle.buyBtn, (item.quantity ?? 0) <= 0 && { backgroundColor: "#aaa" }]}
                onPress={() => handleBuy(item)}
                disabled={(item.quantity ?? 0) <= 0}
              >
                <Text style={FoodStyle.buyText}>
                  {(item.quantity ?? 0) <= 0 ? "หมดสต็อก" : "สั่งเลย"}
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </Index>
  );
}