import {
    Alert,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    Touchable,
    Image,
    TouchableOpacity,
    ImageBackground,
    useColorScheme,
    View,
  } from 'react-native';
import React from 'react'

export default function Signin({navigation}) {
  return(
    <SafeAreaView style={style.container}>
        <Image source={require('../Assets/Images/LOGO.png')} style={style.logo}/>
        <TouchableOpacity
            style={style.appButtonContainer}
            onPress={() => navigation.navigate('login')}>
            <Text style={style.appButtonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={style.appButtonContainer}
            onPress={() => navigation.navigate('Signup')}>
            <Text style={style.appButtonText}>Sign up</Text>
          </TouchableOpacity>

    </SafeAreaView>
  )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#adc4b3',

    },
    logo :
    {
      width:'50%', 
      height:'50%',
      marginTop:'10%',
      alignSelf:'center',
    },
    appButtonContainer: {
        elevation: 8,
        marginLeft: 12,
        marginTop:'10%',        
        width: '95%',
        backgroundColor: '#009688',
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
})