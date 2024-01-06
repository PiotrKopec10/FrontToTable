import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import DishDetailsStyles from './styles/DishDetailsStyles';

const getDishDetailsById = (dishId) => {
  return {
    id: dishId,
    name: 'Pyszny Burger',
    category: 'Kategoria Burgery',
    image: require('./photo/burger.png'),
    price: 19.99,
    additionalInfo: 'Dodatkowe informacje o daniu.',
  };
};

const DishDetails = ({ route, navigation }) => {
  const { dishId } = route.params;
  const dishDetails = getDishDetailsById(dishId);

  const handleOrder = () => {
    console.log("Dish ordered:", dishDetails.name);
    navigation.navigate('Cart');
  };

  const handleGoBack = () => {
    navigation.navigate('Menu');
  };

  return (
    <View style={DishDetailsStyles.container}>
      <Image source={dishDetails.image} style={DishDetailsStyles.dishImage} />
      <View style={DishDetailsStyles.detailsContainer}>
        <Text style={DishDetailsStyles.dishName}>{dishDetails.name}</Text>
        <Text style={DishDetailsStyles.dishCategory}>{dishDetails.category}</Text>
        <Text style={DishDetailsStyles.dishPrice}>{`$${dishDetails.price.toFixed(2)}`}</Text>
        {dishDetails.additionalInfo && (
          <Text style={DishDetailsStyles.additionalInfo}>{dishDetails.additionalInfo}</Text>
        )}
      </View>
      <TouchableOpacity onPress={handleOrder} style={DishDetailsStyles.addToMenuButton}>
        <Image source={require('./photo/add.png')} style={DishDetailsStyles.photo} />
        <Text style={DishDetailsStyles.addToMenuText}>Dodaj do menu</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleGoBack} style={DishDetailsStyles.goBackButton}>
        <Image source={require('./photo/back.png')} style={DishDetailsStyles.backIcon} />
        <Text style={DishDetailsStyles.addToMenuText}>Powrót do Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DishDetails;
