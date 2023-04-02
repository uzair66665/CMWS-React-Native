import React, { useState, useEffect } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { View } from 'react-native';

export default function DeliverBoy() {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [destinationLocation, setDestinationLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }, []);

  useEffect(() => {
    const getCoordinates = async () => {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${currentLocation.latitude},${currentLocation.longitude}&destination=${destinationLocation.latitude},${destinationLocation.longitude}&key=AIzaSyDjzFHeTqGM_I05Nv15Tos-2vlmNV2pH5U`,
      );
      const result = await response.json();
      const points = Polyline.decode(result.routes[0].overview_polyline.points);
      const coords = points.map((point) => {
        return { latitude: point[0], longitude: point[1] };
      });
      setCoordinates(coords);
    };

    getCoordinates();
  }, [currentLocation, destinationLocation]);

  return (
    <View>
      <MapView
      style={{ flex: 1,height: '100%', width: '100%' }}
      initialRegion={{
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Marker coordinate={currentLocation} />
      <Marker coordinate={destinationLocation} />
      <Polyline
    coordinates={decodedPolyline}
    strokeWidth={2}
    strokeColor="red"
  />
    </MapView>
    </View>
  )
}

//const styles = StyleSheet.create({})


// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';

// export default function DeliverBoy() {
//     const [currentLocation, setCurrentLocation] = useState({
//         latitude: 0,
//         longitude: 0,
//       });
//       const [restaurantLocation, setRestaurantLocation] = useState({
//         latitude: 37.78825,
//         longitude: -122.4324,
//       });
//       const [customerLocation, setCustomerLocation] = useState({
//         latitude: 37.7900352,
//         longitude: -122.4013726,
//       });
//       const [isPickingUpOrder, setIsPickingUpOrder] = useState(false);
//       const [isDeliveringOrder, setIsDeliveringOrder] = useState(false);
    
//       useEffect(() => {
//         Geolocation.getCurrentPosition(
//           (position) => {
//             setCurrentLocation({
//               latitude: position.coords.latitude,
//               longitude: position.coords.longitude,
//             });
//           },
//           (error) => console.log(error),
//           { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
//         );
//       }, []);
    
//       const goToRestaurant = () => {
//         setIsPickingUpOrder(true);
//       };
    
//       const pickUpOrder = () => {
//         setIsPickingUpOrder(false);
//         setIsDeliveringOrder(true);
//       };
    
//       const deliverOrder = () => {
//         setIsDeliveringOrder(false);
//       };
//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: currentLocation.latitude,
//           longitude: currentLocation.longitude,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//       >
//         <Marker coordinate={currentLocation} />
//         <Marker coordinate={restaurantLocation} />
//         <Marker coordinate={customerLocation} />
//       </MapView>
//       {!isPickingUpOrder && !isDeliveringOrder && (
//         <TouchableOpacity onPress={goToRestaurant} style={styles.button}>
//           <Text style={styles.buttonText}>Go to Restaurant</Text>
//         </TouchableOpacity>
//       )}
//       {isPickingUpOrder && (
//         <TouchableOpacity onPress={pickUpOrder} style={styles.button}>
//           <Text style={styles.buttonText}>Pick Up Order</Text>
//         </TouchableOpacity>
//       )}
//       {isDeliveringOrder && (
//         <TouchableOpacity onPress={deliverOrder} style={styles.button}>
//           <Text style={styles.buttonText}>Deliver Order</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//       },
//       map: {
//         flex: 1,
//       },
//       button: {
//         backgroundColor: 'rgba(255, 255, 255, 0.7)',
//         padding: 10,
//         borderRadius: 5,
//         position: 'absolute',
//         bottom: 20,
//         left: 20,
//         right: 20,
//       },
//       buttonText: {
//         fontSize: 20,
//         textAlign: 'center',
//       },
// })