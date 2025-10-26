import { useState, useEffect, useCallback } from "react";
import {View,Text,FlatList,Pressable,RefreshControl,Alert} from "react-native";
import Index from "../Content/Index";
import { getBaseURL } from "../Login/BaseEndpoint";
import { Pen, Shirt, Footprints, HandFist, Plug, ShoppingBag } from "lucide-react-native";
import Back from "../Content/Back";
import { MarketStyle } from "./Style/MarketStyle";

export default function UserMarket({ navigation }) {
    const [products, setProducts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const loadProducts = useCallback(async () => {
        try {
            setRefreshing(true);
            const res = await fetch(`${getBaseURL()}/api/all_market`);
            const data = await res.json().catch(() => ({}));

            if (!res.ok || data?.confirm === false) {
                Alert.alert("Error", data?.error || "โหลดสินค้าไม่สำเร็จ");
                setProducts([]);
            } else {
                const rows = Array.isArray(data?.data) ? data.data : [];
                const nonFoods = rows.filter((r) => r.item_type !== "อาหาร");
                const mapped = nonFoods.map((row) => ({
                    id: String(row.id ?? row.market_id),
                    name: row.item_name,
                    type: row.item_type,
                    price: Number(row.price),
                    quantity: Number(row.quantity ?? 0),
                    image:
                        row.item_type === "เครื่องเขียน" ? <Pen size={40} style={{ padding: 10 }} /> :
                            row.item_type === "เสื้อผ้า" ? <Shirt size={40} style={{ padding: 10 }} /> :
                                row.item_type === "รองเท้า" ? <Footprints size={40} style={{ padding: 10 }} /> :
                                    row.item_type === "ของทำมือ" ? <HandFist size={40} style={{ padding: 10 }} /> :
                                        row.item_type === "อุปกรณ์อิเล็กทรอนิกส์" ? <Plug size={40} style={{ padding: 10 }} /> :
                                            <ShoppingBag size={40} style={{ padding: 10 }} />,
                    createdAt: row.create_at,
                }));
                setProducts(mapped);
            }
        } catch (e) {
            console.log("all_market error:", e);
            Alert.alert("Network", "เครือข่ายมีปัญหา กรุณาลองใหม่");
        } finally {
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    const handleBuy = (item) => {
        if ((item.quantity ?? 0) <= 0) {
            Alert.alert("หมดสต็อก", "สินค้าหมดแล้วนะคะ");
            return;
        }
        Alert.alert(
            "ยืนยันการซื้อ",
            `คุณต้องการซื้อ ${item.name} ราคา ${item.price} THB ใช่ไหม?`,
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
                                Alert.alert("Error", data?.error || "ซื้อไม่สำเร็จ");
                                return;
                            }
                            await loadProducts();
                            Alert.alert("สำเร็จ", "ซื้อสินค้าเรียบร้อยแล้ว 🛒");
                        } catch (e) {
                            console.log("buy error:", e);
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
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadProducts} />}
                ListEmptyComponent={
                    <View style={{ padding: 20, alignItems: "center" }}>
                        <Text style={{ color: "#333" }}>ไม่มีสินค้าในตลาด</Text>
                    </View>
                }
                contentContainerStyle={{ padding: 12 }}
                renderItem={({ item }) => (
                    <View style={MarketStyle.productBox}>
                        {item.image}
                        <View style={{ flex: 1 }}>
                            <Text style={MarketStyle.productName}>{item.name}</Text>

                            <Text style={MarketStyle.productPrice}>
                                {item.type} · {item.price} THB · x{item.quantity}
                            </Text>

                            <Pressable
                                style={[
                                    MarketStyle.buyBtn,
                                    (item.quantity ?? 0) <= 0 && { backgroundColor: "#aaa" },
                                ]}
                                onPress={() => handleBuy(item)}
                                disabled={(item.quantity ?? 0) <= 0}
                            >
                                <Text style={MarketStyle.buyText}>
                                    {(item.quantity ?? 0) <= 0 ? "หมดสต็อก" : "ซื้อ"}
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                )}
            />
        </Index>
    );
}

