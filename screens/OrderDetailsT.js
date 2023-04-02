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

export default function OrderDetailsT({navigation,route}) {

    const [data,setData]=useState();
    const [chk, setchk] = useState(0)
    global.id=null
    const GetOrders =  async() => {
        try {

        await  fetch(global.ip+"cart/GetOrderDetails", {
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
      const updateStatus =  async(type) => {
        try {
            var reject=0
            var o_status=0
            if(type=='reject')
            {
                o_status=3
            }
            else if(type=='accept')
            {
                o_status=4
            }
        await  fetch(global.ip+"cart/UpdateOrderStatusTransp", {
                method: 'POST',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  c_id:route.params.c_id,
                  o_status:o_status,
                  tid:global.tid,
                })
                }).then(response => response.json())
                .then(data => {
                    console.log(data)
                    if(type=='reject')
                    {
                        global.id=route.params.c_id
                        navigation.navigate('Transporter_p')
                    }
                    navigation.navigate('MapTransporter')
                    
                });
            
        }
        catch (error) {
          console.log("Post submission failed");
          console.log(error.message);
        }
      }
useEffect(() => {
    // if(route.params.o_status==3)
    // {
    //     setchk(1)
    // }
    GetOrders()
}, [])

    
  return (
    <SafeAreaView style={style.container}>
    
    <ImageBackground style={style.container} source={require('../Assets/Images/BG.jpg')}>
        <View style={style.tct}>    
             <Text style={style.head}>Details</Text>
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
        {chk==0?(
            <>
            <TouchableOpacity style={style.btn} onPress={() => updateStatus('accept')}>
                <Text style={style.btntxt}>Accept Order</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.btn1} onPress={() => updateStatus('reject')}>
                <Text style={style.btntxt}>Reject Order</Text>
            </TouchableOpacity>
            </>
        ):(
            <TouchableOpacity style={style.btn} onPress={() => navigation.navigate('Vendor_p')}>
                <Text style={style.btntxt}>Done</Text>
            </TouchableOpacity>
        )}
        
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
        backgroundColor: '#27e85b',
        borderRadius: 10,
        alignSelf:'center',
        marginTop:10,
        width:'80%',
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginBottom:15
    },
    btn1:{
        elevation: 8,
        backgroundColor: 'red',
        borderRadius: 10,
        alignSelf:'center',
        marginTop:10,
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