import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react'
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
  import RadioGroup from 'react-native-radio-buttons-group';
import RadioButtonRN from 'radio-buttons-react-native';

export default function HouseMaterial({navigation,route}) {

  
    const [bricks, setBricks]=useState();
    const [sand, setSand]=useState();
    const [cement, setCement]=useState();
    const [crush, setCrush]=useState();
    const [steel, setSteel]=useState();

    global.p_cid;

    useEffect(()=>{
      setSteel(route.params.total_Steel_Required);
      setBricks(route.params.total_Bricks_Required);
      setSand(route.params.total_Sand_Required);
      setCement(route.params.total_Cement_Required);
      setCrush(route.params.total_Crush_Required);
    },[])

   

    function CheckEmpty() {
      if (Pname == null || stock == null || Price == null || pickercat == null ) {
        Alert.alert('Fill All The Fields...!');
      } else {
          AddProduct();
      }
    }
    function Check() {
      navigation.navigate('Wallmaterial')
        console.log(radioButtons[0].selected)
        if(radioButtons[0].selected)
        {
            console.log("Option 1")
        }
        else
        console.log("Option 2")
      }
  
      useEffect(()=>{
      })

     const AddProduct=  async() => {
      try {
        console.log('Adding...')
        
          await  fetch(global.ip+"Product/AddP_Category", {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({  
              name:Pname,
              price:Price,
              stock:stock,
              category:pickercat,
              unit:unit,
              vid:global.vid,
              pid:global.pid
            })
            }).then(response => response.json())
            .then(data => {
              if(data=="sorry")
              {
                Alert.alert("Product With Same Category Already Exists")
              }else{
                global.p_cid=data;
                Alert.alert("Product Added Successfully")
                navigation.navigate('AddProductImg');
                
              }
             
            });
        
          
      }
      catch (error) {
        console.log("Post submission failed");
        console.log(error.message);
      }
    }




  return (
    <SafeAreaView style={style.container}>
      <ScrollView>
      <ImageBackground style={style.bg} source={require('../Assets/Images/PBG.jpg')} >
      <View style={style.head}>
      <Text style={style.Text}>Grey Structure</Text>
      </View>

      
      <Text style={style.labelmain}>Required Materials</Text>
          <View style={style.new}>
              <View style={{marginTop: '5%'}}>
            <Text style={style.label}>Total Bricks = {bricks}</Text>
            
              </View>

              <View style={{marginTop: 20}}>
            <Text style={style.label}>Total Sand = {sand} cft</Text>
            
              </View>

              <View style={{marginTop: 20}}>
            <Text style={style.label}>Total Cement = {cement} Bags</Text>
            
              </View>

              <View style={{marginTop: 20}}>
            <Text style={style.label}>Total Crush = {crush} cft</Text>
            
              </View>

              <View style={{marginTop: 20}}>
            <Text style={style.label}>Total Steel = {steel} Ton</Text>
            
              </View>
            
          </View>

          {/* <Text style={style.labelmain}>Standard House Walls</Text>
          <View style={style.new}>
              <View style={{marginTop: 20}}>
                <Text style={style.label}>Total Walls = {walls} </Text>

              </View>

              <View style={{marginTop: 20}}>
                <Text style={style.label}>Rooms Walls = {rWalls} </Text>

              </View>

              <View style={{marginTop: 20}}>
                <Text style={style.label}>TV Lounge Walls = {tvWalls} </Text>

              </View>
              <View style={{marginTop: 20}}>
                <Text style={style.label}>Kitchen Walls = {kWalls} </Text>

              </View>
              <View style={{marginTop: 20}}>
                <Text style={style.label}>Drawing Room Walls = {dWalls} </Text>

              </View>
              <View style={{marginTop: 20}}>
                <Text style={style.label}>Bath Walls = {bWalls} </Text>

              </View>
              <View style={{marginTop: 20}}>
                <Text style={style.label}>Extra Walls = {cWall} </Text>

              </View>
            
          </View>
        

           */}




        <TouchableOpacity
            style={style.appButtonContainer}
            onPress={()=>{navigation.navigate('Customer_p')}}>
            <Text style={style.appButtonText}>Go To Shop</Text>
          </TouchableOpacity>

    

    </ImageBackground>
    </ScrollView>
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
    rb:{
        color:'black',
        fontWeight:'bold'
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
        marginLeft: 10,
        marginBottom: 5,
        paddingLeft:10,
        paddingTop:5,
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        width:'95%',
        borderRadius:5,
        height:40,
        backgroundColor:'white',
        textAlign:'center',
      },
      labelmain: {
        marginLeft: 10,
        marginTop: 8,
        marginBottom: 5,
        paddingLeft:10,
        paddingTop:5,
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        width:'95%',
        borderRadius:5,
        height:50,
        textAlign:'center',
      },
      new: {
        marginTop:1,
        paddingBottom:5,
        display:'flex',
        borderColor:'black',
        borderWidth:2,
        width: '95%',
        marginLeft: 12,
        borderRadius:3
      },
      pickercont:{
       width:'95%',
       marginLeft:12,
       color:'black',
       fontWeight:'bold',
       borderRadius:10,
       alignItems:'center',
       borderColor:'black',
       borderWidth:2,
       backgroundColor:'white',
      
      },
      picker:{
        width:'97%',
        color:'black',
        borderColor:'white',
        borderWidth:3,
        backgroundColor:'white',
        borderRadius: 30,
        height:'10%'
      },
      appButtonContainer: {
        elevation: 8,
        marginLeft: 12,
        marginTop:'10%',        
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