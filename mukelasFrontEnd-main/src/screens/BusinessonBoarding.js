import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import StudentHomeScreen from './StudentHomeScreen';
import { FontAwesome } from '@expo/vector-icons';

const BusinessOnboarding = () => {
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('Electronic Device'); // Default category
  const [description, setDescription] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [logoImage, setLogoImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    // Request permission to access the user's camera roll
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  const handleLogoUpload = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log('ImagePicker Result:', result);

      if (!result.cancelled && result.assets && result.assets.length > 0) {
        // Extract the first image from the assets array
        const selectedImage = result.assets[0];
        setLogoImage(selectedImage);
        console.log('Updated logoImage:', selectedImage);
      } else {
        // If the user cancels, reset the logoImage state
        setLogoImage(null);
        console.log('Logo upload cancelled');
      }
    } catch (error) {
      console.error('Error picking image:', error);
      alert('Error picking image');
    }
  };

  const handleSubmit = async () => {
    try {
      // Check if an image is being uploaded
      if (uploading) {
        console.log('Image upload in progress. Please wait.');
        return;
      }
  
      setUploading(true);
  
      // Validate form fields
      if (!businessName || !category || !description || !discountPercentage || logoImage === null) {
        alert('Please fill in all fields and upload a logo.');
        console.log('Validation failed:', businessName, category, description, discountPercentage, logoImage);
        setUploading(false);
        return;
      }
      
  
      // Extract information from logoImage
      const localUri = logoImage.uri;
      const filename = localUri ? localUri.split('/').pop() : '';
  
      formData.append('businessName', businessName);
      formData.append('category', category);
      formData.append('description', description);
      formData.append('discountPercentage', discountPercentage);
      formData.append('file', {
        uri: localUri,
        name: filename,
        type: 'image/jpeg', // adjust the type based on the actual image type
      });
  
      // Make the HTTP request
      const response = await fetch('http://192.168.31.124:4057/biz/business-onboard', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      const data = await response.json();
  
      if (data.success) {
        console.log('Business onboarded successfully');
        navigation.navigate('BusinessHome');
      } else {
        console.error('Error in business onboarding:', data.error);
        alert(`Error in business onboarding: ${data.error}`);
        setLogoImage(null);
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      alert('Error submitting the form. Please try again.');
      setLogoImage(null);
    } finally {
      setUploading(false);
    }
  };
  

  useEffect(() => {
    console.log('Updated logoImage:', logoImage);
  }, [logoImage]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 100 }}>Business Onboarding</Text>

      <TextInput
        placeholder="Business Name"
        value={businessName}
        onChangeText={(text) => setBusinessName(text)}
        style={{ width: '80%', padding: 12, marginBottom: 16, borderColor: 'gray', borderWidth: 1, borderRadius: 8 }}
      />

      <TextInput
        placeholder="Category e.g Electronic devices"
        value={discountPercentage}
        onChangeText={(text) => setCategory(text)}
        style={{ width: '80%', padding: 12, marginBottom: 16, borderColor: 'gray', borderWidth: 1, borderRadius: 8 }}
      />

      <TextInput
        placeholder="Description"
        value={discountPercentage}
        onChangeText={(text) => setDescription(text)}
        style={{ width: '80%', padding: 12, marginBottom: 16, borderColor: 'gray', borderWidth: 1, borderRadius: 8 }}
      />
      <TouchableOpacity onPress={handleLogoUpload} className="items-center justify-center pt-1 border-black-300 bg-grey-100">
      <FontAwesome name="upload" size={50} color="black"/>
      <Text className="text-center text-gray-500 pt-4 pb-4">Upload logo Image Here</Text>
      </TouchableOpacity> 

      {logoImage && <Image source={{ uri: logoImage.uri }} style={{ width: 200, height: 200, borderRadius: 8, marginBottom: 16 }} />}

      <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: 'blue', padding: 12, borderRadius: 8 }}>
        <Text style={{ fontSize: 18, color: 'white' }}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BusinessOnboarding;
