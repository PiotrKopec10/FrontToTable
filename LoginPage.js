import React, { useState } from 'react';
import { View, Text, Button, Image, TextInput } from 'react-native';
import LoginPageStyle from './styles/LoginPageStyles'; 


const LoginPage = ({ navigation }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [tablenr, setTableNr] = useState('');
  const [restaurantnr, setRestaurantNr] = useState('');

 

  const handleLogin = () => {   
    setRestaurantNr(4)
    console.log('Login:', login);
    console.log('Password:', password);
    console.log('Table:', tablenr);
<<<<<<< Updated upstream
    navigation.navigate('Start',{tableNr : tablenr});
=======
    console.log('Restaurant:', restaurantnr);

    if (login === 'lui' && password === 'lui') {
      navigation.navigate('AdminPage');
    }else if(login ==='waiter'&& password === 'waiter')
    {
      navigation.navigate('WaiterPage')
    } 
    else {
      navigation.navigate('Start', { tableNr: tablenr ,RestaurantNr: restaurantnr});
    }
>>>>>>> Stashed changes
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
      <TextInput
        style={LoginPageStyle.input}
        placeholder="Numer stolika"
        onChangeText={(text) => setTableNr(text)}
        value={tablenr}
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
