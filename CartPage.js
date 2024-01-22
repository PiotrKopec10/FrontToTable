
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, Modal } from 'react-native';
import CartPageStyles from './styles/CartPageStyles';
import HomePageStyles from './styles/HomePageStyles';

const CartPage = ({ route }) => {
  const { orderId } = route.params;
  console.log(orderId);
  const [cartItems, setCartItems] = useState([]);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [isPaymentConfirmationModalVisible, setIsPaymentConfirmationModalVisible] = useState(false);

  useEffect(() => {
    // Pobierz produkty dla danego zamówienia z orderId i ustaw je w stanie
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
    setIsPaymentModalVisible(true);
  };

  const handleNote = (itemId) => {
    console.log('Dodaję notatkę do zamówienia:', itemId);
  };

  const handlePaymentSelection = (paymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
    setIsPaymentModalVisible(false);
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
{/* Modal z pytaniem o sposób płatności */}
<Modal
  visible={isPaymentModalVisible}
  animationType="slide"
  transparent={true}
  onRequestClose={() => setIsPaymentModalVisible(false)}
>
  <View style={CartPageStyles.paymentModalContainer}>
    <Text style={CartPageStyles.modalHeader}>Wybierz sposób płatności</Text>
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
    <TouchableOpacity
      style={CartPageStyles.modalButton}
      onPress={() => setIsPaymentModalVisible(false)}
    >
      <Text style={CartPageStyles.modalButtonText}>Anuluj</Text>
    </TouchableOpacity>
  </View>
</Modal>

{/* Modal potwierdzenia płatności */}
<Modal
  visible={isPaymentConfirmationModalVisible}
  animationType="slide"
  transparent={true}
  onRequestClose={() => setIsPaymentConfirmationModalVisible(false)}
>
  <View style={CartPageStyles.paymentModalContainer}>
    <Text style={CartPageStyles.modalHeader}>Potwierdź płatność</Text>
    <Text style={CartPageStyles.totalLabel}>Kwota do zapłacenia:</Text>
    <Text style={[CartPageStyles.totalValue, {paddingBottom: 10, color: '#4CAF50'}]}>{`${calculateTotal().toFixed(2)}zł`}</Text>
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
      </View>
    </View>
  );
};

export default CartPage;