import React, { Component } from 'react';
import { Dimensions,AsyncStorage, TouchableOpacity,View } from 'react-native';
import { createMaterialTopTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import InputScreen from './screens/InputScreen';
import HistoryScreen from './screens/HistoryScreen';
import BarcodeScreen from './screens/BarcodeScreen';

const MainScreenTab = createMaterialTopTabNavigator({
  Input: {
    screen: InputScreen,
    navigationOptions: {
      title: 'ABSEN'
    }
  },
  History: {
    screen: HistoryScreen,
    navigationOptions: {
      title: 'HISTORY'
    }
  },
}, 
{
  tabBarOptions: {
    scrollEnabled: true,
    labelStyle: {
      fontSize: 12,
      fontWeight:'bold'
    },
    tabStyle: {
      width: Dimensions.get('window').width / 2,
    },
    style: {
      backgroundColor: '#63a4ff',
    },
    indicatorStyle: {
      backgroundColor: '#1976d2',
    }
  },
})

const AppNavigator = createStackNavigator({
  Main: {
    screen:MainScreenTab,
    navigationOptions: ({navigation})=>({
      title: 'Absen SPG',
      headerStyle: {
        backgroundColor: '#1976d2',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight:(
        <TouchableOpacity onPress={ async ()=>
          { await AsyncStorage.clear();
          navigation.navigate('Loading');}
        }>
          <View style={{paddingHorizontal:10}}>
          <Icon name='md-log-out' size={24} color='white'/>
          </View>
        </TouchableOpacity>    
      )
    })
  },
  Barcode: {
    screen:BarcodeScreen,
    navigationOptions: {
      header: null
    }
  }
});

export default createSwitchNavigator({
  Loading : LoadingScreen,
  Auth: LoginScreen,
  App: AppNavigator
})