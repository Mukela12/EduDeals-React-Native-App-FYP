import { View, Text, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Dimensions, Image } from 'react-native'
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';

import testImage from "../../assets/images/test.jpeg";

const InternationalDealsComponent = (props) => {

   const { width, height } = Dimensions.get('window');

    return (
      <TouchableOpacity className={`w-[200px] h-[95%] flex items-center justify-center`}>
        <View className={`w-[90%] h-[65%] rounded-md shadow border-[0.25px] border-gray-300 bg-white flex items-center justify-center`}>
          <Image source={testImage} className="w-full h-full object-cover rounded-md"/>
        </View>
        <View className={`w-[90%] h-[35%] flex items-start justify-center`}>
          <View className={`w-full h-[50%] flex items-start justify-center`}>
            <Text className={`font-bold text-[25px]`}>{props.store}</Text>
          </View>
          <View className={`w-full h-[50%] flex items-start justify-start`}>
            <Text className={`font-light text-[15px]`}>{props.category}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
}

const LocalDealsComponent = (props) => {
  const { width, height } = Dimensions.get('window');

  return (
    <TouchableOpacity className={`w-[200px] h-[95%] flex items-center justify-center`}>
      <View className={`w-[90%] h-[65%] rounded-md shadow border-[0.25px] border-gray-300 bg-white flex items-center justify-center`}>
        <Image source={testImage} className="w-full h-full object-cover rounded-md"/>
      </View>
      <View className={`w-[90%] h-[35%] flex items-start justify-center`}>
        <View className={`w-full h-[50%] flex items-start justify-center`}>
          <Text className={`font-bold text-[25px]`}>{props.store}</Text>
        </View>
        <View className={`w-full h-[50%] flex items-start justify-start`}>
          <Text className={`font-light text-[15px]`}>{props.category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const FeaturedDealsComponent = (props) => {
  
  return (
    <TouchableOpacity className={`w-[200px] h-[95%] flex items-center justify-center mr-5`}>
      <View className={`w-[90%] h-[90%] rounded-md shadow border-[0.25px] border-gray-300 bg-white`}>
        <View className={`w-full h-[75%] flex items-center justify-center`}>  
          <Image source={testImage} className="w-full h-full object-cover rounded-t-md"/>
        </View>
        <View className={`w-full h-[25%]`}>
          <View className={`w-full h-[50%] flex items-center justify-center`}>
            <Text className={`font-bold text-sm`}>{props.product}</Text>
          </View>
          <View className={`w-full h-[50%] flex items-center justify-center`}>
            <Text className={`font-normal text-lg text-green-500`}>{props.price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const StudentHomeScreen = async () => {
  const navigation = useNavigation();
  const token = await AsyncStorage.getItem('authToken');
   
  return (
    <SafeAreaView className="w-full h-[90%]">
        <View className={`w-full h-[8%] mt-1 mb-3 px-2 rounded-l-2xl flex flex-row items-center justify-between`}>
          <View className={`w-fit h-fit flex flex-row`}>
            <Text className="text-[30px] font-bold text-gray-600">Edu</Text>
            <Text className="text-[30px] font-bold text-[#614BC3]">Deals</Text>
          </View>
          <TouchableOpacity className="w-[40px] h-[40px] flex items-center justify-center" onPress={() => {
             navigation.navigate("Cartscreen")
          }}>
            <Ionicons name='cart-outline' size={25} color="black"/>
          </TouchableOpacity>
        </View>

        <View className={`flex-1`}>
          <ScrollView showsVerticalScrollIndicator={false} className={`w-full`}>
            <View className={`w-full h-[300px] flex items-center justify-center`}>
              <View className={`w-full h-[12%] flex items-start px-2 justify-center`}>
                <Text className={`font-bold text-[20px]`}>Explore International Deals</Text>
              </View>
              <View className={`flex-1 w-full h-[88%]`}>
                <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{alignItems:"center", justifyContent: "center"}} className={`h-full`} horizontal={true}>
                  {internatialDealData.map((deal, index) => (
                    <InternationalDealsComponent 
                      key={deal.store}
                      index={index}
                      {...deal}
                    />
                  ))}
                </ScrollView>
              </View>
            </View>
            <View className={`w-full h-[300px] flex items-center justify-center`}>
              <View className={`w-full h-[12%] flex items-start px-2 justify-center`}>
                <Text className={`font-bold text-[20px]`}>Explore Local Deals</Text>
              </View>
              <View className={`flex-1 w-full h-[88%]`}>
                <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{alignItems:"center", justifyContent: "center"}} className={`h-full`} horizontal={true}>
                  {localDealData.map((deal, index) => (
                    <LocalDealsComponent 
                      key={deal.store}
                      index={index}
                      {...deal}
                    />
                  ))}
                </ScrollView>
              </View>
            </View>
            <View className={`w-full h-[300px] flex items-center justify-center`}>
              <View className={`w-full h-[12%] flex items-start px-2 justify-center`}>
                <Text className={`font-bold text-[20px]`}>Featured Deals</Text>
              </View>
              <View className={`flex-1 w-full h-[88%]`}>
                <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{alignItems:"center", justifyContent: "center"}} className={`h-full`} horizontal={true}>
                  {featuredDealData.map((deal, index) => (
                    <FeaturedDealsComponent 
                      key={deal.product}
                      index={index}
                      {...deal}
                    />
                  ))}
                </ScrollView>
              </View>
            </View>
          </ScrollView>
        </View>
    </SafeAreaView>
  )
}

export default StudentHomeScreen;

const internatialDealData = [
  {
    store: "Apple",
    category: "Electronic Devices"
  },
  {
    store: "Samsung",
    category: "Electronic Devices"
  },
  {
    store: "Book World",
    category: "Electronic Devices"
  },
]

const localDealData = [
  {
    store: "ZUS Coffee",
    category: "Coffee Brewer",
  },
  {
    store: "Lotus",
    category: "Grocery Store",
  },
  {
    store: "Grab",
    category: "Ride Hailing Service",
  },
]

const featuredDealData = [
  {
    product: 'Macbook Air 13"',
    price: "RM 3500",
    store: "Apple"
  },
  {
    product: 'iPad Air',
    price: "RM 2500",
    store: "Apple"
  },
  {
    product: 'Flat White Coffee',
    price: "RM 3.50",
    store: "Zus Coffee"
  },
  {
    product: 'Pink Black',
    price: "RM 5.50",
    store: "Zus Coffee"
  },
]