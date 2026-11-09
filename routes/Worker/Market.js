import { authFetch } from "../Login/authFetch";
import { useState, useEffect, useCallback } from "react";
import {View,Text,TextInput,Pressable,FlatList,RefreshControl} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Picker } from "@react-native-picker/picker";
import Index from "../Content/Index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getBaseURL } from "../Login/BaseEndpoint";
import { Pen, Shirt, Footprints, HandFist, Plug, ShoppingBag } from "lucide-react-native";
import Back from "../Content/Back";
import { MarketStyle } from "./Style/MarketStyle";

export default function WorkerMarket({ navigation }) {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [products, setProducts] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [quantity, setQuantity] = useState("");

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

    const loadHistory = useCallback(async () => {
        if (!profile?.username) return;
        try {
            setRefreshing(true);
            const url = `${getBaseURL()}/api/read_market?username=${encodeURIComponent(
                profile.username
            )}`;
            const res = await authFetch(url);
            const data = await res.json().catch(() => ({}));

            if (!res.ok || data?.confirm === false) {
                setErr(data?.error || "โหลดประวัติไม่สำเร็จ");
                setProducts([]);
            } else {
                const rows = Array.isArray(data?.data) ? data.data : [];
                const mapped = rows.map((row) => ({
                    id: String(
                        row.id ??
                        row.market_id ??
                        row.ID ??
                        `${row.username}-${row.item_name}-${row.create_at}`
                    ),
                    name: row.item_name,
                    type: row.item_type,
                    price: Number(row.price),
                    quantity: Number(row.quantity ?? 0),
                    image: row.item_type === "เครื่องเขียน"? <Pen size={40} style={{padding: 10}}/> :
                    row.item_type === "เสื้อผ้า"? <Shirt size={40} style={{padding: 10}}/> :
                    row.item_type === "รองเท้า"? <Footprints size={40} style={{padding: 10}}/> :
                    row.item_type === "ของทำมือ"? <HandFist size={40} style={{padding: 10}}/> :
                    row.item_type === "อุปกรณ์อิเล็กทรอนิกส์"? <Plug size={40} style={{padding: 10}}/> :
                    <ShoppingBag size={40} style={{padding: 10}}/>
                    ,
                    createdAt: row.create_at,
                }));
                setProducts(mapped);
            }
        } catch (e) {
            console.log("history error:", e);
            setErr("เครือข่ายมีปัญหา ระหว่างโหลดประวัติ");
            setProducts([]);
        } finally {
            setRefreshing(false);
        }
    }, [profile]);

    useEffect(() => {
        if (profile?.username) loadHistory();
    }, [profile, loadHistory]);

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
        if (!quantity.trim() || isNaN(Number(quantity))) {
            setErr("กรุณากรอกจำนวนเป็นตัวเลข");
            return;
        }
        if (Number(quantity) < 0) {
            setErr("จำนวนต้องมากกว่าหรือเท่ากับ 0");
            return;
        }

        const body = {
            username: profile.username,
            item_name: name.trim(),
            item_type: type.trim(),
            price: Number(price),
            quantity: Number(quantity), 
        };

        setLoading(true);
        try {
            const res = await authFetch(`${getBaseURL()}/api/add_market`, {
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

            await loadHistory();

            setName("");
            setPrice("");
            setType("");
            setQuantity("");
        } catch (error) {
            setErr("เครือข่ายอาจมีปัญหา กรุณาลองใหม่อีกครั้ง");
            console.log("add_market error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await authFetch(`${getBaseURL()}/api/delete_market/${id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (!res.ok || data.confirm === false) {
                setErr(data?.error || "ลบไม่สำเร็จ");
                return;
            }
            await loadHistory();
        } catch (e) {
            setErr("เครือข่ายมีปัญหา ลบไม่สำเร็จ");
        }
    };

    const handleEdit = (item) => {
        setName(item.name);
        setPrice(String(item.price));
        setType(item.type);
        setQuantity(String(item.quantity ?? 0)); 
        setEditingId(item.id);
    };

    const saveUpdate = async () => {
        if (!editingId) return;
        try {
            const res = await authFetch(`${getBaseURL()}/api/update_market/${editingId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    item_name: name,
                    item_type: type,
                    price: Number(price),
                    quantity: Number(quantity), 
                }),
            });
            const data = await res.json();
            if (!res.ok || data.confirm === false) {
                setErr(data?.error || "อัปเดตไม่สำเร็จ");
                return;
            }
            await loadHistory();
            setEditingId(null);
            setName("");
            setPrice("");
            setType("");
        } catch (e) {
            setErr("เครือข่ายมีปัญหา แก้ไขไม่สำเร็จ");
        }
    };

    return (
        <Index navigation={navigation}>
            <Back navigation={navigation}/>
            <View style={MarketStyle.card}>
                {!!err && <Text style={{ color: "#b00020", marginBottom: 8 }}>{err}</Text>}

                <Text style={MarketStyle.label}>หมวดหมู่</Text>
                <View style={MarketStyle.pickerWrap}>
                    <Picker selectedValue={type} onValueChange={(val) => setType(val)}>
                        <Picker.Item label="-- เลือกหมวดหมู่ --" value="" />
                        <Picker.Item label="เครื่องเขียน" value="เครื่องเขียน" />
                        <Picker.Item label="เสื้อผ้า" value="เสื้อผ้า" />
                        <Picker.Item label="รองเท้า" value="รองเท้า" />
                        <Picker.Item label="ของทำมือ" value="ของทำมือ" />
                        <Picker.Item label="อุปกรณ์อิเล็กทรอนิกส์" value="อุปกรณ์อิเล็กทรอนิกส์"/>
                        <Picker.Item label="อื่นๆ" value="อื่นๆ" />
                    </Picker>
                </View>

                <Text style={MarketStyle.label}>ชื่อสินค้า</Text>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="ชื่อสินค้า"
                    style={MarketStyle.input}
                />

                <Text style={MarketStyle.label}>ราคา</Text>
                <TextInput
                    value={price}
                    onChangeText={(t) => setPrice(t.replace(/[^\d.]/g, ""))}
                    placeholder="ราคา"
                    keyboardType="numeric"
                    style={MarketStyle.input}
                />

                <Text style={MarketStyle.label}>จำนวน</Text>
                <TextInput
                    value={quantity}
                    onChangeText={(t) => setQuantity(t.replace(/[^\d]/g, ""))}
                    placeholder="จำนวน"
                    keyboardType="numeric"
                    style={MarketStyle.input}
                />

                <Pressable onPress={editingId ? saveUpdate : handleAdd} disabled={loading}>
                    {({ pressed }) => (
                        <LinearGradient
                            colors={
                                pressed || loading ? ["#f3a66f", "#fde386"] : ["#f19a5c", "#f9db6f"]
                            }
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={[MarketStyle.btnGrad, loading && { opacity: 0.7 }]}
                        >
                            <Text style={MarketStyle.btnText}>
                                {loading ? "PROCESSING..." : editingId ? "UPDATE" : "ADD"}
                            </Text>
                        </LinearGradient>
                    )}
                </Pressable>
            </View>

            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                style={{marginBottom: 75}}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={loadHistory} />
                }
                ListEmptyComponent={
                    <View style={{ padding: 20, alignItems: "center" }}>
                        <Text style={{ color: "#333" }}>ยังไม่มีรายการสำหรับผู้ใช้คนนี้</Text>
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
                            {item.createdAt ? (
                                <Text style={MarketStyle.productMeta}>
                                    {new Date(item.createdAt).toLocaleString()}
                                </Text>
                            ) : null}

                            <View style={{ flexDirection: "row", marginTop: 8 }}>
                                <Pressable
                                    onPress={() => handleEdit(item)}
                                    style={[MarketStyle.smallBtn, { backgroundColor: "#4CAF50" }]}
                                >
                                    <Text style={MarketStyle.smallBtnText}>EDIT</Text>
                                </Pressable>
                                <Pressable
                                    onPress={() => handleDelete(item.id)}
                                    style={[MarketStyle.smallBtn, { backgroundColor: "#E53935" }]}
                                >
                                    <Text style={MarketStyle.smallBtnText}>DELETE</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                )}
            />
        </Index>
    );
}
