import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import DishDetailsStyles from './styles/DishDetailsStyles';
import HomePageStyles from './styles/HomePageStyles';
import config  from './config';

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
  const [totalCartItems, setTotalCartItems] = React.useState(0);
  useEffect(() => {
    getTotalCartItems(orderId);
    if (dishId) {
      const getDishDetailsById = async () => {
        try {
          const response = await fetch(`${config.endpoints.Product}/${dishId}`);
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

  const handleOrderPress = () => {
    navigation.navigate('Order', { orderId: orderId });
  };

   

  // const addToCart = (product) => {
  //   const existingItem = cartItems.find((item) => item.id === product.id);
  //   if (existingItem) {
  //     setCartItems(
  //       cartItems.map((item) =>
  //         item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
  //       )
  //     );
  //   } else {
  //     setCartItems([...cartItems, { ...product, quantity: 1 }]);
  //   }
  // };

  const getTotalCartItems = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:5111/api/OrderItem/AllItems?orderId=${orderId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch order items. Status: ${response.status}`);
      }
  
      const orderItems = await response.json();
      const totalItems = orderItems.reduce((total, item) => total + item.itemQuantity, 0);
      setTotalCartItems(totalItems);
    } catch (error) {
      console.error('Error fetching order items:', error);
      // Handle the error or return a default value
      setTotalCartItems(0);
    }
  };


    const [numberInput, setNumberInput] = useState('');
    const handleTextChange = (text) => {
      // Allow only numeric input
      const numericInput = text.replace(/[^0-9]/g, '');
      setNumberInput(numericInput);
    };

  const handleOrder = async () => {
    try {
      if (!orderId || !dishId) {
       
        console.error('orderId or dishId is missing.');
        alert('Błąd podczas zamawiania. Spróbuj ponownie.');
        return;
      }
      alert("Pomyślnie dodano do koszyka");
      // Wywołanie POST na endpoint /api/OrderItem/ProductToOrder
      const response = await fetch('http://localhost:5111/api/OrderItem/Post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
        itemId: 0,  // Ustaw odpowiednie id
        itemQuantity: 1,  // Ustaw odpowiednią ilość
        productId: dishId,  // Ustaw odpowiedni id produktu
        orderId: orderId 
        }), // Zmiana formatu na pojedynczy obiekt
      });
  
      if (response.ok) {
        
        getTotalCartItems(orderId);
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
    <ImageBackground source={require('./photo/BG1.png')} style={DishDetailsStyles.container}>
      {/* Sekcja Logo i Przycisk Koszyka */}
      <View style={[HomePageStyles.sectionContainer, HomePageStyles.headerContainer]}>
        {/* Przycisk Koszyka */}
        <TouchableOpacity onPress={handleOrderPress} style={DishDetailsStyles.toCartButton}>
  <View style={DishDetailsStyles.container2}>
    <Image source={require('./photo/cart.png')} style={DishDetailsStyles.cartImage} />
    <Text style={DishDetailsStyles.cartText}>Koszyk: {totalCartItems}</Text>
    <Text style={DishDetailsStyles.input} value={numberInput} onChangeText={handleTextChange} />
  </View>
</TouchableOpacity>



        {/* Logo */}
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
              <Text style={DishDetailsStyles.dishName}>{dishDetails.name}</Text>
              <Text style={DishDetailsStyles.dishPrice}>{`${dishDetails.price.toFixed(2)}zł`}</Text>
              {dishDetails.additionalInfo && (
                <Text style={DishDetailsStyles.additionalInfo}>{dishDetails.additionalInfo}</Text>
              )}
            </View>
          </View>
        </View>

        {/* Przycisk Zamówienia */}
        <TouchableOpacity onPress={handleOrder} style={DishDetailsStyles.addToMenuButton}>
          <Image source={require('./photo/add.png')} style={DishDetailsStyles.photo} tintColor="#FFD983" />
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
