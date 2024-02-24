import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native'
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { BlurView } from "expo-blur";
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const BusinessProfile = () => {
    const [ visible, setVisible ] = useState(false);
    
  return (
    <View className='relative w-full h-full flex items-center justify-between'>
      <View className={`${visible ? "flex" : "hidden"} absolute transition-all top-0 bottom-0 left-0 right-0 z-20`}>
        <BlurView intensity={50} tint="light" className={`w-full h-full items-center justify-center`}>
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
      <View className="relative w-full h-[35%]">
        <ImageBackground source={{uri: "https://res.cloudinary.com/dgdbxflan/image/upload/v1703477324/IMG_3087_fufmus.jpg"}} 
            className="w-full h-full flex items-center justify-center px-full"
        >
                    </ImageBackground>
        <View className="absolute w-[90px] h-[90px] rounded-full bg-white left-4 -bottom-12 flex items-center justify-center">
            <Image 
                source={require("../../assets/images/zusLogo.png")}
                className="object-cover"
            />
        </View>
      </View>
      <View className="w-full h-[55%]">
        <View className="w-full h-[12%] flex items-start justify-center px-5">
            <Text className="font-bold text-[25px]">Zus Coffee</Text>
        </View>
        <View className="w-full h-[20%] flex items-start justify-center overflow-scroll px-5">
            <Text className="text-justify font-light text-[15px]">A Necessity not a Luxury For many, coffee is a daily need. Specialty coffee, however, is often seen as a luxury. We started ZUS Coffee to change this perception. </Text>
        </View>
        <View className="w-full h-[28%] border-t-[0.25px] border-b-[0.25px]">
            <TouchableOpacity className="w-full h-1/2 border-t-[0.25px] border-b-[0.25px] flex flex-row items-center justify-between px-4">
                <View className="flex flex-row items-center gap-1">
                    <MaterialIcons name="notifications" size={25}/>
                    <Text className="font-semibold text-[15px]">Notifications</Text>
                </View>
                <View>
                    <TouchableOpacity>
                        <Ionicons name="chevron-forward" size={20} color="gray"/>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
            <TouchableOpacity className="w-full h-1/2 border-t-[0.25px] border-b-[0.25px] flex flex-row items-center justify-between px-4" onPress={() => {
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
    </View>
  )
}

export default BusinessProfile;