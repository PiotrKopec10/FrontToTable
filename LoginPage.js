import React, { useState, useContext } from 'react';
import { View, Text, Button, Image, TextInput } from 'react-native';
import { RadioButton } from 'react-native-paper';
import AuthContext from './AuthContext'; // Dostosuj ścieżkę
import LoginPageStyle from './styles/LoginPageStyles';

const LoginPage = ({ navigation }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [tablenr, setTableNr] = useState('');
  const [restaurantnr, setRestaurantNr] = useState('');
  const [role, setRole] = useState('waiter'); // Default role is 'waiter'

  const authContext = useContext(AuthContext);

  const handleLogin = () => {
    if (role === 'restaurant') {
      fetch(`http://localhost:5111/api/Restaurant/login/${login}/${password}`)
        .then(response => response.json())
        .then(data => {
          console.log('Zalogowano jako restaurant. Dane:', data);
          navigation.navigate('Menu', { restaurantId: data.restaurantId });

          // Przechowaj informacje o restauracji w kontekście
          authContext.setRestaurantInfo({
            restaurantId: data.restaurantId,
            // Dodaj inne właściwości, jeśli są potrzebne
          });
        })
        .catch(error => {
          console.error('Błąd logowania jako restaurant:', error);
        });
    } else {
      fetch(`http://localhost:5111/api/Waiter/login/${login}/${password}`)
        .then(response => response.json())
        .then(data => {
          console.log('Zalogowano jako waiter. Dane:', data);
          navigation.navigate('WaiterPage', { waiterId: data.waiterId });
          authContext.setWaiterInfo({
            
            waiterId: data.waiterId,
            waiterName: data.waiterName,

            
          });
        })
        .catch(error => {
          console.error('Błąd logowania jako waiter:', error);
        });
    }
  };

  return (
    <View style={LoginPageStyle.container}>
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
    </View>
  );
};

export default LoginPage;
