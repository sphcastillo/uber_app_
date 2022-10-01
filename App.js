import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from "react-redux";

// 1. Set up redux

export default function App() {
  return (
    <Provider>
      <View style={styles.container}>
        <Text>UBER!</Text>
      </View>
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
