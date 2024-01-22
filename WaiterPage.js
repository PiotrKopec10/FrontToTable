import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableWithoutFeedback, ImageBackground, TouchableOpacity } from 'react-native';
import WaiterPageStyles from './styles/WaiterPageStyles';
import config  from './config';

const WaiterPage = () => {
    const [orders, setOrders] = useState([]);
    const [expandedSections, setExpandedSections] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(config.endpoints.Order);
                const result = await response.json();
                result.sort((a, b) => {
                    if (a.orderStatus === b.orderStatus) {
                        return 0;
                    } else if (a.orderStatus === 1) {
                        return -1;
                    } else {
                        return 1;
                    }
                });

                setOrders(result);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const toggleSection = (orderId) => {
        const newExpandedSections = [...expandedSections];
        if (newExpandedSections.includes(orderId)) {
            const indexToRemove = newExpandedSections.indexOf(orderId);
            newExpandedSections.splice(indexToRemove, 1);
        } else {
            newExpandedSections.push(orderId);
        }
        setExpandedSections(newExpandedSections);
    };

    const acceptOrder = async (orderId) => {
        try {
            console.log('Próba akceptacji zamówienia o ID:', orderId);

            const newWaiterId = 1;
            const newRestaurantId = 1;

            await fetch(`${config.endpoints.Order}/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                //Zmienic jak logowanie bedzie dzialac
                body: JSON.stringify({
                    orderId: orderId,
                    orderTime: '2024-01-22T13:41:10.883Z',
                    orderStatus: 1,
                    orderComment: 'Naprawde Pyszne',
                    paymentMethod: 'Kartaaa',
                    waiterId: 1,
                    tableId: 1,
                    restaurantId: 1,
                }),
            });

            const response = await fetch(config.endpoints.Order);
            const result = await response.json();

            result.sort((a, b) => {
                if (a.orderStatus === b.orderStatus) {
                    return 0;
                } else if (a.orderStatus === 1) {
                    return -1;
                } else {
                    return 1;
                }
            });
            setOrders(result);
        } catch (error) {
            console.error('Błąd przy akceptowaniu zamówienia:', error);
        }
    };

    const MakeReadyOrder = async (orderId) => {
        try {
            console.log('Próba akceptacji zamówienia o ID:', orderId);
    
            const newWaiterId = 1;
            const newRestaurantId = 1;
    
            await fetch(`${config.endpoints.Order}/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderId: orderId,
                    orderTime: '2024-01-22T13:41:10.883Z',
                    orderStatus: 2, 
                    orderComment: 'Naprawde Pyszne',
                    paymentMethod: 'Kartaaa',
                    waiterId: 1,
                    tableId: 1,
                    restaurantId: 1,
                }),
            });
    
            const response = await fetch(config.endpoints.Order);
            const result = await response.json();
    
            result.sort((a, b) => {
                if (a.orderStatus === b.orderStatus) {
                    return 0;
                } else if (a.orderStatus === 2) { 
                    return -1;
                } else {
                    return 1;
                }
            });
    
            setOrders(result);
        } catch (error) {
            console.error('Błąd przy akceptowaniu zamówienia:', error);
        }
    };
    
    
    const renderOrderItem = ({ item }) => {
        const orderDate = new Date(item.orderTime);
        const formattedOrderDate = `${orderDate.getDate()}-${orderDate.getMonth() + 1}-${orderDate.getFullYear()} ${orderDate.getHours()}:${orderDate.getMinutes()}:${orderDate.getSeconds()}`;

        if (item.orderStatus !== 0 && item.orderStatus !== 1) {
            return null;
        }

        return (
            <View style={WaiterPageStyles.orderItemContainer}>
                <Text>{`Order ID: ${item.orderId}`}</Text>
                <Text>{`Order Time: ${formattedOrderDate}`}</Text>               
                <Text>{`Order Comment: ${item.orderComment}`}</Text>
                <Text>{`Payment Method: ${item.paymentMethod}`}</Text>
                <Text>{`Table Number: ${item.tableId}`}</Text>
                {item.orderStatus === 1 ? (                 
                    <View>
                    <Text style={WaiterPageStyles.newOrder}>Zamówienie zaakceptowane</Text>
                    <TouchableOpacity onPress={() => MakeReadyOrder(item.orderId)}>
                        <View style={WaiterPageStyles.readyButton}>
                            <Text style={WaiterPageStyles.readyButtonText}>Zaznacz jako gotowe</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                    
                ) : item.orderStatus === 0 ? (
                    <View>
                        <Text style={WaiterPageStyles.newOrder}>Nowe zamówienie</Text>
                        <TouchableOpacity onPress={() => acceptOrder(item.orderId)}>
                            <View style={WaiterPageStyles.acceptButton}>
                                <Text style={WaiterPageStyles.acceptButtonText}>Akceptuj</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ) : null}
            </View>
        );
    };


    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={require('./photo/BG1.png')} style={{ flex: 1, resizeMode: 'cover' }}>
                <FlatList
                    data={orders.filter(item => item.orderStatus === 0 || item.orderStatus === 1)}
                    keyExtractor={(item) => item.orderId.toString()}
                    renderItem={({ item }) => (
                        <View key={item.orderId}>
                            <TouchableWithoutFeedback onPress={() => toggleSection(item.orderId)}>
                                <View style={WaiterPageStyles.sectionHeader}>
                                    <Text style={WaiterPageStyles.sectionHeaderText}>
                                        {expandedSections.includes(item.orderId) ? '▼' : '▶'} Order {item.orderId} - {item.orderStatus === 1 ? <Text style={WaiterPageStyles.acceptedOrder}>Zaakceptowane</Text> : <Text style={WaiterPageStyles.newOrder}>Nowe zamówienie</Text>}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                            {expandedSections.includes(item.orderId) && (
                                <View style={WaiterPageStyles.sectionContent}>
                                    {renderOrderItem({ item })}
                                </View>
                            )}
                        </View>
                    )}
                />
            </ImageBackground>
        </View>
    );
    
};

export default WaiterPage;