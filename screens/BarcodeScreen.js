import React, { Component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Constants, BarCodeScanner } from 'expo';

export default class App extends Component {
  constructor(){
      super();
      this.state = {
          loading: false
      }
  }

  componentDidMount() {
  }

  _handleBarCodeRead = data => {
    this.setState({loading:true})
    const { navigation } = this.props;
    const req = navigation.getParam('request', 'NO-ID');
    const kode = navigation.getParam('kode', '');
    if(data.data.includes('Nippon Paint')){
      fetch(global.URL+'absen/'+kode, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(req)
      })
      .then((resp)=> resp.json())
      .then((res) => {
          this.setState({isLoading: false});
          alert(res.error_msg);
          this.props.navigation.replace('Main');
      })
      .done();
    }
  };

  render() {

    return (
      <View style={styles.container}>
        {this.state.loading ? <View><ActivityIndicator/><Text>Submiting..</Text></View>
        :<BarCodeScanner
            torchMode="on"
            arCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
            onBarCodeRead={this._handleBarCodeRead}
            style={{ height: 200, width: 200, backgroundColor:'red' }}
        />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
