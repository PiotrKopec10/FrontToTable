import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import DishDetailsStyles from './styles/DishDetailsStyles';
import HomePageStyles from './styles/HomePageStyles';

const DishDetails = ({ route, navigation }) => {
  const { dishId } = route.params || {};
  const [dishDetails, setDishDetails] = useState({
    id: 0,
    name: '',
    category: '',
    image: null,
    price: 0,
    additionalInfo: '',
  });
  const [orderItemCreated, setOrderItemCreated] = useState(false);

  useEffect(() => {
    if (dishId) {
      const getDishDetailsById = async () => {
        try {
          const response = await fetch(`http://localhost:5111/api/Product/${dishId}`);
          if (response.ok) {
            const data = await response.json();
            console.log('Dish details:', data); 
            setDishDetails({
              id: data.productId,
              name: data.productName,
              category: data.productStatus,
              image: { uri: data.imageUrl },
              price: data.productPrice,
              additionalInfo: data.productDescription,
            });
          } else {
            console.error('Błąd pobierania danych z API:', response.statusText);
          }
        } catch (error) {
          console.error('Błąd wykonania żądania:', error.message);
        }
      };
      getDishDetailsById();
    }
  }, [dishId]);

  const handleOrder = async () => {
    try {
    } catch (error) {
      console.error('Błąd wykonania żądania:', error.message);
    }
  };

  const handleGoBack = () => {
    navigation.navigate('Menu');
  };

  return (
    <ImageBackground source={require('./photo/BG1.png')} style={DishDetailsStyles.container}>
      {/* Sekcja Logo */}
      <View style={[HomePageStyles.sectionContainer, HomePageStyles.headerContainer]}>
        <View style={HomePageStyles.orderContainer}>
          <Image source={require('./photo/logo.png')} style={[HomePageStyles.order, { marginBottom: 15 }]} />
        </View>
      </View>
  
      {/* Sekcja Dania */}
      <View style={DishDetailsStyles.dishSectionContainer}>
        <View style={DishDetailsStyles.dishImageContainer}>
          <View style={DishDetailsStyles.dishImageWrapper}>
            <Image source={dishDetails.image && dishDetails.image.uri ? { uri: dishDetails.image.uri } : null} style={DishDetailsStyles.dishImage} />
          </View>
          <View style={DishDetailsStyles.dishInfoContainer}>
            <View style={DishDetailsStyles.dishBorder}>
              <Text style={DishDetailsStyles.dishPrice}>{`${dishDetails.price.toFixed(2)}zł`}</Text>
              <Text style={DishDetailsStyles.dishName}>{dishDetails.name}</Text>
              <Text style={DishDetailsStyles.dishCategory}>{dishDetails.category}</Text>
              {dishDetails.additionalInfo && (
                <Text style={DishDetailsStyles.additionalInfo}>{dishDetails.additionalInfo}</Text>
              )}
            </View>
          </View>
        </View>
        
        {/* Przycisk Zamówienia */}
        <TouchableOpacity onPress={handleOrder} style={DishDetailsStyles.addToMenuButton}>
          <Image source={require('./photo/add.png')} style={DishDetailsStyles.photo} tintColor="#FFD983"/>
          <Text style={[DishDetailsStyles.addToMenuText, { color: '#FFD983' }]}>Dodaj do Zamówienia</Text>
        </TouchableOpacity>
  
        {/* Przycisk Powrotu do Menu */}
        <TouchableOpacity onPress={handleGoBack} style={DishDetailsStyles.goBackButton}>
          <Image source={require('./photo/back.png')} style={DishDetailsStyles.backIcon} tintColor="#FFD983" />
          <Text style={[DishDetailsStyles.addToMenuText, { color: '#FFD983' }]}>Powrót do Menu</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default DishDetails;