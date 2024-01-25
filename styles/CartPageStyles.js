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
    width: 135,
    height: 135,
    marginRight: 20,
  },
  detailsContainer: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 1.5,
  },
  productDescription: {
    fontSize: 14,
    color: 'gray',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 3.5,
    color: '#4CAF50',
  },
  quantity: {
    fontSize: 14,
    color: 'gray',
    marginTop: 3,
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
    marginBottom: 16, 
  },
  paymentMethodButton: { 
    alignItems: 'center',
    backgroundColor: '#4CAF50', 
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 8, 
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
  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',  
    width: '98%',
    backgroundColor: '#DDDDDD',
    borderRadius: 8,
    marginTop: 16,
    marginHorizontal: 10,
    padding: 6,
  },
  modalButtonText: {
    color: '#333333',
  },
  paymentModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: 16,
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  blikCodeInput: {
    height: 40,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingLeft: 8,
    color: '#FFFFFF',
  },

  modalButton: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    borderRadius: 8,
    marginTop: 16,
    padding: 10,
    width: '100%',
  },
  modalButtonText: {
    color: '#333333',
  },
  paymentButton: {
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    marginTop: 16,
    padding: 10,
    width: 200,
  },
  paymentButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },

  cancelPaymentButton: {
    alignItems: 'center',
    justifyContent: 'center',  
    width: 200,
    backgroundColor: '#DDDDDD',
    borderRadius: 8,
    marginTop: 16,
    marginHorizontal: 10,
    padding: 6,
  },
  cancelPaymentButtonText: {
    color: '#333333',
  },
  logo: {
    width: 95,
    height: 95,
    alignSelf: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityInput: {
    width: 40,
    height: 30,
    borderWidth: 1.5,
    borderRadius: 5,
    textAlign: 'center',
    marginLeft: 6,
    marginRight: 6,
  },
  arrowButton: {
    paddingHorizontal: 8,
    backgroundColor: '#171716',
    borderRadius: 5,
  },
  arrowButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  noteButton: {
    alignItems: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 8,
    marginTop: 18,
    marginBottom: 15,
    padding: 10,
    width: '100%',
  },
  noteButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  noteModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: 16,
  },
  noteTextInput: {
    height: 200,
    width: 400,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    padding: 8,
    color: '#FFFFFF',
  },
  noteOrderButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 16,
    width: 200,
  },
  noteOrderButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelOrderButton: {
    alignItems: 'center',
    justifyContent: 'center',  
    width: 200,
    backgroundColor: '#DDDDDD',
    borderRadius: 8,
    marginTop: 16,
    marginHorizontal: 10,
    padding: 6,
  },
  cancelOrderButtonText: {
    color: '#333333',
  },
  removeButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
    marginTop: 3.5,
    alignItems: 'center',
    width: 50,
    height: 30,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
  },
});

export default CartPageStyles;