import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import CartPageStyles from './styles/CartPageStyles';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: '1', name: 'Danie 1', quantity: 2, price: 15.99 },
    { id: '2', name: 'Danie 2', quantity: 1, price: 12.99 },
    { id: '3', name: 'Danie 1', quantity: 2, price: 15.99 },
    { id: '4', name: 'Danie 2', quantity: 1, price: 12.99 },
    { id: '5', name: 'Danie 1', quantity: 2, price: 15.99 },
    { id: '6', name: 'Danie 2', quantity: 1, price: 12.99 },
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
  };

  return (
    <View style={CartPageStyles.container}>
      <Text style={CartPageStyles.title}>Twój koszyk</Text>
      <View style={CartPageStyles.tableRow}>
        <Text style={CartPageStyles.columnHeader}>NAZWA DANIA</Text>
        <Text style={CartPageStyles.columnHeader}>ILOŚĆ</Text>
        <Text style={CartPageStyles.columnHeader}>CENA</Text>
      </View>
      <View style={CartPageStyles.separator} />
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={CartPageStyles.tableRow}>
            <View style={CartPageStyles.columnName}>
              <Text>{item.name}</Text>
            </View>
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
            <Text style={CartPageStyles.itemTotal}>{`$${(item.quantity * item.price).toFixed(2)}`}</Text>
          </View>
        )}
      />
      <View style={CartPageStyles.separator} />
      <View style={CartPageStyles.totalContainer}>
        <Text style={CartPageStyles.totalLabel}>RAZEM: </Text>
        <Text style={CartPageStyles.totalValue}>{`$${calculateTotal().toFixed(2)}`}</Text>
      </View>
      <TouchableOpacity style={CartPageStyles.orderButton} onPress={handleOrder}>
        <Text style={CartPageStyles.orderButtonText}>ZAMAWIAM</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartPage;