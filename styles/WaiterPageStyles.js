import { StyleSheet } from 'react-native';

const WaiterPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFD983',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  orderItemContainer: {
    flex: 1,
    margin: 8,
    padding: 16,
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: '#FFD983',
    marginBottom: 16, 
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  orderStatus: {
    fontSize: 14,
    color: '#888',
  },
  tableId: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  orderComment: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  orderDate: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  acceptedOrder: {
    color: 'green', 
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
  newOrder: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    color: 'blue'
  },
  newOrderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 8,
  },
  acceptButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  sectionHeader: {
    backgroundColor: '#FFD983',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContent: {
    padding: 16,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#FFD983',
  }, 
  readyButton:
  {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,

  },
  readyButtonText:
  {
    color: 'white',
    fontWeight: 'bold',

  }
});

export default WaiterPageStyles;