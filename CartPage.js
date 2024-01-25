import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, Modal } from 'react-native';
import CartPageStyles from './styles/CartPageStyles';

const CartPage = ({ route, navigation }) => {
  const { orderId } = route.params;
  const [cartItems, setCartItems] = useState([]);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [isPaymentConfirmationModalVisible, setIsPaymentConfirmationModalVisible] = useState(false);
  const [blikCode, setBlikCode] = useState('');

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const response = await fetch(`http://localhost:5111/api/OrderItem/AllItems?orderId=${orderId}`);
        if (response.ok) {
          const orderItems = await response.json();
          setCartItems(orderItems);
        } else {
          console.error('Błąd podczas pobierania produktów z zamówienia.');
        }
      } catch (error) {
        console.error('Błąd wykonania żądania:', error.message);
      }
    };

    fetchOrderItems();
  }, [orderId]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.itemQuantity * item.product.productPrice, 0).toFixed(2) + ' zł';
  };

  const handleGoBack = () => {
    navigation.navigate('Menu', { orderId: orderId });
  };

  const handlePaymentSelection = (paymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
    setIsPaymentModalVisible(false);

    // Dodatkowa logika dla BLIK
    if (paymentMethod === 'BLIK') {
      setIsPaymentConfirmationModalVisible(true);
    }
  };

  const handlePaymentConfirmation = () => {
    setIsPaymentConfirmationModalVisible(false);

    // Przykładowa logika potwierdzenia płatności
    console.log(`Potwierdzono płatność metodą: ${selectedPaymentMethod}`);
    console.log(`Kwota do zapłacenia: ${calculateTotal()}`);

    if (selectedPaymentMethod === 'BLIK') {
      console.log(`Kod BLIK: ${blikCode}`);
    }
  };

  const renderPaymentConfirmationModal = () => (
    <Modal
      visible={isPaymentConfirmationModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setIsPaymentConfirmationModalVisible(false)}
    >
      <View style={CartPageStyles.paymentModalContainer}>
        <Text style={CartPageStyles.modalHeader}>Potwierdź płatność</Text>
        <Text style={CartPageStyles.totalLabel}>Kwota do zapłacenia:</Text>
        <Text style={[CartPageStyles.totalValue, { paddingBottom: 10, color: '#4CAF50' }]}>{calculateTotal()}</Text>

        {selectedPaymentMethod === 'Gotówka' || selectedPaymentMethod === 'Karta kredytowa' ? (
          <>
            <TouchableOpacity
              style={CartPageStyles.paymentButton}
              onPress={handlePaymentConfirmation}
            >
              <Text style={CartPageStyles.paymentButtonText}>PŁACĘ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={CartPageStyles.cancelPaymentButton}
              onPress={() => setIsPaymentConfirmationModalVisible(false)}
            >
              <Text style={CartPageStyles.cancelPaymentButtonText}>ANULUJ PŁATNOŚĆ</Text>
            </TouchableOpacity>
          </>
        ) : selectedPaymentMethod === 'BLIK' ? (
          <>
            <TextInput
              style={CartPageStyles.blikCodeInput}
              keyboardType="numeric"
              placeholder="Wprowadź kod BLIK"
              maxLength={6}
              onChangeText={(text) => setBlikCode(text)}
              value={blikCode}
            />
            <TouchableOpacity
              style={CartPageStyles.paymentButton}
              onPress={handlePaymentConfirmation}
            >
              <Text style={CartPageStyles.paymentButtonText}>PŁACĘ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={CartPageStyles.cancelPaymentButton}
              onPress={() => setIsPaymentConfirmationModalVisible(false)}
            >
              <Text style={CartPageStyles.cancelPaymentButtonText}>ANULUJ PŁATNOŚĆ</Text>
            </TouchableOpacity>
          </>
        ) : null}
      </View>
    </Modal>

  );

  return (
    <View style={CartPageStyles.container}>
    <Image source={require('./photo/logo.png')} style={[CartPageStyles.logo, {marginBottom: 15}]} />
    <Text style={[CartPageStyles.header, {fontSize: 33}]}>Twoje zamówienie</Text>
    <Text style={[CartPageStyles.header, {fontSize: 28, color: '#2ecc71'}]}>{calculateTotal()}</Text>
    <FlatList
      data={cartItems}
      keyExtractor={(item) => item.itemId.toString()}
      renderItem={({ item }) => (
        <View style={CartPageStyles.itemContainer}>
          <Image style={CartPageStyles.image} source={{ uri: item.product.imageUrl }} />
          <View style={CartPageStyles.detailsContainer}>
            <Text style={CartPageStyles.productName}>{item.product.productName}</Text>
            <Text style={CartPageStyles.productDescription}>{item.product.productDescription}</Text>
            <Text style={CartPageStyles.productPrice}>{`Cena: ${item.product.productPrice} zł`}</Text>
            <Text style={CartPageStyles.quantity}>{`Ilość: ${item.itemQuantity}`}</Text>
          </View>
        </View>
      )}
    />
      <Text style={[CartPageStyles.modalHeader, { fontSize: 20, fontWeight: 'bold', marginBottom: 12, paddingLeft: 10, color: 'black' }]}>Wybierz sposób płatności:</Text>
      <View style={CartPageStyles.box}>
        <TouchableOpacity
          style={CartPageStyles.paymentMethodButton}
          onPress={() => {
            handlePaymentSelection('Gotówka');
            setIsPaymentConfirmationModalVisible(true);
          }}
        >
          <Image
            source={require('./photo/cash.png')}
            style={[CartPageStyles.paymentMethodImage, { tintColor: '#FFFFFF' }]}
          />
          <Text style={CartPageStyles.paymentMethodButtonText}>Gotówka</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={CartPageStyles.paymentMethodButton}
          onPress={() => {
            handlePaymentSelection('BLIK');
            setIsPaymentConfirmationModalVisible(true);
          }}
        >
          <Image
            source={require('./photo/blik.png')}
            style={[CartPageStyles.paymentMethodImage, { tintColor: '#FFFFFF' }]}
          />
          <Text style={CartPageStyles.paymentMethodButtonText}>Blik</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={CartPageStyles.paymentMethodButton}
          onPress={() => {
            handlePaymentSelection('Karta kredytowa');
            setIsPaymentConfirmationModalVisible(true);
          }}
        >
          <Image
            source={require('./photo/card.png')}
            style={[CartPageStyles.paymentMethodImage, { tintColor: '#FFFFFF' }]}
          />
          <Text style={CartPageStyles.paymentMethodButtonText}>Karta kredytowa</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleGoBack} style={CartPageStyles.cancelButton}>
          <Text style={CartPageStyles.cancelButtonText}>Cofnij</Text>
        </TouchableOpacity>
      </View>
      {renderPaymentConfirmationModal()}
    </View>
  );
};

export default CartPage;
