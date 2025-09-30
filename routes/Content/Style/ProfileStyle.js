import { StyleSheet } from "react-native";
const ProfileStyle = StyleSheet.create({
    page: { 
        flex: 1, 
        backgroundColor: "#f2ecff", 
    },

    header: {
        height: 170,
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
        overflow: "hidden",
    },

    backBtn: { 
        position: "absolute", 
        top: 18, 
        left: 16, 
        padding: 6 },

    avatarWrap: {
        position: "absolute",
        top: 120,
        alignSelf: "center",
        width: 108,
        height: 108,
        borderRadius: 999,
        borderWidth: 4,
        borderColor: "#fff",
        backgroundColor: "#fff",
        elevation: 8,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
    },

    avatar: { 
        width: "100%", 
        height: "100%", 
        borderRadius: 999 },

    card: {
        backgroundColor: "#fff",
        borderRadius: 18,
        padding: 16,
        marginBottom: 16,
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        
    },

    label: { 
        color: "#555", 
        fontSize: 13, 
        marginBottom: 4 
    },

    labelBold: { 
        color: "#111", 
        fontSize: 13, 
        fontWeight: "700" 
    },

    name: { 
        color: "#111", 
        fontSize: 18, 
        fontWeight: "700", 
        marginBottom: 6 
    },

    value: { 
        color: "#111", 
        fontSize: 15 
    },

    status: { 
        letterSpacing: 1 
    },

    row: { 
        flexDirection: "row", 
        alignItems: "flex-start", 
        gap: 12 
    },

    historyRow: { 
        flexDirection: "row", 
        alignItems: "center" 
    },

    historyTitle: { 
        color: "#111", 
        fontSize: 14, 
        marginTop: 8 
    },

    historySub: { 
        color: "#666", 
        fontSize: 12, 
        marginTop: 2 
    },

    historyPrice: { 
        color: "#111", 
        fontSize: 14, 
        fontWeight: "700" 
    },

    historyDash: { 
        color: "#999", 
        marginTop: 2 
    },

    divider: {
        height: 1,
        backgroundColor: "#eee",
        marginVertical: 8,
    },

    bgBottom: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 160,
    },

});

export {ProfileStyle}