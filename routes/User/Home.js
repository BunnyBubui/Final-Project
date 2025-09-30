import Index from "../Content/Index"
import { View, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { CaseUpper, Users, Utensils } from "lucide-react-native";
import { HomeStyle } from "./Style/HomeStyle";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ORANGE = "#ff7a00";

export default function UserHome({ navigation }) {
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
        <Index navigation={navigation}>
            <View style={HomeStyle.headerPill}>
                <Text style={HomeStyle.headerText}>{profile.type}</Text>
            </View>

            <View style={HomeStyle.grid}>
                <MenuItem
                    icon={<Users size={100} color={ORANGE} />}
                    line1="BUN"
                    line2="MARKET"
                    onPress={() => navigation.navigate("UserMarket")}
                />

                <MenuItem
                    icon={<Utensils size={100} color={ORANGE} />}
                    line1="BUN"
                    line2="FOOD"
                    onPress={() => navigation.navigate("UserFood")}
                />
            </View>
        </Index>
    );
}

function MenuItem({ icon, line1, line2, onPress }) {
    return (
        <View style={[HomeStyle.itemWrap]}>
            <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={HomeStyle.tile}>
                {icon}
            </TouchableOpacity>
            <Text style={HomeStyle.captionTop}>{line1}</Text>
            <Text style={HomeStyle.captionBottom}>{line2}</Text>
        </View>
    );
}