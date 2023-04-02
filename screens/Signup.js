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
  import {Picker} from '@react-native-picker/picker';
  import React, {useState} from 'react';

export default function Signup({navigation}) {
    const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword,setconfirmPassword]=useState("");
  const [pickerValue, setPickerValue] = useState('');

  global.Usertype;
  global.uid;
  function CheckEmpty() {
    if (password == null || email == null || confirmPassword ==null) {
      Alert.alert('Email and Password are empty...!');
    } else {
        global.Usertype=pickerValue;
        SignupUsr();
      //navigation.navigate('Vendor_p');
    }
  }


   const SignupUsr=  async() => {
    try {
      console.log('signing...')
      if(password==confirmPassword)
      {
        await  fetch(global.ip+"login/Add_User", {
          method: 'POST',
          headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({  
            email:email,
            pass:password,
            type:pickerValue,
          })
          }).then(response => response.json())
          .then(data => {
            console.log('first signin')
            console.log(data)
            if(data=="Sorry")
            {
              Alert.alert("Email Already Exists")
            }else{
                global.uid = data
                navigation.navigate('CVprofile');
            }
           
          });
      }
      else
      Alert.alert("Confirm Password Not match")
      
        
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

          <View style={{marginTop: 10}}>
            <Text style={style.label}>Confirm Password</Text>
            <TextInput
              placeholder="Re-Enter Your Password"
              secureTextEntry={true}
              style={style.input}
              value={confirmPassword}
              textContentType="password"
              onChangeText={confirmPassword => setconfirmPassword(confirmPassword)}
            />
          </View>

          <View style={style.pickercont}>
              <Picker mode="dropdown" style={style.picker}  
              
              selectedValue={pickerValue}
              onValueChange={(itemValue)=>setPickerValue(itemValue)}
              >
                    <Picker.Item label='Select Role' enabled={false} ></Picker.Item> 
                    <Picker.Item label='Customer' value={'Customer'}></Picker.Item> 
                    <Picker.Item label='Vendor' value={'Vendor'}></Picker.Item> 
                    <Picker.Item label='Transporter' value={'Transporter'}></Picker.Item> 
              </Picker>
          </View>



        <TouchableOpacity
            style={style.appButtonContainer}
            onPress={() => CheckEmpty()}>
            <Text style={style.appButtonText}>Sign Up</Text>
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
  pickercont:{
   width:'95%',
   marginTop:'10%',
   marginLeft:12,
   borderRadius:10,
   borderColor:'black',
   borderWidth:2,
   justifyContent:'center',
   alignItems:'center',
  },
  picker:{
    width:'90%',
    color:'black',
    borderColor:'black',
    borderWidth:3,
    backgroundColor:'#adc4b3',
    borderBottomLeftRadius:30,
    borderRadius: 30,
  },
})