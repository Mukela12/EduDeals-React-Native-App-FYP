import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import Ionicons from
 
'@expo/vector-icons/Ionicons';
import AsyncStorage from"@react-native-async-storage/async-storage";
import client from '../API/client';


import { useNavigation } from
 
'@react-navigation/native';

const ProductUpload = async() => {
  const navigation = useNavigation();

  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [businessID, setBusinessID] = useState(AsyncStorage.getItem('businessID'));

  const handleUpload = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert('Permission Denied', 'You need to grant permission to access the photo library.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });

      if (!result.cancelled) {
        setProductImage(result.base64);
      }
    } catch (error) {
      console.error('Error selecting image:', error.message);
    }
  };



  const handleSubmit = async () => {
    try {

      if (!productName || !productPrice || !productImage) {
        Alert.alert('Error', 'Please fill in all fields.');
        return;
      }

      // Send data to the backend using Axios
      const response = await client.post('/prod/addproduct', {
        businessID,
        productname: productName,
        productprice: productPrice,
        productImage: productImage,
      });

      console.log('Backend response:', response.data);

      // Handle the response or navigate to another screen as needed

    } catch (error) {
      console.error('Error sending data to the backend:', error.message);
    }
  };


  return (
    <View className="w-full h-full flex items-center justify-center bg-white">

        <TouchableOpacity className="absolute z-50 w-[40px] left-3 top-14 h-[40px] shadow border-[0.5px] border-gray-300 rounded-xl bg-white flex items-center justify-center" onPress={() => {
          navigation.goBack()
        }}>
            <Ionicons name='chevron-back'size={25} color="black"/>
        </TouchableOpacity>

      <View className="w-full h-[90%]">

      <View className="w-full h-[35%] items-center justify-center mb-[-20%]">
      <Image 
    source={require("../../assets/images/eduDealsLogo.png")}
    className="w-[50%] h-[50%] object-cover"
      />
    </View>
        <View className="w-full h-[70%] flex items-center justify-center">

          <View className="w-[90%] h-[85%] border border-gray-300 shadow bg-white rounded-lg">
            <View className="w-full h-[15%] flex items-center justify-center">
              <Text className="font-bold text-[20px]"> Add Product</Text>
            </View>
            <View className="w-full h-[45%] flex items-center justify-evenly">
              <TextInput
                value={productname}
                onChangeText={(text) => setProductName(text)}
                className="w-[80%] h-[25%] bg-white shadow border-[0.5px] font-normal border-gray-300 rounded-2xl px-3"
                placeholder='Product Name'
              />
                <TextInput
                  value={productprice}
                  onChangeText={(text) => setProductPrice(text)}
                  className="w-[80%] h-[25%] bg-white shadow border-[0.5px] font-normal border-gray-300 rounded-2xl px-3"
                  placeholder='Product Price'
                  keyboardType="numeric"
                />
              
            </View>

            <View className="w-[60%] h-[20%] shadow border-[0.5px] border-gray-300 bg-gray-100 rounded-xl mx-auto mt-2 flex flex-col items-center">
              <TouchableOpacity onPress={handleUpload} className="items-center justify-center pt-1">
              <FontAwesome name="upload" size={50} color="black"/>
                   <Text className="text-center text-gray-500 pt-3">Upload Product Image</Text>
              </TouchableOpacity>                
           </View>

            <View className="w-full h-[25%] flex items-center justify-center pt-1">
              <TouchableOpacity onPress={handleSubmit} className="w-[55%] h-[35%] rounded-2xl mt-[-10%] bg-[#614BC3] items-center justify-center">
                <Text className="font-extrabold text-[15px] uppercase text-white">Add Product</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

}

export default ProductUpload;
