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

export default function Login({navigation}) {
    const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  global.uid
  global.id=null
  function CheckEmpty() {
    if (password == null || email == null) {
      Alert.alert('Email and Password are empty...!');
    } else {
        LoginUser();
    }
  }


  const LoginUser =  async() => {
    try {
      console.log("Loging..")
    await  fetch(global.ip+"login/loginuser", {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email:email,
              pass:password
            })
            }).then(response => response.json())
            .then(data => {
              //console.log(data)
              if (data =="nil") {
                
                
                Alert.alert('Successfully not Access')
                
              }
              else{
                //console.log(data)
                if(data.type=='Vendor'){
                    global.uid=data.uid;
                    navigation.navigate('Vendor_p')
                }else if(data.type=='Customer'){
                      global.uid=data.uid;
                    navigation.navigate('Customer_p')
                }else if(data.type=='Transporter'){
                  global.uid=data.uid;
                navigation.navigate('Transporter_p')
            }

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
        
        <View style={{marginTop: '-20%'}}>
            <Text style={style.label}>Email</Text>
            <TextInput
              placeholder="Please Enter Your Email"
              style={style.input}
              textContentType="emailAddress"
              value={email}
              onChangeText={email => setEmail(email)}
            />
          </View>
          <View style={{marginTop: 10}}>
            <Text style={style.label}>Password</Text>
            <TextInput
              placeholder="Please Enter Your Password"
              secureTextEntry={true}
              style={style.input}
              value={password}
              textContentType="password"
              onChangeText={password => setPassword(password)}
            />
          </View>


        <TouchableOpacity
            style={style.appButtonContainer}
            onPress={() => CheckEmpty()}>
            <Text style={style.appButtonText}>Log In</Text>
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
      width:'50%', 
      height:'50%',
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