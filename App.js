import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './HomePage'; 
import LoginPage from './LoginPage';
import CartPage from './CartPage';
import DishDetailsPage from './DishDetailsPage';
import StartPage from './StartPage';
import AdminPage from './AdminPage';
import { AuthProvider } from './AuthContext.js'; 

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Menu" component={HomePage} />
          <Stack.Screen name="Start" component={StartPage} />
          <Stack.Screen name="Cart" component={CartPage} />
          <Stack.Screen name="DishDetails" component={DishDetailsPage} />
          <Stack.Screen name="AdminPage" component={AdminPage}/>
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
