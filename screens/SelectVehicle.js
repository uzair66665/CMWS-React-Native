import { Picker } from '@react-native-picker/picker';
import React, { useState,useEffect } from 'react'
import {
    Alert,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,Image,
    Text,
    TextInput,
    Touchable,
    TouchableOpacity,
    useColorScheme,
    View,
  } from 'react-native';

export default function SelectVehicle({navigation,route}) {
    const [pickertype, setPickertype] = useState();
    const [loader, setloader] = useState(0)
    const [tarali, settarali] = useState(0)
    const [shazore, setshazore] = useState(0)
    const [damper, setdamper] = useState(0)
    const setvehicle=()=>{
        if(pickertype==null)
        {
            Alert.alert("Please Select Vehicle")
        }
        else
        {
            if(pickertype=='Loader')
            {
              global.charges=loader
            }
            else if(pickertype=='Tarali')
            {
              global.charges=tarali
            }
            else if(pickertype=='Shahzore')
            {
              global.charges=shazore
            }
            else if(pickertype=='Truck')
            {
              global.charges=damper
            }
            
            global.veh=pickertype;
            navigation.navigate('CustomerCart')
        }
    }
    useEffect(() => {
      const dis=route.params.distance
      setloader(Math.floor((dis*100)+(+500)))
      settarali(Math.floor((dis*140)+(+800)))
      setshazore(Math.floor((dis*180)+(+1200)))
      setdamper(Math.floor((dis*250)+(+2500)))
    }, [])
    
  return (
    <SafeAreaView>
        <ImageBackground style={style.bg} source={require('../Assets/Images/PBG.jpg')} >
        
        <View style={style.head}>
            <Text style={style.Text}>Select Vehicle</Text>
        </View>

        <View style={style.details}>
            <Text style={style.label}>
                Loader   
            </Text>
            <Text style={style.txt}>
                Total Charges : Rs.{loader}
            </Text>
            <View style = {style.lineStyle} />
            <Text style={style.label}>
                Tarali   
            </Text>
            <Text style={style.txt}>
              Total Charges : Rs.{tarali}
            </Text>
            <View style = {style.lineStyle} />
            <Text style={style.label}>
                Shahzore   
            </Text>
            <Text style={style.txt}>
              Total Charges : Rs.{shazore}
            </Text>
            <View style = {style.lineStyle} />
            <Text style={style.label}>
                Damper   
            </Text>
            <Text style={style.txt}>
              Total Charges : Rs.{damper}
            </Text>
        </View>

          <View style={style.pickercont}>
              <Picker mode="dropdown" style={style.picker}  
              selectedValue={pickertype}
              onValueChange={(itemValue) => setPickertype(itemValue)}
              >
                    <Picker.Item label='Select Vehicle Type' enabled={false} ></Picker.Item> 
                    <Picker.Item label='Loader' value={'Loader'}></Picker.Item> 
                    <Picker.Item label='Tractor Tarali' value={'Tarali'}></Picker.Item> 
                    <Picker.Item label='Shahzore' value={'Shahzore'}></Picker.Item>
                    <Picker.Item label='Damper' value={'Truck'}></Picker.Item> 
              </Picker>
          </View>
          <TouchableOpacity style={style.appButtonContainer}  onPress={()=>setvehicle()}>
                <Text style={style.appButtonText}>Done</Text>
            </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
    container:{
        flex:1,
    },
    bg:{
        width:'100%',
        height:'100%',
    },
    Text:{
      fontSize:35,
      color:'white',
      textAlign:'center',
      fontWeight:'bold',  
    },
    head:{
        width:'100%',
        backgroundColor:'#e39f0e'
    },
    details:{
      marginTop:10,
      width:'90%',
      padding:3,
      backgroundColor:'white',
      alignSelf:'center',
      borderRadius:15,
      borderColor:'black',
      borderWidth:3,
    },
    txt:{
      fontSize:18,
      fontWeight:'bold',
      marginLeft:15,
      marginTop:3,
      color:'black',
    },
    btn1:{
      fontSize:32,
      color:"black",
      width:"100%",
      height:"100%",
      backgroundColor:'#e39f0e',
      textAlign:'center',
      fontWeight:'bold'
  },
  lineStyle:{
    borderWidth: 0.5,
    borderColor:'black',
    margin:10,
},
    btn:{
        elevation: 8,
        backgroundColor: '#e39f0e',
        borderRadius: 10,
        alignSelf:'center',
        marginTop:'10%',
        marginLeft:'5%',
        width:'40%',
    },
    btntxt:{
        fontSize: 18,
        color: "white",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    input: {
        height: 50,
        width: '95%',
        marginLeft: 12,
        borderWidth: 2,
        borderRadius: 10,
        color:'black',
        padding: 10,
        fontSize: 18,
        backgroundColor:'white'
      },
      label: {
        marginLeft: 15,
        marginTop: 5,
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
      },
      pickercont:{
        marginTop:15,
       width:'95%',
       marginLeft:12,
       borderRadius:10,
       borderColor:'black',
       borderWidth:2,
       backgroundColor:'white',
       justifyContent:'center',
       alignItems:'center',
      },
      picker:{
        width:'97%',
        color:'black',
        borderColor:'white',
        borderWidth:3,
        backgroundColor:'white',
        borderBottomLeftRadius:30,
        borderRadius: 30,
      },
      appButtonContainer1: {
        elevation: 8,
        marginLeft: 12,
        width: 180,
        backgroundColor: '#e39f0e',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,

      },
      appButtonContainer: {
        elevation: 8,
        marginLeft: 12,
        marginTop:20,
        marginBottom:10,      
        width: '95%',
        backgroundColor: '#e39f0e',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
      },
      appButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase',
      }

})