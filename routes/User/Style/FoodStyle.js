import { StyleSheet } from "react-native";
const FoodStyle = StyleSheet.create({
  row: {
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
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
  meta: {
    fontSize: 14,
    color: "#444",
    marginVertical: 6,
  },
  buyBtn: {
    backgroundColor: "#ff7a00",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  buyText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
});

export {FoodStyle}