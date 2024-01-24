import React, { useState, useContext } from 'react';
import { View, Text, Button, Image, TextInput } from 'react-native';
import { RadioButton } from 'react-native-paper';
import LoginPageStyle from './styles/LoginPageStyles';

const LoginPage = ({ navigation }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [tablenr, setTableNr] = useState('');
  const [role, setRole] = useState('waiter');
  const [restaurantId, setRestaurantId] = useState('');


  const [showLoginForm, setShowLoginForm] = useState(true);
const [error, setError] = useState(null);


const handleLogin = () => {
  if (role === 'restaurant') {
    fetch(`http://localhost:5111/api/Restaurant/login/${login}/${password}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Błąd logowania jako restaurant');
        }
        return response.json();
      })
      .then(data => {
        console.log('Zalogowano jako restaurant. id restauracji::', data.restaurantId);
        console.log(data);
        setRestaurantId(data.restaurantId);
        setShowLoginForm(false);
      })
      .catch(error => {
        console.error(error);
        setError(error.message);
      });
  } else {
    fetch(`http://localhost:5111/api/Waiter/login/${login}/${password}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Błąd logowania jako waiter');
        }
        return response.json();
      })
      .then(data => {
      //  console.log('Zalogowano jako waiter. Dane:', data);

        if (data.isAdmin) {
          navigation.navigate('AdminPage', { waiterId: data.waiterId, restaurantId: data.restaurantId });        
        } else {
          navigation.navigate('WaiterPage', { waiterId: data.waiterId, restaurantId: data.restaurantId });
        }
      })
      .catch(error => {
        console.error(error);
        setError(error.message);
      });
  }
};



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
          paymentMethod: "", 
          waiterId: null,
          tableId: parseInt(tablenr,10),
          restaurantId: restaurantId
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
  {showLoginForm && (
    <>
      <Image source={require('./photo/logo.png')} style={LoginPageStyle.logo} />

      <View style={LoginPageStyle.radioButtonContainer}>
        <Text>Rola:</Text>
        <View>
          <RadioButton.Group onValueChange={(value) => setRole(value)} value={role}>
            <View style={LoginPageStyle.radioButtonRow}>
              <Text>Restaurant</Text>
              <RadioButton value="restaurant" />
            </View>
            <View style={LoginPageStyle.radioButtonRow}>
              <Text>Waiter</Text>
              <RadioButton value="waiter" />
            </View>
          </RadioButton.Group>
        </View>
      </View>

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

      {role === 'restaurant' && (
        <TextInput
          style={LoginPageStyle.input}
          placeholder="Numer stolika"
          onChangeText={(text) => setTableNr(text)}
          value={tablenr}
        />
      )}

      <Button style={LoginPageStyle.button} title="Zaloguj się" color="#705537" onPress={handleLogin} />

      {error && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ color: 'red' }}>{error}</Text>
        </View>
      )}
    </>
  )}

  {!showLoginForm && (
    <View style={LoginPageStyle.startButtonContainer}>
      <Button
        title="Rozpocznij zamówienie"
        color="#705537"
        onPress={handleStart}
      />
    </View>
  )}
</View>

  );
};

export default LoginPage;
