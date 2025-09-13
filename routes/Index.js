import { IndexStyle } from "./IndexStyle";
import { View, SafeAreaView } from 'react-native';
const Index = ({ children }) => {
    return (
        <SafeAreaView>
            <View style={IndexStyle.container}>
                {children}
            </View>
        </SafeAreaView>
    )
}

export default Index;