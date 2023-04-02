import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  useColorScheme,
  Image,
  View,
  ImageBackground
} from 'react-native';
import { useEffect } from 'react';

export default function Customer_p({navigation}) {

  global.cid;
  global.clat
  global.clon;
  global.veh=null;
  global.charges=0;

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
              global.clat=+data.lat;
              global.clon=+data.lon;
            });
        
    }
    catch (error) {
      console.log("Post submission failed");
      console.log(error.message);
    }
  }


useEffect(()=>{
  getcustomerid();
})



  return (
    <SafeAreaView style={style.container}>
      <ScrollView>
      <ImageBackground style={style.container} source={require('../Assets/Images/BG.jpg')}>
      <View style={style.tct}>    
             <Text style={style.head}>Customer Panel</Text>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableOpacity
            style={style.appButtonContainer}
            onPress={() => navigation.navigate('Construch')}>
            <Text style={style.appButtonText}>Construction {'\n'} Estimate</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.appButtonContainer}
            onPress={() => navigation.navigate('CustomerCart')}>
            <Text style={style.appButtonText}>Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.appButtonContainer}
            onPress={() => navigation.navigate('CustomerHistory')}>
            <Text style={style.appButtonText}>Cart {'\n'} History</Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Text style={{textAlign: 'center', color:'black',fontWeight:'bold', fontSize: 20, marginTop: 20}}>
            ----OR ORDER----
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <TouchableOpacity 
           onPress={()=> navigation.navigate('C_SelectProduct',{typ:"Brick"})}>
            <View style={style.fcontainer} >
              <Text style={style.name}>Bricks</Text>
              <Image source={require('../Assets/Images/brick.jpg')} style={style.img}/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
           onPress={()=> navigation.navigate('C_SelectProduct',{typ:"Sand"})}>
            <View style={style.fcontainer} >
              <Text style={style.name}>Sand</Text>
              <Image source={require('../Assets/Images/sand.webp')} style={style.img}/>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <TouchableOpacity 
           onPress={()=> navigation.navigate('C_SelectProduct',{typ:"Cement"})}>
            <View style={style.fcontainer} >
              <Text style={style.name}>Cement</Text>
              <Image source={require('../Assets/Images/cement.jpg')} style={style.img}/>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
           onPress={()=> navigation.navigate('C_SelectProduct',{typ:"Crush"})}>
            <View style={style.fcontainer} >
              <Text style={style.name}>Crush</Text>
              <Image source={require('../Assets/Images/crush.jpg')} style={style.img}/>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <TouchableOpacity 
           onPress={()=> navigation.navigate('C_SelectProduct',{typ:"Steel"})}>
            <View style={style.fcontainer} >
              <Text style={style.name}>Steel</Text>
              <Image source={require('../Assets/Images/steel.jpg')} style={style.img}/>
            </View>
          </TouchableOpacity>
        <TouchableOpacity 
           onPress={()=> navigation.navigate('C_SelectProduct',{typ:"Other"})}>
            <View style={style.fcontainer} >
              <Text style={style.name}>Other</Text>
              <Image source={require('../Assets/Images/other.jpg')} style={style.img}/>
            </View>
          </TouchableOpacity>
        </View>
        

        {/* <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableOpacity
            style={style.appButtonContainer}
            onPress={() => navigation.navigate('login')}>
            <Text style={style.appButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View> */}
      </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  head:{
    fontSize:30,
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
  img: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    width:'100%', 
      height:'85%',
      marginTop:'15%',
  },
  Head: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
  },
  fcontainer: {
    height:150,
    width:150,
    elevation: 8,
    marginTop: 30,
    marginLeft: 12,
    borderBottomColor: "black",
    borderRadius: 10,
    
  },
  appButtonContainer: {
    elevation: 8,
    fontSize: 20,
    marginTop: '8%',
    marginLeft: 12,
    justifyContent:'center',
    alignItems:'center',
    padding:10,
    backgroundColor: 'black',
    borderRadius: 10,
  },
  appButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign:'center',
    textTransform: 'uppercase',
  },
});
