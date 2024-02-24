import { View, Text, TouchableOpacity } from 'react-native'
import Ionicons from "@expo/vector-icons/Ionicons";

const BackButton = () => {
  return (
    <View className="w-full h-[20%] flex flex-row items-center">
        <TouchableOpacity className="flex flex-row items-center justify-center">
            <Ionicons name='chevron-back' size={30} color="black"/>
            <Text className="font-bold text-[18px]">Back</Text>
        </TouchableOpacity>
    </View>
  )
}

export default BackButton;