import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import CartPageStyles from './styles/CartPageStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DetailsWaiterStyles from './styles/DetailsWaiterStyles';

const DetailsWaiter = ({ route, navigation }) => {
    const { orderId, paymentMethod } = route.params;
    const [cartItems, setCartItems] = useState([]);
    const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [isPaymentConfirmationModalVisible, setIsPaymentConfirmationModalVisible] = useState(false);
    const [blikCode, setBlikCode] = useState('');
    const [isNoteModalVisible, setIsNoteModalVisible] = useState(false);
    const [orderNote, setOrderNote] = useState('');
    const [orderData, setOrderData] = useState([]);
    const [discount, setDiscount] = useState(0);
    const [discountInput, setDiscountInput] = useState('');



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

        const fetchOrderData = async () => {
            try {
                const response = await fetch(`http://localhost:5111/api/Order/${orderId}`);
                if (response.ok) {
                    const orderData = await response.json();
                    setOrderData(orderData);
                    setOrderNote(orderData.orderComment || '');
                } else {
                    console.error('Błąd pobierania danych o zamówieniu.');
                }
            } catch (error) {
                console.error('Błąd wykonania żądania:', error.message);
            }
        };

        fetchOrderItems();
        fetchOrderData();
        loadDiscount();
    }, [orderId]);


    const loadDiscount = async () => {
        try {
            const storedDiscount = await AsyncStorage.getItem(`discount_${orderId}`);
            if (storedDiscount !== null) {
                setDiscount(parseFloat(storedDiscount));
            }
        } catch (error) {
            console.error('Error loading discount:', error);
        }
    };
    
    const saveDiscount = async (discountValue) => {
        try {
            await AsyncStorage.setItem(`discount_${orderId}`, discountValue.toString());
        } catch (error) {
            console.error('Error saving discount:', error);
        }
    };
    


    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.itemQuantity * item.product.productPrice, 0).toFixed(2) + ' zł';
    };

    
    



    const handleRemoveItem = (itemId) => {
        console.log(`Usuwanie dania o ID: ${itemId}`);
        fetch(`http://localhost:5111/api/OrderItem/${orderId}/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            if (!response.ok) {
                throw new Error('Błąd usuwania pozycji zamówienia');
            }
            console.log('Order item deleted successfully.');
        })
            .catch(error => {
                console.error('Error deleting order item:', error);
            });
        const updatedCart = cartItems.filter((item) => item.productId !== itemId);
        console.log(`Danie o ID ${itemId} zostało usunięte z koszyka!`);
        setCartItems(updatedCart);
    };





    const handleQuantityChange = (itemId, newQuantity) => {
        const itemIndex = cartItems.findIndex((item) => item.itemId === itemId);
        const updatedCart = [...cartItems];
        updatedCart[itemIndex].itemQuantity = Math.max(1, newQuantity);
        setCartItems(updatedCart);

        console.log(itemId);
        console.log(orderId);
        console.log(updatedCart);
        const quant = updatedCart[0].itemQuantity;
        console.log(quant);
        fetch(`http://localhost:5111/api/OrderItem/UpdateQuantity/${orderId}/${itemId}?quantity=${quant}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCart),
        })

    };

    const handleDiscountChange = () => {
        const parsedDiscount = parseFloat(discountInput);
        if (!isNaN(parsedDiscount)) {
            const clampedDiscount = Math.min(Math.max(parsedDiscount, 0), 100);
            setDiscount(clampedDiscount);
            saveDiscount(clampedDiscount);
        }
    };
    

      
      const calculateTotalWithDiscount = () => {
        const totalWithoutDiscount = cartItems.reduce(
            (total, item) => total + item.itemQuantity * item.product.productPrice,
            0
        );

        const discountAmount = (totalWithoutDiscount * discount) / 100 || 0;

        return (totalWithoutDiscount - discountAmount).toFixed(2) + ' zł';
    };
    

    return (
        <View style={CartPageStyles.container}>
            <Image source={require('./photo/logo.png')} style={[CartPageStyles.logo, { marginBottom: 15 }]} />
            <Text style={[CartPageStyles.header, { fontSize: 33 }]}>Zamówienie ID: {orderId}</Text>
            <Text style={[CartPageStyles.header, { fontSize: 28, color: '#2ecc71' }]}>
              Cena Podstawowa: {calculateTotal()}
            </Text>

            <Text style={[CartPageStyles.header, { fontSize: 28, color: '#2ecc71' }]}>
            Cena ze zniżką: {calculateTotalWithDiscount()}
            </Text>


            <Text style={CartPageStyles.header}>
                Metoda płatności: {paymentMethod}
            </Text>          

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
                            <View style={CartPageStyles.quantityContainer}>
                                <TouchableOpacity
                                    style={CartPageStyles.arrowButton}
                                    onPress={() => handleQuantityChange(item.itemId, item.itemQuantity - 1)}
                                >
                                    <Text style={CartPageStyles.arrowButtonText}> - </Text>
                                </TouchableOpacity>
                                <TextInput
                                    style={CartPageStyles.quantityInput}
                                    keyboardType="numeric"
                                    value={item.itemQuantity.toString()}
                                    onChangeText={(text) => handleQuantityChange(item.itemId, parseInt(text, 10))}
                                />
                                <TouchableOpacity
                                    style={CartPageStyles.arrowButton}
                                    onPress={() => handleQuantityChange(item.itemId, item.itemQuantity + 1)}
                                >
                                    <Text style={CartPageStyles.arrowButtonText}> + </Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                style={CartPageStyles.removeButton}
                                onPress={() => handleRemoveItem(item.productId)}
                            >
                                <Text style={CartPageStyles.removeButtonText}>Usuń</Text>
                            </TouchableOpacity>

                            
                        </View>

                    </View>
                )}
            />
              <TextInput
                style={DetailsWaiterStyles.discountInput}
                keyboardType="numeric"
                placeholder="Discount %"
                value={discountInput}
                onChangeText={(text) => setDiscountInput(text)}
            />

            <TouchableOpacity
                style={DetailsWaiterStyles.discountButton}
                onPress={handleDiscountChange}
            >
                <Text style={DetailsWaiterStyles.discountButtonText}>Ustaw zniżkę</Text>
            </TouchableOpacity>

        </View>
    );
};

export default DetailsWaiter;
