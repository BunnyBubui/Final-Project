import { loginStyle } from "./Style/Login Style";
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from "react";
function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const onLogin = () => {
    if (!username.trim() || !password.trim()) {
      setErr('กรุณากรอก username และ password');
      return;
    }
    setErr('');
    navigation.replace('Login');
  };

  return (
    <View style={loginStyle.root}>
      <View style={loginStyle.card}>
        <Text style={loginStyle.title}>เข้าสู่ระบบ</Text>

        <View style={loginStyle.group}>
          <TextInput value={username} onChangeText={setUsername} placeholder="Username" autoCapitalize="none" style={loginStyle.input} />
        </View>

        <View style={loginStyle.group}>
          <TextInput value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry style={loginStyle.input} />
        </View>

        {!!err && <Text style={loginStyle.err}>{err}</Text>}

        <TouchableOpacity style={loginStyle.btn} onPress={onLogin}>
          <Text style={loginStyle.btnText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Login;