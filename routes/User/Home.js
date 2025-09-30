import Index from "../Content/Index"
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Car, Users, Utensils, Package } from "lucide-react-native";

const ORANGE = "#ff7a00";

export default function UserHome({ navigation }) {
    return (
        <Index navigation={navigation}>
            <View style={styles.headerPill}>
                <Text style={styles.headerText}>WORKER</Text>
            </View>

            <View style={styles.grid}>
                <MenuItem
                    icon={<Users size={64} color={ORANGE} />}
                    line1="BUN"
                    line2="MARKET"
                    onPress={() => navigation.navigate("BunMarket")}
                />
                <MenuItem
                    icon={<Utensils size={64} color={ORANGE} />}
                    line1="BUN"
                    line2="FOOD"
                    onPress={() => navigation.navigate("BunFood")}
                />
            </View>
        </Index>
    );
}

function MenuItem({ icon, line1, line2, onPress }) {
    return (
        <View style={styles.itemWrap}>
            <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={styles.tile}>
                {icon}
            </TouchableOpacity>
            <Text style={styles.captionTop}>{line1}</Text>
            <Text style={styles.captionBottom}>{line2}</Text>
        </View>
    );
}

const { width } = Dimensions.get("window");
const TILE = Math.min(140, (width - 88) / 2);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 28,
        justifyContent: "space-between",
        paddingBottom: 28,
    },
    headerPill: {
        alignSelf: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 28,
        paddingVertical: 10,
        borderRadius: 24,
        marginTop: 6,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "700",
        letterSpacing: 1,
        color: "#111",
        fon
    },
    grid: {
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        flexWrap: "wrap",
        margin: 20,
        gap: 20,
        width: "100%"
    },
    itemWrap: {
        width: TILE,
        alignItems: "center",
    },
    tile: {
        width: TILE,
        height: TILE,
        backgroundColor: "#fff",
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.18,
        shadowRadius: 10,
        elevation: 5,
    },
    captionTop: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: "800",
        color: "#fff",
        letterSpacing: 0.4,
    },
    captionBottom: {
        fontSize: 14,
        fontWeight: "800",
        color: "#fff",
        letterSpacing: 0.4,
    },
    bottomPill: {
        alignSelf: "center",
        width: "78%",
        backgroundColor: "#fff",
        height: 48,
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
});
