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

export default function WallMaterial({navigation,route}) {
  const [pickertype, setPickertype] = useState();

    const [Pname , Set_Pname] = useState();
    const [stock , Set_stock] = useState();
    const [Price , Set_Price] = useState();
    const [length, setLength] = useState();
    const [width, setWidth] = useState();
    const [height, setHeight] = useState();
    const [type, settype] = useState();
    const [bricks, setBricks]=useState(route.params.bricks);
    const [sand, setSand]=useState(route.params.sand);
    const [cement, setCement]=useState(route.params.cement);
    var br=route.params.bricks;
    global.p_cid;

    const radioButtonsData = [{
        id: '1', 
        label: 'Single Brick',
        color:'black'
    }, {
        id: '2',
        label: 'Double Brick',
        color:'black'
    }]

    const [radioButtons, setRadioButtons] = useState(radioButtonsData)

    function onPressRadioButton(radioButtonsArray) {
        setRadioButtons(radioButtonsArray);
    }

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
        console.log(route.params.bricks);
        console.log(bricks);
        console.log(br);
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

      <ImageBackground style={style.bg} source={require('../Assets/Images/PBG.jpg')} >
      <View style={style.head}>
      <Text style={style.Text}>Wall Material</Text>
      </View>

      
        
        <View style={{marginTop: '5%'}}>
            <Text style={style.label}>Total Bricks Required = {bricks}</Text>
            
          </View>

          <View style={{marginTop: 20}}>
            <Text style={style.label}>Total Sand Required = {sand} cft</Text>
            
          </View>

          <View style={{marginTop: 20}}>
            <Text style={style.label}>Total Cement Required = {cement} Bags</Text>
            
          </View>


          <View style={style.pickercont}>
          <Picker mode="dropdown" style={style.picker}  
              
              selectedValue={pickertype}
              onValueChange={(itemValue) => setPickertype(itemValue)}
              >
                    <Picker.Item label='Select Wall Type' enabled={false} ></Picker.Item> 
                    <Picker.Item label='Only Brick Work' value={'4.5'}></Picker.Item>
                    <Picker.Item label='Brick Work with Plaster' value={'9'}></Picker.Item> 
     
              </Picker>

          </View>

        <TouchableOpacity
            style={style.appButtonContainer}
            onPress={Check}>
            <Text style={style.appButtonText}>Go To Shop</Text>
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