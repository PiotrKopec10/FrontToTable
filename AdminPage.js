import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, Modal, TextInput, ImageBackground } from 'react-native';
import AdminPageStyles from './styles/AdminPageStyles';
import config from './config';

const AdminPage = ({ route }) => {
    const [apiData, setApiData] = useState([]);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isAddWaiterModalVisible, setIsAddWaiterModalVisible] = useState(false);
    const { restaurantId } = route.params;
    const [waiterData, setWaiterData] = useState([]);
    const [isAddTableModalVisible, setIsAddTableModalVisible] = useState(false);
    const [tableData, setTableData] = useState([]);



    const [newTable, setNewTable] = useState({
        tabId: 0,
        tabNum: 0,
        tabStatus: true,
        restaurantId: restaurantId,
    });


    const [newProduct, setNewProduct] = useState({
        productName: '',
        productDescription: '',
        productPrice: 0,
        productStatus: '',
        //ProduktCategory ustawic jeszcze
        productCategory: 0,
        imageUrl: '',
        restaurantId: '',
    });

    const [newWaiter, setNewWaiter] = useState({
        waiterName: '',
        waiterSurname: '',
        waiterLogin: '',
        waiterPassw: '',
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
        fetchProductData();
        fetchWaiterData();
        fetchTableData();
    }, []);

    const fetchProductData = async () => {
        try {
            console.log('Product Endpoint:', `${config.endpoints.Product}/restaurant/${restaurantId}`);
            const response = await fetch(`${config.endpoints.Product}/restaurant/${restaurantId}`);
            const result = await response.json();
            console.log('Product Data:', result);
            setApiData(result);
        } catch (error) {
            console.error('Błąd pobierania danych z API:', error);
        }
    };

    const fetchWaiterData = async () => {
        try {
            console.log(restaurantId);
            const response = await fetch(`${config.endpoints.Waiter}/restaurant/${restaurantId}`);
            const result = await response.json();
            console.log('Waiter Data:', result);
            setWaiterData(result);
        } catch (error) {
            console.error('Error fetching waiter data from API:', error);
        }
    };

    const fetchTableData = async () => {
        try {
          const response = await fetch(`${config.endpoints.Table}/restaurant/${restaurantId}`);
          const result = await response.json();
          console.log('Table Data:', result);
          setTableData(result);
        } catch (error) {
          console.error('Error fetching table data from API:', error);
        }
      };
      



    const handleAddTable = async () => {
        try {
            const updatedTable = {
                tabId: newTable.tabId,
                tabNum: newTable.tabNum,
                tabStatus: newTable.tabStatus,
                restaurantId: restaurantId,
            };

            const updateResponse = await fetch('http://localhost:5111/api/Table', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTable),
            });

            if (updateResponse.status === 201) {
                setIsAddTableModalVisible(false);
                setNewTable({
                    tabId: 0,
                    tabNum: 0,
                    tabStatus: true,
                    restaurantId: restaurantId,
                });
                await fetchTableData();
            } else {
                console.error('Błąd podczas dodawania nowego stolika');
            }
        } catch (error) {
            console.error('Błąd podczas dodawania nowego stolika:', error);
        }
    };

    const handleDeleteTable = async (tableId) => {
        try {
          const response = await fetch(`${config.endpoints.Table}/${tableId}`, {
            method: 'DELETE',
          });
    
          if (response.status === 204) {
            await fetchTableData();
          } else {
            console.error('Błąd podczas usuwania stolika');
          }
        } catch (error) {
          console.error('Błąd podczas usuwania stolika:', error);
        }
      };



    const handleDeleteWaiter = async (waiterId) => {
        try {
            const response = await fetch(`${config.endpoints.Waiter}/${waiterId}`, {
                method: 'DELETE',
            });

            if (response.status === 204) {
                await fetchWaiterData();
            } else {
                console.error('Błąd podczas usuwania kelnera');
            }
        } catch (error) {
            console.error('Błąd podczas usuwania kelnera:', error);
        }
    };




    const handleAddWaiter = async () => {
        try {
            console.log("Próba dodawania Waitera")
            const updatedWaiter = {
                waiterName: newWaiter.waiterName,
                waiterSurname: newWaiter.waiterSurname,
                waiterLogin: newWaiter.waiterLogin,
                waiterPassw: newWaiter.waiterPassw,
                restaurantId: restaurantId,
            };

            console.log(updatedWaiter);

            const updateResponse = await fetch('http://localhost:5111/api/Waiter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedWaiter),
            });

            if (updateResponse.status === 201) {
                setIsAddWaiterModalVisible(false);
                setNewWaiter({
                    waiterName: '',
                    waiterSurname: '',
                    waiterLogin: '',
                    waiterPassw: '',
                });
                fetchWaiterData();
            } else {
                console.error('Błąd podczas dodawania nowego kelnera');
            }
        } catch (error) {
            console.error('Błąd podczas dodawania nowego kelnera:', error);
        }
    };


    const handleAddProduct = async () => {
        try {
            const updatedProduct = {
                productName: newProduct.productName,
                productDescription: newProduct.productDescription,
                productPrice: newProduct.productPrice,
                productStatus: newProduct.productStatus,
                productCategory: newProduct.productCategory,
                imageUrl: newProduct.imageUrl,
                restaurantId: restaurantId,
            };

            console.log(updatedProduct);

            const updateResponse = await fetch(config.endpoints.Product, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });

            if (updateResponse.status === 201) {
                setIsAddModalVisible(false);
                setNewProduct({
                    productName: '',
                    productDescription: '',
                    productPrice: 0,
                    productStatus: '',
                    productCategory: 0,
                    imageUrl: '',
                    restaurantId: '',
                });
                await fetchProductData();
            } else {
                console.error('Błąd podczas dodawania nowego produktu');
            }
        } catch (error) {
            console.error('Błąd podczas dodawania nowego produktu:', error);
        }
    };


    const handleDeleteProduct = async () => {
        try {
            const response = await fetch(`${config.endpoints.Product}/${deleteProductId}`, {
                method: 'DELETE',
            });
            console.log("Usuniete id to: " + deleteProductId);

            if (response.status === 204) {
                setIsDeleteModalVisible(false);
                setDeleteProductId(null);
                fetchProductData();
            }
            else {
                console.error('Błąd podczas usuwania produktu');
            }
        } catch (error) {
            console.error('Błąd podczas usuwania produktu:', error);
        } finally {
        }
    };

    const handleEditProduct = async () => {
        try {
            const response = await fetch(`${config.endpoints.Product}/${editProduct.productId}`, {
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
                fetchProductData();
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


    const renderWaiterItem = ({ item }) => (
        <View style={AdminPageStyles.waiterItemContainer}>
            <Text style={AdminPageStyles.waiterItemName}>{`ID: ${item.waiterId} - ${item.waiterName} ${item.waiterSurname}`}</Text>
            <TouchableOpacity
                style={AdminPageStyles.deleteButton}
                onPress={() => {
                    handleDeleteWaiter(item.waiterId);
                }}
            >
                <Text style={AdminPageStyles.deleteButtonText}>Usuń</Text>
            </TouchableOpacity>
        </View>
    );


    const renderWaiterHeader = () => (
        <View style={[AdminPageStyles.waiterHeaderContainer, AdminPageStyles.sectionContainer]}>
            <Text style={AdminPageStyles.waiterHeaderText}>Wszyscy Kelnerzy</Text>
        </View>
    );

    const renderTableItem = ({ item }) => (
        <View style={AdminPageStyles.tableItemContainer}>
          <Text style={AdminPageStyles.waiterHeaderText}>{`Table ID: ${item.tabId}, Table Number: ${item.tabNum}`}</Text>
          <TouchableOpacity
            style={AdminPageStyles.deleteButton}
            onPress={() => {
              //setIsDeleteModalVisible(true);              
             handleDeleteTable(item.tabId);
            }}
          >
            <Text style={AdminPageStyles.deleteButtonText}>Usuń</Text>
          </TouchableOpacity>
        </View>
      );

    const renderTableHeader = () => (
        <View style={[AdminPageStyles.tableHeaderContainer, AdminPageStyles.sectionContainer]}>
            <Text style={AdminPageStyles.tableHeaderText}>Wszystkie Stoliki</Text>
        </View>
    );




    return (
        <ImageBackground source={require('./photo/BG1.png')} style={[AdminPageStyles.container, { backgroundColor: 'rgba(255, 255, 255, 0.6)' }]}>
            {/* Sekcja z logiem i przyciskiem "Dodaj nowy produkt" */}
            <View style={[AdminPageStyles.sectionContainer, { backgroundColor: '#FFD983' }]}>
                <Image source={require('./photo/logo.png')} style={[AdminPageStyles.logo, { marginBottom: 15 }]} />
                <TouchableOpacity
                    style={[AdminPageStyles.addButton, { margin: 15 }]}
                    onPress={() => setIsAddModalVisible(true)}
                >
                    <Text style={AdminPageStyles.addButtonText}>Dodaj nowy produkt</Text>
                </TouchableOpacity>

                {/* Dodaj Waitera Button */}
                <TouchableOpacity
                    style={[AdminPageStyles.addButton, { margin: 15 }]}
                    onPress={() => setIsAddWaiterModalVisible(true)}
                >
                    <Text style={AdminPageStyles.addButtonText}>Dodaj Waitera</Text>
                </TouchableOpacity>


                {/* Add Table Button */}
                <TouchableOpacity
                    style={[AdminPageStyles.addButton, { margin: 15 }]}
                    onPress={() => setIsAddTableModalVisible(true)}
                >
                    <Text style={AdminPageStyles.addButtonText}>Dodaj Stolik</Text>
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

            <View style={AdminPageStyles.sectionContainer}>

                <FlatList
                    ListHeaderComponent={renderWaiterHeader}
                    data={waiterData}
                    keyExtractor={(item) => item.waiterId.toString()}
                    renderItem={renderWaiterItem}
                />

            </View>

            <View style={AdminPageStyles.sectionContainer}>
                {renderTableHeader()}
                <FlatList
                    data={tableData}
                    keyExtractor={(item) => item.tabId.toString()}
                    renderItem={renderTableItem}
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
                        style={[AdminPageStyles.modalButton, { backgroundColor: '#4CAF50' }]}
                        onPress={handleAddProduct}
                    >
                        <Text style={[AdminPageStyles.modalButtonText, { backgroundColor: '#4CAF50' }]}>Dodaj</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={AdminPageStyles.modalButton}
                        onPress={() => setIsAddModalVisible(false)}
                    >
                        <Text style={AdminPageStyles.modalButtonText}>Anuluj</Text>
                    </TouchableOpacity>
                </View>

            </Modal>

            <Modal
                visible={isAddWaiterModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsAddWaiterModalVisible(false)}
            >
                <View style={AdminPageStyles.modalContainer}>
                    <Text style={AdminPageStyles.modalHeader}>Dodaj nowego kelnera</Text>
                    <TextInput
                        style={AdminPageStyles.modalTextInput}
                        placeholder="Imię kelnera"
                        value={newWaiter.waiterName}
                        onChangeText={(text) => setNewWaiter({ ...newWaiter, waiterName: text })}
                    />
                    <TextInput
                        style={AdminPageStyles.modalTextInput}
                        placeholder="Nazwisko kelnera"
                        value={newWaiter.waiterSurname}
                        onChangeText={(text) => setNewWaiter({ ...newWaiter, waiterSurname: text })}
                    />
                    <TextInput
                        style={AdminPageStyles.modalTextInput}
                        placeholder="Login kelnera"
                        value={newWaiter.waiterLogin}
                        onChangeText={(text) => setNewWaiter({ ...newWaiter, waiterLogin: text })}
                    />
                    <TextInput
                        style={AdminPageStyles.modalTextInput}
                        placeholder="Hasło kelnera"
                        value={newWaiter.waiterPassw}
                        onChangeText={(text) => setNewWaiter({ ...newWaiter, waiterPassw: text })}
                        secureTextEntry={true}
                    />
                    <TouchableOpacity
                        style={[AdminPageStyles.modalButton, { backgroundColor: '#4CAF50' }]}
                        onPress={handleAddWaiter}
                    >
                        <Text style={[AdminPageStyles.modalButtonText, { backgroundColor: '#4CAF50' }]}>Dodaj Waitera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={AdminPageStyles.modalButton}
                        onPress={() => setIsAddWaiterModalVisible(false)}
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
                        style={[AdminPageStyles.modalButton, { backgroundColor: '#FF0000' }]}
                        onPress={handleDeleteProduct}
                    >
                        <Text style={[AdminPageStyles.modalButtonText, { backgroundColor: '#FF0000' }]}>Usuń</Text>
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
                        style={[AdminPageStyles.modalButton, { backgroundColor: '#2196F3' }]}
                        onPress={handleEditProduct}
                    >
                        <Text style={[AdminPageStyles.modalButtonText, { backgroundColor: '#2196F3' }]}>Zapisz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={AdminPageStyles.modalButton}
                        onPress={() => setIsEditModalVisible(false)}
                    >
                        <Text style={AdminPageStyles.modalButtonText}>Anuluj</Text>
                    </TouchableOpacity>
                </View>



            </Modal>

            {/* Add Table Modal */}
            <Modal
                visible={isAddTableModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsAddTableModalVisible(false)}
            >
                <View style={AdminPageStyles.addTableModalContainer}>
                    <View style={AdminPageStyles.addTableModalContent}>
                        <Text style={AdminPageStyles.addTableModalHeader}>Dodaj nowy stolik</Text>
                        <Text style={AdminPageStyles.addTableModalHeader}>Podaj numer stolika</Text>
                        <TextInput
                            style={AdminPageStyles.addTableModalTextInput}
                            placeholder="Numer stolika"
                            value={newTable.tabNum.toString()}
                            onChangeText={(text) => setNewTable({ ...newTable, tabNum: text })}
                            keyboardType="numeric"
                        />
                        <TouchableOpacity
                            style={AdminPageStyles.addTableModalButton}
                            onPress={handleAddTable}
                        >
                            <Text style={AdminPageStyles.addTableModalButtonText}>Dodaj stolik</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={AdminPageStyles.addTableModalButton}
                            onPress={() => setIsAddTableModalVisible(false)}
                        >
                            <Text style={AdminPageStyles.addTableModalButtonText}>Anuluj</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>



        </ImageBackground>
    );
};

export default AdminPage;