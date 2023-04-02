import { Picker } from '@react-native-picker/picker';
import React, { useState,useEffect } from 'react'
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

export default function Edit_product({navigation,route}) {

    const [Pname , Set_Pname] = useState('');
    const [stock , Set_stock] = useState();
    const [Price , Set_Price] = useState(0);
    const [unit, setUnit] = useState('');
    global.p_cid;


    function CheckEmpty() {
      if (Pname == null || stock == null || Price == null ) {
        Alert.alert('Fill All The Fields...!');
      } else {
        UpdateProduct();
      }
    }
  

     const UpdateProduct=  async() => {
      try {
        console.log('Updating...')
        
          await  fetch(global.ip+"Product/UpdateP_Category", {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({  
              p_cid:route.params.item.p_cid,
              name:Pname,
              price:Price,
              stock:stock
            })
            }).then(response => response.json())
            .then(data => {
              if(data=="ok")
              {
                Alert.alert("Product Updated")
                navigation.navigate('Vendor_p')
              }
             
            });
        
      }
      catch (error) {
        console.log("Post submission failed");
        console.log(error.message);
      }
    }
useEffect(() => {
  Set_Pname(route.params.item.name)
  Set_Price(route.params.item.price)
  Set_stock(route.params.item.stock)
  setUnit(route.params.item.unit)
  //console.log(Price)
}, [])




  return (
    <SafeAreaView style={style.container}>

      <ImageBackground style={style.bg} source={require('../Assets/Images/PBG.jpg')} >
      <View style={style.head}>
      <Text style={style.Text}>EDIT PRODUCT</Text>
      </View>
        
        <View style={{marginTop: '2%'}}>
            <Text style={style.label}>Product Name</Text>
            <TextInput
              placeholder="Ravi Sand, White Cement, Stone Block Etc"
              style={style.input}
              value={Pname}
              onChangeText={Pname => Set_Pname(Pname)}
            />
          </View>

          <View style={{marginTop: 10}}>
            <Text style={style.label}>Price</Text>
            <TextInput
              placeholder="Enter Price"
              style={style.input}
              keyboardType='number-pad'
              value={String(Price)}
              onChangeText={Price => Set_Price(Price)}
            />
          </View>

          <View style={{marginTop: 10}}>
            <Text style={style.label}>Stock</Text>
            <TextInput
              placeholder="Enter Stock"
              style={style.input}
              value={String(stock)}
              onChangeText={stock => Set_stock(stock)}
            />
          </View>

          <View style={{marginTop: 10}}>
            <Text style={style.label}>Unit</Text>
            <TextInput
              style={style.fal}
              value={unit}
              editable={false}
            />
          </View>


        <TouchableOpacity
            style={style.appButtonContainer}
            onPress={CheckEmpty}>
            <Text style={style.appButtonText}>Update</Text>
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