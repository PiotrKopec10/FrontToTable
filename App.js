import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './HomePage'; 
import LoginPage from './LoginPage';
import CartPage from './CartPage';
import DishDetailsPage from './DishDetailsPage';
//import AdminPage from './AdminPage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Menu" component={HomePage} />
        <Stack.Screen name="Cart" component={CartPage} />
        <Stack.Screen name="DishDetails" component={DishDetailsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

