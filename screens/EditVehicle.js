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

export default function EditVehicle({navigation}) {

    const [vnum , setVnum] = useState();
    const [pickertype, setPickertype] = useState();
    var charges=0
    


    function CheckEmpty() {
      if (vnum == null || pickertype==null ) {

        Alert.alert('Fill All The Fields...!');
      } else {
        if(pickertype=="Loader")
        {
            charges=80
        }
        else if(pickertype=="Tarali")
        {
            charges=100
        }
        else if(pickertype=="Shahzore")
        {
            charges=130
        }
        else if(pickertype=="Truck")
        {
            charges=250
        }
        UpdateVehicle();
      }
    }
  
  
     const GetVehicle=  async() => {
      try {
        console.log('Getting Vehicle...')
          await  fetch(global.ip+"Transporter/GetVehicle", {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({  
                tid:global.tid
            })
            }).then(response => response.json())
            .then(data => {
              if(data=="sorry")
              {
                Alert.alert("Sorry")
              }else{
                setVnum(data.vnum)
                setPickertype(data.vtype)
              }
             
            });
        
          
      }
      catch (error) {
        console.log("Post submission failed");
        console.log(error.message);
      }
    }
    const UpdateVehicle=  async() => {
        try {
          console.log('Updating Vehicle...')
            await  fetch(global.ip+"Transporter/UpdateVehicle", {
              method: 'POST',
              headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                vnum:vnum,
                vtype:pickertype,
                vcharges:charges,
                tid:global.tid
              })
              }).then(response => response.json())
              .then(data => {
                Alert.alert("Vehicle Updated Successfully")
                navigation.navigate("Transporter_p")
              });
          
            
        }
        catch (error) {
          console.log("Post submission failed");
          console.log(error.message);
        }
      }

  useEffect(()=>{
    GetVehicle();
  },[])


  return (
    <SafeAreaView style={style.container}>

      <ImageBackground style={style.bg} source={require('../Assets/Images/PBG.jpg')} >
      <ScrollView>
      <View style={style.head}>
      <Text style={style.Text}>Edit Vehicle</Text>
      </View>

      
        
        {/* <View style={{marginTop: '2%'}}>
            <Text style={style.label}>Driver Name</Text>
            <TextInput
              placeholder="Enter Name"
              style={style.input}
              value={dname}
              onChangeText={dname => setdName(dname)}
            />
          </View>

          <View style={{marginTop: 7}}>
            <Text style={style.label}>Contact Number</Text>
            <TextInput
              placeholder="Enter Number"
              style={style.input}
              keyboardType='number-pad'
              value={cnum}
              onChangeText={cnum => setCnum(cnum)}
            />
          </View> */}

          <View style={{marginTop: 30}}>
            <Text style={style.label}>Vehicle Number</Text>
            <TextInput
              placeholder="e.g   ABC - 000"
              style={style.input}
              value={vnum}
              onChangeText={vnum => setVnum(vnum)}
            />
          </View>
          <Text style={style.label}>Vehicle Type</Text>
          <View style={style.pickercont}>
              <Picker mode="dropdown" style={style.picker}  
              selectedValue={pickertype}
              onValueChange={(itemValue) => setPickertype(itemValue)}
              >
                    <Picker.Item label='Select Vehicle Type' enabled={false} ></Picker.Item> 
                    <Picker.Item label='Loader' value={'Loader'}></Picker.Item> 
                    <Picker.Item label='Tractor Tarali' value={'Tarali'}></Picker.Item> 
                    <Picker.Item label='Shahzore' value={'Shahzore'}></Picker.Item>
                    <Picker.Item label='Truck' value={'Truck'}></Picker.Item> 
              </Picker>
          </View>
          {/* {pickertype=='Other'?(
            <View style={{marginTop: 15}}>
            <TextInput
              placeholder="Enter Type"
              style={style.input}
              onChangeText={typ => setTyp(typ)}
            />
          </View>
          ):(
            <></>
          )} */}

        <TouchableOpacity
            style={style.appButtonContainer}
            onPress={CheckEmpty}>
            <Text style={style.appButtonText}>Update</Text>
          </TouchableOpacity>

    
          </ScrollView>
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
      fontSize:40,
      color:'white',
      textAlign:'center',
      fontWeight:'bold',  
    },
    head:{
        width:'100%',
        backgroundColor:'#4e8bed'
    },
    btn:{
        elevation: 8,
        backgroundColor: "black",
        borderRadius: 10,
        alignSelf:'center',
        marginTop:'10%',
        marginLeft:'5%',
        width:'40%',
        paddingVertical: 10,
        paddingHorizontal: 12
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
        marginTop: 10,
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
      appButtonContainer: {
        elevation: 8,
        marginLeft: 12,
        marginTop:'20%',        
        width: '95%',
        backgroundColor: '#4e8bed',
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
      },
      fal: {
        height: 60,
        width: '95%',
        marginLeft: 12,
        borderWidth: 4,
        borderRadius: 10,
        color:'black',
        fontSize: 30,
        textAlign:'center',
        fontWeight:'bold',
      },

})