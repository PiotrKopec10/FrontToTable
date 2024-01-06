import React, { useState } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import HomePageStyles from './styles/HomePageStyles';

const HomePage = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const menuItems = [
    { id: '1', name: 'Danie 1', category: 'Dania główne', image: require('./photo/burger.png'), price: 15.99 },
    { id: '2', name: 'Danie 2', category: 'Zupy', image: require('./photo/pepperoni-pizza.png'), price: 12.99 },
    { id: '3', name: 'Danie 3', category: 'Przystawki', image: require('./photo/pita.png'), price: 9.99 },
    { id: '3', name: 'Danie 3', category: 'Dodatki', image: require('./photo/pita.png'), price: 9.99 },
    // Dodaj więcej pozycji menu
  ];

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
      <Text style={HomePageStyles.menuItemPrice}>{`$${item.price.toFixed(2)}`}</Text>
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
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  return (
    <View style={[HomePageStyles.container, { backgroundColor: '#FFD983' }]}>
      <View style={HomePageStyles.searchContainer}>
        <TextInput
          style={HomePageStyles.searchInput}
          placeholder="Szukaj..."
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
        <Button title="Filtruj" onPress={() => console.log('Implementuj filtrowanie')} />
      </View>
      <View style={HomePageStyles.categoriesContainer}>
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
    </View>
  );
};

export default HomePage;