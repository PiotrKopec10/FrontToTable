import React from 'react';
import { View, Button, Image } from 'react-native';
import LoginPageStyle from './styles/LoginPageStyles'; 

const StartPage = ({ route, navigation }) => {
  const { orderItemId, tableNr } = route.params;

  const handleStart = () => {   
    navigation.navigate('Menu', { tableNr: tableNr });
    console.log('Table:', tableNr);
    
  };

  return (
    <View style={LoginPageStyle.container}>   
      <Image source={require('./photo/logo.png')} style={LoginPageStyle.logo} />
      <Button
        style={LoginPageStyle.button}
        title="Rozpocznij zamówienie"     
        color="#705537"       
        onPress={handleStart}
      />
    </View>
  );
};

export default StartPage;
