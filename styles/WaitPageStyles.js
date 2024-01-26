import { StyleSheet } from 'react-native';

const WaitPageStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: 100,
    height: 100,
  },
  orderConfirmation: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default WaitPageStyles;