import { StyleSheet } from 'react-native';

const CartPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFD983',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#171716',
  },
  separator: {
    height: 2.5,
    backgroundColor: '#171716',
    marginTop: 3,
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  columnHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  columnName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    paddingLeft: 80,
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
  itemTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#171716',
  },
  totalContainer: {
    margin: 16,
  },
  totalLabel: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#171716',
  },
  totalValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#171716',
    paddingBottom: 10, 
  },
  orderButton: {
    marginTop: 16,
    backgroundColor: '#171716',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  orderButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  noteButton: {
    backgroundColor: '#FFD983',
    padding: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
  noteButtonText: {
    color: '#171716',
    fontWeight: 'bold',
    fontSize: 14,
  },
  dishImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 10,
  },
  paymentModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  paymentMethodButton: {
    backgroundColor: '#171716',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: 'row', 
    alignItems: 'center',
  },
  paymentMethodImage: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  paymentMethodButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalButton: {
    backgroundColor: '#FFD983',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  modalButtonText: {
    color: '#171716',
    fontSize: 18,
    fontWeight: 'bold',
  },
  blikCodeInput: {
    width: 200,
    height: 40,
    textAlign: 'center',
    borderWidth: 1.5,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    color:'#FFFFFF'
  }
});

export default CartPageStyles;