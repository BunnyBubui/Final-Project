import { StyleSheet } from "react-native";

const SettingStyle = StyleSheet.create({
    page: {
        flexGrow: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 30,
        backgroundColor: "#fff",
        paddingVertical: 6,
        paddingHorizontal: 20,
        borderRadius: 20,
        overflow: "hidden",
    },
    menuBtn: {
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginBottom: 14,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        elevation: 4,
    },
    menuText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#000",
    },
});

export { SettingStyle };
