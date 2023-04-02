import React from 'react'
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    Touchable,
    TouchableOpacity,
    useColorScheme,
    View,
  } from 'react-native';

export default function Customer_p({navigation}) {
  return (
    <SafeAreaView style={style.container}>
      <ScrollView>
      
      <Text style={style.Head}>Customer Panel</Text>

      <View style={{flexDirection:'row',justifyContent:'space-around'}}>
      <TouchableOpacity style={style.appButtonContainer} 
      onPress={()=>navigation.navigate('Bricks')}> 
          <Text style={style.appButtonText}>BRICKS</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.appButtonContainer} 
      onPress={()=>navigation.navigate('Sand')} > 
          <Text style={style.appButtonText}>Sand</Text>
      </TouchableOpacity>
        </View>
      <View style={{flexDirection:'row',justifyContent:'space-around'}}>

      <TouchableOpacity style={style.appButtonContainer}
      onPress={()=>navigation.navigate('Cement')} > 
          <Text style={style.appButtonText}>cement</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.appButtonContainer} 
      onPress={()=>navigation.navigate('Crush')} > 
          <Text style={style.appButtonText}>crush</Text>
      </TouchableOpacity>

        </View>
      <View style={{flexDirection:'row',justifyContent:'space-around'}}>

      <TouchableOpacity style={style.appButtonContainer} 
      onPress={()=>navigation.navigate('Steel')}> 
          <Text style={style.appButtonText}>Steel</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.appButtonContainer} 
      onPress={()=>navigation.navigate('Tiles')}> 
          <Text style={style.appButtonText}>tiles</Text>
      </TouchableOpacity>
      </View>
      <View style={{flexDirection:'row',justifyContent:'space-around'}}>
      
        <TouchableOpacity style={style.appButtonContainer} 
        onPress={()=>navigation.navigate('Construch')} > 
          <Text style={style.appButtonText}>construct</Text>
        </TouchableOpacity>
      </View>


      <View style={{flexDirection:'row',justifyContent:'space-around'}}>
      <Text style={{textAlign:'center',fontSize:20,marginTop:20,}}>----OR----</Text>
      </View>

      <View style={{flexDirection:'row',justifyContent:'space-around'}}>
        <TouchableOpacity style={style.appButtonContainer}
        onPress={()=>navigation.navigate('login')} >
          <Text style={style.appButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      </ScrollView>
    </SafeAreaView>
  )
}
const style = StyleSheet.create({
    container:{
            flex:1,
    },
    Head:{
        fontSize:30,
        fontWeight:'bold',
        color:'black',
        textAlign:'center',
        marginTop:20

    },
    appButtonContainer: {
        elevation: 8,
        marginTop: '8%',
        marginLeft:12,
        width:150,
        backgroundColor: "black",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
        
      },
      appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      },
})