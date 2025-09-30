const { Platform } = require("react-native");

const getBaseURL = () => {
  //Dev ฝั่ง Web
  if (Platform.OS === "web") return "http://localhost:3000";
  
  //Dev ฝั่ง Mobile ใช้ WIFI Lan ในเครื่อง เมื่อรัน node server.js ใน Backend เรียบร้อยแล้ว
  return "http://192.168.56.1:3000";
};

export {getBaseURL}