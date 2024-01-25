import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './HomePage'; 
import LoginPage from './LoginPage';
import CartPage from './CartPage';
import DishDetailsPage from './DishDetailsPage';
import AdminPage from './AdminPage';
import WaitPage from './WaitPage'; 
import WaiterPage from './WaiterPage'; 
<<<<<<< HEAD
import DetailsWaiter from './DetailsWaiter.js';
=======
>>>>>>> 966dee3ef7d29fa2cb719eea940b6b0c76e78acd
import { AuthProvider } from './AuthContext.js'; 

const Stack = createStackNavigator();
const App = () => {
  return (
  
    <NavigationContainer>
    <AuthProvider>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginPage}/>
          <Stack.Screen name="Menu" component={HomePage} />
          <Stack.Screen name="Order" component={CartPage} />
          <Stack.Screen name="DishDetails" component={DishDetailsPage} />
          <Stack.Screen name="AdminPage" component={AdminPage}/>
          <Stack.Screen name="WaiterPage" component={WaiterPage}/> 
<<<<<<< HEAD
          <Stack.Screen name="DetailsWaiter" component={DetailsWaiter}/>
=======
          <Stack.Screen name="Wait" component={WaitPage}/> 
>>>>>>> 966dee3ef7d29fa2cb719eea940b6b0c76e78acd
        </Stack.Navigator>   
    </AuthProvider>
    </NavigationContainer>
    
  );
};

export default App;
