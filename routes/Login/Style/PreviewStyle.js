import { StyleSheet } from "react-native";
const previewStyles = StyleSheet.create({
  box: {
    marginTop: 8,
    height: 180,             
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    backgroundColor: "#F9FAFB",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  scroll: {
    width: "100%",
    height: "100%",
  },
  content: {
    alignItems: "center",
    padding: 8,
  },
  imageTall: {
    width: "100%",
    height: 480,
    resizeMode: "contain",
  },
  placeholder: {
    color: "#9CA3AF",
    fontSize: 14,
  },
  fileName: {
    color: "#111",
    fontSize: 14,
    padding: 12,
    textAlign: "center",
  },
});

export {previewStyles}