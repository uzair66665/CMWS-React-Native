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
export default function Construch({navigation}) {

    const [pickertype, setPickertype] = useState();
    global.unit
    global.pid
    function CheckEmpty() {
      if (pickertype == null) {
        Alert.alert('Please Select Construction Type...!');
      } else {
        if(pickertype=="Wall")
          navigation.navigate("Wall")
        else if(pickertype=="Slab")
          navigation.navigate("RoofEstimation");
        else if(pickertype=="Plaster")
          navigation.navigate("Plaster");
        else if(pickertype=="Foundation")
          navigation.navigate("Foundation");
        else if(pickertype=="House")
          navigation.navigate("SelectHouse");
      }
    }
    


  return (
    <View>
        <View style={style.head}>
            <Text style={style.htxt}>
                CONSTRUCTION PANEL
            </Text>
        </View>
             <Text style={style.label}>   </Text>

          <View style={style.pickercont}>

              <Picker mode="dropdown" style={style.picker}  
              
              selectedValue={pickertype}
              onValueChange={(itemValue) => setPickertype(itemValue)}
              >
                    <Picker.Item label='Select Construction Type' enabled={false} ></Picker.Item> 
                    <Picker.Item label='Wall' value={'Wall'}></Picker.Item>
                    <Picker.Item label='Slab (Lanter)' value={'Slab'}></Picker.Item> 
                    <Picker.Item label='Plaster' value={'Plaster'}></Picker.Item> 
                    <Picker.Item label='Foundation' value={'Foundation'}></Picker.Item> 
                    <Picker.Item label='House' value={'House'}></Picker.Item> 
     
              </Picker>
          </View>

          <TouchableOpacity style={style.btn} onPress={CheckEmpty}>
            <Text style={style.btntxt}>Next</Text>
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