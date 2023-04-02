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
    Image,
    FlatList,
    View,
  } from 'react-native';

export default function CustomerHistoryDetails({navigation,route}) {

    const [data,setData]=useState();
    const [chk, setchk] = useState(0)
    const GetOrders =  async() => {
        try {

        await  fetch(global.ip+"cart/GetHistoryOrderDetails", {
                method: 'POST',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  c_id:route.params.c_id,
                })
                }).then(response => response.json())
                .then(data => {
                    console.log(data)
                  if(data=='no')
                  {
                    Alert.alert('No orders')
                    navigation.navigate('Customer_p')
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
      const updateStatus =  async() => {
        try {

        await  fetch(global.ip+"cart/UpdateOrderStatus", {
                method: 'POST',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  c_id:route.params.c_id,
                  o_status:3
                })
                }).then(response => response.json())
                .then(data => {
                    console.log(data)
                    setchk(1)
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
             <Text style={style.head}>Order Details</Text>
        </View>

        <FlatList
                data={data}
                renderItem={({ item })=> (
                  <View style={style.main}>
                      <View style={style.details}>
                          <View >
                          <Image source={{uri:global.imgaddr+item.p_img}} style={style.img}/>
                          </View>
                          <View style={style.details1}>
                              <Text style={style.txt}>
                                  {item.p_name}{'\n'}
                                  Quantity : {item.qty}{'\n'}
                                  Rs.{item.amount}
                              </Text>
                          </View>
                      </View>
                  </View>
                )}
              />
        <TouchableOpacity style={style.btn} onPress={() => navigation.navigate('Customer_p')}>
            <Text style={style.btntxt}>Done</Text>
        </TouchableOpacity>
        
    </ImageBackground>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
    container:{
        flex:1,
    },
    img:{
        width:100,
        height:'100%'
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
    btn:{
        elevation: 8,
        backgroundColor: '#AA4A44',
        borderRadius: 10,
        alignSelf:'center',
        marginTop:'10%',
        width:'80%',
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginBottom:15
    },
    btntxt:{
        fontSize: 25,
        color: "white",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    main:{
        flex:1,
        width:"90%",
        alignSelf:'center',
        marginTop:10,
        borderRadius:15,
        overflow: 'hidden',
        borderColor:'black',
        borderWidth:3,
        backgroundColor:'#e3c70e'
      },
      details:{
        flexDirection:'row',
      },
      details1:{
        height:"100%",
        flex:3,
        paddingLeft:20
      },
})