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
  import DropDownPicker from 'react-native-dropdown-picker';
  import SelectDropdown from 'react-native-select-dropdown'

export default function Construch() {
    const build = ['Wall','House']
  return (
    <SafeAreaView style={style.container}>
            <Text style={style.head}>What do you want to build?</Text>
    <View style={{marginTop:25}}>
            <SelectDropdown
            	data={build}
            	onSelect={(selectedItem, index) => {
            		console.log(selectedItem, index)
            	}}
            	buttonTextAfterSelection={(selectedItem, index) => {
            		return selectedItem
            	}}
            	rowTextForSelection={(item, index) => {
            		return item
            	}}
            />
    </View>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        backgroundColor:'white'
    },
    head:{
        fontSize:30,
        width:'60%',
        color:'black',
        fontWeight:'bold',
        marginTop:30
    }
})