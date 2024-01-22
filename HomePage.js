import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, ImageBackground } from 'react-native';
import HomePageStyles from './styles/HomePageStyles';

const HomePage = ({route,  navigation }) => {
  const { orderId } = route.params;

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(config.endpoints.Product, {
          method: 'GET',
          headers: {
            'accept': 'text/plain',
          },
        });

        const result = await response.json();
        setApiData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const menuItems = apiData.map((item) => ({
    id: item.productId.toString(),
    name: item.productName,
    category: item.productStatus,
    image: { uri: item.imageUrl },
    price: item.productPrice,
  }));

  const filteredMenuItems = selectedCategory
    ? menuItems.filter(item => item.category === selectedCategory)
    : menuItems;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={HomePageStyles.menuItemContainer}
      onPress={() => navigation.navigate('DishDetails', { dishId: item.id,orderId: orderId})}
    >
      <Image source={item.image} style={HomePageStyles.menuItemImage} />
      <Text style={[HomePageStyles.menuItemName, { color: 'white'}]}>{item.name}</Text>
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
    navigation.navigate('Order',{orderId: orderId});

  };

  return (
    <ImageBackground source={require('./photo/BG1.png')} style={[HomePageStyles.container, { backgroundColor: 'rgba(255, 255, 255, 0.6)' }]}>
      {/* Sekcja Logo i Kategorie */}
      <View style={[HomePageStyles.sectionContainer, HomePageStyles.headerContainer]}>
        <View style={HomePageStyles.orderContainer}>
          <Image source={require('./photo/logo.png')} style={[HomePageStyles.order, {marginBottom: 15}]} />
        </View>

        <View style={HomePageStyles.categoriesContainer}>
           {/*renderCategoryButton('Wszystkie dania')*/}

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