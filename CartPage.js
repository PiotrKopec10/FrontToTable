import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import CartPageStyles from './styles/CartPageStyles';
import HomePageStyles from './styles/HomePageStyles';  // Dodaj ten import

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    // Dane
  ]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity >= 0) {
      setCartItems((prevItems) =>
        prevItems.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
      );
    }
  };

  const handleOrder = () => {
    console.log('Zamawiam:', cartItems);
    // Dodaj logikę do przetwarzania zamówienia
  };

  const handleNote = (itemId) => {
    console.log('Dodaję notatkę do zamówienia:', itemId);
    // Dodaj logikę do obsługi notatek
  };

  return (
    <View style={CartPageStyles.container}>
      {/* Sekcja Logo i Kategorie */}
      <View style={[HomePageStyles.sectionContainer, HomePageStyles.headerContainer]}>
        <View style={HomePageStyles.orderContainer}>
          <Image source={require('./photo/logo.png')} style={[HomePageStyles.order, { marginBottom: 15 }]} />
        </View>
      </View>

      {/* Sekcja Zamówienia */}
      <View style={CartPageStyles.container}>
        <View style={CartPageStyles.tableRow}>
          <Text style={CartPageStyles.columnHeader}>DANIE</Text>
          <Text style={CartPageStyles.columnHeader}>KATEGORIA</Text>
          <Text style={CartPageStyles.columnHeader}>ILOŚĆ</Text>
          <Text style={CartPageStyles.columnHeader}>CENA</Text>
          <Text style={CartPageStyles.columnHeader}>NOTATKA</Text>
        </View>
        <View style={CartPageStyles.separator} />
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={CartPageStyles.tableRow}>
              <View style={CartPageStyles.columnName}>
                <Image source={{ uri: item.imageUri }} style={CartPageStyles.dishImage} />
                <Text>{item.name}</Text>
              </View>
              <Text>{item.category}</Text>
              <View style={CartPageStyles.quantityContainer}>
                <TouchableOpacity
                  style={CartPageStyles.arrowButton}
                  onPress={() => handleQuantityChange(item.id, item.quantity - 1)}
                >
                  <Text style={CartPageStyles.arrowButtonText}> - </Text>
                </TouchableOpacity>
                <TextInput
                  style={CartPageStyles.quantityInput}
                  keyboardType="numeric"
                  value={item.quantity.toString()}
                  onChangeText={(text) => handleQuantityChange(item.id, parseInt(text, 10))}
                />
                <TouchableOpacity
                  style={CartPageStyles.arrowButton}
                  onPress={() => handleQuantityChange(item.id, item.quantity + 1)}
                >
                  <Text style={CartPageStyles.arrowButtonText}> + </Text>
                </TouchableOpacity>
              </View>
              <Text style={CartPageStyles.itemTotal}>{`${(item.quantity * item.price).toFixed(2)}zł`}</Text>
              <TouchableOpacity
                style={CartPageStyles.noteButton}
                onPress={() => handleNote(item.id)}
              >
                <Text style={CartPageStyles.noteButtonText}>NOTATKA</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        <View style={CartPageStyles.separator} />
        <View style={CartPageStyles.totalContainer}>
          <Text style={CartPageStyles.totalLabel}>RAZEM: </Text>
          <Text style={CartPageStyles.totalValue}>{`${calculateTotal().toFixed(2)}zł`}</Text>
        </View>
        <TouchableOpacity style={CartPageStyles.orderButton} onPress={handleOrder}>
          <Text style={CartPageStyles.orderButtonText}>ZAMAWIAM</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartPage;
