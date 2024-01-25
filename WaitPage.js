import React, { useState, useContext } from 'react';
import { View, Text, Button, Image, TextInput } from 'react-native';
import { RadioButton } from 'react-native-paper';
import LoginPageStyle from './styles/LoginPageStyles';
import wait from './photo/wait.gif';
import GifImage from '@lowkey/react-native-gif';

const WaitPage = ({ navigation }) => {
  const [tablenr, setTableNr] = useState('');
  const [restaurantId, setRestaurantId] = useState('');


const handleStart =() => {
    fetch(`http://localhost:5111/api/Table/restaurant/${restaurantId}`, {
      method: 'GET',
      headers: {
        'accept': 'text/plain',
      },
    }).then(response => {
      if (!response.ok) {
        throw new Error('Błąd logowania pobierania restaurantId');
      }
      return response.json();
    })
    .then(data => {
      const cos=parseInt(tablenr,10);
      const matchingTable = data.find(table => table.tabNum === cos);
      if (matchingTable) {
        postOrder(matchingTable.tabId, restaurantId,cos);
      } else {
        console.error('Nie ma takiego numeru stolika dla tej restauracji:', tablenr);
        setShowLoginForm(true);
      }

    });
};


    return (
        <View>
          <GifImage
            source={{
              uri:
                'https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif',
            }}
            style={{
              width: 100,
              height: 100,
            }}
            resizeMode={'cover'}
          />
          <Text className="order-confirmation">
            Dziękujemy za złożenie zamówienia. Zamówienie jest w trakcie przygotowywania.
          </Text>
        </View>
      );
}
export default WaitPage;
