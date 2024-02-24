import { View, Text, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const AddTransaction = () => {
    const [active, setActive] = useState("expense")
    const navigation = useNavigation();

  return (
    <SafeAreaView className={`flex-1 relative`}>
        <View className={`w-full h-[10%] flex flex-row`}>
            <TouchableOpacity className={`w-[15%] h-full flex items-center justify-center`} onPress={() => {
                navigation.goBack()
            }}>
                <Ionicons name='chevron-back' size={30} />
            </TouchableOpacity>
            <View className={`w-[85%] h-full flex items-start justify-center px-2`}>
                <Text className={`font-bold text-[25px]`}>Add Transactions</Text>
            </View>
        </View> 
        <View className={`w-full h-[10%] flex flex-row items-center justify-evenly`}>
            <TouchableOpacity className={`w-[30%] h-[50%] ${active === "expense" ? "bg-purple-50" : ""} rounded-full flex items-center justify-center`} onPress={() => {
                setActive("expense")
            }}>
                <Text className={`font-bold text-[16px]`}>Expense</Text>
            </TouchableOpacity>
            <TouchableOpacity className={`w-[30%] h-[50%] ${active === "income" ? "bg-purple-50" : ""} rounded-full flex items-center justify-center`} onPress={() => {
                setActive("income")
            }}>
                <Text className={`font-bold text-[16px]`}>Income</Text>
            </TouchableOpacity>
        </View>
        <View className={`w-full h-[40%] flex items-center justify-center`}>
        {
            active === "expense"
            ?
            <View className={`w-[90%] h-full flex items-center justify-center`}>
                <TextInput 
                    className={`w-[90%] h-[20%] bg-white rounded-2xl px-2 font-semibold shadow border-[0.25px] border-gray-300`}
                    placeholder="What did you spend on?"
                />
                <TextInput 
                    className={`w-[90%] h-[20%] bg-white rounded-2xl mt-2 px-2 font-semibold shadow border-[0.25px] border-gray-300`}
                    placeholder="Enter Category. e.g: Food, Tra..."
                />
                <TextInput 
                    className={`w-[90%] h-[20%] bg-white rounded-2xl mt-2 px-2 font-semibold shadow border-[0.25px] border-gray-300`}
                    placeholder="Enter Price"
                />
            </View>
            :
            <View className={`w-[90%] h-full flex items-center justify-center`}>
                <TextInput 
                    className={`w-[90%] h-[20%] bg-white rounded-2xl px-2 font-semibold shadow border-[0.25px] border-gray-300`}
                    placeholder="Source of Income"
                />
                <TextInput 
                    className={`w-[90%] h-[20%] bg-white rounded-2xl mt-2 px-2 font-semibold shadow border-[0.25px] border-gray-300`}
                    placeholder="Enter Amount"
                />
            </View>
        }
        </View>
        <View className={`absolute w-full h-[10%] flex items-center justify-center bottom-20`}>
    <TouchableOpacity className={`w-[55%] h-[80%] shadow border-[0.25px] border-[#614bc3] rounded-2xl flex items-center justify-center bg-[#614bc3] mb-4`}>
        <Text className={`font-bold text-[20px] text-white`}>{active === "expense" ? "Add Expense" : "Add Income"}</Text>
    </TouchableOpacity>
</View>
    </SafeAreaView>
  )
}

export default AddTransaction;