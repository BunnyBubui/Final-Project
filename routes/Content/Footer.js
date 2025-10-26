import { View, Text, Pressable } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { FooterStyle } from './Style/FooterStyle';
import { House, CircleUserRound, Settings } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

const Footer = ({ navigation }) => {
  const [profile, setProfile] = useState({})
    useEffect(() => {
        const loadProfile = async () => {
            try {
                const storage = await AsyncStorage.getItem("profile");
                setProfile(JSON.parse(storage));
            } catch {
                console.log("Isn't get item.")
            }
        }

        loadProfile();
    }, []);

  const route = useRoute();
  const FooterButton = [
    { name: "Home", navigate: profile.type === "customer"? "UserHome" : "WorkerHome", icon: House },
    { name: "Profile", navigate: "Profile", icon: CircleUserRound },
    { name: "Setting", navigate: "Setting", icon: Settings }
  ];

  return (
    <View style={FooterStyle.footer}>
      {FooterButton.map((item) => {
        const isActive = route.name === item.navigate;
        const Icon = item.icon;

        return (
          <Pressable
            key={item.navigate}
            style={({ pressed }) => [
              FooterStyle.button,
              isActive && FooterStyle.buttonActive, 
              pressed && { opacity: 0.8 }
            ]}
            onPress={() => navigation.navigate(item.navigate)}
          >
            <Icon size={20} color={isActive ? "#0B64C0" : "#111"} />
            <Text
              style={[
                FooterStyle.btnText,
                isActive && FooterStyle.btnTextActive
              ]}
            >
              {item.name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default Footer;
