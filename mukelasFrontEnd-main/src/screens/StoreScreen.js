import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';

const StoreScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ flex: 2 / 3, flexDirection: 'column', alignItems: 'flex-start', paddingLeft: 20, paddingBottom: 5 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 25, paddingTop: 25,paddingBottom: 10 }}>Apple Store</Text>
          <Text style={{ width: '60%', textAlign: 'justify', fontSize: 14, color: '#888' }}>
            This is an Apple store description. Please take it seriously. I am tired, fix this.
          </Text>
        </View>
        <View style={{ flex: 1 / 3, alignItems: 'center', justifyContent: 'center' }}>
          <View
            style={{
              width: 80,
              height: 80,
              backgroundColor: '#ccc',
              borderRadius: 40,
              overflow: 'hidden',
            }}
          >
            <Image
              style={{ width: '100%', height: '100%' }}
              source={{ uri: 'https://res.cloudinary.com/dgdbxflan/image/upload/v1701799402/qar2fp2mhgruxqstysrz.jpg' }}
            />
          </View>
        </View>
      </View>
      <View style={{ flex: 20 / 4 }}>
        <View style={{ flex: 1 / 10, paddingLeft: 15, justifyContent: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Products on Promo</Text>
        </View>
        <View style={{ flex: 9 / 10, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10, paddingVertical: 10, paddingBottom: 10}}>
          <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }} style={{ width: '100%' }}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <View key={item} style={{ width: '45%', height: 200, marginVertical: 10, marginHorizontal: 5 }}>
                <Image
                  style={{ width: '100%', height: '60%', borderRadius: 8}}
                  source={{ uri: 'https://res.cloudinary.com/dgdbxflan/image/upload/v1701799402/qar2fp2mhgruxqstysrz.jpg' }}
                />
                <View style={{ padding: 10 }}>
                  <Text style={{ fontSize: 14, fontWeight: 'bold' }}>Product {item}</Text>
                  <Text style={{ fontSize: 12, color: '#888' }}>$19.99</Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#614bc3',
                      padding: 8,
                      borderRadius: 5,
                      marginTop: 5,
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ color: 'white', fontSize: 12 }}>Add to Cart</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StoreScreen;
