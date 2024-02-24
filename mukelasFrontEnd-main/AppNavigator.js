import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import  MaterialCommunityIcons  from 
'react-native-vector-icons/MaterialCommunityIcons';

import StudentCreateAccount from './src/screens/StudentCreateAccount';
import StudentLogin from './src/screens/StudentLogin';
import StudentHomeScreen from './src/screens/StudentHomeScreen';
import VerifyOtp from './src/screens/VerifyOtp';
import GetStarted from './src/screens/GetStarted';
import BusinessLogin from './src/screens/BusinessLogin';
import BusinessProfile from './src/screens/BusinessProfile';
import BusinessCreateAccount from './src/screens/BusinessCreateAccount';
import StoreScreen from './src/screens/StoreScreen';
import StudentProfile from './src/screens/StudentProfile';
import AddTransaction from './src/screens/AddTransaction';
import StudentMonthlyCalculator from './src/screens/StudentMonthlyCalculator';
import BusinessOnboarding from './src/screens/BusinessonBoarding';
import Cartscreen from './src/screens/CartScreen';
import ProductUpload from './src/screens/ProductUpload';
import BusinessHome from './src/screens/BusinessHome';
import BusinessOrders from './src/screens/BusinessOrders';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress, name}) => {
  return (
      <TouchableOpacity 
          onPress={onPress}
          style={{
              top: -23,
              justifyContent: 'center',
              alignItems: "center",
          }}
      >
          <View 
          style={{
              width: 70,
              height: 70,
              backgroundColor: "#614BC3",
              borderRadius: 35
          }}
          className="shadow-xl">
              {children}
          </View>
          <Text style={{top:10, fontWeight: "300", color: "gray"}}>{name}</Text>
      </TouchableOpacity>
  )
}

const StudentTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({}) => ({
      headerShown: false,
      tabBarStyle: {
          position: "absolute",
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          borderTopWidth: 0,
          height: "11%",
          backgroundColor: `white`,
          ...styles.shadow,
      },
      tabBarActiveTintColor: "#614BC3",
      tabBarInactiveTintColor: "gray"
    })}>
      <Tab.Screen name="Home" component={StudentHomeScreen} options={{
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={26}/>
        ),
    }} />
      <Tab.Screen name="Transactions" component={StudentMonthlyCalculator} options={{
        tabBarLabelStyle: {
          display: "none"
        },
        tabBarIcon: ({color, size }) => (
          <MaterialCommunityIcons name='calculator' color={"white"} size={size}/>
        ),
        tabBarButton: (props) => (
          <CustomTabBarButton {...props} name="Transactions"/>
        ),
    }}/>
      <Tab.Screen name="Profile" component={StudentProfile} options={{
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle" color={color} 
size={26}/>
        ),
    }}/>
    </Tab.Navigator>
  );
};


const BusinessTabNavigator = () => {
  return (
    <Tabs.Navigator screenOptions={{headerShown: false, tabBarStyle: {
          position: "absolute",
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          borderTopWidth: 0,
          height: "11%",
          backgroundColor: `white`,
          ...styles.shadow,
      },
      tabBarActiveTintColor: "#614BC3",
      tabBarInactiveTintColor: "gray"
      }}>
      <Tabs.Screen name="Home" component={BusinessHome} options={{
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={26}/>
        ),
    }} />
      <Tabs.Screen name="Orders" component={BusinessOrders} options={{
        tabBarLabelStyle: {
          display: "none"
        },
        tabBarIcon: ({ size }) => (
            <MaterialCommunityIcons name="basket-unfill" color={"white"} 
size={26}/>
        ),
        tabBarButton: (props) => (
          <CustomTabBarButton {...props} name="Orders"/>
        ),
    }}/>
      <Tabs.Screen name="Profile" component={BusinessProfile} options={{
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle" color={color} 
size={26}/>
        ),
    }}/>
    </Tabs.Navigator>
  );
};


export const AppNavigator = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true)

  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // Check if the user is already logged in by retrieving the login status from AsyncStorage
        //const isUserLoggedInString = await AsyncStorage.getItem('isUserLoggedIn');
        //const isUserLoggedIn = isUserLoggedInString === 'true';
        // Navigate the user accordingly
        if (isUserLoggedIn) {
          // User is already logged in, navigate to StudentHomeScreen
          navigation.navigate('StudentHomeScreen');
        } else {
          // User is not logged in, show the GetStarted screen
          navigation.navigate('GetStarted');
        }
      } catch (error) {
        // Handle error, e.g., AsyncStorage error or other issues
        console.error('Error checking login status:', error);
      }
    };

    // Call the function to check login status
    checkLoginStatus();
  }, []);

  return (
      <Stack.Navigator initialRouteName="StudentHomeScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="VerifyOtp" component={VerifyOtp} screenOptions={{headerShown: false}} />
        <Stack.Screen name="BusinessHome" component={BusinessTabNavigator} />
        <Stack.Screen name="ProductUpload" component={ProductUpload} />
        <Stack.Screen name="Cartscreen" component={Cartscreen} />
        <Stack.Screen name="GetStarted" component={GetStarted} />
        <Stack.Screen name="StudentCreateAccount" component={StudentCreateAccount} />
        <Stack.Screen name="StudentLogin" component={StudentLogin} />
        <Stack.Screen name="StudentHome" component={StudentTabNavigator} />
        <Stack.Screen name="StoreScreen" component={StoreScreen} />
        <Stack.Screen name="BusinessCreateAccount" component={BusinessCreateAccount} />
        <Stack.Screen name="BusinessProfile" component={BusinessProfile} />
        <Stack.Screen name="BusinessLogin" component={BusinessLogin} />
        <Stack.Screen name="StudentProfile" component={StudentProfile} />
        <Stack.Screen name="AddTransaction" component={AddTransaction} />
        <Stack.Screen name="BusinessOnboarding" component={BusinessOnboarding} />
        <Stack.Screen name="StudentHomeScreen" component={StudentHomeScreen} />
      </Stack.Navigator>
  );
};

export default AppNavigator; // Ensure to export AppNavigator as the default export

const styles = StyleSheet.create({
  shadow: {
      shadowColor: "#7F5DF0",
      shadowOffset: {
          width: 0,
          height: 10
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 5
  }
});
