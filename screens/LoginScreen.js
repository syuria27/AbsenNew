import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity
} from 'react-native';
//import { ProgressDialog } from 'react-native-simple-dialogs';
import GlobalStyleSheet from '../utils/style';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoading: false
    };
  }

  login = ()=> {
    this.setState({isLoading: true});
    fetch(global.URL+'login', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            username: this.state.username,
            password: this.state.password
        })
    })
    .then((resp)=> resp.json())
    .then((res) => {
        this.setState({isLoading: false});
        if (res.error === false) {
            AsyncStorage.setItem('user', JSON.stringify(res.user));
            this.props.navigation.navigate('App');
        } else {
            alert('Gagal Login');
        }
    })
    .done();
  }
  
  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
        {/*<ProgressDialog 
              visible={this.state.isLoading} 
              title="Login" 
              message="Please, wait..."
        />*/}
        <View style={styles.container}>
            <Text style={styles.header}>Absen SPG</Text>
            
            <TextInput
                style={styles.textInput} placeholder='Username'
                onChangeText={(username) => this.setState({username})}
                underlineColorAndroid='transparent'
            />

            <TextInput
                style={styles.textInput} placeholder='Password'
                secureTextEntry
                onChangeText={(password) => this.setState({password})}
                underlineColorAndroid='transparent'
            />

            <TouchableOpacity
                style={GlobalStyleSheet.btn}
                onPress={this.login}>
                <Text style={GlobalStyleSheet.textBtn}>LOGIN</Text>
            </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
    wrapper: {
        flex:1,
    },
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#004ba0',
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        fontSize: 24,
        color: '#FFFFFF',
        marginBottom: 60,
        fontWeight: 'bold'
    },
    textInput: {
        alignSelf: 'stretch',
        fontSize: 16,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#FFF'
    }
});

export default LoginScreen;
