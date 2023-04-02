import {Picker} from '@react-native-picker/picker';
import React, {useState, useEffect} from 'react';
import {
  Alert,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Image,
  Text,
  FlatList,
  TextInput,
  Touchable,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

export default function SelectQuantity({navigation, route}) {
  const [Pname, Set_Pname] = useState();
  const [qty, setQty] = useState();
  const [Price, Set_Price] = useState();
  const [data, setData] = useState('');
  const [address, setaddress] = useState('');
  
  var c_id;

  const [ptype, setPtype] = useState(route.params.typ);
  //const [unit, setUnit] = useState(global.unit);

  function CheckEmpty() {
    if (qty == null) {
      Alert.alert('Please Enter Quantity');
    } else if(qty>route.params.stock)
    {
      Alert.alert('Vendor Dont Have Enough Quantity to Supply');
    }
    else {
      Add();
    }
  }
  const Remove = async () => {
    try {
      console.log('Removing...');

      await fetch(global.ip + 'cart/remtocart', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // qty: qty,
          vid: route.params.vid,
          cid: global.cid,
          // p_cid: route.params.p_cid,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
        });
    } catch (error) {
      console.log('Post submission failed');
      console.log(error.message);
    }
  };

  //--------ADD------------
  const Add = async () => {
    try {
      console.log('Adding...');

      await fetch(global.ip + 'cart/addtocart', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // qty: qty,
          vid: route.params.vid,
          cid: global.cid,
          // p_cid: route.params.p_cid,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          if(typeof data=='number')
          {
            c_id=data;
            addproducts();
          }
          else if(data.Message=='no')
          {
            Alert.alert('Remove Previous Items?', 'You still have products from another vendor. Shall we start over with a fresh cart?', [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
              },
              {text: 'OK', onPress: () => Remove()},
            ]);
          }
        });
    } catch (error) {
      console.log('Post submission failed');
      console.log(error.message);
    }
  };
  const addproducts = async () => {
    try {
      console.log('Adding...');

      await fetch(global.ip + 'cart/addtocartproducts', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vid: route.params.vid,
          cid: global.cid,
          qty: qty,
          c_id:c_id,
          p_cid: route.params.p_cid,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          if (data == 'ok') {
            //addproducts();
            Alert.alert('Added to Cart')
          }
        });
    } catch (error) {
      console.log('Post submission failed');
      console.log(error.message);
    }
  };
  const Get_RecomendProducts = async () => {
    try {
      // setData('');
      // console.log('Getting...');
      // console.log('Type Get : ' + ptype);
      // console.log('Type Get : ' + route.params.type);
      // console.log('Vid Get : ' + route.params.vid);
      await fetch(global.ip + 'Customer/Get_RecomendProducts', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: ptype,
          vid: route.params.vid,
        }),
      })
        .then(response => response.json())
        .then(data1 => {
          setData(data1);
          console.log(data1);
        });
    } catch (error) {
      console.log('Post submission failed');
      console.log(error.message);
    }
  };
  const gettype = async pid => {
    try {
      console.log('Updating...' + pid);

      await fetch(global.ip + 'product/gettype', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pid: pid,
        }),
      })
        .then(response => response.json())
        .then(data1 => {
          setPtype(data1);
          console.log('Type : ' + data1);
          //Get_RecomendProducts();
        });
    } catch (error) {
      console.log('Post submission failed');
      console.log(error.message);
    }
  };
  const getaddress=  async() => {
    try {
      console.log('Getting...')
      
        await  fetch(global.ip+"Login/VendorAddress", {
          method: 'POST',
          headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({  
            vid:route.params.vid
          })
          }).then(response => response.json())
          .then(data => {
            setaddress(data.address)
          });
      
        
    }
    catch (error) {
      console.log("Post submission failed");
      console.log(error.message);
    }
  }
  const nav = (p_cid, name, stock, vid, vname, img, unit, price, pid) => {
    gettype(pid);
    global.vendname = vname;
    navigation.navigate('SelectQuantity', {
      p_cid: p_cid,
      name: name,
      stock: stock,
      vid: vid,
      type: ptype,
      img: img,
      unit: unit,
      price: price,
    });
  };
  useEffect(() => {
    getaddress()
    Get_RecomendProducts();
  }, [ptype]);
  useEffect(() => {
    getaddress()
    setPtype(route.params.type);
  }, []);
  return (
    <View style={style.container}>
      <ImageBackground
        style={style.bg}
        source={require('../Assets/Images/PBG.jpg')}>
        <View style={style.upper}>
          <View style={style.head}>
            <Text style={style.Text}>Select Quantity</Text>
          </View>
          <Text style={style.company}>{global.vendname}</Text>
          <Image
            source={{uri: global.imgaddr + route.params.img}}
            style={style.img}
          />
          <View style={style.first}>
            <Text style={style.price}>Rs.{route.params.price}</Text>
            <View style={style.qty1}>
              <Text style={style.qty2}>Quantity</Text>
              <TextInput
                placeholder="Enter Quantity"
                style={style.input}
                value={qty}
                onChangeText={qty => setQty(qty)}
              />
            </View>
          </View>
          <View style={style.first}>
            <Text style={style.name}>{route.params.name}{'\n'}{address}</Text>
            
            <TouchableOpacity onPress={CheckEmpty}>
              <View style={style.btn1}>
                <Text style={style.btn1txt}>Add To Cart</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={style.rtxt}>Recomended</Text>
        <View style={style.flist}>
          <FlatList
            horizontal={true}
            data={data}
            renderItem={({item}) => (
              <TouchableOpacity
                style={style.recom}
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
                    item.pid,
                  )
                }>
                <Image
                  source={{uri: global.imgaddr + item.p_img}}
                  style={style.fimg}
                />
                <Text style={style.recname}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <TouchableOpacity
          style={style.appButtonContainer}
          onPress={() => navigation.navigate('CustomerCart')}>
          <Text style={style.appButtonText}>Go to cart</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  upper: {},
  flist: {
    height: '20%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  bg: {
    width: '100%',
    height: '100%',
  },
  Text: {
    fontSize: 40,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  head: {
    width: '100%',
    backgroundColor: '#4e8bed',
  },
  img: {
    height: '35%',
    width: '80%',
    alignSelf: 'center',
    resizeMode: 'stretch',
    borderRadius: 10,
  },
  first: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 5,
  },
  price: {
    color: 'red',
    flex: 1,
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  qty1: {
    color: 'red',
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  qty2: {
    color: 'black',
    fontSize: 20,
    flex: 1,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  input: {
    flex: 2,
    height: 40,
    width: '80%',
    marginTop: 10,
    marginLeft: 0,
    marginRight: 5,
    borderWidth: 2,
    borderRadius: 10,
    color: 'black',
    padding: 10,
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  company: {
    alignSelf: 'center',
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  name: {
    color: 'red',
    fontSize: 25,
    flex: 1,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  btn1: {
    flex: 2,
    padding: 5,
    backgroundColor: 'black',
    marginRight: 38,
    borderRadius: 5,
  },
  btn1txt: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  recom: {
    width: 130,
    borderColor: 'black',
    borderWidth: 2,
    height: 120,
    textAlign: 'center',
    borderRadius: 10,
    marginLeft: 15,
    overflow: 'hidden',
  },
  fimg: {
    height: '75%',
    width: '100%',
    resizeMode: 'stretch',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  recname: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  rtxt: {
    marginTop: -35,
    marginLeft: 20,
    marginBottom: 10,
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
  },
  appButtonContainer: {
    elevation: 8,
    marginLeft: 12,
    marginTop: '5%',
    width: '95%',
    backgroundColor: '#4e8bed',
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
});
