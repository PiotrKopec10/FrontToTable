import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const HomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Witaj w mojej aplikacji</Text>
      <Button
        title="Przejdź do innej strony"
        onPress={() => navigation.navigate('AnotherScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default HomePage;
