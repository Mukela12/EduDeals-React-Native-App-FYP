import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const YearComponent = (props) => {
  
  const changeYear = () => {
    props.changeYear(props.year)
  }

  return (
    <TouchableOpacity onPress={changeYear} className={`w-full h-[55px] bg-white flex items-center justify-center border-b-[0.25px] border-gray-300`}>
      <Text className={`font-bold text-lg`}>{props.year}</Text>
    </TouchableOpacity>
  )
}

const MonthComponent = (props) => {

  const changeMonth = () => {
    props.changeMonth(props.month)
  }

  return (
    <TouchableOpacity onPress={changeMonth} className={`w-full h-[55px] bg-white flex items-center justify-center border-b-[0.25px] border-gray-300`}>
      <Text className={`font-bold text-lg`}>{props.month}</Text>
    </TouchableOpacity>
  )
}

const StudentMonthlyCalculator = () => {
  const navigation = useNavigation();

  const [transactions, setTransactions] = useState([]);
  const [spentAmount, setSpentAmount] = useState(0);
  const [earnedAmount, setEarnedAmount] = useState(0);

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const [ year, setYear ] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth)
  const [ monthDropDownVisible, setMonthDropDownVisible ] = useState(false)
  const [yearDropDownVisible, setYearDropDownVisible] = useState(false)

  useEffect(() => {
    // Fetch transactions from the backend
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://your-backend-url/api/transactions');
        const fetchedTransactions = response.data;

        // Calculate spent and earned amounts
        const spent = fetchedTransactions
          .filter(transaction => transaction.type === 'expense')
          .reduce((total, transaction) => total + transaction.amount, 0);

        const earned = fetchedTransactions
          .filter(transaction => transaction.type === 'income')
          .reduce((total, transaction) => total + transaction.amount, 0);

        setSpentAmount(spent);
        setEarnedAmount(earned);
        setTransactions(fetchedTransactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const addTransaction = async (type, amount) => {
    try {
      await axios.post('http://your-backend-url/api/transactions', { type, amount });
      // Refresh transactions after adding a new one
      const response = await axios.get('http://your-backend-url/api/transactions');
      const fetchedTransactions = response.data;

      // Calculate spent and earned amounts
      const spent = fetchedTransactions
        .filter(transaction => transaction.type === 'expense')
        .reduce((total, transaction) => total + transaction.amount, 0);

      const earned = fetchedTransactions
        .filter(transaction => transaction.type === 'income')
        .reduce((total, transaction) => total + transaction.amount, 0);

      setSpentAmount(spent);
      setEarnedAmount(earned);
      setTransactions(fetchedTransactions);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  // Calculate remaining budget
  const remainingBudget = earnedAmount - spentAmount;

  // Pie chart data
  const data = [
    {
      name: 'Spent',
      amount: spentAmount,
      color: '#FF5733',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Remaining',
      amount: remainingBudget > 0 ? remainingBudget : 0,
      color: '#4CAF50',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  const years = [];

  for(let i = currentYear; i >= 1970; i--){
    years.push(i)
  }

  const changeYear = (year) => {
    setYear(year)
    setYearDropDownVisible(false)
  }

  const changeMonth = (month) => {
    setMonth(month)
    setMonthDropDownVisible(false)
  }

  return (
    <View className="w-full h-[90%]">
      <View className={`w-full h-1/4 bg-[#614bc3]`}>
        <View className={`w-full flex items-center justify-end h-[65%]`}>
          <Text className={`text-[28px] text-white font-bold`}>Monthly Statement</Text>
        </View>
      </View>
      <View className={`relative w-full h-3/4`}>
        <View className={`relative z-20 w-full h-[10%] border-b-[0.25px] border-gray-300 flex flex-row`}>
          <View className={`w-1/2 h-full flex flex-row items-center justify-center`}>
            <TouchableOpacity className={`flex flex-row`} onPress={() => {
              if(monthDropDownVisible){
                setMonthDropDownVisible(false)
                setYearDropDownVisible(!yearDropDownVisible)
              } else {
                setYearDropDownVisible(!yearDropDownVisible)
              }
            }}>
              <Text className={`text-[25px] font-bold mr-1`}>{year}</Text>
              <Ionicons name='chevron-down' size={25}/>
            </TouchableOpacity>
            <View className={`${yearDropDownVisible ? "block" : "hidden"} absolute w-full h-[400px] z-30 bg-white shadow border-x-[0.25px]  border-gray-300 rounded-br-lg top-14`}>
                <ScrollView className={`w-full`}>
                  {years.map((year, index) => (
                    <YearComponent 
                      key={year}
                      index={index}
                      year={year}
                      changeYear={changeYear}
                    />
                  ))}
                </ScrollView>
            </View>
          </View>
          <View className={`w-1/2 h-full flex flex-row items-center justify-center`}>
            <TouchableOpacity className={`flex flex-row`} onPress={() => {
              if(yearDropDownVisible){
                setYearDropDownVisible(false)
                setMonthDropDownVisible(!monthDropDownVisible)
              } else {
                setMonthDropDownVisible(!monthDropDownVisible)
              }
            }}>
              <Text className={`text-[25px] font-light mr-1`}>{month}</Text>
              <Ionicons name='chevron-down' size={25}/>
            </TouchableOpacity>
            <View className={`${monthDropDownVisible ? "block" : "hidden"} absolute w-full h-[400px] z-30 bg-white shadow border-x-[0.25px]  border-gray-300 rounded-bl-lg top-14`}>
                <ScrollView className={`w-full`}>
                  {months.map((month, index) => (
                    <MonthComponent 
                      key={month.month}
                      index={index}
                      {...month}
                      changeMonth={changeMonth}
                    />
                  ))}
                </ScrollView>
            </View>
          </View>
        </View>
        <View className={`w-full h-[12%] flex flex-row`}>
          <View className={`w-1/2 h-full border-r-[0.25px] border-gray-300 flex items-center justify-center`}>
            <Text className={`text-[25px] font-thin`}>Spent</Text>
            <Text className={`text-[20px] font-bold`}>RM 1,250</Text>
          </View>
          <View className={`w-1/2 h-full flex items-center justify-center`}>
            <Text className={`text-[25px] font-thin`}>Earned</Text>
            <Text className={`text-[20px] font-bold`}>RM 54,250</Text>
          </View>
        </View>
        <View className={`w-full h-[7%] flex items-center justify-center`}>
          <Text className={`font-bold text-[20px]`}>Breakdown</Text>
        </View>
        <View className={`w-full relative z-0 h-[50%] flex justify-center`}>
          <PieChart 
            data={[
              {
                name: 'School Related',
                price: 50,
                color: '#FF90BC',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
              },
              {
                name: 'Food',
                price: 120,
                color: 'rgba(131, 167, 234, 1)',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
              },
              {
                name: 'Fun Activities',
                price: 100,
                color: '#C1F2B0',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
              },
              {
                name: 'Transport',
                price: 110,
                color: '#750E21',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
              },
              {
                name: 'Living',
                price: 200,
                color: '#EEF296',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
              },
              {
                name: 'Business',
                price: 40,
                color: '#D0D4CA',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
              },
              {
                name: 'Tech',
                price: 200,
                color: '#001524',
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
              },
            ]}
            width={Dimensions.get("window").width - 16}
            height={220}
            chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          accessor="price"
          backgroundColor="transparent"
          paddingLeft="15"
          avoidFalseZero
          />
        </View>
        <View className={`absolute w-full h-[13%] bottom-12 flex items-center justify-center`}>
          <TouchableOpacity className={`w-[55%] h-[70%] rounded-2xl flex items-center justify-center shadow border-[0.25px] border-[#614bc3] bg-[#614bc3]`} onPress={() => {
            navigation.navigate("AddTransaction")
          }}>
            <Text className={`font-bold uppercase text-white text-[16px]`}>Add Transaction</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default StudentMonthlyCalculator;

const months = [
  {
    month: "January"
  },
  {
    month: "February"
  },
  {
    month: "March"
  },
  {
    month: "April"
  },
  {
    month: "May"
  },
  {
    month: "June"
  },
  {
    month: "July"
  },
  {
    month: "August"
  },
  {
    month: "September"
  },
  {
    month: "October"
  },
  {
    month: "November"
  },
  {
    month: "December"
  },
]
