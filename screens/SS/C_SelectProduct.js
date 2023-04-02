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
  import RadioButtonRN from 'radio-buttons-react-native';
  
  export default function C_SelectProduct({navigation}) {
  
  
    const data1 = [
      {
        label: 'data 1'
       },
       {
        label: 'data 2'
       }
      ];
    const [data,setData]=useState("");
    
    const GetProducts=  async() => {
        try {
          console.log('Getting...')
          
            await  fetch(global.ip+"Customer/Get_Products", {
              method: 'POST',
              headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
              },
              body: JSON.stringify({  
                type:'Brick'
              })
              }).then(response => response.json())
              .then(data => {
                setData(data);
                console.log(data)
               
              });
          
            
        }
        catch (error) {
          console.log("Post submission failed");
          console.log(error.message);
        }
      }
  
        useEffect(()=>{
          GetProducts();
      },[])
    return (
      <SafeAreaView style={style.container}>
        <ImageBackground style={style.container} source={require('../Assets/Images/BG.jpg')}>
        <View style={style.tct}>    
               <Text style={style.head}>Products</Text>
        </View>
        <RadioButtonRN
  data={data1}
  selectedBtn={(e) => console.log(e)}
/>
          <FlatList
              data={data}
              renderItem={({ item })=> (
                <View style={style.main}>
                    <View style={style.details}>
                        <View style={style.details1}>
                            <Text style={style.txt}>
                                Vendor{'\n'}
                                Name{'\n'}
                                Price{'\n'}
                                Category{'\n'}
                                Unit{'\n'}
                            </Text>
                        </View>
                        <View style={style.details2}>
                            <Text style={style.txt}>
                                {item.vendorname}{'\n'}
                                {item.name}{'\n'}
                                {item.price}{'\n'}
                                {item.category}{'\n'}
                                {item.unit}{'\n'}
                            </Text>
                        </View>
                    </View>
                    <Image source={{uri:global.img+item.p_img}} style={style.img}/>
                    <View style={style.buttons}>
                        
                        <TouchableOpacity style={style.btn1}>
                            <Text 
                            style={style.btn1}>Add to Cart</Text>
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
        height:"40%",
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
        height:"45%"
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
        marginLeft:10
      },
      btn1:{
        fontSize:32,
        color:"black",
        width:"100%",
        height:"100%",
        backgroundColor:'#4acaed',
        textAlign:'center',
        fontWeight:'bold'
    },
  })