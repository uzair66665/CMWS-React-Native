import { Picker } from '@react-native-picker/picker';
import React, { useState ,useEffect,useCallback } from 'react'
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
import MapView, {Marker,PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';
import { useRef} from 'react';
import { Polyline } from "react-native-maps";
import { decode } from "@mapbox/polyline";
import MapViewDirections from 'react-native-maps-directions';
import { useIsFocused } from "@react-navigation/native";


export default function CustomerCart({navigation}) {

    const isFocused = useIsFocused();
    const [data,setData]=useState("");
    const [vendata,setvenData]=useState("");
    const [chk,setChk]=useState(0);
    const [total,setTotal]=useState();
    const [order,setOrder]=useState(0);
    const [distance, setDistance] = useState(0);
    //const [unit, setUnit] = useState(global.unit);
    var vlat=0,vlon=0;

    //Maps
    const mapRef = useRef(null);
     const [initialRegion, setInitialRegion] = useState({
         latitude: 0,
         longitude: 0,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421,
     });
     const [lat, setlat] = useState(global.clat)
     const [lon, setlon] = useState(global.clon)

    const getcustomerid =  async() => {
      try {
  
      await  fetch(global.ip+"login/CustomerID", {
              method: 'POST',
              headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                uid:global.uid,
              })
              }).then(response => response.json())
              .then(data => {
                //console.log(data)
                global.cid=data.cid;
                setlat(+data.lat)
                setlon(+data.lon)
                setInitialRegion({
                  ...initialRegion,
                  latitude: +data.lat,
                  longitude: +data.lon,
                });
              });
          
      }
      catch (error) {
        console.log("Post submission failed");
        console.log(error.message);
      }
    }
    ///////////////////////////////////
    const del=  async(id) => {
      try {
        console.log('Deletting...')
          await  fetch(global.ip+"cart/delete", {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({  
              cd_id:id
            })
            }).then(response => response.json())
            .then(data => {
              if(data=='Deleted')
              {
                getData();
              }
            });
        
          
      }
      catch (error) {
        console.log("Post submission failed");
        console.log(error.message);
      }
    }
     const getData=  async() => {
      try {
        console.log('Getting...')
        
          await  fetch(global.ip+"cart/getcart", {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({  
              cid:global.cid
            })
            }).then(response => response.json())
            .then(data => {
              if(data=='empty')
              {
                setChk(0);
                Alert.alert("Cart is Empty")
                navigation.navigate("Customer_p")
              }
              else{
                console.log(data.details[0].cart.o_status)
                if(data.details[0].cart.o_status!=0)
                {
                  setOrder(1)
                }
                console.log(data)
                setData(data.details)
                vlat=data.ven.lat
                vlon=data.ven.lon
                getDistance()
                setvenData(data.ven)
                setChk(1)
                totalPrice()
              }
            });
        
          
      }
      catch (error) {
        console.log("Post submission failed");
        console.log(error.message);
      }
    }
    const totalPrice=  async() => {
      try {
        console.log('Getting...')
        
          await  fetch(global.ip+"cart/gettotal", {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({  
              cid:global.cid
            })
            }).then(response => response.json())
            .then(data => {
              setTotal(data+global.charges);
            });
        
          
      }
      catch (error) {
        console.log("Post submission failed");
        console.log(error.message);
      }
    }
    const update=  async() => {
      try {
        console.log('Ordering...')
        if(global.veh==null)
        {
          Alert.alert('Please Select Vehicle First')
        }
        else
        {
          await  fetch(global.ip+"cart/update", {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({  
              cid:global.cid,
              vtype:global.veh
            })
            }).then(response => response.json())
            .then(data => {
              console.log(data)
              if(data=="ok")
              {
                setOrder(1)
                console.log(order)
              }
            });
        
        }
      }
      catch (error) {
        console.log("Post submission failed");
        console.log(error.message);
      }
    }
    const getDistance = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${global.clat},${global.clon}&destination=${vlat},${vlon}&key=AIzaSyDjzFHeTqGM_I05Nv15Tos-2vlmNV2pH5U`
        );
        const data = await response.json();
        if (data.routes.length > 0) {
        const route = data.routes[0];
        const distanceInMeters = route.legs[0].distance.value;
        const distanceInKilometers = distanceInMeters / 1000;
        setDistance(distanceInKilometers);
        console.log("--"+distanceInKilometers)
        return distanceInKilometers
        }
      } catch (error) {
        console.error(error);
      }
    };
    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        console.log('called')
        // update the view of the MapView component
        setlat(global.clat)
        setlon(global.clon)
       
      });
  
      return unsubscribe;
    }, [navigation]);
    useEffect(()=>{
       // getcustomerid();
      if(isFocused)
      {
         setlat(global.clat)
         setlon(global.clon)
         getData()
         console.log(global.clat)
         console.log(global.clon)
         
      }
    },[isFocused])
    useEffect(() => {
      console.log('FullScreen component re-rendered');
    }, []);
 try{
  return (
    <SafeAreaView style={style.container}>
      {order!=0?(
        <ImageBackground style={style.bg} source={require('../Assets/Images/PBG.jpg')} >
        <View style={style.head}>
        <Text style={style.Text}>Delivering</Text>
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
                                  Shop : {item.v_name}{'\n'}
                                  {item.p_name}{'\n'}
                                  Quantity : {item.qty}{'\n'}
                                  Rs.{item.amount}
                              </Text>
                          </View>
                      </View>
                  </View>
                )}
                
              />
              {chk==1?(<>
                <View style={style.amnt}>
                  <Text style={style.totaltxt}>Delivery Cost : Rs.{global.charges}</Text>
                  <Text style={style.totaltxt}>Total Bill : Rs.{total}</Text>
                </View>
                <TouchableOpacity style={style.appButtonContainer}  onPress={()=>navigation.navigate('RatingScreen')}>
                <Text style={style.appButtonText}>Received Order</Text>
            </TouchableOpacity>
            </>
              ):(
                <TouchableOpacity style={style.appButtonContainer}  onPress={()=>del(item.cd_id)}>
                        <Text style={style.appButtonText}>Back</Text>
                    </TouchableOpacity>
              )
              }
      </ImageBackground>
      )
      :
      (
        <ImageBackground style={style.bg} source={require('../Assets/Images/PBG.jpg')} >
        <View style={style.head}>
        <Text style={style.Text}>Check Out</Text>
        </View>
        <View style={style.map}>
          <View style={{flexDirection:'row'}}>
            <Text style={style.txt}>
              Delivery Address
            </Text>
            <TouchableOpacity onPress={()=>navigation.navigate('SetLocation',{type:'customer'})}>
              <Image source={require('../Assets/Images/edit.png')} style={style.mapicon}/>
            </TouchableOpacity>
          </View>
          <View style={style.mapc}>
            <MapView
                  style={style.mapv}
                  region={{
                    latitude:lat,
                    longitude:lon,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                  }}
            >
              <Marker 
                  coordinate={{
                    latitude:lat,
                    longitude:lon
                  }}
              />
            </MapView>
              
          </View>
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
                                  Shop : {item.v_name}{'\n'}
                                  {item.p_name}{'\n'}
                                  Quantity : {item.qty}{'\n'}
                                  Rs.{item.amount}
                              </Text>
                          </View>
                          <View style={style.details2}>
                              <TouchableOpacity  onPress={()=>del(item.cd_id)}>
                                <Image source={require('../Assets/Images/edit.png')} style={style.icons}/>
                              </TouchableOpacity>
                              <TouchableOpacity  onPress={()=>del(item.cd_id)}>
                                <Image source={require('../Assets/Images/delete.webp')} style={style.icons}/>
                              </TouchableOpacity>
                          </View>
                      </View>
                  </View>
                )}
                
              />
              {chk==1?(<>
                <View style={style.amnt}>
                  {global.veh==null?(
                    <TouchableOpacity style={style.appButtonContainer1}  onPress={()=>navigation.navigate('SelectVehicle',{distance})}>
                        <Text style={style.appButtonText}>Select Vehicle</Text>
                    </TouchableOpacity>
                  ):(
                    <Text style={style.totaltxt}>Delivery Cost : Rs.{global.charges}</Text>
                  )}
                  <Text style={style.totaltxt}>Total Bill : Rs.{total}</Text>
                </View>
                <TouchableOpacity style={style.appButtonContainer}  onPress={()=>update()}>
                    <Text style={style.appButtonText}>Place Order</Text>
                </TouchableOpacity>
            </>
              ):(
                <TouchableOpacity style={style.appButtonContainer}  onPress={()=>del(item.c_id)}>
                        <Text style={style.appButtonText}>Back</Text>
                    </TouchableOpacity>
              )
  
              }
                
                
      
  
      </ImageBackground>
    )}

    </SafeAreaView>
    
  )
} catch (error) {
  console.error(error);
  return null;
}
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
      fontSize:30,
      color:'white',
      textAlign:'center',
      fontWeight:'bold',  
    },
    head:{
        width:'100%',
        backgroundColor:'#e39f0e'
    },
    map:{
      marginTop:10,
      width:'90%',
      height:'20%',
      backgroundColor:'white',
      alignSelf:'center',
      borderRadius:15,
      alignItems:'center'
    },
    mapc:{
      width:'100%',
      height:'75%',
    },
    mapv:{
        flex:1,
        width:'100%',
        height:'100%'
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
    img:{
      width:100,
      height:'100%'
    },
    icons:{
      width:40,
      height:40,
      borderRadius:10
    },
    mapicon:{
      width:40,
      height:40,
      borderRadius:10,
      marginLeft:50
    },
    details:{
      flexDirection:'row',
    },
    details1:{
      height:"100%",
      flex:3
    },
    details2:{
      height:"100%",
      alignItems:'center',
      justifyContent:'space-evenly',
      flex:1
    },
    txt:{
      fontSize:18,
      fontWeight:'bold',
      marginLeft:10,
      marginTop:5,
      color:'black',
    },
    totaltxt:{
      fontSize:18,
      fontWeight:'bold',
      color:'white',
      textAlign:'center',
      padding:8,
      backgroundColor:'#0f1211',
      borderRadius:5,
      marginRight:10,
      marginLeft:10
    },
    amnt:{
      marginTop:10,
      width:'100%',
      justifyContent:'space-between',
      alignItems:'center',
      flexDirection:'row',
    },
    btn1:{
      fontSize:32,
      color:"black",
      width:"100%",
      height:"100%",
      backgroundColor:'#e39f0e',
      textAlign:'center',
      fontWeight:'bold'
  },
    btn:{
        elevation: 8,
        backgroundColor: '#e39f0e',
        borderRadius: 10,
        alignSelf:'center',
        marginTop:'10%',
        marginLeft:'5%',
        width:'40%',
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
      appButtonContainer1: {
        elevation: 8,
        marginLeft: 12,
        width: 180,
        backgroundColor: '#e39f0e',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,

      },
      appButtonContainer: {
        elevation: 8,
        marginLeft: 12,
        marginTop:10,
        marginBottom:10,      
        width: '95%',
        backgroundColor: '#e39f0e',
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