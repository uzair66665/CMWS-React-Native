import {
  FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    View,
  } from 'react-native';
import React, { useEffect, useState } from 'react'

export default function Productview_ven({navigation}) {


  const [data,setData]=useState("");
  
    const GetProducts=  async() => {
        try {
            //alert(pid);
            const response = await fetch(global.ip+"Product/Get_Products?id="+global.vid);
            const json = await response.json();
            setData(json);
            //console.log(data);
        }
        catch (error) {
          console.log("Post submission failed");
          console.log(error.message);
        }
      }
      

      useEffect(()=>{
        GetProducts();
    })
  return (
    <SafeAreaView style={style.container}>
      <ImageBackground style={style.container} source={require('../Assets/Images/BG.jpg')}>
      <View style={style.tct}>    
             <Text style={style.head}>View Product</Text>
      </View>
      
        <FlatList
            data={data}
            renderItem={({ item })=> (
              <TouchableOpacity onPress={()=> navigation.navigate('Productview_venDetails',{pid : item.pid})}>
                <View style={style.fcontainer} >
                  <Text style={style.name}>{item.type}</Text>
                  <Image source={{uri:global.img+item.img}} style={style.img}/>
                </View>
              </TouchableOpacity>
            )}
            
          />
      </ImageBackground>
    </SafeAreaView>
  )
}
const style= StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white'

  },
  Head:{
    color:'black',
    fontSize:20,
    fontWeight:'bold'
  },
  name: {
    color:'black',
    fontWeight: "bold",
    fontSize: 26,
    letterSpacing: 0.5,
    flex:1,
    textAlign:'center',
    backgroundColor:'grey',
    marginTop:-10,
  },
  fcontainer: {
    paddingVertical: 10,
    marginVertical: 10,
    flex:1,
    height:300,
    marginTop:20,
    marginHorizontal: 20,
    borderBottomColor: "black",
    flexDirection: "row",
    backgroundColor:'white'
    
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
  },
  img: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    width:'100%', 
      height:'100%',
      marginTop:'10%',
  },
  
})