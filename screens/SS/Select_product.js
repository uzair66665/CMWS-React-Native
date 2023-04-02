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
export default function Select_product({navigation}) {

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
          global.unit="TON";
        else if(pickertype=="Cement")
          global.unit="Per Bag=40kg";
        console.log(global.unit)
          prodtype();
      }
    }
    const prodtype=  async() => {
        try {
          console.log('Checking...')
          
            await  fetch(global.ip+"Product/AddProduct", {
              method: 'POST',
              headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
              },
              body: JSON.stringify({  
                type:pickertype,
                vid:global.vid
              })
              }).then(response => response.json())
              .then(data => {
                global.pid=data;
                if(data=="sorry")
                {
                  Alert.alert("Product Limit Exceeded. . . .")
                }else{
                  
                  navigation.navigate('Add_product');
                  
                }
                
               
              });
          
            
        }
        catch (error) {
          console.log("Post submission failed");
          console.log(error.message);
        }
      }


  return (
    <View>
        <View style={style.head}>
            <Text style={style.htxt}>
                PRODUCT TYPE
            </Text>
        </View>
             <Text style={style.label}>   </Text>
          <View style={style.pickercont}>
              <Picker mode="dropdown" style={style.picker}  
              
              selectedValue={pickertype}
              onValueChange={(itemValue) => setPickertype(itemValue)}
              >
                    <Picker.Item label='Select Product Type' enabled={false} ></Picker.Item> 
                    <Picker.Item label='Brick' value={'Brick'}></Picker.Item> 
                    <Picker.Item label='Crush' value={'Crush'}></Picker.Item> 
                    <Picker.Item label='Steel' value={'Steel'}></Picker.Item>
                    <Picker.Item label='Sand' value={'Sand'}></Picker.Item>
                    <Picker.Item label='Cement' value={'Cement'}></Picker.Item> 
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