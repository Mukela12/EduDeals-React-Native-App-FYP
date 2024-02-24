import React from 'react';
import { AppNavigator } from './AppNavigator';
import { Provider } from "react-redux";
import { NavigationContainer } from '@react-navigation/native';
import { store } from './store';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  )
}
