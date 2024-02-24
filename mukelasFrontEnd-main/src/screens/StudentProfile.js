import { View, Text, Image, TouchableOpacity } from 'react-native'
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { BlurView } from "expo-blur";
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StudentProfile = async () => {
    const [ visible, setVisible ] = useState(false);
    
    const token = await AsyncStorage.getItem('authToken');
    
    

  return (
    <View className='relative w-full h-full flex items-center'>
      <View className={`${visible ? "flex" : "hidden"} absolute transition-all top-0 bottom-0 left-0 right-0 z-20`}>
        <BlurView intensity={60} tint="light" className={`w-full h-full items-center justify-center`}>
            <View className="w-[90%] h-[25%] rounded-xl bg-white shadow border-[0.25px] border-gray-300 flex items-center justify-center">
                <View className="w-[80%] h-[30%] px-2">
                    <Text className="font-bold text-[20px] text-center">Are you Sure you want to log out?</Text>
                </View>
                <View className="w-full h-[20%] flex flex-row items-center justify-evenly">
                    <TouchableOpacity className="w-[20%] h-[90%] rounded-lg flex items-center justify-center bg-[#614bc3]">
                        <Text className="font-bold text-white text-[18px]">Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="w-[20%] h-[90%] rounded-lg flex items-center justify-center bg-[#222831]" onPress={() => {
                        setVisible(!visible)
                    }}>
                        <Text className="font-bold text-white text-[18px]">No</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </BlurView> 
      </View>  
      <View className="relative w-full h-[35%] bg-[#614bc3] flex items-center justify-end">
        <View className="w-[80%] h-[60%] mb-5 flex items-center justify-center">
            <View className="w-full h-[50%] flex items-center justify-center">
                <View className="w-[90px] h-[90px] border-4 border-white bg-black rounded-full flex items-center justify-center">
                    
                </View>
            </View>
            <View className="w-full h-[20%] flex items-center justify-center">
                <Text className='font-bold text-white text-[20px]'>Mukela Katungu</Text>
            </View>
        </View>
      </View>
      <View className="w-full h-[50%] px-4">
            <TouchableOpacity className="w-full h-1/5 flex flex-row items-center justify-between px-4">
                <View className="flex flex-row items-center gap-1">
                    <MaterialIcons name="notifications" size={25}/>
                    <Text className="font-semibold text-[15px]">Notifications</Text>
                </View>
                <View>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name="toggle-switch-outline" size={30} color="black"/>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
            <TouchableOpacity className="w-full h-1/5 flex flex-row items-center justify-between px-4" onPress={() => {
                setVisible(!visible)
            }}>
                <View className="flex flex-row items-center gap-1">
                    <MaterialIcons name="logout" size={25}/>
                    <Text className="font-semibold text-[15px]">Log Out</Text>
                </View>
                <View>
                    <TouchableOpacity>
                        <Ionicons name="chevron-forward" size={20} color="gray"/>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
      </View>
    </View>
  )
}

export default StudentProfile;