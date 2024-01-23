import { StyleSheet } from 'react-native';

const CartPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  tableContainer: {
    flex: 1,
    marginTop: 16
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  columnName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dishImage: {
    width: 50,
    height: 50,
    marginRight: 16,
    resizeMode: 'contain',
  },
  dishName: {
    fontSize: 16,
    fontWeight: 'bold',
    flexShrink: 1, // Adjust this line
    textAlign: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginHorizontal: 8,
  },
  arrowButtonText: {
    fontSize: 16,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 4,
    marginHorizontal: 8,
    textAlign: 'center',
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  noteButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginHorizontal: 8,
  },
  noteButtonText: {
    fontSize: 16,
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    marginTop: 24,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 24,
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartPageStyles;