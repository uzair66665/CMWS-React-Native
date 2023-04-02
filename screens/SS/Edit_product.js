import { Picker } from '@react-native-picker/picker';
import React, { useState,useEffect } from 'react'
import {
    Alert,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View,
  } from 'react-native';

export default function Edit_product({navigation,route}) {

    const [Pname , Set_Pname] = useState("");
    const [stock , Set_stock] = useState();
    const [Price , Set_Price] = useState();
    const [pickercat, setPickercat] = useState("");
    const [unit, setUnit] = useState();
    


    function CheckEmpty() {
      if (Pname == null || stock == null || Price == null || pickercat == null ) {
        Alert.alert('Fill All The Fields...!');
      } else {
          AddProduct();
      }
    }
  
    const [data,setData]=useState("");
    
      const GetDetails=  async() => {
          try {
              const response = await fetch(global.ip+"Product/Get_SpecificProduct?id="+route.params.p_cid);
              const json = await response.json();
              setData(json);
              Set_Pname(json[0].name);
              Set_stock(json[0].stock);
              Set_Price(json[0].price);
              setUnit(json[0].unit);

              console.log(Pname);
              console.log(stock);
              console.log(Price);
              console.log(unit);

              console.log(data)
          }
          catch (error) {
            console.log("Post submission failed");
            console.log(error.message);
          }
        }
        
  
        useEffect(()=>{
            GetDetails();
      },[])
     const AddProduct=  async() => {
      try {
        console.log('Adding...')
        
          await  fetch(global.ip+"Product/AddP_Category", {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({  
              name:Pname,
              price:Price,
              stock:stock,
              category:pickercat,
              unit:unit,
              vid:global.vid,
              pid:global.pid
            })
            }).then(response => response.json())
            .then(data => {
              if(data=="sorry")
              {
                Alert.alert("Product With Same Category Already Exists")
              }else{
                global.p_cid=data
                Alert.alert("Product Added Successfully")
                navigation.navigate('AddProductImg');
                
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

      <ImageBackground style={style.bg} source={require('../Assets/Images/PBG.jpg')} >
      <View style={style.head}>
      <Text style={style.Text}>EDIT PRODUCT</Text>
      </View>

      
        
        <View style={{marginTop: '2%'}}>
            <Text style={style.label}>Product Name</Text>
            <TextInput
              style={style.input}
              value={Pname}
              onChangeText={Pname => Set_Pname(Pname)}
            />
          </View>

          <View style={{marginTop: 10}}>
            <Text style={style.label}>Price</Text>
            <TextInput
              style={style.input}
              keyboardType='number-pad'
              value={Price}
              onChangeText={Price => Set_Price(Price)}
            />
          </View>

          <View style={{marginTop: 10}}>
            <Text style={style.label}>Stock</Text>
            <TextInput
              style={style.input}
              value={stock}
              onChangeText={stock => Set_stock(stock)}
            />
          </View>


          <Text style={style.label}>Category</Text>
          <View style={style.pickercont}>
              <Picker mode="dropdown" style={style.picker}  
              
              selectedValue={pickercat}
              onValueChange={(itemValue)=>setPickercat(itemValue)}
              >
                    <Picker.Item label='Select Category' enabled={false} ></Picker.Item> 
                    <Picker.Item label='A' value={'A'}></Picker.Item> 
                    <Picker.Item label='B' value={'B'}></Picker.Item> 
                    <Picker.Item label='C' value={'C'}></Picker.Item>  
              </Picker>
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
            <Text style={style.appButtonText}>Add</Text>
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