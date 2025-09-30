import { useEffect, useState } from "react";
import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ChevronLeft, User } from "lucide-react-native";
import Index from "./Index";
import { ProfileStyle } from "./Style/ProfileStyle";

export default function Profile({ navigation }) {
    const [profile, setProfile] = useState({})

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const storage = await AsyncStorage.getItem("profile");
                setProfile(JSON.parse(storage));
            } catch {
                console.log("Isn't get item.")
            }
        }

        loadProfile();
    }, []);

    return (
        <Index navigation={navigation} indexStyle={false}>
            <ScrollView contentContainerStyle={ProfileStyle.content}>
                <View style={ProfileStyle.page}>
                    <LinearGradient
                        colors={["#3b0075", "#7a3ac8"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={ProfileStyle.header}
                    >
                        <Pressable style={[ProfileStyle.backBtn, {paddingTop: 20}]} onPress={() => navigation.goBack()}>
                            <ChevronLeft color="#fff" size={28} />
                        </Pressable>
                    </LinearGradient>

                    <View style={[ProfileStyle.avatarWrap, { justifyContent: "center", alignItems: "center", zIndex: 1 }]}>
                        <User size={60} />
                    </View>

                    <View style={{ padding: 10 }}>
                        <View style={ProfileStyle.card}>

                            <Text style={ProfileStyle.label}>ชื่อผู้ใช้</Text>
                            <Text style={ProfileStyle.name}>{profile.username}</Text>

                            <View style={[ProfileStyle.row, { marginTop: 10 }]}>
                                <Text style={ProfileStyle.labelBold}>สถานะ{"\n"}</Text>
                                <Text style={[ProfileStyle.value, ProfileStyle.status]}>{profile.type}</Text>
                            </View>
                        </View>

                        <View style={ProfileStyle.card}>
                            <Text style={[ProfileStyle.labelBold, { marginBottom: 8 }]}>ประวัติการใช้งาน</Text>

                            <View style={ProfileStyle.divider} />

                            <Text style={ProfileStyle.historyTitle}>BUN MARKET</Text>
                            <Text style={ProfileStyle.historyDash}>—</Text>

                            <View style={ProfileStyle.divider} />

                            <Text style={ProfileStyle.historyTitle}>BUN FOOD</Text>
                            <Text style={ProfileStyle.historyDash}>—</Text>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </Index>
    )
}