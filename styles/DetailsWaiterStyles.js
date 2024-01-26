import { StyleSheet } from 'react-native';

const DetailsWaiterStyles = StyleSheet.create({
  container: {
    backgroundColor: '#FFD983',
  },
    discountInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        paddingHorizontal: 10,
        fontSize: 16,
      },
      discountButton: {
        backgroundColor: '#3498db',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
      },
    
      discountButtonText: {
        color: '#fff',
        fontSize: 16,
      },
});

export default DetailsWaiterStyles;