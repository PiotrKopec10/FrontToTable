import React, { useState } from 'react';
import { View, Text, Button, Image, TextInput } from 'react-native';
import { RadioButton } from 'react-native-paper'; // Import RadioButton from react-native-paper
import LoginPageStyle from './styles/LoginPageStyles';

const LoginPage = ({ navigation }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [tablenr, setTableNr] = useState('');
  const [restaurantnr, setRestaurantNr] = useState('');
  const [role, setRole] = useState('waiter'); // Default role is 'waiter'

   // console.log('Login:', login);
    // console.log('Password:', password);
    // console.log('Table:', tablenr);
    // console.log('Restaurant:', restaurantnr);
    // console.log('Role:', role);

    // if (login === 'lui' && password === 'lui') {
    //   navigation.navigate('AdminPage');
    // } 

    const handleLogin = () => {
      if (role === 'restaurant') {
        // Jeśli zaznaczono "Restaurant", wywołaj odpowiedni endpoint
        fetch(`http://localhost:5111/api/Restaurant/login/${login}/${password}`)
          .then(response => response.json())
          .then(data => {
            // Pobierz restaurantId i przekieruj do HomePage z odpowiednim parametrem
            navigation.navigate('HomePage', { restaurantId: data.restaurantId });
          })
          .catch(error => {
            console.error('Błąd logowania jako restaurant:', error);
          });
      } else {
        // Jeśli zaznaczono "Waiter", wywołaj odpowiedni endpoint
        fetch(`http://localhost:5111/api/Waiter/login/${login}/${password}`)
          .then(response => response.json())
          .then(data => {
            // Pobierz waiterId i przekieruj do WaiterPage z odpowiednim parametrem
            navigation.navigate('WaiterPage', { waiterId: data.waiterId });
          })
          .catch(error => {
            console.error('Błąd logowania jako waiter:', error);
          });
      }
    };

  return (
    <View style={LoginPageStyle.container}>


<Image source={require('./photo/logo.png')} style={LoginPageStyle.logo} />

      {/* Radio buttons for choosing role */}
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
