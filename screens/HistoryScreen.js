import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage, FlatList, Picker, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class HistoryScreen extends Component {
    constructor(){
        super();
        this.state = {
          user:{},
          selectedMonth: 1,
          selectedYear: new Date().getFullYear(),
          history: [],
          bulan: [
              {
                label: 'Jan',
                value: 1
              },{
                label: 'Feb',
                value: 2
              },{
                label: 'Mar',
                value: 3
              },{
                label: 'Apr',
                value: 4
              },{
                label: 'Mei',
                value: 5
              },{
                label: 'Jun',
                value: 6
              },{
                label: 'Jul',
                value: 7
              },{
                label: 'Aug',
                value: 8
              },{
                label: 'Sep',
                value: 9
              },{
                label: 'Oct',
                value: 10
              },{
                label: 'Nov',
                value: 11
              },{
                label: 'Dec',
                value: 12
              }
          ],
          tahun:[
              {
                  label: new Date().getFullYear().toString(),
                  value: new Date().getFullYear()
              },{
                label: (new Date().getFullYear()-1).toString(),
                value: new Date().getFullYear()-1
              },{
                label: (new Date().getFullYear()-2).toString(),
                value: new Date().getFullYear()-2
              },{
                label: (new Date().getFullYear()-3).toString(),
                value: new Date().getFullYear()-3
              },{
                label: (new Date().getFullYear()-4).toString(),
                value: new Date().getFullYear()-4
              },
          ]
        }    
    }

    componentDidMount() {
        this._loadInitialState().done();
    }

    _loadInitialState = async () => {
        let user = await AsyncStorage.getItem('user');
        this.setState({user: JSON.parse(user)});
    }

    getHistory = async ()=> {
      fetch(global.URL+'absen/'+this.state.user.kode_spg+'/'+this.state.selectedMonth+'/'+this.state.selectedYear)
      .then((resp)=> resp.json())
      .then((res) => {
          if (res.error === false) {
              this.setState({history: res.history})
          } else {
              this.setState({history: []})
              alert(res.error_msg);
          }
      })
      .done();
    }
    
    render() {
        return (
        <View style={styles.container}>
          <View style={{backgroundColor:'#1976d2', margin:10}}>
            <Text style={{alignSelf: 'center', fontWeight:'bold', color:'#fff'}}>Input Month Year</Text>
          </View>
          
          <View style={{flexDirection:'row'}}>
            <View style={{width:'50%'}}>
            <Picker
              selectedValue={this.state.selectedMonth}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ selectedMonth: itemValue })
              }
            >
              {this.state.bulan.map((item, key) => (
                <Picker.Item label={item.label} value={item.value} key={key} />
              ))}
            </Picker>
            </View>
            <View style={{width:'50%'}}>
            <Picker
              selectedValue={this.state.selectedYear}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ selectedYear: itemValue })
              }
            >
              {this.state.tahun.map((item, key) => (
                <Picker.Item label={item.label} value={item.value} key={key} />
              ))}
            </Picker>
            </View>
          </View>
          
          <View style={{backgroundColor:'#1976d2', margin:10}}>
              <Text style={{alignSelf: 'center', fontWeight:'bold', color:'#fff'}}>History Absen</Text>
          </View>

          <FlatList
            data={this.state.history}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(items,index)=>{
              return(
                <TouchableOpacity onPress={()=>{}}>
                  <View style={{flex:1, padding: 10}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                      <Text style={{fontWeight:'bold'}}>{items.item.kode_absen}</Text>
                      <Text style={{fontWeight:'bold'}}>{items.item.tanggal}</Text>
                    </View>
                    <Text>Jam Masuk :</Text>
                    <Text style={{paddingLeft:10}}>{items.item.jam_masuk}</Text>
                    <Text>Lokasi Masuk :</Text>
                    <Text style={{paddingLeft:10}}>{items.item.lokasi_masuk}</Text>
                    <Text>Jam Pulang :</Text>
                    <Text style={{paddingLeft:10}}>{items.item.jam_pulang}</Text>
                    <Text>Lokasi Pulang :</Text>
                    <Text style={{paddingLeft:10}}>{items.item.lokasi_pulang}</Text>
                    <View
                      style={{
                        height: 1,
                        backgroundColor: '#CED0CE',
                        marginTop: 10
                      }}                
                    />
                  </View>
                </TouchableOpacity>)
            }}
          >
          </FlatList>

          <TouchableOpacity
            onPress={this.getHistory}
            style={{
                borderWidth:1,
                borderColor:'rgba(0,0,0,0.2)',
                alignItems:'center',
                justifyContent:'center',
                width:60,
                position: 'absolute',                                          
                bottom: 10,                                                    
                right: 10,
                height:60,
                backgroundColor:'#1976d2',
                borderRadius:100,
                elevation:2
              }}
          >
            <Icon name='md-search'  size={30} color="#FFF" />
          </TouchableOpacity>
        </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  btn: {
    alignSelf: 'stretch',
    padding: 14,
    borderRadius: 5,
    backgroundColor: '#1976d2',
  },
  textBtn: {
    color: '#FFf',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
