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
});

export default CartPageStyles;