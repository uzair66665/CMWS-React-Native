import React, {useState} from 'react'
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

export default function Bricks({navigation}) {
    const [Quantity,Set_Quantity]=useState();
  return (
    <SafeAreaView style={{flex:1}}>
            <Text style={{fontSize:32,marginTop:20,color:'black'
            ,fontWeight:'bold',textAlign:'center'}}>BRICKS</Text>
            <View style={{flexDirection:'row',}}>
                <Text style={{fontSize:20,color:'black',fontWeight:'bold',
                marginTop:30,marginLeft:10}}>Enter Quantity</Text>

                <TextInput value={Quantity} onChangeText={(value)=>Set_Quantity(value)}
                placeholder='Enter Quantity' style={{borderColor:'black',borderWidth:2,
                marginLeft:10,marginTop:20,fontSize:20,width:'62%',height:50,color:'black',
                borderRadius:11,paddingLeft:15}}
                >
                </TextInput>
            </View>
            <View style={{alignItems:'center'}}>
                 <TouchableOpacity style={style.appButtonContainer} 
                 onPress={()=>navigation.navigate('Cart')} > 
                     <Text style={style.appButtonText}>Add To cart</Text>
                 </TouchableOpacity>
            </View>

            <View style={{alignItems:'center'}}>
                     <Text style={{fontSize:30,fontWeight:'bold',
                     marginTop:30,color:'black'}}>Want to buy more?</Text>
            </View>

      
      <View style={{flexDirection:'row',justifyContent:'space-around'}}>

      <TouchableOpacity style={style.suggestion} 
      onPress={()=>navigation.navigate('Cement')} > 
          <Text style={style.appButtonText}>cement</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.suggestion} 
      onPress={()=>navigation.navigate('Crush')}> 
          <Text style={style.appButtonText}>crush</Text>
      </TouchableOpacity>

        </View>
      <View style={{flexDirection:'row',justifyContent:'space-around'}}>

      <TouchableOpacity style={style.suggestion} 
      onPress={()=>navigation.navigate('Steel')}> 
          <Text style={style.appButtonText}>Steel</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.suggestion} 
      onPress={()=>navigation.navigate('Tiles')}> 
          <Text style={style.appButtonText}>tiles</Text>
      </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-around'}}>
      <TouchableOpacity style={style.suggestion} 
      onPress={()=>navigation.navigate('Sand')} > 
          <Text style={style.appButtonText}>Sand</Text>
      </TouchableOpacity>
        </View>

        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
      <Text style={{textAlign:'center',fontSize:20,marginTop:20,}}>----OR----</Text>
      </View>

      <View style={{flexDirection:'row',justifyContent:'space-around'}}>
        <TouchableOpacity style={style.appButtonContainer}
        onPress={()=>navigation.navigate('Customer_p')} >
          <Text style={style.appButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}const style = StyleSheet.create({
    appButtonContainer: {
        elevation: 8,
        marginTop: '8%',
        marginLeft:12,
        width:'50%',
        backgroundColor:'black',
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
      suggestion:{
        marginTop: '8%',
        width:'30%',
        backgroundColor:'black',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10
      }
})