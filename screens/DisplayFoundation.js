import React, { useState , useEffect } from 'react'
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

export default function DisplayFoundation({navigation,route}) {

    const [cement,set_cement] = useState('')
    const [sand,set_sand] = useState('')
    const [crush,set_crush] = useState('')

    useEffect(() => {

        set_cement(route.params.CementTotalinBags);
        set_sand(route.params.SandinCFT);
        set_crush(route.params.CrushinCFT);

      }, [])

  return (
    <SafeAreaView style={style.container}>

      <ImageBackground style={style.bg} source={require('../Assets/Images/PBG.jpg')} >
      <View style={style.head}>
      <Text style={style.Text}>Estimated Material</Text>
      </View>

      
          <View style={{marginTop: 10}}>

            <Text style={style.label}>Cement Required :</Text>
            <Text style={style.label1}>{cement} Bags</Text>
          </View>

          <View style={{marginTop: 10}}>

            <Text style={style.label}>Sand Required :</Text>
            <Text style={style.label1}>{sand} CFT</Text>

          </View>

          <View style={{marginTop: 10}}>

            <Text style={style.label}>Crush Required :</Text>
            <Text style={style.label1}>{crush} CFT</Text>

          </View>

        <TouchableOpacity
            style={style.appButtonContainer}
            onPress = {()=> navigation.navigate('Customer_p') }
            >
            <Text style={style.appButtonText}>Go To shop</Text>
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
        fontSize: 25,
        fontWeight: 'bold',
      },
      label1:{
        marginLeft: 10,
        marginBottom: 5,
        paddingLeft:60,
        paddingTop:5,
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        width:'95%',
        borderRadius:5,
        height:40,
        backgroundColor:'white',
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