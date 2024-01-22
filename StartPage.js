import React, { useState } from 'react';
import { View, Text, Button, Image } from 'react-native';  // Dodaj import Text
import LoginPageStyle from './styles/LoginPageStyles';

const StartPage = ({ route, navigation }) => {
  const { tableNr, restaurantnr } = route.params;
  const [error, setError] = useState(null);
  console.log('Received params:', route.params);
  const tableNumber = parseInt(tableNr, 10);
  const restaurantId = parseInt(restaurantnr, 10);

  const handleStart = async () => {
    try {
      const response = await fetch('http://localhost:5111/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            orderId: 0,
            orderTime: "2024-01-21T20:39:47.930Z",
            orderStatus: 0,
            orderComment: "",
            paymentMethod: "somePaymentMethodValue", // Dodaj wartość dla PaymentMethod
            waiterId: null,
            tableId: tableNumber,
            restaurantId: 4
        }),
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

