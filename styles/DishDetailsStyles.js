import { StyleSheet } from 'react-native';

const DishDetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFD983',
    position: 'relative',
  },

  dishImage: {
    width: 500,
    height: 500,
    resizeMode: 'contain',
  },
  detailsContainer: {
    flex: 1,
    paddingLeft: 16,
    justifyContent: 'center',
  },
  dishName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'left',
  },
  dishCategory: {
    fontSize: 18,
    color: '#555',
    marginBottom: 8,
    textAlign: 'left',
  },
  dishPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginBottom: 16,
    textAlign: 'left',
  },
  additionalInfo: {
    fontSize: 16,
    color: '#888',
    textAlign: 'left',
  },
  addToMenuButton: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    position: 'absolute',
    right: 8,
    bottom: 8,
    
  },
  photo: {
    width: 90,
    height: 90,
  },
  addToMenuText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  goBackButton: {
    position: 'absolute',
    left: 16,
    bottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 70,
    height: 70,
    tintColor: '#171716',
  },
  
});

export default DishDetailsStyles;
