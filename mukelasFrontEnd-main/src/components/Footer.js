import { View, Text } from 'react-native'
import React from 'react'

const Footer = () => {

    const year = new Date().getFullYear();
  return (
    <View className="absolute bottom-0 h-[6%] w-full flex items-center">
        <Text className="text-gray-600 font-normal text-[12px]">©{year} Mukela Katungu. All Rights Reserved.</Text>
    </View>
  )
}

export default Footer;