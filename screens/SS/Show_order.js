import React, { useState } from 'react'
import {
    Alert,
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

export default function Show_order() {
  return (
    <SafeAreaView style={style.container}>
        <ScrollView>

            <View style={{alignItems:'center',justifyContent:'center'}}>
        <Text style={style.head}> ORDERS </Text>
        </View>


        <View style={{backgroundColor:'white',height:'100%',width:'100%' , flexDirection:'row', justifyContent:'space-around'}}>
            <View style={{}}>
                <Text style={style.txt}>Order 1</Text>
                <Text style={style.txt}>Order 2</Text>
                <Text style={style.txt}>Order 3</Text>
                <Text style={style.txt}>Order 4</Text>
                <Text style={style.txt}>Order 5</Text>
                <Text style={style.txt}>Order 6</Text>
            </View>

            <View style={{}}>
                <TouchableOpacity style={style.btn}><Text style={style.btntxt}>Show Details</Text></TouchableOpacity>
                <TouchableOpacity style={style.btn}><Text style={style.btntxt}>Show Details</Text></TouchableOpacity>
                <TouchableOpacity style={style.btn}><Text style={style.btntxt}>Show Details</Text></TouchableOpacity>
                <TouchableOpacity style={style.btn}><Text style={style.btntxt}>Show Details</Text></TouchableOpacity>
                <TouchableOpacity style={style.btn}><Text style={style.btntxt}>Show Details</Text></TouchableOpacity>
                <TouchableOpacity style={style.btn}><Text style={style.btntxt}>Show Details</Text></TouchableOpacity>
            </View>
            </View>
        

    </ScrollView>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
    container:{
        flex:1,
    },
    head:{
        fontSize:40,
        fontFamily:'Roboto',
        color:'black',
        fontWeight:'bold',
        marginTop:'7%'
    },
    order:{
        flex:2, 
        flexDirection:'row'
        
    },
    txt:{
        fontSize:22,
        fontWeight:'bold',
        marginTop:20,
        marginRight:20,
        color:'black',
        alignSelf:'flex-start'
    },
    btn:{
    },
    btntxt:{
        fontSize:22,
        marginTop:20,
        color:'black',
        textDecorationLine: 'underline',
    }
})