import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import client from '../API/client';
import Footer from '../components/Footer';

const StudentCreateAccount = ({ navigation }) => {
  const [visible, setVisible] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);


  const signIn = async () => {
    navigation.navigate('StudentLogin');

  }

  const signUp = async () => {
   
    const role = "user";

    try {
      
          // Email validation rules
    const emailRegex = /^[a-zA-Z]{3}\d{7}@(xmu\.edu\.my|taylors\.edu\.my)$/;

    if (!emailRegex.test(email)) {
      // Display an error message to the user if the email is invalid
      console.error('Invalid email format');
      return;
    }
    

        const res = await client.post('/auth/create-user', {
            firstname: firstName,
            lastname: lastName,
            email,
            password,
        });
    
        console.log('Response from create-user:', res.data);
    
        if (res.data.success) {
          await new Promise(resolve => setTimeout(resolve, 1000));


          const isVerifyOtpScreenExist =
          navigation.getState()?.routeNames.includes('VerifyOtp');

        if (isVerifyOtpScreenExist) {
          navigation.replace('VerifyOtp', { email });
        } else {
          console.error("VerifyOtp screen doesn't exist in the navigation stack");
          // Handle this case, maybe navigate to another screen or show an error message
        }
        }


    } catch (error) {
      console.error('Error signing up:', error);
      // Handle error, e.g., display an error message to the user
    }
  };

  return (
    <View className="w-full h-full flex items-center justify-center bg-white">
      <View className="w-full h-[80%] flex items-center justify-center">
        <View className="w-full h-[23%] flex items-center justify-center">
          <Image source={require("../../assets/images/eduDealsLogo.png")} />
        </View>
        <View className="w-[90%] h-[77%] rounded-lg shadow border-[0.5px] border-gray-100 bg-white">
          <View className="w-full h-[10%] flex items-center justify-center">
            <Text className="font-bold text-[20px]">Create Account</Text>
          </View>
          <View className="w-full h-[70%] flex items-center justify-evenly">
            <TextInput
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              className="w-[80%] h-[13%] bg-white shadow border-[0.5px] font-normal border-gray-300 rounded-2xl px-3"
              placeholder='Enter First Name'
            />
            <TextInput
              value={lastName}
              onChangeText={(text) => setLastName(text)}
              className="w-[80%] h-[13%] bg-white shadow border-[0.5px] font-normal border-gray-300 rounded-2xl px-3"
              placeholder='Enter Last Name'
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              className="w-[80%] h-[13%] bg-white shadow border-[0.5px] font-normal border-gray-300 rounded-2xl px-3"
              placeholder='Enter your Student Email'
            />
            <TextInput
              value={studentId}
              onChangeText={(text) => setStudentId(text)}
              className="w-[80%] h-[13%] bg-white shadow border-[0.5px] font-normal border-gray-300 rounded-2xl px-3"
              placeholder='Student ID'
            />
            <View className="w-[80%] h-[13%] shadow rounded-2xl flex flex-row">
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                className="w-[85%] h-full bg-white font-normal border-[0.5px] border-gray-300 rounded-l-2xl px-3"
                placeholder='Password'
                secureTextEntry={!visible}
              />
              <View className="w-[15%] h-full bg-white shadow border-[0.5px] border-gray-300 rounded-r-2xl flex items-center justify-center">
                <TouchableOpacity onPress={() => { setVisible(!visible) }}>
                  <MaterialIcons name={visible ? "visibility" : "visibility-off"} size={20} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View className="w-full h-[20%] flex items-center justify-start">
            <TouchableOpacity onPress={signUp} className="w-[55%] h-[50%] bg-[#614BC3] rounded-2xl flex items-center justify-center">
              <Text className="text-[20px] font-bold text-white">Sign Up</Text>
            </TouchableOpacity>
            <View className="w-full h-[20%] mt-1 flex flex-row items-center justify-center">
              <Text>Already have an Account?</Text>
              <TouchableOpacity onPress={signIn} className="ml-1">
                <Text className="font-bold text-[#614bc3]">Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <Footer />
    </View>
  );
}

export default StudentCreateAccount;
