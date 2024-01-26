import React, { useEffect} from 'react';
import { View, Text, Image, Animated, Easing } from 'react-native';
import WaitPageStyles from './styles/WaitPageStyles.js'

  const WaitPage = ({ route, navigation }) => {
    const { orderId } = route.params; 
    const rotateValue = new Animated.Value(0);
    useEffect(() => {

      const rotationAnimation = Animated.timing(rotateValue, {
        toValue: 1,
        duration: 2000, // Czas trwania animacji w milisekundach
        easing: Easing.linear,
        useNativeDriver: false, // Ustawienie na true, jeśli jest to możliwe (dla lepszej wydajności)
      });
  
      Animated.loop(rotationAnimation).start();
      
        const intervalId = setInterval(() => {
          checkStatus();
        }, 5000);
        return () => clearInterval(intervalId);
    }, []); 

    const rotate = rotateValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    
const checkStatus =() => {
    fetch(`http://localhost:5111/api/Order/${orderId}`, {
      method: 'GET',
      headers: {
        'accept': 'text/plain',
      },
    }).then(response => {
      if (!response.ok) {
        throw new Error('Błąd logowania pobierania Orderu');
      }
      return response.json();
    })
    .then(data => {
      if (data.orderStatus===2) {
        navigation.navigate('Login');
      } else {
        console.error('Nie ma dalej żarcia' );
      }
    });

    const rotate = rotateValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    
};

  return (
    <View style={WaitPageStyles.container}>
      <Animated.Image
        source={require('./photo/wait.gif')}
        style={[WaitPageStyles.image, { transform: [{ rotate }] }]}
      />
      <Text style={WaitPageStyles.orderConfirmation}>
        Dziękujemy za złożenie zamówienia. Zamówienie jest w trakcie przygotowywania.
       
      </Text>
      <Text style={WaitPageStyles.orderConfirmation}git>
            Numer twojego zamówienia to {orderId}
      </Text>
    </View>
  );
};

export default WaitPage;
