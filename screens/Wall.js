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
  import RadioGroup from 'react-native-radio-buttons-group';

export default function Wall({navigation}) {

  const [pickertype, setPickertype] = useState();
  const [pickertype1, setPickertype1] = useState();
    const [wlength, setLength] = useState();
    const [wheight, setHeight] = useState();
    const [Thickness , Set_Thickness] = useState();
    const [CP , Set_CP] = useState();
    const [SP , Set_SP] = useState();
    const [chk, setchk] = useState(0)
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
      // console.log(radioButtons[0].selected)
      // console.log(radioButtons[1].selected)
      // if (length == null || height==null || number==null || (!radioButtons[0].selected && !radioButtons[1].selected) ) {
      //   Alert.alert('Fill All The Fields...!');
      // } else {
        console.log(wlength)
        console.log(wheight)
        console.log(pickertype)
      if (wlength == null || wheight==null || pickertype==null || pickertype1==null ) {
        Alert.alert('Fill All The Fields...!');
      } 
        else{
          // var bricks;
          // var cement;
          // var sand;
          // if(radioButtons[0].selected)
          // {
          //   bricks=length*height*6*number;
          //   cement=length*height*number;
          //   sand=length*height*0.17*number;
          //   //Alert.alert(bricks.toString()+" cement "+cement+" sand "+sand);
          // }
          // else{
          //   bricks=length*height*12*number;
          //   cement=length*height*2*number;
          //   sand=length*height*0.17*2*number;
          //   //Alert.alert(bricks.toString()+" cement "+cement+" sand "+sand);
          // }
          if(pickertype1=='0')
          {
          if (pickertype == '9') {
            var length = +(wlength);
            var height = +(wheight);
            var total_sqft = length * height;
            var bricks_sqft = 9;
            //var cement_sqft = 0.0194444444;
            var cement_sqft = 0.015;
            //var sand_sqft = 0.071875;
            var sand_sqft = 0.0993377483;
            var totalsand = (total_sqft * sand_sqft).toFixed(2);
            var totalcement = (total_sqft * cement_sqft).toFixed(2);
            var totalbricks = bricks_sqft * total_sqft;
            navigation.navigate("WallMaterial",{bricks: totalbricks,cement: totalcement,sand: totalsand})

          }
          else if (pickertype == '4.5') {
            var length = +(wlength);
            var height = +(wheight);
            var total_sqft = length * height;
            var bricks_sqft = 4;
            //var cement_sqft = 0.0194444444 / 2;
            var cement_sqft = 0.015 / 2;
            //var sand_sqft = 0.071875 / 2;
            var sand_sqft = 0.0993377483 / 2;
            var totalsand = (total_sqft * sand_sqft).toFixed(2);
            var totalcement = (total_sqft * cement_sqft).toFixed(2);
            var totalbricks = bricks_sqft * total_sqft;
          navigation.navigate("WallMaterial",{bricks: totalbricks,cement: totalcement,sand: totalsand})
            
          }
          else if (pickertype == '13') {
            var length = +(wlength);
            var height = +(wheight);
            var total_sqft = length * height;
            var bricks_sqft = 9 * 1.5;
            //var cement_sqft = 0.0194444444 * 1.5;
      
            //by 1:6
            var cement_sqft = 0.015 * 1.5;
            //var sand_sqft = 0.071875 * 1.5;
            var sand_sqft = 0.0993377483 * 1.5;
            var totalsand = (total_sqft * sand_sqft).toFixed(2);
            var totalcement = (total_sqft * cement_sqft).toFixed(2);
            var totalbricks = bricks_sqft * total_sqft;
          navigation.navigate("WallMaterial",{bricks: totalbricks,cement: totalcement,sand: totalsand})
            
          }
        }
        else{
          if (pickertype == '9') {
            var length = +(wlength);
            var height = +(wheight);
            var total_sqft = length * height;
            var bricks_sqft = 9;
            //var cement_sqft = 0.0194444444;
            var cement_sqft = 0.015;
            //var sand_sqft = 0.071875;
            var sand_sqft = 0.0993377483;
            var totalsand = (total_sqft * sand_sqft).toFixed(2);
            var totalcement = (total_sqft * cement_sqft).toFixed(2);
            var totalbricks = bricks_sqft * total_sqft;
            navigation.navigate("WallMaterial",{bricks: totalbricks,cement: totalcement,sand: totalsand})

          }
          else if (pickertype == '4.5') {
            var length = +(wlength);
            var height = +(wheight);
            var total_sqft = length * height;
            var bricks_sqft = 4;
            //var cement_sqft = 0.0194444444 / 2;
            var cement_sqft = 0.015 / 2;
            //var sand_sqft = 0.071875 / 2;
            var sand_sqft = 0.0993377483 / 2;
            var totalsand = (total_sqft * sand_sqft).toFixed(2);
            var totalcement = (total_sqft * cement_sqft).toFixed(2);
            var totalbricks = bricks_sqft * total_sqft;
          navigation.navigate("WallMaterial",{bricks: totalbricks,cement: totalcement,sand: totalsand})
            
          }
          else if (pickertype == '13') {
            var length = +(wlength);
            var height = +(wheight);
            var total_sqft = length * height;
            var bricks_sqft = 9 * 1.5;
            //var cement_sqft = 0.0194444444 * 1.5;
      
            //by 1:6
            var cement_sqft = 0.015 * 1.5;
            //var sand_sqft = 0.071875 * 1.5;
            var sand_sqft = 0.0993377483 * 1.5;
            var totalsand = (total_sqft * sand_sqft).toFixed(2);
            var totalcement = (total_sqft * cement_sqft).toFixed(2);
            var totalbricks = bricks_sqft * total_sqft;
          navigation.navigate("WallMaterial",{bricks: totalbricks,cement: totalcement,sand: totalsand})
            
          }
        }
        
        
        
      }
    }
  
const handle=(item)=>{
  setPickertype1(item);
  if(item=='1')
  {
    setchk(1)
  }
}




  return (
    <SafeAreaView style={style.container}>
      
      <ImageBackground style={style.bg} source={require('../Assets/Images/PBG.jpg')} >
      <ScrollView>
      <View style={style.head}>
      <Text style={style.Text}>Wall Estimation</Text>
      </View>
        <View >
            <Text style={style.label}>Length(FT)</Text>
            <TextInput
              placeholder="Enter the length of wall"
              style={style.input}
              keyboardType='number-pad'
              value={wlength}
              onChangeText={wlength => setLength(wlength)}
            />
          </View>


          <View>
            <Text style={style.label}>Height(FT)</Text>
            <TextInput
              placeholder="Enter the Height of wall"
              style={style.input}
              value={wheight}
              keyboardType='number-pad'
              onChangeText={wheight => setHeight(wheight)}
            />
          </View>

          {/* <View>
            <Text style={style.label}>Number of Walls</Text>
            <TextInput
              placeholder="Enter the Number of walls"
              style={style.input}
              value={number}
              keyboardType='number-pad'
              onChangeText={number => setNumber(number)}
            />
          </View> */}


          <Text style={style.label}>Type Of Wall</Text>

          <View style={style.pickercont}>
          <Picker mode="dropdown" style={style.picker}  
              
              selectedValue={pickertype}
              onValueChange={(itemValue) => setPickertype(itemValue)}
              >
                    <Picker.Item label='Select Wall Type' enabled={false} ></Picker.Item> 
                    <Picker.Item label='4.5"' value={'4.5'}></Picker.Item>
                    <Picker.Item label='9"' value={'9'}></Picker.Item> 
                    <Picker.Item label='13"' value={'13'}></Picker.Item> 
     
              </Picker>

          </View>
          <Text style={style.label}>Type Of Construction</Text>

          <View style={style.pickercont}>
          <Picker mode="dropdown" style={style.picker}  
              
              selectedValue={pickertype1}
              onValueChange={(itemValue) => handle(itemValue)}
              >
                    <Picker.Item label='Select Wall Construction' enabled={false} ></Picker.Item> 
                    <Picker.Item label='Only Brick Work' value={'0'}></Picker.Item>
                    <Picker.Item label='Brick Work with Plaster' value={'1'}></Picker.Item> 
     
              </Picker>
          </View>
          {chk==1?(<>
            <View style={{marginTop: 10}}>
          <Text style={style.label}>Thickness</Text>
          <TextInput
            placeholder="Enter Thickness in Inches"
            style={style.input}
            keyboardType='number-pad'
            value={Thickness}
            onChangeText={Thickness => Set_Thickness(Thickness)}
          />
        </View>

        <View style={{marginTop: 10}}>
            <Text style={style.label}>Cement Part</Text>
            <TextInput
              placeholder="Enter Cement Ratio Part"
              style={style.input}
              keyboardType='number-pad'
              value={CP}
              onChangeText={CP => Set_CP(CP)}
            />
          </View>

          <View style={{marginTop: 10}}>
            <Text style={style.label}>Sand Part</Text>
            <TextInput
              placeholder="Enter Sand Ratio Part"
              style={style.input}
              keyboardType='number-pad'
              value={SP}
              onChangeText={SP => Set_SP(SP)}
            />
          </View>
      </>
      ):
      (<></>)}
          

        <TouchableOpacity
            style={style.appButtonContainer}
            onPress={CheckEmpty}>
            <Text style={style.appButtonText}>Estimate</Text>
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
        marginTop: 20,
        marginBottom: 5,
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
      },
      label1: {
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