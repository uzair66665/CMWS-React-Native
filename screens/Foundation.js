import React, { useState , useEffect } from 'react'
import { Picker } from '@react-native-picker/picker';
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

export default function Foundation({navigation,route}) {

    const [Length , Set_Length] = useState();
    const [Width , Set_Width] = useState();
    const [Thickness , Set_Thickness] = useState();
    const [CP , Set_CP] = useState();
    const [SP , Set_SP] = useState();
    const [CrushP , Set_CrushP] = useState();


    const CheckEmpty = () => {
        try {
  
          if (Length == null || Width == null || CP == null || SP == null || CrushP == null ) {
            console.log("AA")
            Alert.alert('Fill All The Fields...!');
          } else {
              FoundationEstimate();
          }
        } catch (error) {
          console.log(error.message);
        }
     } 
  
  
      const FoundationEstimate = () => {
        
         var totalratio = ((+CP)+(+SP)+(+CrushP))
  
         var thickness;
  
        var thickness = Thickness;
        console.log(thickness)
  
        var thicknessinfoot=thickness/12;
  
        var wetVolumeincft= ((+Length)*(+Width)*(+thicknessinfoot));
  
        // after applying water to the dry concrete mix, the volume of the dry concrete mix is reduced by about 54%. = 1.54;
        // so to calculate dryvolume multplying wetvolume with 1.54;
        var dryVolumeincft=wetVolumeincft*1.54;
  
        var cementtotal=dryVolumeincft*CP/totalratio;
  
        // volume of one cement bag is 1.22 cft. to convert cement from cft to bags we mill divide it by 1.22;
  
        var CementTotalinBags = (cementtotal/1.22).toFixed(2);
        var SandinCFT = (dryVolumeincft*(SP)/totalratio).toFixed(2);
        var CrushinCFT = (dryVolumeincft*(CrushP)/totalratio).toFixed(2);
        navigation.navigate('DisplayFoundation',{CementTotalinBags,SandinCFT,CrushinCFT})
  
      }

  return (
    <SafeAreaView style={style.container}>
    <ScrollView>

    <ImageBackground style={style.bg} source={require('../Assets/Images/PBG.jpg')} >
    <View style={style.head}>
    <Text style={style.Text}>Foundation Estimation</Text>
    </View>

    
      
      <View style={{marginTop: '2%'}}>
          <Text style={style.label}>Length</Text>
          <TextInput
            placeholder="Enter Length in foot"
            keyboardType='number-pad'
            style={style.input}
            value={Length}
            onChangeText={Length => Set_Length(Length)}
          />
        </View>

        <View style={{marginTop: 10}}>
          <Text style={style.label}>Width</Text>
          <TextInput
            placeholder="Enter Width in foot"
            style={style.input}
            keyboardType='number-pad'
            value={Width}
            onChangeText={Width => Set_Width(Width)}
          />
        </View>
        
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

        <View style={{marginTop: 10, marginBottom: 10}}>
          <Text style={style.label}>Crush Part</Text>
          <TextInput
            placeholder="Enter Cement Ratio Part"
            style={style.input}
            keyboardType='number-pad'
            value={CrushP}
            onChangeText={CrushP => Set_CrushP(CrushP)}
          />
        </View>


      <TouchableOpacity
          style={style.appButtonContainer}
          onPress = {()=>{CheckEmpty()}}
          >
          <Text style={style.appButtonText}>Get Estimate</Text>
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