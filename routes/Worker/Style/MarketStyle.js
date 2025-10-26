import { StyleSheet } from "react-native";
const MarketStyle = StyleSheet.create({
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
    productMeta: {
        marginTop: 4,
        fontSize: 12,
        color: "#666",
    },
    smallBtn: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
        marginRight: 8,
    },
    smallBtnText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600",
    },
});

export {MarketStyle};