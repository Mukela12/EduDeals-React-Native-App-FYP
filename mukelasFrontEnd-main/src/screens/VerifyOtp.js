import React, { useState, useRef } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import axios from "axios";


const VerifyOtp = ({ route }) => {
    
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const otpInputs = useRef([]);
  const navigation = useNavigation();

  const focusNextInput = (index) => {
    if (otpInputs.current[index + 1]) {
      otpInputs.current[index + 1].focus();
    } else {
      const enteredOTP = otpDigits.join('');
      verifyOTP(enteredOTP);
    }
  };

  const focusPrevInput = (index) => {
    if (otpInputs.current[index - 1]) {
      otpInputs.current[index - 1].focus();
    }
  };

  const handleOtpChange = (text, index) => {
    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = text;
    setOtpDigits(newOtpDigits);

    if (text !== '') {
      focusNextInput(index);
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && otpDigits[index] === '') {
      focusPrevInput(index);
    }
  };

  const verifyOTP = async () => {
    const { email } = route.params;
    const enteredOTP = otpDigits.join('');

    try {
      const res = await axios.post('/auth/verify-otp', { email, enteredOTP });

      if (res.data.success) {
        navigation.replace('Login');
      } else {
        console.log('OTP verification failed:', res.data.message);
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
      <View style={{ width: '100%', height: '45%' }}>
        <View style={{ width: '100%', height: '80%' }}>
          <View style={{ width: '100%', height: '50%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 25 }}>Email Verification</Text>
            <Text style={{ fontWeight: 'light', fontSize: 15, marginTop: 5, color: '#A0AEC0' }}>Enter your OTP code</Text>
          </View>
          <View style={{ width: '100%', height: '50%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: '100%', height: '50%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
              {otpDigits.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (otpInputs.current[index] = ref)}
                  value={digit}
                  onChangeText={(text) => handleOtpChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  style={{
                    width: '13%',
                    height: '90%',
                    borderWidth: 0.5,
                    fontSize: 30,
                    backgroundColor: 'white',
                    borderColor: '#A0AEC0',
                    borderRadius: 10,
                    textAlign: 'center',
                  }}
                  keyboardType="numeric"
                  maxLength={1}
                />
              ))}
            </View>
            <View style={{ marginTop: 3, flexDirection: 'row' }}>
              <Text>Didn't Receive Code?</Text>
              <TouchableOpacity style={{ marginLeft: 1 }}>
                <Text style={{ fontWeight: 'bold', color: '#614bc3' }}>Resend</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ width: '100%', height: '15%', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
          <TouchableOpacity onPress={verifyOTP} style={{ width: '55%', height: '80%', borderRadius: 20, backgroundColor: '#614bc3', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20 }}>Verify</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Footer component goes here */}
    </SafeAreaView>
  );
};

export default VerifyOtp;
