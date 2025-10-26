import { View, Pressable, Text } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { BackStyle } from "./Style/BackStyle";

const Back = ({ navigation }) => {
  return (
    <View style={BackStyle.container}>
      <Pressable
        style={({ pressed }) => [
          BackStyle.btn,
          pressed && { backgroundColor: "#ddd" },
        ]}
        onPress={() => navigation.goBack()}
      >
        <ArrowLeft size={20} color="#000" />
        <Text style={BackStyle.text}>ย้อนกลับ</Text>
      </Pressable>
    </View>
  );
};

export default Back;