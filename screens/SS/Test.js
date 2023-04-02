import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Test() {
  return (
    <View style={styles.main}>
      <View style={styles.details}>
        <View style={styles.details1}>
        <Text style={styles.txt}>
                                Name {'\n'}
                                Stock {'\n'}
                                Price {'\n'}
                                Category {'\n'}
                                Unit {'\n'}
                            </Text>
        </View>
        <View style={styles.details2}></View>
      </View>
      <View style={styles.img}></View>
      <View style={styles.buttons}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  main:{
    backgroundColor:"black",
    height:360,
    width:"90%",
    alignSelf:'center',
    
  },
  details:{
    backgroundColor:"green",
    height:"40%",
    flexDirection:'row',
  },
  details1:{
    backgroundColor:"red",
    height:"100%",
    flex:1,
  },
  details2:{
    backgroundColor:"white",
    height:"100%",
    flex:1,
  },
  img:{
    backgroundColor:"blue",
    height:"45%"
  },
  buttons:{
    backgroundColor:"red",
    height:"15%"
  },
  txt:{
    fontSize:22,
    fontWeight:'bold'
  }

})