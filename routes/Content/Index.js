import { IndexStyle } from "./Style/IndexStyle";
import { View, SafeAreaView } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import Footer from "./Footer";
const Index = ({ children, navigation, indexStyle = true }) => {
    return (
        <SafeAreaView style={IndexStyle.root}>
            <LinearGradient
                colors={["#4863a1ff", "#bd7ae1ff"]}
                start={{ x: 0, y: 1 }} 
                end={{ x: 0, y: 0 }}  
                style={IndexStyle.root}
            >
                <View style={indexStyle && IndexStyle.container}>
                    {children}
                </View>
            </LinearGradient>
            <Footer navigation={navigation} />
        </SafeAreaView>
    )
}

export default Index;