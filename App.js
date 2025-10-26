import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './routes/Login/Login';
import Setting from './routes/Content/Setting';
import Profile from './routes/Content/Profile';
import Sign from './routes/Login/Sign';
import Select from './routes/Login/Select';
import OTP from './routes/Login/OTP';
import UserHome from './routes/User/Home';
import UserFood from './routes/User/Food';
import UserMarket from './routes/User/Market';
import WorkerHome from './routes/Worker/Home';
import WorkerFood from './routes/Worker/Food';
import WorkerMarket from './routes/Worker/Market';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Select" component={Select} />
        <Stack.Screen name="Sign" component={Sign} />
        <Stack.Screen name="Otp" component={OTP} />
        <Stack.Screen name="UserHome" component={UserHome} />
        <Stack.Screen name="UserFood" component={UserFood} />
        <Stack.Screen name="UserMarket" component={UserMarket} />
        <Stack.Screen name="WorkerHome" component={WorkerHome} />
        <Stack.Screen name="WorkerFood" component={WorkerFood} />
        <Stack.Screen name="WorkerMarket" component={WorkerMarket} />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
