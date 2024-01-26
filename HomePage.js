import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, ImageBackground } from 'react-native';
import HomePageStyles from './styles/HomePageStyles';
import config from './config';

const HomePage = ({ route, navigation }) => {
  const { orderId } = route.params;
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [apiData, setApiData] = useState([]);
  const [restaurantId, setRestaurantId] = useState('');
  const [restaurantName, setRestaurantName] = useState('');

  useEffect(() => {
    try {
      fetch(`${config.endpoints.Order}/${orderId}`, {
        method: 'GET',
        headers: {
          'accept': 'text/plain',
        },
      }).then(response => {
        if (!response.ok) {
          throw new Error('Błąd logowania pobierania restaurantId');
        }
        return response.json();
      })
        .then(data => {
          
          setRestaurantId(data.restaurantId);
          getProducts(data.restaurantId);
        });

    fetch(`http://localhost:5111/api/Restaurant/${restaurantId}`, {
        method: 'GET',
        headers: {
          'accept': 'text/plain',
        },
      }).then(response => {
        if (!response.ok) {
          throw new Error('Błąd logowania pobierania restaurantId');
        }
        return response.json();
      })
        .then(dane => {
          
          console.log("nazwa restauracji",dane.restaurantName)
          setRestaurantName(dane.restaurantName);
        });

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }, [orderId, restaurantId]);

  const getProducts = (restaurantId) => {
    fetch(`http://localhost:5111/api/Product/restaurant/${restaurantId}`, {
      method: 'GET',
      headers: {
        'accept': 'text/plain',
      },
    }).then(response => {
      if (!response.ok) {
        throw new Error('Błąd pobierania produktów po restaurantId');
      }
      return response.json();
    })
      .then(data => {
        setApiData(data);
      });
  }

  const getCategoryName = (categoryValue) => {
    switch (categoryValue) {
      case 0:
        return 'Dania główne';
      case 1:
        return 'Zupy';
      case 2:
        return 'Przystawki';
      case 3:
        return 'Napoje';
      case 4:
        return 'Dodatki';
      default:
        return 'Dania główne';
    }
  };

  const menuItems = apiData.map((item) => ({
    id: item.productId.toString(),
    name: item.productName,
    category: getCategoryName(item.productCategory),
    image: { uri: item.imageUrl },
    price: item.productPrice,
  }));

  const filteredMenuItems = selectedCategory
    ? menuItems.filter(item => item.category === selectedCategory)
    : menuItems;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={HomePageStyles.menuItemContainer}
      onPress={() => navigation.navigate('DishDetails', { dishId: item.id, orderId: orderId })}
    >
      <Image source={item.image} style={HomePageStyles.menuItemImage} />
      <Text style={[HomePageStyles.menuItemName, { color: 'white' }]}>{item.name}</Text>
      <Text style={[HomePageStyles.menuItemPrice, { color: 'white', paddingBottom: 5 }]}>{`${item.price.toFixed(2)}`}</Text>
    </TouchableOpacity>
  );

  const renderCategoryButton = (category) => (
    <TouchableOpacity
      style={[
        HomePageStyles.categoryButton,
        selectedCategory === category && HomePageStyles.selectedCategoryButton,
      ]}
      onPress={() => handleCategoryPress(category)}
    >
      <Text style={[
        HomePageStyles.categoryButtonText,
        selectedCategory === category && { fontWeight: 'bold' },
      ]}>{category}</Text>
    </TouchableOpacity>
  );

  const handleCategoryPress = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const handleOrderPress = () => {
    navigation.navigate('Order', { orderId: orderId });
  };

  const handleCancelOrderPress = () => {
    navigation.navigate('Login');
  };

  return (
    <ImageBackground source={require('./photo/BG1.png')} style={[HomePageStyles.container, { backgroundColor: 'rgba(255, 255, 255, 0.6)' }]}>
      {/* Sekcja Logo i Komunikat o zalogowaniu */}
      <View style={[HomePageStyles.sectionContainer, HomePageStyles.headerContainer]}>
        <View style={HomePageStyles.logoAndLoginContainer}>
          <View style={HomePageStyles.orderContainer}>
            <Image source={require('./photo/logo.png')} style={[HomePageStyles.order, { marginBottom: 15 }]} />
          </View>
          {/* Komunikat o zalogowaniu przez konkretną restaurację */}
          <View style={HomePageStyles.loginMessageContainer}>
            <Text style={HomePageStyles.loginMessageText}>{`Restauracja: ${restaurantName}`}</Text>
          </View>
          <TouchableOpacity onPress={handleCancelOrderPress} style={HomePageStyles.cancelOrderContainer}>
          <Text style={HomePageStyles.cancelOrderText}>Anuluj zamówienie</Text>
        </TouchableOpacity>
        </View>

        {/* Sekcja Kategorie */}
        <View style={HomePageStyles.categoriesContainer}>
          {renderCategoryButton('Dania główne')}
          {renderCategoryButton('Zupy')}
          {renderCategoryButton('Przystawki')}
          {renderCategoryButton('Napoje')}
          {renderCategoryButton('Dodatki')}
        </View>
      </View>

      {/* Sekcja Menu z Zamówieniem */}
      <View style={[HomePageStyles.sectionContainer, HomePageStyles.menuContainer]}>
        <FlatList
          data={filteredMenuItems}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={4}
        />
      </View>

      {/* Sekcja Zamówienia */}
      <View style={[HomePageStyles.sectionContainer, HomePageStyles.footerContainer]}>
        <TouchableOpacity onPress={handleOrderPress} style={HomePageStyles.orderContainer}>
          <Image style={HomePageStyles.order} source={require('./photo/sumup.png')} tintColor="#FFD983" />
          <Text style={[HomePageStyles.orderText, { fontWeight: 'bold', color: '#FFD983' }]}>Zamówienie</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default HomePage;
