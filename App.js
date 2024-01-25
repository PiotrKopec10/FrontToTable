import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './HomePage'; 
import LoginPage from './LoginPage';
import CartPage from './CartPage';
import DishDetailsPage from './DishDetailsPage';
import AdminPage from './AdminPage';
import WaiterPage from './WaiterPage'; 
import WaiterDishDetails from './WaiterDishDetails.js';
import { AuthProvider } from './AuthContext.js'; 

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
    <AuthProvider>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Menu" component={HomePage} />
          <Stack.Screen name="Order" component={CartPage} />
          <Stack.Screen name="DishDetails" component={DishDetailsPage} />
          <Stack.Screen name="AdminPage" component={AdminPage}/>
          <Stack.Screen name="WaiterPage" component={WaiterPage}/> 
          <Stack.Screen name="WaiterDishDetails" component={WaiterDishDetails}/> 
        </Stack.Navigator>   
    </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
