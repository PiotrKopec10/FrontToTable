import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableWithoutFeedback, ImageBackground, TouchableOpacity } from 'react-native';
import WaiterPageStyles from './styles/WaiterPageStyles';

const WaiterPage = () => {
    const [orders, setOrders] = useState([]);
    const [expandedSections, setExpandedSections] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:5111/api/Order');
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
            await fetch(`http://localhost:5111/api/Order/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderStatus: 1 }),
 
            });
            
            const response = await fetch('http://localhost:5111/api/Order');
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

    const renderOrderItem = ({ item }) => {
        const orderDate = new Date(item.orderTime);
        const formattedOrderDate = `${orderDate.getDate()}-${orderDate.getMonth() + 1}-${orderDate.getFullYear()} ${orderDate.getHours()}:${orderDate.getMinutes()}:${orderDate.getSeconds()}`;

        return (
            <View style={WaiterPageStyles.orderItemContainer}>
                <Text>{`Order ID: ${item.orderId}`}</Text>
                <Text>{`Order Time: ${formattedOrderDate}`}</Text>
                <Text>{`Order Status: ${item.orderStatus}`}</Text>
                <Text>{`Order Comment: ${item.orderComment}`}</Text>
                {item.orderStatus === 1 ? (
                    <Text style={WaiterPageStyles.acceptedOrder}>Zamówienie zaakceptowane</Text>
                ) : item.orderStatus === 2 ? (
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
                    data={orders}
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
