import { StyleSheet } from "react-native";
const FooterStyle = StyleSheet.create({
    footer: {
        position: "absolute",
        flexDirection: "row",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        height: 75,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 4 },
        elevation: 20,
    },

    button: {
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        maxHeight: 75,
        width: "100%",
        maxWidth: 75,
        backgroundColor: "#fff",
        padding: 10,
        textAlign: "center",
    },
    buttonActive: {
        backgroundColor: "#E8F2FF",
    },
    btnText: {
        marginLeft: 6,
        fontSize: 14,
        fontWeight: "600",
        color: "#111",
    },
    btnTextActive: {
        color: "#0B64C0",
    },

});

export { FooterStyle };
