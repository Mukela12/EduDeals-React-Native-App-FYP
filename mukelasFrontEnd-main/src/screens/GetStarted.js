import { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native'

import { useNavigation } from '@react-navigation/native';

import Footer from '../components/Footer';

const GetStarted = () => {

    const [ nextToggle, setNextToggle ] = useState(false);
    const navigation = useNavigation();

    const handleSelection = (userType) => {
        
      if (userType === 'Student') {
        navigation.navigate('StudentLogin'); // Navigate to StudentLogin screen
      } else if (userType === 'Business') {
        navigation.navigate('BusinessLogin'); // Navigate to BusinessLogin screen
      }
    };

  return ( 
    <View className={`relative w-full h-full items-center justify-center bg-white`}>
      <View className={`w-full ${nextToggle ? " h-[40%]" : "h-[30%]"} flex items-center justify-center`}>
        {!nextToggle
            ?
            <Image 
            source={require("../../assets/images/eduDealsLogo.png")}
            className="w-[80%] h-[80%] object-cover"
            />
        :
            <Image 
              source={require("../../assets/images/getStarted.png")} 
              className="object-cover" 
            />
        }
      </View>
      {
        !nextToggle 
        ?
        <View className="w-full h-[30%] bg-white">
            <View className="w-full h-[66%] items-center justify-center">
                <Text className="text-[30px] font-thin tracking-wider">Welcome to</Text>
                <Text className="text-[40px] font-reg">EduDeals</Text>
            </View>
            <View className="w-full h-[34%] items-center justify-center">
                <TouchableOpacity className="w-[50%] h-[60%] shadow border  border-gray-50 bg-[#614BC3] rounded-2xl flex items-center justify-center" onPress={() => {
                    setNextToggle(!nextToggle)
                }}>
                    <Text className="font-bold text-lg text-white">Next</Text>
                </TouchableOpacity>
            </View>
        </View>
        :
        <View className="w-full h-[30%] mt-10">
            <View className="w-full h-[20%] flex items-center justify-center" >
                <Text className="font-light text-[25px] tracking-wider">Are you a...</Text>
            </View>
            <View className="w-full h-[80%] flex items-center justify-evenly">
                <TouchableOpacity onPress={() => handleSelection('Student')} className="w-[55%] h-[25%] rounded-2xl bg-[#614bc3] flex items-center justify-center">
                    <Text className="text-[20px] font-bold text-white">Student</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleSelection('Business')} className="w-[55%] h-[25%] rounded-2xl bg-[#614bc3] flex items-center justify-center">
                    <Text className="text-[20px] font-bold text-white">Business</Text>
                </TouchableOpacity>
            </View>
        </View>
      }
      <Footer />
    </View>
  )
}

export default GetStarted;