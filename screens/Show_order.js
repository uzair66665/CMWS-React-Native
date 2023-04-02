import React, { useState,useEffect } from 'react'
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
    ImageBackground,
    FlatList,
    View,
  } from 'react-native';

export default function Show_order({navigation}) {

    const [data,setData]=useState();
    const GetOrders =  async() => {
        try {

        await  fetch(global.ip+"cart/GetOrders", {
                method: 'POST',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  vid:global.vid,
                })
                }).then(response => response.json())
                .then(data => {
                    console.log(data)
                  if(data=='no')
                  {
                    Alert.alert('No orders')
                    navigation.navigate('Vendor_p')
                  }
                  else
                  {
                    setData(data)
                  }
                });
            
        }
        catch (error) {
          console.log("Post submission failed");
          console.log(error.message);
        }
      }
useEffect(() => {
    GetOrders()
}, [])

    
  return (
    <SafeAreaView style={style.container}>
    
    <ImageBackground style={style.container} source={require('../Assets/Images/BG.jpg')}>
        <View style={style.tct}>    
             <Text style={style.head}>Show Orders</Text>
        </View>
        <FlatList
            data={data}
            renderItem={({item})=>(
                <>
                <View style={style.orders}>
                    <View style={style.name}>
                        <Text style={style.txt}>ID : {item.c_id}{'\n'}{item.c_name}</Text>
                    </View>
                    <View style={style.name}>
                        <TouchableOpacity onPress={()=>navigation.navigate('ShowDetails',{c_id:item.c_id,o_status:item.o_status})}>
                            <Text style={style.btntxt}>Show Details</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </>
            )
            }
        />

    </ImageBackground>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
    container:{
        flex:1,
    },
    head:{
        fontSize:40,
        fontFamily:'arial',
        textTransform: "uppercase",
        color:'white',
        fontWeight:'bold',
        textAlign:'center'
    },
    tct:{
        backgroundColor:'#AA4A44',
        width:'100%',
        marginBottom:'5%'
    },
    orders:{
        flexDirection:'row',
        width:'90%',
        alignSelf:'center',
        alignItems:'center',
        borderRadius:8,
        borderColor:'black',
        borderWidth:4,
        marginTop:10,
        paddingTop:'1%',
        paddingBottom:'1%',
        backgroundColor:'#fcefca'
    },
    txt:{
        fontSize:22,
        fontWeight:'bold',
        color:'black',
    },
    name:{
        flex:1,
        marginLeft:10
    },
    btntxt:{
        fontSize:22,
        fontWeight:'bold',
        color:'black',
        textDecorationLine: 'underline',
    }
})