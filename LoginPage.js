import React, { useState } from 'react';
import { View, Text, Button, Image, TextInput } from 'react-native';
import LoginPageStyle from './styles/LoginPageStyles'; 

const LoginPage = ({ navigation }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {   
    console.log('Login:', login);
    console.log('Password:', password);
    navigation.navigate('Home');
  };

  return (
    <View style={LoginPageStyle.container}>   
      <Image source={require('./photo/logo.png')} style={LoginPageStyle.logo} />
      <TextInput
        style={LoginPageStyle.input}
        placeholder="Login"
        onChangeText={(text) => setLogin(text)}
        value={login}
       
        
      />
      <TextInput
        style={LoginPageStyle.input}
        placeholder="Hasło"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <Button
      style={LoginPageStyle.button}
        title="Zaloguj się"     
        color="#705537"       
        onPress={handleLogin}
      />
    </View>
  );
};

export default LoginPage;
