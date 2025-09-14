import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Login from './routes/Login/Login';
import UserHome from './routes/User/Home';
import Setting from './routes/Content/Setting';
import Profile from './routes/Content/Profile';
import Sign from './routes/Login/Sign';
import Select from './routes/Login/Select';
import OTP from './routes/Login/OTP';
import KycUpload from './routes/Login/KYC';
import VehicleUpload from './routes/Login/Vehicle';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Select" component={Select} />
        <Stack.Screen name="Sign" component={Sign} />
        <Stack.Screen name="Otp" component={OTP} />
        <Stack.Screen name="KycUpload" component={KycUpload} />
        <Stack.Screen name="VehicleUpload" component={VehicleUpload} />
        <Stack.Screen name="UserHome" component={UserHome} />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
