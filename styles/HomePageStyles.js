import { StyleSheet } from 'react-native';

const HomePageStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginRight: 8,
    padding: 8,
    borderWidth: 2,
    borderRadius: 8,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  categoryButton: {
    flex: 1,
    marginRight: 8,
    padding: 8,
    borderWidth: 2,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCategoryButton: {
    backgroundColor: 'rgba(25, 15, 30, 0.5)',
  },
  menuItemContainer: {
    flex: 1,
    margin: 8,
    padding: 16,
    borderWidth: 2,
    borderRadius: 8,
    alignItems: 'center',
  },
  menuItemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  menuItemPrice: {
    fontSize: 14,
    color: '#888',
  },

  logo: {
    width: 95,
    height: 95,  
    alignSelf: 'flex-end', 
  },
  logotext: {
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
});

export default HomePageStyles;