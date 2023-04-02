import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react'
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
export default function SelectHouse({navigation}) {

    const [pickertype, setPickertype] = useState();
    global.unit
    global.pid
    function CheckEmpty() {
      if (pickertype == null) {
        Alert.alert('Please Select Product Type...!');
      } else {
        if(pickertype=="Brick")
          global.unit="No of Brick";
        else if(pickertype=="Sand" || pickertype=="Crush" )
          global.unit="CFT";
        else if(pickertype=="Steel")
          global.unit="KG";
        else if(pickertype=="Cement")
          global.unit="Per Bag=50kg";
        console.log(global.unit)
          prodtype();
      }
    }


  return (
    <View>
        <View style={style.head}>
            <Text style={style.htxt}>
                SELECT HOUSE SIZE
            </Text>
        </View>

          <TouchableOpacity style={style.btn} onPress={()=>navigation.navigate("FiveMarla")}>
            <Text style={style.btntxt}>5 Marla</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.btn} onPress={CheckEmpty}>
            <Text style={style.btntxt}>10 Marla</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.btn} onPress={CheckEmpty}>
            <Text style={style.btntxt}>15 Marla</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.btn} onPress={CheckEmpty}>
            <Text style={style.btntxt}>20 Marla</Text>
        </TouchableOpacity>

    </View>
  )
}

const style = StyleSheet.create({
    label: {
        marginLeft: 15,
        marginTop:'20%',
        marginBottom: 5,
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
      },
      pickercont:{
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
      htxt:{
        fontSize:40,
        color:'white',
        textAlign:'center',
        fontWeight:'bold',  
      },
      head:{
          width:'100%',
          backgroundColor:'#AA4A44'
      },
      btn:{
        elevation: 8,
        backgroundColor: '#AA4A44',
        borderRadius: 10,
        alignSelf:'center',
        marginTop:'10%',
        width:'80%',
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    btntxt:{
        fontSize: 25,
        color: "white",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
})