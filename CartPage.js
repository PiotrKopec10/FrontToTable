import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, Modal } from 'react-native';
import CartPageStyles from './styles/CartPageStyles';
import HomePageStyles from './styles/HomePageStyles';  // Dodaj ten import

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    // Dane
  ]);

  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [isPaymentConfirmationModalVisible, setIsPaymentConfirmationModalVisible] = useState(false);

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
    // Po naciśnięciu przycisku "ZAMAWIAM" otwórz Modal
    setIsPaymentModalVisible(true);
  };

  const handleNote = (itemId) => {
    console.log('Dodaję notatkę do zamówienia:', itemId);
    // Dodaj logikę do obsługi notatek
  };

  const handlePaymentSelection = (paymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
    // Dodaj logikę obsługi wybranego sposobu płatności
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
    {/* Dodaj kwotę do zapłacenia */}
    <Text style={CartPageStyles.totalLabel}>Kwota do zapłacenia:</Text>
    <Text style={[CartPageStyles.totalValue, {paddingBottom: 10, color: '#4CAF50'}]}>{`${calculateTotal().toFixed(2)}zł`}</Text>
    {/* Dodaj warunki dla różnych rodzajów płatności */}
    {selectedPaymentMethod === 'Gotówka' && (
      <>
        <TouchableOpacity
          style={CartPageStyles.paymentMethodButton}
          onPress={() => {
            // Dodaj logikę dla potwierdzenia płatności gotówką
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
            // Dodaj logikę dla potwierdzenia płatności kartą kredytową
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
        {/* Dodaj miejsce na wpisanie 6-cyfrowego kodu BLIK */}
        <TextInput
          style={CartPageStyles.blikCodeInput}
          keyboardType="numeric"
          placeholder="Wprowadź kod BLIK"
          maxLength={6}
          onKeyPress={({ nativeEvent }) => {
            // Sprawdź, czy naciśnięty klawisz jest cyfrą
            if (isNaN(nativeEvent.key)) {
              // Jeśli nie jest cyfrą, zatrzymaj propagację zdarzenia
              nativeEvent.preventDefault();
            }
          }}
        />
        <TouchableOpacity
          style={CartPageStyles.paymentMethodButton}
          onPress={() => {
            // Dodaj logikę dla potwierdzenia płatności BLIK
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