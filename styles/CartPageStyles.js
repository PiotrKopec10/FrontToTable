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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 'bold',
  },

  columnName: {
    fontSize: 2,
    fontWeight: 'bold',
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
  },
  arrowButton: {
    paddingHorizontal: 8,
    backgroundColor: '#171716',
    borderRadius: 5,
    marginLeft: 6,
    marginRight: 6,
  },
  arrowButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  itemPrice: {
    fontSize: 18,
    color: '#171716',
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
  },
  totalValue: {
    fontSize: 28,
    fontWeight: 'bold',
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
});

export default CartPageStyles;