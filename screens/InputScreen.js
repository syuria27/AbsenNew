import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage, TouchableOpacity, CameraRoll, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import GlobalStyleSheet from '../utils/style';
import { ImagePicker, Location, Permissions } from 'expo';

export default class InputScreen extends Component {
    constructor(){
        super();
        this.state= {
            today: new Date(),
            user: {},
            selfie: '',
            locationResult: ''
        }
    }

    componentDidMount() {
        this._loadInitialState().done();
    }

    _loadInitialState = async () => {
        let user = await AsyncStorage.getItem('user');
        this.setState({user: JSON.parse(user)});
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            alert('Location Permision Denied');
        }else{
          let location = await Location.getCurrentPositionAsync({
            enableHighAccuracy: true,
            maximumAge: 300000
          });
          fetch(global.URL+'location', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                lon: location.coords.longitude,
                lat: location.coords.latitude
            })
            })
            .then((resp)=> resp.json())
            .then((res) => {
                this.setState({isLoading: false});
                if (res.error === false) {
                    this.setState({ locationResult: res.formattedAddress });
                } else {
                    alert(res.error_msg);
                }
            })
            .done();
        }
    };

    _pickImage = async () => {
        let { status } = await Permissions.askAsync(Permissions.CAMERA);
        status === 'granted' ? {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL) : alert('Camera Permision Denied');
        if (status !== 'granted') {
            alert('Storage Permision Denied');
        }else{
            let result = await ImagePicker.launchCameraAsync({
                allowsEditing: false,
                base64: true
            });
        
            if (!result.cancelled) {
                this.setState({ selfie: result.base64 });
            } else {
                this.setState({ selfie: '' });
            }
        }
    };

    _absen_masuk = ()=>{
        if(this.state.selfie !== '' && this.state.locationResult)
            this.props.navigation.replace(
                'Barcode', 
                {   
                    request:{
                        kode_spg: this.state.user.kode_spg,
                        zona: this.state.user.zona,
                        lokasi: this.state.locationResult,
                        photo: this.state.selfie
                    },
                    kode: 'masuk'
                }
            );
        else
            alert('Take selfie or location first');
    }

    _absen_pulang = ()=>{
        if(this.state.selfie !== '' && this.state.locationResult)
            this.props.navigation.replace(
                'Barcode', 
                {   
                    request:{
                        kode_spg: this.state.user.kode_spg,
                        zona: this.state.user.zona,
                        lokasi: this.state.locationResult,
                        photo: this.state.selfie
                    },
                    kode: 'pulang'
                }
            );
        else
            alert('Take selfie or location first');
    }
    
    render() {
        let today = this.state.today;
        return (
        <View style={styles.container}>
            <View>
                <View style={{backgroundColor:'#1976d2'}}>
                    <Text style={{alignSelf: 'center', fontWeight:'bold', color:'#fff'}}>{today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()}</Text>
                </View>
                <View style={{flexDirection:'row', paddingVertical:10}}>
                    <View>
                        <Text style={styles.txtProfile}>Nama SPG</Text>
                        <Text style={styles.txtProfile}>Nana Toko</Text>
                        <Text style={styles.txtProfile}>Depot</Text>
                    </View>
                    <View style={{paddingHorizontal:5}}>
                        <Text style={styles.txtProfile}>:</Text>
                        <Text style={styles.txtProfile}>:</Text>
                        <Text style={styles.txtProfile}>:</Text>
                    </View>
                    <View>
                        <Text style={styles.txtProfile}>{this.state.user.nama_spg}</Text>
                        <Text style={styles.txtProfile}>{this.state.user.nama_toko}</Text>
                        <Text style={styles.txtProfile}>{this.state.user.depot}</Text>
                    </View>
                </View>
                <View style={{backgroundColor:'#1976d2'}}>
                    <Text style={{alignSelf: 'center', fontWeight:'bold', color:'#fff'}}>Input Your Data</Text>
                </View>
                <Text style={{paddingVertical:5, fontWeight:'bold'}}>Selfie :</Text>
                {
                    this.state.selfie == '' 
                    ? <Icon name='md-contact' size={50} color='gray' style={{alignSelf:'center'}}/>
                    : <Image 
                        style={{
                            alignSelf:'center',
                            width: 200,
                            height: 200,
                            resizeMode: 'contain',
                        }}
                        source={{uri: `data:image/jpeg;base64,${this.state.selfie}`}} />
                }
                
                <Text style={{paddingVertical:5, fontWeight:'bold'}}>Location :</Text>
                <Text style={styles.txtProfile}>{this.state.locationResult}</Text>
            </View>

            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={this._absen_masuk}>
                    <Text style={GlobalStyleSheet.textBtn}>MASUK</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={this._absen_pulang}>
                    <Text style={styles.textBtn}>PULANG</Text>
                </TouchableOpacity>
            </View>

            <View style={{flexDirection:'row', position: 'absolute', bottom: 10, alignSelf:'center'}}>
                <View style={{width:'50%', alignItems:'flex-end'}}>
                    <TouchableOpacity onPress={this._pickImage} style={styles.btnBunder}>
                        <Icon name='md-camera'  size={20} color="#FFF" />
                    </TouchableOpacity>
                </View>
                
                <View style={{width:'50%', alignItems:'flex-start'}}>
                    <TouchableOpacity onPress={this._getLocationAsync} style={styles.btnBunder}>
                        <Icon name='md-pin'  size={20} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    justifyContent: 'space-between'
  },
  txtProfile:{
      fontSize:16
  },
  btn: {
    alignSelf: 'stretch',
    width: '45%',
    padding: 14,
    borderRadius: 5,
    backgroundColor: '#1976d2',
  },
  textBtn: {
    color: '#FFf',
    alignSelf: 'flex-end',
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnBunder: {
    alignItems:'center',
    justifyContent:'center',
    width:50,
    height:50,
    backgroundColor:'#63a4ff',
    borderRadius:100,
    borderWidth:2,
    borderColor:'#fff',
  }
});
