import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';

const BusinessOrders = () => {
  const colors = ['#E0FFFF', '#E6E6FA', '#FAF0E6', '#FAFAD2']; // Add more colors as needed

  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

  const orders = [

    {
      time: '11:00',
      item: 'Iced Cheese Crème Caramel Matcha',
      user: { id: '11', name: 'Mukela', avatar: 'https://res.cloudinary.com/dgdbxflan/image/upload/v1703492411/Iced-Cheese-Cre%CC%80me-Caramel-Matcha_yxsyt1.png' },
    },
    // Add more orders as needed
  ];

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <View style={styles.timelineContainer}>
        <View style={styles.timelineDot} />
        <View style={styles.timelineLine} />
      </View>

      <View style={[styles.card, { backgroundColor: "white" }]}>
        <Text style={styles.cardTitle}>{item.item}</Text>
        <Text style={styles.cardDate}>{item.time}</Text>
        <FlatList
          contentContainerStyle={styles.userListContainer}
          data={[item.user]}
          keyExtractor={(user) => user.id}
          renderItem={({ item: user }) => (
            <View style={styles.userContainer}>
              <Image source={{ uri: user.avatar }} style={styles.userAvatar} />
              <Text style={styles.userName}>{user.name}</Text>
            </View>
          )}
          horizontal
        />
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Zus Coffee</Text>
        <Text style={styles.headerSubtitle}>Xiamen university malaysia</Text>
        {/* Add more business information as needed */}
      </View>

      <View style={styles.body}>
        <Image source={{ uri: 'https://res.cloudinary.com/dgdbxflan/image/upload/v1703477324/IMG_3087_fufmus.jpg' }} style={styles.logo} />
        {/* Add more business information as needed */}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Orders</Text>

      <FlatList
        contentContainerStyle={{ paddingHorizontal: 16 }}
        data={orders}
        ListHeaderComponent={renderHeader}
        renderItem={renderOrderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginLeft: 16,
  },
  card: {
    flex: 1,
    backgroundColor: '#614BC3',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 16,
    padding: 16,
  },
  header: {
    marginBottom: 8,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#ffffff',
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 8,
  },
  orderItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  timelineContainer: {
    width: 30,
    alignItems: 'center',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#614bc3',
    marginBottom: 8,
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: '#b4bec3',
  },
  cardTitle: {
    fontSize: 16,
    color: '#00008B',
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 12,
    color: '#00008B',
    marginBottom: 8,
  },
  userListContainer: {
    marginRight: 10,
  },
  userContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
  userAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 12,
    color: '#00008B',
  },
});

export default BusinessOrders;
