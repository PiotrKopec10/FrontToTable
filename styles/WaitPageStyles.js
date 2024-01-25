import { StyleSheet } from 'react-native';

const WaitPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gifImage: {
    width: 200,  // Dostosuj szerokość GIFa według potrzeb
    height: 200, // Dostosuj wysokość GIFa według potrzeb
    marginBottom: 20, // Dodatkowy odstęp od dołu
  },
  orderConfirmation: {
    fontSize: 18,
    fontWeight: 'bold', // Pogrubienie tekstu
    textAlign: 'center',
  },
});

export default WaitPageStyles; 