import { Text, Pressable, ScrollView } from "react-native";
import Index from "./Index";
import { SettingStyle } from "./Style/Setting";
import { User, Grid, FileText, MessageCircle, LogOut } from "lucide-react-native";
import { Logout } from "./Logout";

const Setting = ({ navigation }) => {
  const menus = [
    { label: "Profile", icon: <User color="#000" size={30} />, nav: "Profile" },
    { label: "App", icon: <Grid color="#000" size={30} />, nav: "" },
    { label: "Report", icon: <FileText color="#000" size={30} />, nav: "" },
    { label: "Contact us", icon: <MessageCircle color="#000" size={30} />, nav: "" },
  ];

  

  return (
    <Index navigation={navigation}>
      <ScrollView contentContainerStyle={SettingStyle.page}>
        <Text style={SettingStyle.title}>SETTING</Text>

        {menus.map((m, i) => (
          <Pressable
            key={i}
            style={({ pressed }) => [SettingStyle.menuBtn, { opacity: pressed ? 0.7 : 1 }]}
            onPress={() => navigation.replace(m.nav)}
          >
            <Text style={SettingStyle.menuText}>{m.label}</Text>
            {m.icon}
          </Pressable>
        ))}

        <Pressable
          style={({ pressed }) => [SettingStyle.menuBtn, { opacity: pressed ? 0.7 : 1 }]}
          onPress={() => Logout(navigation)}
        >
          <Text style={[SettingStyle.menuText, { fontWeight: "700" }]}>LOG-OUT</Text>
          <LogOut color="#000" size={30} />
        </Pressable>
      </ScrollView>
    </Index>
  );
};

export default Setting;
