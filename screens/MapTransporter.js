import MapView, {Marker,PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';
import { useState,useEffect,useRef} from 'react';
import { Polyline } from "react-native-maps";
import { decode } from "@mapbox/polyline";
import MapViewDirections from 'react-native-maps-directions';



import { StyleSheet, Text, View,ActivityIndicator } from 'react-native'
import React from 'react'

export default function MapTransporter() {
    const mapRef = useRef(null)
    const [loading, setLoading] = useState(true);
   // const isFocused = useIsFocused()
   const [data, setdata] = useState();
   const [tlat, settlat] = useState(0);
   const [tlon, settlon] = useState(0);
   const [vlat, setvlat] = useState(0);
   const [vlon, setvlon] = useState(0);
   const [clat, setclat] = useState(0);
   const [clon, setclon] = useState(0);
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
    const [venPosition, setvenPosition] = useState({
        latitude: 33.5451,
        longitude: 73.0069,
    });
    const [cusPosition, setcusPosition] = useState({
        latitude: 33.5351,
        longitude: 73.0059,
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
                    // mapRef.current.animateToRegion({
                    //     latitude: tlat,
                    //     longitude: tlon,
                    //     latitudeDelta: 0.0922,
                    //     longitudeDelta: 0.0421,
                    // }, 3 * 1000);
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
      const GetData =  async() => {
        try {

        await  fetch(global.ip+"file/GetLocationData", {
                method: 'POST',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  tid:global.tid
                })
                }).then(response => response.json())
                .then(data => {
                    setdata(data)
                    console.log(data)
                    settlat(+data.tlocation.lat)
                    settlon(+data.tlocation.lon)
                    
                    setvlat(+data.vlocation.lat)
                    setvlon(+data.vlocation.lon)
                    
                    setclat(+data.clocation.lat)
                    setclon(+data.clocation.lon)
                });
            
        }
        catch (error) {
          console.log("Post submission failed");
          console.log(error.message);
        }
      }
      useEffect(() => {
        GetData()
        requestLocationPermission()
        console.log(initialRegion)
            }, []);
    
            const [distance, setDistance] = useState(0);

            useEffect(() => {
              const getDirections = async (lat1,lon1,lat2,lon2) => {
                try {
                  const response = await fetch(
                    `https://maps.googleapis.com/maps/api/directions/json?origin=${lat1},${lon1}&destination=${lat2},${lon2}&key=AIzaSyDjzFHeTqGM_I05Nv15Tos-2vlmNV2pH5U`
                  );
                  const data = await response.json();
                  if (data.routes.length > 0) {
                  const route = data.routes[0];
                  const distanceInMeters = route.legs[0].distance.value;
                  const distanceInKilometers = distanceInMeters / 1000;
                  setDistance(distanceInKilometers);
                  
                  console.log(distanceInKilometers)
                  setLoading(false)
                  return distanceInKilometers
                  }
                } catch (error) {
                  console.error(error);
                }
              };
          
              var d1=getDirections(tlat,tlon,vlat,vlon);
              var d2=getDirections(vlat,vlon,clat,clon);
              console.log(d1)
              console.log(d2)
            }, []);

  return (
    <View style={{flex:1}}>
      <MapView
            style={style.map}
            ref={mapRef}
            initialRegion={{
                latitude:tlat,
                longitude:tlon,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }}
            showsUserLocation={true}
            followsUserLocation
            showsMyLocationButton={true}
            // onRegionChangeComplete={(region) => setCurrentPosition(region)}
            //onRegionChange={(region) => setCurrentPosition(region)}
            
      >
    <MapViewDirections
        origin={currentPosition}
        destination={{latitude:vlat,longitude:vlon}}
        apikey={'AIzaSyDjzFHeTqGM_I05Nv15Tos-2vlmNV2pH5U'}
        strokeWidth={4}
        strokeColor={'black'}
        strokeOpacity={0}
    />
    <MapViewDirections
        origin={{latitude:vlat,longitude:vlon}}
        destination={{latitude:clat,longitude:clon}}
        apikey={'AIzaSyDjzFHeTqGM_I05Nv15Tos-2vlmNV2pH5U'}
        strokeWidth={4}
        strokeColor={'green'}
    />
        <Marker 
            coordinate={{latitude:vlat,longitude:vlon}}
        />
        <Marker 
            coordinate={{latitude:clat,longitude:clon}}
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

