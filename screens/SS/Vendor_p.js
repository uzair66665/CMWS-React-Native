
import  React from 'react'
import { useEffect } from 'react';
import {
    ImageBackground,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    Touchable,
    TouchableOpacity,
    useColorScheme,
    View,
  } from 'react-native';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';


export default function Vendor_p({navigation}) {


global.vid;

    const getvendorid =  async() => {
        try {

        await  fetch(global.ip+"login/VendorID", {
                method: 'POST',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  uid:global.uid,
                })
                }).then(response => response.json())
                .then(data => {
                  console.log(data)
                  global.vid=data;
                });
            
        }
        catch (error) {
          console.log("Post submission failed");
          console.log(error.message);
        }
      }


    useEffect(()=>{
        getvendorid();
    })

  return (
    <SafeAreaView style={style.container}>

        <ImageBackground style={style.container} source={require('../Assets/Images/BG.jpg')}>

      <View style={style.tct}>    
             <Text style={style.head}>Vendor Panel</Text>
      </View>

      <TouchableOpacity style={style.btn} onPress={() => navigation.navigate('Select_product')}>
            <Text style={style.btntxt}>Add product</Text>
        </TouchableOpacity>

        <TouchableOpacity style={style.btn} onPress={() => navigation.navigate('Productview_ven')}>
            <Text style={style.btntxt}>View product</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.btn} onPress={() => navigation.navigate('Show_order')}>
            <Text style={style.btntxt}>Show orders</Text>
        </TouchableOpacity>
        <Text style={{fontSize:20,marginTop:'7%',}}>---- OR ----</Text>
        <TouchableOpacity style={style.btn} onPress={() => navigation.navigate('login')}>
            <Text style={style.btntxt}>Sign out</Text>
        </TouchableOpacity>
        </ImageBackground>
    </SafeAreaView>
  )
}
const style = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        alignContent:'center',
        alignItems:'center',
    },
    head:{
        fontSize:50,
        fontFamily:'arial',
        textTransform: "uppercase",
        color:'white',
        fontWeight:'bold',
        textAlign:'center'
    },
    tct:{
        backgroundColor:'#AA4A44',
        width:'100%',
        marginBottom:'20%'
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