import MapView, {Marker,PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';
import { useState,useEffect,useRef} from 'react';
import { Polyline } from "react-native-maps";
import { decode } from "@mapbox/polyline";
import MapViewDirections from 'react-native-maps-directions';



import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function SetLocationVendor() {
    const mapRef = useRef(null)
   // const isFocused = useIsFocused()
   const [coords, setCoords] = useState([]);
    const [initialRegion, setInitialRegion] = useState({
        latitude: 33.5651,
        longitude: 73.0169,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [region, setRegion] = useState({
        latitude: 51.5079145,
        longitude: -0.0899163,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    
    const [currentPosition, setCurrentPosition] = useState({
        latitude: 0,
        longitude: 0,
    });
    

const getDirections = async (startLoc, destinationLoc) => {
    try {
      const KEY = "YOUR GOOGLE API KEY"; //put your API key here.
      //otherwise, you'll have an 'unauthorized' error.
      let resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${KEY}`
      );
      let respJson = await resp.json();
      let points = decode(respJson.routes[0].overview_polyline.points);
      console.log(points);
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1]
        };
      });
      return coords;
    } catch (error) {
      return error;
    }
  };

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
    <View style={{flex:1}}>
      <MapView
            style={style.map}
            ref={mapRef}
            initialRegion={initialRegion}
            showsUserLocation={true}
            followsUserLocation
            showsMyLocationButton={true}
            onRegionChangeComplete={(region) => setCurrentPosition(region)}
            
      >
    <MapViewDirections
        origin={currentPosition}
        destination={initialRegion}
        apikey={'AIzaSyDjzFHeTqGM_I05Nv15Tos-2vlmNV2pH5U'}
        strokeWidth={4}
        strokeColor={'black'}
        onReady={(result) => {
            console.log(result)
        }}
        onError={(error) => {
            console.log(error)
        }}
    />
        <Marker 
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

