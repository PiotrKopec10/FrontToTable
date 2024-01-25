import React, { useEffect} from 'react';
import { View, Text } from 'react-native';
import WaitPageStyles from './styles/WaitPageStyles.js'

  const WaitPage = ({ route, navigation }) => {
    const { orderId } = route.params; 

    useEffect(() => {
        const intervalId = setInterval(() => {
          checkStatus();
        }, 5000);
        return () => clearInterval(intervalId);
    }, []); 

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
};




return (
    <View style={WaitPageStyles.container}>
      <GifImage
        source={{
          uri:
            'https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif',
        }}
        style={WaitPageStyles.gifImage}
        resizeMode={'cover'}
      />
      <Text style={WaitPageStyles.orderConfirmation}>
        Dziękujemy za złożenie zamówienia. Zamówienie jest w trakcie przygotowywania.
      </Text>
    </View>
  );
  }

export default WaitPage;
