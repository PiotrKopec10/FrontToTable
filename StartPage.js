import React, { useState } from 'react';
import { View, Text, Button, Image } from 'react-native';  // Dodaj import Text
import LoginPageStyle from './styles/LoginPageStyles';
import  {getTableNr,getRestaurantId,handleLogin} from './LoginPage';
const StartPage = ({navigation }) => {
  const [error, setError] = useState(null);
  const restaurantId= getRestaurantId();
  const tableNr = getTableNr();
  const handleStart = async () => {
    
    console.log();
     console.log();
    try {
      
      const orderData = {
        order: {
          orderId: 0,
          orderTime: "2024-01-21T20:39:47.930Z",
          orderStatus: 0,
          orderComment: "",
          paymentMethod: "",
          waiterId: 0,
          tableId: tableNr,
          restaurantId: restaurantId
        }
    };

    const response = await fetch('http://localhost:5111/api/Order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (response.ok) {
      const orderData = await response.json();
      const orderId = orderData.orderId;

      console.log('Zamówienie rozpoczęte pomyślnie, ID zamówienia:', orderId);

      navigation.navigate('Menu', { orderId: orderId });
    } else {
      const errorMessage = await response.text();
      setError(errorMessage);

      console.error('Błąd podczas rozpoczynania zamówienia:', errorMessage);

      alert('Błąd podczas rozpoczynania zamówienia. Spróbuj ponownie.');
    }
  } catch (error) {
    setError(error.message);

    console.error('Błąd wykonania żądania:', error.message);

    alert('Wystąpił błąd. Spróbuj ponownie.');
  }
};
  
  
  return (
    <View style={LoginPageStyle.container}>
      <Image source={require('./photo/logo.png')} style={LoginPageStyle.logo} />
      <Button
        title="Rozpocznij zamówienie"
        color="#705537"
        onPress={handleStart}
      />

      {error && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ color: 'red' }}>{error}</Text>
        </View>
      )}
    </View>
  );
};

export default StartPage;

