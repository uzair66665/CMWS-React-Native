import MapView, {Marker,PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';
import { useState,useEffect,useRef} from 'react';


import { StyleSheet, Text, View,TouchableOpacity,Image,Alert } from 'react-native'
import React from 'react'

export default function SetLocation({navigation,route}) {
  
    const mapRef = useRef(null)
    const [type,setType]=useState();
    global.cid
    const [initialRegion, setInitialRegion] = useState({
        latitude: 33.5651,
        longitude: 73.0169,
        latitudeDelta: 0.09,
        longitudeDelta: 0.09,
    });
    const [currentPosition, setCurrentPosition] = useState({
        latitude: 33.5651,
        longitude: 73.0169,
    });
const requestLocationPermission =  async() => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message:
                'This App needs to Access your location',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use location');
            Geolocation.getCurrentPosition(
                (position) => {
                    setCurrentPosition({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                    setInitialRegion({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    });
                    mapRef.current.animateToRegion(initialRegion, 3 * 1000);
                },
                (error) => {
                    // handle error
                },
                {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
                );
            //Do something with the granted permission
          } else {
            console.log('Location permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
///API
const update=()=>{
  if(type=='vendor')
  {
    changelocv()
  }
  else if(type=='customerlogin' || type=='customer')
  {
    changelocc()
  }
  else if(type=='transp')
  {
    changeloct()
  }
}
const changelocc=  async() => {
  try {
    console.log('Updating...')
      await  fetch(global.ip+"Customer/SetLocation", {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({  
          cid:global.cid,
          lat:currentPosition.latitude,
          lon:currentPosition.longitude,
        })
        }).then(response => response.json())
        .then(data => {
            global.clat=currentPosition.latitude
            global.clon=currentPosition.longitude
            Alert.alert("Location Added")
            if(type=='customer')
            {
              navigation.navigate('CustomerCart')
            }
            else{
              navigation.navigate('Customer_p')
            }
          console.log(data)
         
        });
    
  }
  catch (error) {
    console.log("Post submission failed");
    console.log(error.message);
  }
}
const changelocv=  async() => {
  try {
    console.log('Updating...')
      await  fetch(global.ip+"Product/SetLocation", {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({  
          vid:global.vid,
          lat:currentPosition.latitude,
          lon:currentPosition.longitude,
        })
        }).then(response => response.json())
        .then(data => {
          console.log(data)
            Alert.alert("Location Added")
            navigation.navigate('Vendor_p')
         
        });
    
  }
  catch (error) {
    console.log("Post submission failed");
    console.log(error.message);
  }
}
const changeloct=  async() => {
  try {
    console.log('Updating...')
      await  fetch(global.ip+"Transporter/SetLocation", {
        method: 'POST',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({  
          tid:global.tid,
          lat:currentPosition.latitude,
          lon:currentPosition.longitude,
        })
        }).then(response => response.json())
        .then(data => {
            Alert.alert("Location Added")
            navigation.navigate('Transporter_p')
        });
    
  }
  catch (error) {
    console.log("Post submission failed");
    console.log(error.message);
  }
}
const getcustomerid =  async() => {
  try {
    console.log("Getting...")
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
            console.log(data)
            global.cid=data.cid;
          });
      
  }
  catch (error) {
    console.log("Post submission failed");
    console.log(error.message);
  }
}
const getvendorid =  async() => {
  try {

  await  fetch(global.ip+"login/VendorID", {
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
            console.log(data)
            global.vid=data;
          });
      
  }
  catch (error) {
    console.log("Post submission failed");
    console.log(error.message);
  }
}


useEffect(()=>{
  if(route.params.type=='customerlogin')
  {
    getcustomerid();
  }
  else if(route.params.type=='vendor')
  {
    getvendorid();
  }
  else if(route.params.type=='customerlogin')
  {
    getcustomerid();
  }
},[])
      useEffect(() => {
       setType(route.params.type)
        requestLocationPermission()
        console.log(initialRegion)
        return () => {
          // Clean up the network request when the component is unmounted
          // This will prevent the "Can't perform a React state update on an unmounted component" warning
        };
            }, []);
    
    

  return (
    <View style={{flex:1}}>
      <MapView
            style={style.map}
            ref={mapRef}
            initialRegion={initialRegion}
            showsUserLocation={true}
            showsMyLocationButton={true}
            onRegionChangeComplete={(region) => setCurrentPosition(region)}
      >
        
        {/* <Marker draggable disbled
            coordinate={currentPosition}
            title={'My Location'}
            description={'This is my current location'}
        /> */}
      </MapView>
      <View style={style.markerFixed}>
          <Image style={style.marker} source={require('../Assets/Images/marker.png')} />
      </View>
      <TouchableOpacity style={style.appButtonContainer}
        onPress={()=>update()}
      >
        <Text style={style.appButtonText}>
          Confirm Location
        </Text>
      </TouchableOpacity>
    </View>
  )
}
const style = StyleSheet.create({
    map:{
        flex:1,
        width:'100%',
        height:'100%'
    },
    markerFixed: {
      left: '50%',
      position: 'absolute',
      top: '50%',
      marginLeft: -15,
      marginTop: -82,
    },
    marker: {
      height: 60,
      width: 30,
      resizeMode: 'stretch',
    },
    appButtonContainer: {
      width: '100%',
      backgroundColor: '#4e8bed',
      paddingVertical: 10,
      paddingHorizontal: 12,
    },
    appButtonText: {
      fontSize: 25,
      color: '#fff',
      fontWeight: 'bold',
      alignSelf: 'center',
      textTransform: 'uppercase',
    },
})

