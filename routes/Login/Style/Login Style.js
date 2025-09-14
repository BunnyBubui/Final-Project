import { StyleSheet } from "react-native";

export const loginStyle = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },

  h1: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    marginBottom: 10,
  },
  p: {
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
    marginBottom: 26,
  },

  card: {
    width: "92%",
    maxWidth: 560,
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 18,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 6,
  },

  group: { marginBottom: 12 },

  input: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  btnBase: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 15,
    textAlign: "center",
  },

  btnGrad: {
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },

  error: {
    marginTop: 4,
    marginBottom: 8,
    color: "#DC2626",
    fontSize: 13,
    textAlign: "center",
  },

  box: { 
    width: 200, 
    height: 200, 
    borderRadius: 16, 
    justifyContent: "center", 
    alignItems: "center", 
  }, 
  
  boxTitle: { 
    fontSize: 32, 
    textAlign: "center", 
    fontWeight: "bold", 
    color: "white" 
  },

  pBox: { 
    fontSize: 16, 
    textAlign: "center", 
    fontWeight: "bold",
    color: "#949494" },
});
