import React, {useState} from 'react'
import {
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

export default function Cart({navigation}) {
  return (
    <SafeAreaView style={style.container}>
        <Text style={{fontSize:40,fontWeight:'bold', textAlign:'center',color:'black',
        marginTop:15}}>Check Out</Text>

<View style={{flexDirection:'row',justifyContent:'space-around',marginTop:20}}>

    <View>
        <Text style={style.text}>Order by</Text>
        <Text style={style.text}>Address</Text>
        <Text style={style.text}>Steel Quantity</Text>
        <Text style={style.text}>Cement Quantity</Text>
        <Text style={style.text}>Delivery Charges</Text>
    </View>

    <View>
        <Text style={style.textright}>Ali raza</Text>
        <Text style={style.textright}>Tench, Rawalpindi</Text>
        <Text style={style.textright}>2 ton</Text>
        <Text style={style.textright}>3 sacks</Text>
        <Text style={style.textright}>800 rs.</Text>
    </View>
    
 </View>

     <TouchableOpacity style={style.btn}>
        
            <Text style={style.btntxt}>Place Order</Text>
    </TouchableOpacity>


    <Text style={{ textAlign:'center',fontSize:20,
    fontWeight:'bold',marginTop:'7%'}}>---- OR -----</Text>
    
    
    <TouchableOpacity style={style.btn} onPress={()=>navigation.navigate('Customer_p')}>
        
            <Text style={style.btntxt}>Go Back</Text>
    </TouchableOpacity>
        
    
    </SafeAreaView>
  )
}
const style = StyleSheet.create({
    container:{
            flex:1
    },

    btn:{
        elevation: 8,
        backgroundColor: "black",
        borderRadius: 10,
        alignSelf:'center',
        marginTop:40,
        width:'80%',
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
      text:{
        fontSize:20,
        fontWeight:'bold',
        height:50,
        color:'black',
        marginTop:20,
        paddingTop:10,
      },
      textright:{

        fontSize:20,
        fontWeight:'bold',
        color:'black',
        marginTop:20,
        paddingTop:10,
        width:200,
        height:50,
        backgroundColor:'red',
        textAlign:'center',
        
        
      }
      
})