import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, Modal, TextInput, ImageBackground } from 'react-native';
import AdminPageStyles from './styles/AdminPageStyles';

const AdminPage = () => {
    const [apiData, setApiData] = useState([]);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [newProduct, setNewProduct] = useState({
        productName: '',
        productDescription: '',
        productPrice: 0,
        imageUrl: '',
    });
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [deleteProductId, setDeleteProductId] = useState(null);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editProduct, setEditProduct] = useState({
        productId: 0,
        productName: '',
        productDescription: '',
        productPrice: 0,
        imageUrl: '',
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5111/api/Product');
            const result = await response.json();
            setApiData(result);
        } catch (error) {
            console.error('Błąd pobierania danych z API:', error);
        }
    };

    const handleAddProduct = async () => {
        if (!newProduct.productName || !newProduct.productDescription || !newProduct.productPrice || !newProduct.imageUrl) {
            return;
        }

        try {
            const response = await fetch('http://localhost:5111/api/Product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });

            if (response.status === 201) {
                setIsAddModalVisible(false);
                setNewProduct({
                    productName: '',
                    productDescription: '',
                    productPrice: 0,
                    imageUrl: '',
                });
                fetchData();
            } else {
                console.error('Błąd podczas dodawania nowego produktu');
            }
        } catch (error) {
            console.error('Błąd podczas dodawania nowego produktu:', error);
        }
    };

    const handleDeleteProduct = async () => {
        try {
            const response = await fetch(`http://localhost:5111/api/Product/${deleteProductId}`, {
                method: 'DELETE',
            });

            if (response.status === 204) {
                setIsDeleteModalVisible(false);
                setDeleteProductId(null);
                fetchData();
            } else {
                console.error('Błąd podczas usuwania produktu');
            }
        } catch (error) {
            console.error('Błąd podczas usuwania produktu:', error);
        }
    };

    const handleEditProduct = async () => {
        try {
            const response = await fetch(`http://localhost:5111/api/Product/${editProduct.productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editProduct),
            });

            if (response.status === 204) {
                setIsEditModalVisible(false);
                setEditProduct({
                    productId: 0,
                    productName: '',
                    productDescription: '',
                    productPrice: 0,
                    imageUrl: '',
                });
                fetchData();
            } else {
                console.error('Błąd podczas edytowania produktu');
            }
        } catch (error) {
            console.error('Błąd podczas edytowania produktu:', error);
        }
    };

    const renderProductItem = ({ item }) => (
        <View style={AdminPageStyles.productItemContainer}>
            <Image source={{ uri: item.imageUrl }} style={AdminPageStyles.productImage} />
            <Text style={[AdminPageStyles.productName, { color: 'white' }]}>{item.productName}</Text>
            <Text style={[AdminPageStyles.productPrice, { color: 'white', paddingBottom: 5 }]}>{`${item.productPrice.toFixed(2)} PLN`}</Text>
            <TouchableOpacity
                style={AdminPageStyles.editButton}
                onPress={() => {
                    setEditProduct(item);
                    setIsEditModalVisible(true);
                }}
            >
                <Text style={AdminPageStyles.editButtonText}>Edytuj</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={AdminPageStyles.deleteButton}
                onPress={() => {
                    setIsDeleteModalVisible(true);
                    setDeleteProductId(item.productId);
                }}
            >
                <Text style={AdminPageStyles.deleteButtonText}>Usuń</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <ImageBackground source={require('./photo/BG1.png')} style={[AdminPageStyles.container, { backgroundColor: 'rgba(255, 255, 255, 0.6)' }]}>
            {/* Sekcja z logiem i przyciskiem "Dodaj nowy produkt" */}
            <View style={[AdminPageStyles.sectionContainer, { backgroundColor: '#FFD983'}]}>
                <Image source={require('./photo/logo.png')} style={[AdminPageStyles.logo, { marginBottom: 15 }]} />
                <TouchableOpacity
                    style={[AdminPageStyles.addButton, {margin: 15}]}
                    onPress={() => setIsAddModalVisible(true)}
                >
                    <Text style={AdminPageStyles.addButtonText}>Dodaj nowy produkt</Text>
                </TouchableOpacity>
            </View>

            {/* Sekcja z menu produktów */}
            <View style={AdminPageStyles.sectionContainer}>
                {/* Sekcja z danymi */}
                <FlatList
                    data={apiData}
                    keyExtractor={(item) => item.productId.toString()}
                    renderItem={renderProductItem}
                    numColumns={4}
                />
            </View>

            {/* Add Product Modal */}
            <Modal
                visible={isAddModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsAddModalVisible(false)}
            >
                <View style={AdminPageStyles.modalContainer}>
                    <Text style={AdminPageStyles.modalHeader}>Dodaj nowy produkt</Text>
                    <TextInput
                        style={AdminPageStyles.modalTextInput}
                        placeholder="Nazwa produktu"
                        value={newProduct.productName}
                        onChangeText={(text) => setNewProduct({ ...newProduct, productName: text })}
                    />
                    <TextInput
                        style={AdminPageStyles.modalTextInput}
                        placeholder="Opis produktu"
                        value={newProduct.productDescription}
                        onChangeText={(text) => setNewProduct({ ...newProduct, productDescription: text })}
                    />
                    <TextInput
                        style={AdminPageStyles.modalTextInput}
                        placeholder="Cena produktu"
                        value={newProduct.productPrice !== null && newProduct.productPrice !== undefined && !isNaN(newProduct.productPrice) ? newProduct.productPrice.toString() : ''}
                        onChangeText={(text) => {
                            const parsedValue = parseFloat(text);
                            setNewProduct({ ...newProduct, productPrice: isNaN(parsedValue) ? 0 : parsedValue });
                        }}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={AdminPageStyles.modalTextInput}
                        placeholder="URL obrazka"
                        value={newProduct.imageUrl}
                        onChangeText={(text) => setNewProduct({ ...newProduct, imageUrl: text })}
                    />
                    <TouchableOpacity
                        style={[AdminPageStyles.modalButton, {backgroundColor: '#4CAF50'}]}
                        onPress={handleAddProduct}
                    >
                        <Text style={[AdminPageStyles.modalButtonText, {backgroundColor: '#4CAF50'}]}>Dodaj</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={AdminPageStyles.modalButton}
                        onPress={() => setIsAddModalVisible(false)}
                    >
                        <Text style={AdminPageStyles.modalButtonText}>Anuluj</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            {/* Delete Product Modal */}
            <Modal
                visible={isDeleteModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsDeleteModalVisible(false)}
            >
                <View style={AdminPageStyles.modalContainer}>
                    <Text style={AdminPageStyles.modalHeader}>Potwierdzenie usunięcia</Text>
                    <Text style={{ padding: 10 }}>Czy na pewno chcesz usunąć ten produkt?</Text>
                    <TouchableOpacity
                        style={[AdminPageStyles.modalButton, {backgroundColor: '#FF0000'}]}
                        onPress={handleDeleteProduct}
                    >
                        <Text style={[AdminPageStyles.modalButtonText, {backgroundColor: '#FF0000'}]}>Usuń</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={AdminPageStyles.modalButton}
                        onPress={() => setIsDeleteModalVisible(false)}
                    >
                        <Text style={AdminPageStyles.modalButtonText}>Anuluj</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            {/* Edit Product Modal */}
            <Modal
                visible={isEditModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsEditModalVisible(false)}
            >
                <View style={AdminPageStyles.modalContainer}>
                    <Text style={AdminPageStyles.modalHeader}>Edytuj produkt</Text>
                    <TextInput
                        style={AdminPageStyles.modalTextInput}
                        placeholder="Nazwa produktu"
                        value={editProduct.productName}
                        onChangeText={(text) => setEditProduct({ ...editProduct, productName: text })}
                    />
                    <TextInput
                        style={AdminPageStyles.modalTextInput}
                        placeholder="Opis produktu"
                        value={editProduct.productDescription}
                        onChangeText={(text) => setEditProduct({ ...editProduct, productDescription: text })}
                    />
                    <TextInput
                        style={AdminPageStyles.modalTextInput}
                        placeholder="Cena produktu"
                        value={editProduct.productPrice !== null && editProduct.productPrice !== undefined && !isNaN(editProduct.productPrice) ? editProduct.productPrice.toString() : ''}
                        onChangeText={(text) => {
                            const parsedValue = parseFloat(text);
                            setEditProduct({ ...editProduct, productPrice: isNaN(parsedValue) ? 0 : parsedValue });
                        }}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={AdminPageStyles.modalTextInput}
                        placeholder="URL obrazka"
                        value={editProduct.imageUrl}
                        onChangeText={(text) => setEditProduct({ ...editProduct, imageUrl: text })}
                    />
                    <TouchableOpacity
                        style={[AdminPageStyles.modalButton, {backgroundColor: '#2196F3'}]}
                        onPress={handleEditProduct}
                    >
                        <Text style={[AdminPageStyles.modalButtonText, {backgroundColor: '#2196F3'}]}>Zapisz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={AdminPageStyles.modalButton}
                        onPress={() => setIsEditModalVisible(false)}
                    >
                        <Text style={AdminPageStyles.modalButtonText}>Anuluj</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </ImageBackground>
    );
};

export default AdminPage;