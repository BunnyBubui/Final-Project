import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const TILE = Math.min(140, (width - 88) / 2);

const HomeStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 28,
        justifyContent: "space-between",
        paddingBottom: 28,
        
    },
    headerPill: {
        width: "100%",
        textAlign: "center",
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
        textAlign: "center",
        fontSize: 24,
        fontWeight: "700",
        letterSpacing: 1,
        color: "#111",
        
    },
    grid: {
        width: "100%",
        justifyContent: "center",
        alignContent: "center",
        flexWrap: "wrap",
        padding: 20,
        gap: 20
    },
    itemWrap: {
        width: TILE,
        alignItems: "center",
    },
    tile: {
        width: 200,
        height: 200,
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
        fontSize: 18,
        fontWeight: "800",
        color: "#fff",
        letterSpacing: 0.4,
    },
    captionBottom: {
        fontSize: 18,
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

export {HomeStyle}