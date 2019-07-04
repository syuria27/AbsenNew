import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';

export default class LoadingScreen extends Component {
    constructor(){
        super();
        this.loadApp();
        global.URL = 'http://npspgmanagement.co.id:3001/api/';
    }
    
    loadApp = async() => {
        const user = await AsyncStorage.getItem('user');
        this.props.navigation.navigate(user ? 'App' : 'Auth');
    }

    render() {
        return (
        <View style={styles.container}>
            <Text>Loading..</Text>
        </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
