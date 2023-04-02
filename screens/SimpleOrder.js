import { Picker } from '@react-native-picker/picker';
import React, { useState,useEffect} from 'react'
import {
    Alert,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,Image,
    Text,
    FlatList,
    TextInput,
    Touchable,
    TouchableOpacity,
    useColorScheme,
    View,
  } from 'react-native';

export default function SimpleOrder({navigation,route}) {

    const [Pname , Set_Pname] = useState();
    const [qty , setQty] = useState();
    const [Price , Set_Price] = useState();
    const [data,setData]=useState("");
    //const [unit, setUnit] = useState(global.unit);

    function CheckEmpty() {
      if (qty == null) {
        Alert.alert('Please Enter Quantity');
      } else {
          Add();
      }
    }
  
     const Add=  async() => {
      try {
        console.log('Adding...')
        
          await  fetch(global.ip+"cart/addtocart", {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({  
              qty:qty,
              vid:route.params.vid,
              cid:global.cid,
              p_cid:route.params.p_cid
            })
            }).then(response => response.json())
            .then(data => {
              if(data=="ok")
              {
                Alert.alert("Added Successfully")
                //navigation.navigate('AddProductImg');
              }
             
            });
        
          
      }
      catch (error) {
        console.log("Post submission failed");
        console.log(error.message);
      }
    }
    const Get_RecomendProducts=  async() => {
      try {
        console.log('Getting Recomended...')
        
          await  fetch(global.ip+"Customer/Get_RecomendProducts", {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({  
              type:route.params.type,
              vid:route.params.vid
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
      Get_RecomendProducts();
  },[])


  return (
    <SafeAreaView style={style.container}>
      
      <ImageBackground style={style.bg} source={require('../Assets/Images/PBG.jpg')} >
      <ScrollView>
      <View style={style.head}>
      <Text style={style.Text}>Select Quantity</Text>
      </View>

      
      <View style={style.main}>
        <View style={style.details}>
            <View style={style.details1}>
                <Text style={style.txt}>
                    Vendor{'\n'}
                    Name{'\n'}
                    Price{'\n'}
                    Unit{'\n'}
                </Text>
            </View>
            <View style={style.details2}>
                <Text style={style.txt}>
                    {global.vendname}{'\n'}
                    {route.params.name}{'\n'}
                    {route.params.price}{'\n'}
                    {route.params.unit}{'\n'}
                </Text>
            </View>
        </View>
        <Image source={{uri:global.imgaddr+route.params.img}} style={style.img}/>
    </View>


        <View >
            <TextInput
              placeholder="Enter Quantity"
              style={style.input}
              value={qty}
              onChangeText={qty => setQty(qty)}
            />
          </View>
        <TouchableOpacity
            style={style.appButtonContainer}
            onPress={CheckEmpty}>
            <Text style={style.appButtonText}>Add to cart</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={style.appButtonContainer}
            onPress={()=>navigation.navigate('CustomerCart')}>
            <Text style={style.appButtonText}>Go to cart</Text>
          </TouchableOpacity>
          

          </ScrollView>
    
    
    <View style={style.fl}>
          <FlatList
          nestedScrollEnabled={true}
              data={data}
              renderItem={({ item })=> (
                <View style={style.main}>
                    <View style={style.details}>
                        <View style={style.details1}>
                            <Text style={style.txt}>
                                Vendor{'\n'}
                                Name{'\n'}
                                Price{'\n'}
                                Unit{'\n'}
                            </Text>
                        </View>
                        <View style={style.details2}>
                            <Text style={style.txt}>
                                {item.vendorname}{'\n'}
                                {item.name}{'\n'}
                                {item.price}{'\n'}
                                {item.unit}{'\n'}
                            </Text>
                        </View>
                    </View>
                    <Image source={{uri:global.imgaddr+item.p_img}} style={style.img}/>
                    <View style={style.buttons}>
                        
                        <TouchableOpacity style={style.btn1} onPress={()=>nav(item.p_cid,item.name,item.stock,item.vid,item.vendorname,item.p_img,item.unit,item.price)}>
                            <Text 
                            style={style.btn1}>Buy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
              )}
              
            />
          </View>
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
        width: '90%',
        marginTop:10,
        borderWidth: 2,
        borderRadius: 10,
        color:'black',
        padding: 10,
        alignSelf:'center',
        fontSize: 18,
        backgroundColor:'white'
      },
      main:{
        backgroundColor:'white',
        height:320,
        color:'black',
        width:"90%",
        alignSelf:'center',
        marginTop:10,
        borderRadius:15,
        borderColor:'black',
        borderWidth:3
      },
      details:{
        height:"34%",
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
      txt:{
        fontSize:22,
        fontWeight:'bold',
        marginLeft:10,
        color:'black'
      },
      img:{
        height:"66%",
        borderBottomRightRadius:12,
        borderBottomLeftRadius:12
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
        marginTop:'5%',        
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
      fl:{
        height:'10%'
      }

})