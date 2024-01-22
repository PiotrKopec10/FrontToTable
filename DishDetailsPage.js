import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import DishDetailsStyles from './styles/DishDetailsStyles';

const DishDetails = ({ route, navigation }) => {
  const { dishId,orderId} = route.params || {};
  const [dishDetails, setDishDetails] = useState({
    id: 0,
    name: '',
    category: '',
    image: null,
    price: 0,
    additionalInfo: '',
  });

  useEffect(() => {
    if (dishId) {
      const getDishDetailsById = async () => {
        try {
          const response = await fetch(`http://localhost:5111/api/Product/${dishId}`);
          if (response.ok) {
            const data = await response.json();
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
      if (!orderId || !dishId) {
        console.error('orderId or dishId is missing.');
        alert('Błąd podczas zamawiania. Spróbuj ponownie.');
        return;
      }
  
      // Przygotowanie danych do wysłania
      const orderItem = {
        itemId: 0,  // Ustaw odpowiednie id
        itemQuantity: 1,  // Ustaw odpowiednią ilość
        itemPrice: dishDetails.price,  // Ustaw odpowiednią cenę
        productId: dishId,  // Ustaw odpowiedni id produktu
        orderId: orderId,  // Ustaw odpowiednie id zamówienia
      };
  
      // Wywołanie POST na endpoint /api/OrderItem/ProductToOrder
      const response = await fetch('http://localhost:5111/api/OrderItem/ProductToOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderItem }), // Zmiana formatu na pojedynczy obiekt
      });
  
      if (response.ok) {
        // Przetwarzanie odpowiedzi, jeśli to konieczne
        console.log('Zamówienie produktów pomyślnie dodane do zamówienia.');
      } else {
        const errorMessage = await response.text();
        console.error('Błąd podczas dodawania produktów do zamówienia:', errorMessage);
        alert('Błąd podczas dodawania produktów do zamówienia. Spróbuj ponownie.');
      }
    } catch (error) {
      console.error('Błąd wykonania żądania:', error.message);
      alert('Wystąpił błąd. Spróbuj ponownie.');
    }
  };
  

  const handleGoBack = () => {
    navigation.navigate('Menu',{orderId:orderId});
  };

  return (
    <View style={DishDetailsStyles.container}>
      <Image source={dishDetails.image && dishDetails.image.uri ? { uri: dishDetails.image.uri } : null} style={DishDetailsStyles.dishImage} />
      <View style={DishDetailsStyles.detailsContainer}>
        <Text style={DishDetailsStyles.dishName}>{dishDetails.name}</Text>
        <Text style={DishDetailsStyles.dishCategory}>{dishDetails.category}</Text>
        <Text style={DishDetailsStyles.dishPrice}>{`${dishDetails.price.toFixed(2)}zł`}</Text>
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
