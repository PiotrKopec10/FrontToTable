import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import HomePageStyles from './styles/HomePageStyles';

const HomePage = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5111/api/Product', {
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
  }, []); // Pobieranie danych przy pierwszym renderowaniu

  const menuItems = apiData.map((item) => ({
    id: item.productId.toString(),
    name: item.productName,
    category: item.productStatus, // Użyj nazwy produktu jako kategorii, możesz dostosować to według potrzeb
    image: { uri: item.imageUrl }, // Użyj imageUrl jako źródło obrazu
    price: item.productPrice,
  }));

  const filteredMenuItems = selectedCategory
    ? menuItems.filter(item => item.category === selectedCategory)
    : menuItems;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={HomePageStyles.menuItemContainer}
      onPress={() => navigation.navigate('DishDetails', { dishId: item.id })}
    >
      <Image source={item.image} style={HomePageStyles.menuItemImage} />
      <Text style={HomePageStyles.menuItemName}>{item.name}</Text>
      <Text style={HomePageStyles.menuItemPrice}>{`${item.price.toFixed(2)}`}</Text>
    </TouchableOpacity>
  );

  const renderCategoryButton = (category) => (
    <TouchableOpacity
      style={[HomePageStyles.categoryButton, selectedCategory === category && HomePageStyles.selectedCategoryButton]}
      onPress={() => handleCategoryPress(category)}
    >
      <Text>{category}</Text>
    </TouchableOpacity>
  );

  const handleCategoryPress = (category) => {
    if (category === 'Wszystkie dania') {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(selectedCategory === category ? null : category);
    }
  };

  const handleLogoClick = () => {
    navigation.navigate('Cart');
  };

  return (
    <View style={[HomePageStyles.container, { backgroundColor: '#FFD983' }]}>
      <View style={HomePageStyles.categoriesContainer}>
        {renderCategoryButton('Wszystkie dania')}
        {renderCategoryButton('Dania główne')}
        {renderCategoryButton('Zupy')}
        {renderCategoryButton('Przystawki')}
        {renderCategoryButton('Napoje')}
        {renderCategoryButton('Dodatki')}
      </View>
      <FlatList
        data={filteredMenuItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
      />
      <TouchableOpacity onPress={handleLogoClick}>
        <Image style={HomePageStyles.logo} source={require('./photo/sumup.png')} />
        <Text style={HomePageStyles.logotext}>Podsumowanie</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomePage;