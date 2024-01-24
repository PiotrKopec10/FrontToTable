import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, Modal } from 'react-native';
import CartPageStyles from './styles/CartPageStyles';
const CartPage = ({ route }) => {
  const { orderId } = route.params;
  console.log(orderId);
  const [cartItems, setCartItems] = useState([]);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [isPaymentConfirmationModalVisible, setIsPaymentConfirmationModalVisible] = useState(false);

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
    return cartItems.reduce((total, item) => total + item.itemQuantity * item.product.productPrice, 0)+' zł';
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity >= 0) {
      setCartItems((prevItems) =>
        prevItems.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
      );
    }
  };
  
  const renderPaymentModal2 = () => ( <Modal
    visible={isPaymentConfirmationModalVisible}
    animationType="slide"
    transparent={true}
    onRequestClose={() => setIsPaymentConfirmationModalVisible(false)}
  >
    <View style={CartPageStyles.paymentModalContainer}>
      <Text style={CartPageStyles.modalHeader}>Potwierdź płatność</Text>
      <Text style={CartPageStyles.totalLabel}>Kwota do zapłacenia:</Text>
      <Text style={[CartPageStyles.totalValue, {paddingBottom: 10, color: '#4CAF50'}]}>{calculateTotal()}</Text>
      {selectedPaymentMethod === 'Gotówka' && (
        <>
          <TouchableOpacity
            style={CartPageStyles.paymentMethodButton}
            onPress={() => {
              console.log('Płacę gotówką');
              setIsPaymentConfirmationModalVisible(false);
            }}
          >
  
            <Text style={CartPageStyles.paymentMethodButtonText}>PŁACĘ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={CartPageStyles.modalButton}
            onPress={() => setIsPaymentConfirmationModalVisible(false)}
          >
            <Text style={CartPageStyles.modalButtonText}>ANULUJ</Text>
          </TouchableOpacity>
        </>
      )}
      {selectedPaymentMethod === 'Karta kredytowa' && (
        <>
          <TouchableOpacity
            style={CartPageStyles.paymentMethodButton}
            onPress={() => {
              console.log('Płacę kartą kredytową');
              setIsPaymentConfirmationModalVisible(false);
            }}
          >
            <Text style={CartPageStyles.paymentMethodButtonText}>PŁACĘ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={CartPageStyles.modalButton}
            onPress={() => setIsPaymentConfirmationModalVisible(false)}
          >
            <Text style={CartPageStyles.modalButtonText}>ANULUJ</Text>
          </TouchableOpacity>
        </>
      )}
      {selectedPaymentMethod === 'Blik' && (
        <>
          <TextInput
            style={CartPageStyles.blikCodeInput}
            keyboardType="numeric"
            placeholder="Wprowadź kod BLIK"
            maxLength={6}
            onKeyPress={({ nativeEvent }) => {
              if (isNaN(nativeEvent.key)) {
                nativeEvent.preventDefault();
              }
            }}
          />
          <TouchableOpacity
            style={CartPageStyles.paymentMethodButton}
            onPress={() => {
              console.log('Płacę BLIK');
              setIsPaymentConfirmationModalVisible(false);
            }}
          >
            <Text style={CartPageStyles.paymentMethodButtonText}>PŁACĘ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={CartPageStyles.modalButton}
            onPress={() => setIsPaymentConfirmationModalVisible(false)}
          >
            <Text style={CartPageStyles.modalButtonText}>ANULUJ</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  </Modal>
    );

  return (
    <View style={CartPageStyles.container}>
      <Text style={CartPageStyles.header}>Twój koszyk</Text>
      <Text style={CartPageStyles.header}>{calculateTotal()}</Text>
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
            </View><View style={CartPageStyles.paymentModalContainer}>
      
      </View>
          </View>
        )}
      />
       {renderPaymentModal2()}
       <Modal
      visible={isPaymentModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setIsPaymentModalVisible(false)}
    >
    </Modal>
       <Text style={CartPageStyles.modalHeader}>Wybierz sposób płatności</Text>
       <View style={CartPageStyles.box}>
       <TouchableOpacity
          style={CartPageStyles.paymentMethodButton}
          onPress={() => {
            handlePaymentSelection('Gotówka');
            setIsPaymentConfirmationModalVisible(true);
          }}
        >
          <Image source={require('./photo/cash.png')} style={[CartPageStyles.paymentMethodImage, {tintColor: "#FFFFFF"}]} />
          <Text style={CartPageStyles.paymentMethodButtonText}>Gotówka</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={CartPageStyles.paymentMethodButton}
          onPress={() => {
            handlePaymentSelection('Blik');
            setIsPaymentConfirmationModalVisible(true);
          }}
        >
          <Image source={require('./photo/blik.png')} style={[CartPageStyles.paymentMethodImage, {tintColor: "#FFFFFF"}]} />
          <Text style={CartPageStyles.paymentMethodButtonText}>Blik</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={CartPageStyles.paymentMethodButton}
          onPress={() => {
            handlePaymentSelection('Karta kredytowa');
            setIsPaymentConfirmationModalVisible(true);
          }}
        >
          <Image source={require('./photo/card.png')} style={[CartPageStyles.paymentMethodImage, {tintColor: "#FFFFFF"}]} />
          <Text style={CartPageStyles.paymentMethodButtonText}>Karta kredytowa</Text>
        </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={CartPageStyles.modalButton}
          onPress={() => setIsPaymentModalVisible(false)}
        >
          
          <Text style={CartPageStyles.modalButtonText}>Anuluj</Text>
        </TouchableOpacity>
    </View>
  );
};
export default CartPage;

