import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

export default function C_SelectProduct({navigation, route}) {
  const [data, setData] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(data);
  const [filteredData, setFilteredData] = useState([]);
  const radius = 10;
  global.vendname;

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  const handleChange = (text) => {
    setSearchTerm(text);
    const filteredData = data.filter((item) =>{return(
      item.name.toLowerCase().includes(text.toLowerCase()))||
      item.category.toLowerCase().includes(text.toLowerCase()
      )
    }
    );
    setSearchResults(filteredData);
  };
  var clat=0;
  var clon=0;
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
              clat=+data.lat;
              clon=+data.lon;
            });
        
    }
    catch (error) {
      console.log("Post submission failed");
      console.log(error.message);
    }
  }
  const GetProducts = async () => {
    try {
      console.log('Getting...');

      await fetch(global.ip + 'Customer/Get_Products', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: route.params.typ,
        }),
      })
        .then(response => response.json())
        .then(data1 => {
          // const filtered = data1.filter(item => {
          //   const distance = getDistanceFromLatLonInKm(
          //     clat,
          //     clon,
          //     item.lat,
          //     item.lon
          //   );
          //   console.log(distance)
          //   return distance <= radius;
          // });
        
          //setFilteredData(filtered);
          setData(data1);
          setSearchResults(data1);
          console.log(data1)
          console.log(clat)
          console.log(clon)
        });
    } catch (error) {
      console.log('Post submission failed');
      console.log(error.message);
    }
  };

  const nav = (p_cid, name, stock, vid, vname, img, unit, price) => {
    // console.log(p_cid)
    // console.log(name)
    // console.log(stock)
    // console.log(vid)
    global.vendname = vname;
    navigation.navigate('SelectQuantity', {
      p_cid: p_cid,
      name: name,
      stock: stock,
      vid: vid,
      type: route.params.typ,
      img: img,
      unit: unit,
      price: price,
    });
  };

  useEffect(() => {
    getcustomerid();
    GetProducts();
    
  }, []);
  return (
    <SafeAreaView style={style.container}>
      <ImageBackground
        style={style.container}
        source={require('../Assets/Images/BG.jpg')}>
        <View style={style.tct}>
          <Text style={style.head}>Products</Text>
        </View>
        <View style={{marginTop: 7}}>
          <TextInput
            style={style.input}
            placeholder="Search"
            value={searchTerm}
            onChangeText={handleChange}
          />
        </View>
        <FlatList
          data={searchResults}
          renderItem={({item}) => (
            <View style={style.main}>
              <View style={style.details}>
                <View style={style.details1}>
                  <Text style={style.txt}>
                    {item.vendorname}
                    {'\n'}
                    {item.name}
                    {'\n'}
                    Rs.{item.price}
                    {'\n'}
                    {item.category}
                    {'\n'}
                  </Text>
                </View>
                <View style={style.details2}>
                  <Text style={style.txt}>
                    Rating
                    {'\n'}
                    Total Raiting {item.ratingcount}
                    {'\n'}
                    Rating Avg : {item.rating}
                  </Text>
                </View>
              </View>
              <Image
                source={{uri: global.imgaddr + item.p_img}}
                style={style.img}
              />
              <View style={style.buttons}>
                <TouchableOpacity
                  style={style.btn1}
                  onPress={() =>
                    nav(
                      item.p_cid,
                      item.name,
                      item.stock,
                      item.vid,
                      item.vendorname,
                      item.p_img,
                      item.unit,
                      item.price,
                    )
                  }>
                  <Text style={style.btn1}>Buy</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  Head: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  head: {
    fontSize: 50,
    fontFamily: 'arial',
    textTransform: 'uppercase',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tct: {
    backgroundColor: '#AA4A44',
    width: '100%',
  },
  main: {
    backgroundColor: 'white',
    height: 350,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 15,
    overflow: 'hidden',
    borderColor: 'black',
    borderWidth: 3,
  },
  details: {
    height: '40%',
    flexDirection: 'row',
  },
  details1: {
    height: '100%',
    flex: 2,
    marginLeft: 10,
  },
  details2: {
    height: '100%',
    flex: 2,
  },
  img: {
    height: '45%',
  },
  buttons: {
    height: '15%',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
    color:'black'
  },
  btn1: {
    fontSize: 32,
    color: 'black',
    width: '100%',
    height: '100%',
    backgroundColor: '#4acaed',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    width: '90%',
    alignSelf:'center',
    borderWidth: 2,
    borderRadius: 10,
    color:'black',
    padding: 10,
    fontSize: 18,
    backgroundColor:'white'
  },
});

// import {
//   FlatList,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   ImageBackground,
//   Image,
//   TextInput,
//   View,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';

// export default function C_SelectProduct({navigation, route}) {
//   const [data, setData] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState(data);
//   const [filteredData, setFilteredData] = useState([]);
//   const [radius, setRadius] = useState(10000);
//   global.vendname;
//   const handleChange = (text) => {
//     setSearchTerm(text);
//     const filteredData = data.filter((item) =>{return(
//       item.name.toLowerCase().includes(text.toLowerCase()))||
//       item.category.toLowerCase().includes(text.toLowerCase()
//       )
//     }
//     );
//     setSearchResults(filteredData);
//   };
//   var clat=0;
//   var clon=0;
//   const getcustomerid =  async() => {
//     try {

//     await  fetch(global.ip+"login/CustomerID", {
//             method: 'POST',
//             headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//               uid:global.uid,
//             })
//             }).then(response => response.json())
//             .then(data => {
//               //console.log(data)
//               clat=+data.lat;
//               clon=+data.lon;
//             });
        
//     }
//     catch (error) {
//       console.log("Post submission failed");
//       console.log(error.message);
//     }
//   }
//   const GetProducts = async () => {
//     try {
//       console.log('Getting...');

//       await fetch(global.ip + 'Customer/Get_Products', {
//         method: 'POST',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           type: route.params.typ,
//         }),
//       })
//         .then(response => response.json())
//         .then(data1 => {
//           ///////------Now filter the data
//           // const filterData = () => {
//           //   setFilteredData(
//           //     data1.filter((item) => {
//           //       console.log(item)
//           //       const R = 6371; // Earth's radius in kilometers
//           //       const lat1 = item.lat * (Math.PI / 180);
//           //       const lat2 = clat * (Math.PI / 180);
//           //       const dLat = (clat - item.lat) * (Math.PI / 180);
//           //       const dLon = (clon - item.lon) * (Math.PI / 180);
//           //       const a =
//           //         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//           //         Math.cos(lat1) * Math.cos(lat2) *
//           //         Math.sin(dLon / 2) * Math.sin(dLon / 2);
//           //       const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//           //       const d = R * c;
//           //       console.log("--"+d)
//           //       return d <= radius;
//           //     })
//           //   );
//           //   }
//           //   filterData()
//           const fdata = data1.filter((item) => {
//             const start = { latitude: clat, longitude: clon };
//             const end = { latitude: item.lat, longitude: item.lon };
//             const distance = haversine(start, end, { unit: 'meter' });
//             return distance <= radius;
//           });
//           fdata()
//           console.log(filteredData)
//           setData(filteredData);
//           setSearchResults(filteredData);
//           console.log(data1)
//         });
//     } catch (error) {
//       console.log('Post submission failed');
//       console.log(error.message);
//     }
//   };

//   const nav = (p_cid, name, stock, vid, vname, img, unit, price) => {
//     // console.log(p_cid)
//     // console.log(name)
//     // console.log(stock)
//     // console.log(vid)
//     global.vendname = vname;
//     navigation.navigate('SelectQuantity', {
//       p_cid: p_cid,
//       name: name,
//       stock: stock,
//       vid: vid,
//       type: route.params.typ,
//       img: img,
//       unit: unit,
//       price: price,
//     });
//   };

//   useEffect(() => {
//     getcustomerid();
//     GetProducts();
//   }, []);
//   return (
//     <SafeAreaView style={style.container}>
//       <ImageBackground
//         style={style.container}
//         source={require('../Assets/Images/BG.jpg')}>
//         <View style={style.tct}>
//           <Text style={style.head}>Products</Text>
//         </View>
//         <View style={{marginTop: 7}}>
//           <TextInput
//             style={style.input}
//             placeholder="Search"
//             value={searchTerm}
//             onChangeText={handleChange}
//           />
//         </View>
//         <FlatList
//           data={searchResults}
//           renderItem={({item}) => (
//             <View style={style.main}>
//               <View style={style.details}>
//                 <Text style={style.txt}>
//                   {item.vendorname}
//                   {'\n'}
//                   {item.name}
//                   {'\n'}
//                   Rs.{item.price}
//                   {'\n'}
//                   {item.category}
//                   {'\n'}
//                 </Text>
//               </View>
//               <Image
//                 source={{uri: global.imgaddr + item.p_img}}
//                 style={style.img}
//               />
//               <View style={style.buttons}>
//                 <TouchableOpacity
//                   style={style.btn1}
//                   onPress={() =>
//                     nav(
//                       item.p_cid,
//                       item.name,
//                       item.stock,
//                       item.vid,
//                       item.vendorname,
//                       item.p_img,
//                       item.unit,
//                       item.price,
//                     )
//                   }>
//                   <Text style={style.btn1}>Buy</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           )}
//         />
//       </ImageBackground>
//     </SafeAreaView>
//   );
// }
// const style = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   Head: {
//     color: 'black',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   head: {
//     fontSize: 50,
//     fontFamily: 'arial',
//     textTransform: 'uppercase',
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   tct: {
//     backgroundColor: '#AA4A44',
//     width: '100%',
//   },
//   main: {
//     backgroundColor: 'white',
//     height: 350,
//     width: '90%',
//     alignSelf: 'center',
//     marginTop: 20,
//     borderRadius: 15,
//     overflow: 'hidden',
//     borderColor: 'black',
//     borderWidth: 3,
//   },
//   details: {
//     height: '35%',
//     flexDirection: 'row',
//   },
//   details1: {
//     height: '100%',
//     flex: 2,
//     marginLeft: 50,
//   },
//   details2: {
//     height: '100%',
//     flex: 3,
//   },
//   img: {
//     height: '50%',
//   },
//   buttons: {
//     height: '15%',
//     justifyContent: 'space-evenly',
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   txt: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginLeft: 10,
//     color:'black'
//   },
//   btn1: {
//     fontSize: 32,
//     color: 'black',
//     width: '100%',
//     height: '100%',
//     backgroundColor: '#4acaed',
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   input: {
//     height: 50,
//     width: '90%',
//     alignSelf:'center',
//     borderWidth: 2,
//     borderRadius: 10,
//     color:'black',
//     padding: 10,
//     fontSize: 18,
//     backgroundColor:'white'
//   },
// });
