import {
    Alert,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    Touchable,
    Image,
    TouchableOpacity,
    ImageBackground,
    useColorScheme,
    View,
  } from 'react-native';
  import React, {useState} from 'react';

export default function CVprofile({navigation}) {
    const [Name, setName] = useState();
  const [Address, setAddress] = useState();
  const [Contact,setContact]=useState("");



  function CheckEmpty() {
    if (Name == null || Address == null || Contact ==null) {
      Alert.alert('Name or Address or Contact Number are empty...!');
    } else {
        if(global.Usertype == 'Customer'){
        Customer();
        }else{
        Vendor();
        }
      //navigation.navigate('Vendor_p');
    }
  }


   const Customer=  async() => {
    try {
      console.log('Saving...')
      
        await  fetch(global.ip+"login/Add_Customer", {
          method: 'POST',
          headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({  
            name:Name,
            address:Address,
            contact:Contact,
            uid:global.Uid
          })
          }).then(response => response.json())
          .then(data => {
            if(data=="Sorry")
            {
              Alert.alert("Number Already Exists")
            }
            else{
                navigation.navigate('Customer_p')
            }
           });
      
      
        
    }
    catch (error) {
      console.log("Post submission failed");
      console.log(error.message);
    }
  }

  const Vendor=  async() => {
    try {
      console.log('Saving...')
      
        await  fetch(global.ip+"login/Add_Vendor", {
          method: 'POST',
          headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({  
            name:Name,
            address:Address,
            contact:Contact,
            uid:global.uid
          })
          }).then(response => response.json())
          .then(data => {
            if(data=="Sorry")
            {
              Alert.alert("Number Already Exists")
            }
            else{
                navigation.navigate('Vendor_p')
            }
           });
      
      
        
    }
    catch (error) {
      console.log("Post submission failed");
      console.log(error.message);
    }
  }

  return(
    <SafeAreaView style={style.container}>
        <Image source={require('../Assets/Images/LOGO.png')} style={style.logo}/>
        
        <View style={{marginTop: '-15%'}}>
            <Text style={style.label}>Name</Text>
            <TextInput
              placeholder="Please Enter Your Full Name"
              style={style.input}
              textContentType="givenName"
              value={Name}
              onChangeText={Name => setName(Name)}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text style={style.label}>Address</Text>
            <TextInput
              placeholder="Please Enter Your Address"
              style={style.input}
              value={Address}
              textContentType="addressCityAndState"
              onChangeText={Address => setAddress(Address)}
            />
          </View>


          <View style={{marginTop: 10}}>
            <Text style={style.label}>Contact Number</Text>
            <TextInput
              placeholder="Enter Your Phone No"
              style={style.input}
              value={Contact}
              textContentType="telephoneNumber"
              keyboardType='number-pad'
              onChangeText={Contact => setContact(Contact)}
            />
          </View>






        <TouchableOpacity
            style={style.appButtonContainer}
            onPress={() => CheckEmpty()}>
            <Text style={style.appButtonText}>Finish</Text>
          </TouchableOpacity>

    </SafeAreaView>
  )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#adc4b3',

    },
    logo :
    {
      width:'25%', 
      height:'25%',
      alignSelf:'center',
    },
    appButtonContainer: {
        elevation: 8,
        marginLeft: 12,
        marginTop:'10%',        
        width: '95%',
        backgroundColor: '#009688',
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
  input: {
    height: 50,
    width: '95%',
    marginLeft: 12,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    fontSize: 18,
  },
  label: {
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 5,
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },

})