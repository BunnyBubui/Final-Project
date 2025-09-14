import { View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { loginStyle } from "./Style/Login Style";
import { UserRound, Bike } from "lucide-react-native";

export default function Select({ navigation }) {
  const go = (role) => {
    navigation.navigate("Sign", { role }); 
  };

  return (
    <LinearGradient colors={["#4863a1", "#bd7ae1"]} start={{x:0,y:1}} end={{x:0,y:0}} style={loginStyle.bg}>
      <View style={loginStyle.container}>
        <Text style={loginStyle.h1}>Create new Account</Text>
        <Pressable style={({pressed}) => [{opacity: pressed? 0.6 : 1}]} onPress={() => navigation.navigate("Login")}>
          <Text style={[loginStyle.p, {textDecorationLine: "underline"}]}>Already Registered? Log in here.</Text>
        </Pressable>

        <View style={[loginStyle.card, { alignItems: "center" }]}>
          <View style={loginStyle.cardBox}>
            <Pressable onPress={() => go("customer")} style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1, marginBottom: 10 }]}>
              <LinearGradient colors={["#f19a5c", "#ffe585"]} start={{x:0,y:0}} end={{x:1,y:0}} style={loginStyle.box}>
                <UserRound size={125} fill="white" strokeWidth={0} />
                <Text style={loginStyle.boxTitle}>Customer</Text>
              </LinearGradient>
            </Pressable>

            <Pressable onPress={() => go("worker")} style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}>
              <LinearGradient colors={["#ff3131", "#ff914d"]} start={{x:0,y:0}} end={{x:1,y:0}} style={loginStyle.box}>
                <Bike size={125} strokeWidth={2} stroke="white" />
                <Text style={loginStyle.boxTitle}>Worker</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}
