import { StyleSheet } from 'react-native';

const HomePageStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    padding: 16,
    backgroundColor: '#FFD983',
  },
  menuContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: 'transparent', 
  },
  footerContainer: {
    padding: 16,
    alignItems: 'flex-end',
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
  categoryButtonText: {
    fontSize: 16,
    fontWeight: 'bold', 
  },
  menuItemContainer: {
    flex: 1,
    margin: 8,
    padding: 16,
    borderWidth: 2,
    borderRadius: 8,
    alignItems: 'center',
    borderColor: '#FFD983', 
    backgroundColor: 'rgba(255, 217, 131, 0.2)', 
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
    color: '#FFD983', 
  },
  menuItemPrice: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  order: {
    width: 95,
    height: 95,
    alignSelf: 'center',
  },
  orderContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  orderText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  logotext: {
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  sectionContainer: {
    marginBottom: 16,
  },
  loginMessageContainer: {
    position: 'absolute',
    marginTop: 6, 
    right: 10, 
  },

  loginMessageText: {
    fontSize: 16,
    color: '#454545',
    fontWeight: 'bold',
  },

  cancelOrderContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#DDDDDD',
    position: 'absolute',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 2, 
    marginLeft: 10, 
  },

  cancelOrderText: {
    fontSize: 16,
    color: '#333333',
  },
});

export default HomePageStyles;