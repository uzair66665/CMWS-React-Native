import {
  FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    Alert,
    TouchableOpacity,
    ImageBackground,
    Image,
    View,
  } from 'react-native';
import React, { useEffect, useState } from 'react'

export default function Productview_venDetails({navigation,route}) {


  const [data,setData]=useState("");
  
    const GetProducts=  async() => {
        try {
            //alert(pid);
            const response = await fetch(global.ip+"Product/Get_ProductsDetails?id="+route.params.pid);
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

    const del = async(id) => {
      try {
          console.log('Deleting...')
          
            await  fetch(global.ip+"Product/delproduct", {
              method: 'POST',
              headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
              },
              body: JSON.stringify({  
                p_cid:id,

              })
              }).then(response => response.json())
              .then(data => {
                if(data=="Deleted")
                {
                  Alert.alert("Product Deleted Successfully")
                  GetProducts()
                }else{
                
                  Alert.alert(data)
                  
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
      <ImageBackground style={style.container} source={require('../Assets/Images/BG.jpg')}>
      <View style={style.tct}>    
             <Text style={style.head}>Product Details</Text>
      </View>
      
        <FlatList
            data={data}
            renderItem={({ item })=> (
              <View style={style.main}>
                  <View style={style.details}>
                      <View style={style.details1}>
                          <Text style={style.txt}>
                              Name{'\n'}
                              Stock{'\n'}
                              Price{'\n'}
                              Unit{'\n'}
                          </Text>
                      </View>
                      <View style={style.details2}>
                          <Text style={style.txt}>
                              {item.name}{'\n'}
                              {item.stock}{'\n'}
                              {item.price}{'\n'}
                              {item.unit}{'\n'}
                          </Text>
                      </View>
                  </View>
                  <Image source={{uri:global.imgaddr+item.p_img}} style={style.img}/>
                  <View style={style.buttons}>
                      <TouchableOpacity
                      onPress={()=>navigation.navigate('Edit_product',{item:item})}>
                          <Text 
                          style={style.btn1}>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                      onPress={() => del(item.p_cid)}>
                          <Text 
                          style={style.btn1}>Delete</Text>
                      </TouchableOpacity>
                  </View>
              </View>
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
  },
  main:{
      backgroundColor:'white',
      height:350,
      width:"90%",
      alignSelf:'center',
      marginTop:20,
      borderRadius:15,
      overflow: 'hidden',
      borderColor:'black',
      borderWidth:3
    },
    details:{
      height:"35%",
      flexDirection:'row'
    },
    details1:{
      height:"100%",
      flex:2,
      marginLeft:50
    },
    details2:{
      height:"100%",
      flex:3,
    },
    img:{
      height:"50%"
    },
    buttons:{
      height:"15%",
      justifyContent:'space-evenly',
      flexDirection:'row',
      alignItems:'center'
    },
    txt:{
      fontSize:22,
      fontWeight:'bold',
      color:'black',
      marginLeft:10
    },
    btn1:{
      fontSize:18,
      color:"black",
      width:100,
      backgroundColor:'#e1ecf5',
      borderRadius: 30,
      textAlign:'center',
  },
})