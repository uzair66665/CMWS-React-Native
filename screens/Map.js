import MapView, {Marker,PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';
import { useState,useEffect,useRef} from 'react';


import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Map() {
    const mapRef = useRef(null)
   // const isFocused = useIsFocused()

    const [initialRegion, setInitialRegion] = useState({
        latitude: 33.5651,
        longitude: 73.0169,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    
    const [currentPosition, setCurrentPosition] = useState({
        latitude: 0,
        longitude: 0,
    });
    

    
//<Marker coordinate={region}/>



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

      useEffect(() => {
       
        requestLocationPermission()
        console.log(initialRegion)
        
            }, []);
    
    

  return (
    <View style={{flex:1,backgroundColor:'blue'}}>
      <MapView
            style={style.map}
            ref={mapRef}
            initialRegion={initialRegion}
            showsUserLocation={true}
            showsMyLocationButton={true}
            
      >
        <Marker draggable
    coordinate={currentPosition}
    title={'My Location'}
    description={'This is my current location'}
/>
      </MapView>

    </View>
  )
}
const style = StyleSheet.create({
    map:{
        flex:1,
        width:'100%',
        height:'80%'
    }
})

