const { Platform } = require("react-native");

const getBaseURL = () => {
  if (Platform.OS === "web") return "http://localhost:3000";
  return "http://0.0.0.0:3000";
};

export {getBaseURL}