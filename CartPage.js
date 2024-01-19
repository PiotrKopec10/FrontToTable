import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import CartPageStyles from './styles/CartPageStyles';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
//dane
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
            <Text style={CartPageStyles.itemTotal}>{`${(item.quantity * item.price).toFixed(2)}zł`}</Text>
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
  );
};

export default CartPage;