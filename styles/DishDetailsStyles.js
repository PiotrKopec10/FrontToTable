import { StyleSheet } from 'react-native';

const DishDetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 16,
    backgroundColor: '#FFD983',
  },
  dishSectionContainer: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 16,
  },
  dishImageContainer: {
    flex: 1,
    marginRight: 16,
  },
  dishImageWrapper: {
    alignItems: 'center',
    marginBottom: 80, 
    marginTop: 50,
  },
  dishImage: {
    width: '700px', 
    height: '500px',
    resizeMode: 'contain',
  },
  dishInfoContainer: {
    flex: 1,
    paddingLeft: 16,
  },
  dishBorder: {
    borderWidth: 2,
    borderRadius: 8,
    alignItems: 'center',
    borderColor: '#FFD983',
    backgroundColor: 'rgba(255, 217, 131, 0.2)',
    padding: 16,
  },
  dishName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'left',
    color: 'white',
  },
  dishPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginBottom: 16,
    textAlign: 'left',
  },
  additionalInfo: {
    fontSize: 18,
    color: '#FFD983',
    textAlign: 'left',
  },
  addToMenuButton: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    position: 'absolute',
    right: 8,
    bottom: 8,
  },
  photo: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  addToMenuText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  goBackButton: {
    flexDirection: 'row',
    position: 'absolute',
    left: 16,
    bottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  paymentMethodImage: {
    height: 40,
    width: 40,
    tintColor: 'black' 
  },

  backgroundImage: {
    position: 'absolute',
    width: '120',
    height: '120',
    resizeMode: 'cover',
    backgroundColor:'white',
  },
  toCartButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 999,
  },
  
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    
  },
  
  cartImage: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  
  cartText: {
    fontSize: 16,
    color: '#000',
    marginRight: 10,
  },
});

export default DishDetailsStyles;