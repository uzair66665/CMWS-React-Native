
import  React from 'react'
import { useEffect,useState } from 'react';
import {
    ImageBackground,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    Touchable,
    TouchableOpacity,
    useColorScheme,
    View,
    Alert
  } from 'react-native';
  import { useIsFocused } from "@react-navigation/native";  


export default function Transporter_p({navigation}) {

  const isFocused = useIsFocused();
  const [intervalId, setIntervalId] = useState(null);
  const [data, setdata] = useState()
global.tid;
var vtype=''
var c_id=''

    const gettransporterid =  async() => {
        try {

        await  fetch(global.ip+"login/TransporterID", {
                method: 'POST',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  uid:global.uid,
                })
                }).then(response => response.json())
                .then(data1 => {
                  global.tid=data1.us.tid;
                  vtype=data1.vehicle
                });
            
        }
        catch (error) {
          console.log("Post submission failed");
          console.log(error.message);
        }
      }
      const AutoCheckOrderTransp =  async(id) => {
        try {

        await  fetch(global.ip+"cart/AutoCheckOrderTransp", {
                method: 'POST',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  vtype:vtype
                })
                }).then(response => response.json())
                .then(data => {
                  console.log(data)
                  if(data=='no')
                  {
                    console.log("No Data")
                  }
                  else if(global.id != null && global.id==data.c_id)
                  {
                    console.log("No Data 1")
                  }
                  else
                  {
                    c_id=data.c_id;
                    clearInterval(id);
                    Alert.alert('New Order Received', 'Do you want to accept the order', [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed')
                      },
                      {
                        text: 'Show Details', 
                        onPress: () => navigation.navigate('OrderDetailsT',{c_id})
                      },
                    ]);
                  }
                });
            
        }
        catch (error) {
          console.log("Post submission failed");
          console.log(error.message);
        }
      }
      

    useEffect(()=>{
        gettransporterid();
    },[])
    useEffect(() => {
      if(isFocused)
      {
        const id=setInterval(()=>{
          AutoCheckOrderTransp(id)
          //console.log("3 seconds")
        },3000)
        setIntervalId(id);
        return()=>clearImmediate(id)
      }
      return () => {
        // Clean up function: stop any ongoing processes and clear data
        //setData([]);
      };
    },[isFocused])
    
      

  return (
    <SafeAreaView style={style.container}>

        <ImageBackground style={style.container} source={require('../Assets/Images/BG.jpg')}>

      <View style={style.tct}>    
             <Text style={style.head}>Transporter Panel</Text>
      </View>

      {/* <TouchableOpacity style={style.btn} onPress={() => navigation.navigate('AddVehicle')}>
            <Text style={style.btntxt}>Add Vehicle</Text>
        </TouchableOpacity> */}

        
        <TouchableOpacity style={style.btn} onPress={() => navigation.navigate('Show_order')}>
            <Text style={style.btntxt}>Show Bookings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={style.btn} onPress={() => navigation.navigate('EditVehicle')}>
            <Text style={style.btntxt}>Edit Vehicle</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.btn} onPress={() => navigation.navigate('SetLocation',{type:'transp'})}>
            <Text style={style.btntxt}>Sel Location</Text>
        </TouchableOpacity>
        <Text style={{fontSize:20,marginTop:'7%',}}>---- OR ----</Text>
        <TouchableOpacity style={style.btn} onPress={() => navigation.navigate('login')}>
            <Text style={style.btntxt}>Sign out</Text>
        </TouchableOpacity>
        </ImageBackground>
    </SafeAreaView>
  )
}
const style = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        alignContent:'center',
        alignItems:'center',
    },
    head:{
        fontSize:38,
        fontFamily:'arial',
        textTransform: "uppercase",
        color:'white',
        fontWeight:'bold',
        textAlign:'center'
    },
    tct:{
        backgroundColor:'#AA4A44',
        width:'100%',
        marginBottom:'20%'
    },
    btn:{
        elevation: 8,
        backgroundColor: '#AA4A44',
        borderRadius: 10,
        alignSelf:'center',
        marginTop:'10%',
        width:'80%',
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    btntxt:{
        fontSize: 25,
        color: "white",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
})