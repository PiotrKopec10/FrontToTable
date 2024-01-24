import { StyleSheet } from 'react-native';

const CartPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  detailsContainer: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 14,
    color: 'gray',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  quantity: {
    fontSize: 14,
    color: 'gray',
    marginTop: 8,
  },
  box:
  {
  display: 'flex',
  flexWrap: 'wrap',
  height: '400',
  alignContent: 'space-between',
  flexDirection: 'row',
  },
  paymentContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 16, // Dodane odstępy na dole
  },
  paymentMethodButton: { 
    alignItems: 'center',
    backgroundColor: '#4CAF50', // Dostosuj kolor tła
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 8, // Dodane odstępy między przyciskami
    height:100,
    width:'32%',
  },
  paymentMethodImage: {
    height: 40,
    width: 40,
  },
  paymentMethodButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  modalButton: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    borderRadius: 8,
    marginTop: 16,
    padding: 6,
  },
  modalButtonText: {
    color: '#333333',
  },
  
});

export default CartPageStyles;