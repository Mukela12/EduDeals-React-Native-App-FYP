import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CheckLogin = () => {
  const navigation = useNavigation();

  // Replace this with your actual authentication check logic
  const isUserLoggedIn = false;

  useEffect(() => {
    const checkLoginStatus = async () => {
      if (isUserLoggedIn) {
        navigation.replace('StudentHomeScreen');
      } else {
        navigation.replace('GetStarted');
      }
    };

    checkLoginStatus();
  }, [navigation, isUserLoggedIn]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default CheckLogin;
