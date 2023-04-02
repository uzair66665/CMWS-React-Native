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

  const MAX_RATING = 5;

const Item = ({ item, setRating }) => {
  const [rating, setSelectedRating] = useState(item.rating);

  const handlePress = (index) => {
    setSelectedRating(index + 1);
    setRating(item.p_cid, index + 1);
  };
    // Filled Star. You can also give the path from local
    const starImageFilled =
    '../Assets/Images/star_filled.png';
    // Empty Star. You can also give the path from local
    const starImageCorner =
    '../Assets/Images/star_corner.png';

  return (
    <View style={{ margin: 10, padding: 10, backgroundColor: 'white',borderRadius:10 }}>
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
      <View style={{ flexDirection: 'row', alignSelf:'center' }}>
        {Array.from({ length: MAX_RATING }, (_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(index)}
          >
            <Image
                style={{width: 40,
                    height: 40,
                    resizeMode: 'cover',}}
                source={
                  index < rating
                    ?  require(starImageFilled) 
                    : require(starImageCorner)
                }
              />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
export default function RatingScreen({navigation}) {
    const [data, setdata] = useState()
    const setRating = (p_cid, rating) => {
        setdata((prevData) =>
          prevData.map((item) => {
            if (item.p_cid === p_cid) {
              item.Rating = rating;
            }
            return item;
          })
        );
      };
    const getData=  async() => {
        try {
          console.log('Getting...')
          
            await  fetch(global.ip+"cart/getcartrating", {
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
                console.log(data)
                setdata(data)
              });
          
            
        }
        catch (error) {
          console.log("Post submission failed");
          console.log(error.message);
        }
      }
      const update=  async() => {
        try {
            console.log(data)
          console.log('Updating...')
          
            await  fetch(global.ip+"cart/rating", {
              method: 'POST',
              headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
              }).then(response => response.json())
              .then(data1 => {
                console.log(data1)
                history()
                //setdata(data.details)
              });
        }
        catch (error) {
          console.log("Post submission failed");
          console.log(error.message);
        }
      }
      const history=  async() => {
        try {
            console.log(data)
          console.log('Deleting...')
          
            await  fetch(global.ip+"cart/carthistory", {
              method: 'POST',
              headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                cid:global.cid
              })
              }).then(response => response.json())
              .then(data1 => {
                console.log(data1)
                navigation.navigate('Customer_p')
                //setdata(data.details)
              });
        }
        catch (error) {
          console.log("Post submission failed");
          console.log(error.message);
        }
      }

    useEffect(() => {
      getData()
    }, [])
    
  return (
    <View style={style.container}>
    <ImageBackground style={style.bg} source={require('../Assets/Images/PBG.jpg')} >
        <View style={style.head}>
        <Text style={style.Text}>Products Rating</Text>
        </View>
        <FlatList
                data={data}
                renderItem={({ item })=> (
                    <Item item={item} setRating={setRating} />
                )}
                keyExtractor={(item) => item.p_cid.toString()}
              />
            <TouchableOpacity style={style.appButtonContainer}  onPress={()=>update()}>
                <Text style={style.appButtonText}>Done</Text>
            </TouchableOpacity>
      </ImageBackground>
      </View>
  )
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
        flex:3
      },txt:{
        fontSize:18,
        fontWeight:'bold',
        marginLeft:10,
        marginTop:5,
        color:'black',
      },
      img:{
        width:100,
        height:'100%'
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
})