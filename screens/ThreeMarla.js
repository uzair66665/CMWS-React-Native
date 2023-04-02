import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react'
import {
    Alert,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from 'react-native';
  import RadioGroup from 'react-native-radio-buttons-group';

export default function ThreeMarla({navigation,route}) {
 
    const [plength, setpLength] = useState(0);
    const [pwidth, setpwidth] = useState(0);
    const [length, set_Length] = useState(0);
    const [Area, set_Area] = useState(0);
    const [r2length, setr2Length] = useState(0);
    const [r2width, setr2width] = useState(0);
    const [tvlength, settvLength] = useState(0);
    const [tvwidth, settvwidth] = useState(0);
    const [klength, setkLength] = useState(0);
    const [kwidth, setkwidth] = useState(0);
    const [dlength, setdLength] = useState(0);
    const [dwidth, setdwidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [blength, setbLength] = useState(0);
    const [bwidth, setbwidth] = useState(0);
    const [number, setNumber] = useState(0);
    global.p_cid;

    const radioButtonsData = [{
        id: '1', 
        label: 'Yes',
        color:'black'
    }, {
        id: '2',
        label: 'No',
        color:'black'
    }]
    const [radioButtons, setRadioButtons] = useState(radioButtonsData)
    function onPressRadioButton(radioButtonsArray) {
        setRadioButtons(radioButtonsArray);
    }
    const radioButtonsData1 = [{
      id: '1', 
      label: 'Yes',
      color:'black'
  }, {
      id: '2',
      label: 'No',
      color:'black'
  }]
  const [radioButtons1, setRadioButtons1] = useState(radioButtonsData1)
  function onPressRadioButton1(radioButtonsArray1) {
      setRadioButtons1(radioButtonsArray1);
  }

    function CheckEmpty() {
      try{
    
      if (height==null ||  length==null || Area==null)
      {
        Alert.alert('Fill All The Fields...!');
      } 
      else 
      {
        var areaSqrft=Area;
        var Height = height;
        console.log(areaSqrft);
        console.log(Height);

        if(areaSqrft>750)
        {
          Alert.alert("Sorry.. Your Construction area is exceeded from 750 square foot");
        }
        else
        {
         
        var wallsSqrFt=length*Height;
        
        console.log(wallsSqrFt);

        //For Walls Material 
        var bricks_sqft = 9;
        var cement_sqft = 0.015;
        var sand_sqft = 0.0993377483;

        var totalsand = wallsSqrFt * sand_sqft;
        var totalcement = wallsSqrFt * cement_sqft;
        var totalbricks = bricks_sqft * wallsSqrFt;
        
          
          //For Lanter Material

          var totalRoof_in_sqft = areaSqrft;
         //var roofThickness = 4;
         var steel_sqft_for_Roof = 0.0023809524;
         var cement_sqft_for_Roof = 0.08648;
         var sand_sqft_for_Roof = 0.141;
         var crush_sqft_for_Roof = 0.2486742857;
         var total_steel_for_Roof = steel_sqft_for_Roof * totalRoof_in_sqft;
         var total_crush_for_Roof = crush_sqft_for_Roof * totalRoof_in_sqft;
         var totalsand_for_Roof = totalRoof_in_sqft * sand_sqft_for_Roof;
         var totalcement_for_Roof = totalRoof_in_sqft * cement_sqft_for_Roof;

          //Foundation Material Requirements for 3 feet

      //for 22.5" inch wall 1 feet height
        var bricks_persqft_in_22_inch=bricks_sqft*2.5;
        var cement_persqft_in_22_inch=cement_sqft*2.5;
        var sand_persqft_in_22_inch=sand_sqft*2.5;

        var total_bricks_in_22_inch = bricks_persqft_in_22_inch*length;
        var total_cement_in_22_inch=cement_persqft_in_22_inch*length;
        var total_sand_in_22_inch=sand_persqft_in_22_inch*length;

      //for 18" inch wall 1 feet height
        var bricks_persqft_in_18_inch=bricks_sqft*2;
        var cement_persqft_in_18_inch=cement_sqft*2;
        var sand_persqft_in_18_inch = sand_sqft*2;
        var total_bricks_in_18_inch=bricks_persqft_in_18_inch*length;
        var total_cement_in_18_inch=cement_persqft_in_18_inch*length;
        var total_sand_in_18_inch=sand_persqft_in_18_inch*length;

      //for 13.5" inch wall 1 feet height
        var bricks_persqft_in_13_inch=bricks_sqft*1.5;
        var cement_persqft_in_13_inch=cement_sqft*1.5;
        var sand_persqft_in_13_inch=sand_sqft*1.5;
        var total_sand_in_13_inch=sand_persqft_in_13_inch*length;
        var total_bricks_in_13_inch=bricks_persqft_in_13_inch*length;
        var total_cement_in_13_inch=cement_persqft_in_13_inch*length;
    var total_bricks_in_foundation = total_bricks_in_22_inch+total_bricks_in_18_inch+total_bricks_in_13_inch;
    var total_cement_in_foundation = total_cement_in_22_inch+total_cement_in_18_inch+total_cement_in_13_inch;
    var total_sand_in_foundation = total_sand_in_22_inch+total_sand_in_18_inch+total_sand_in_13_inch;

//Total Requirements For House

var total_Steel_Required = total_steel_for_Roof.toFixed(2);
var total_Sand_Required = (totalsand_for_Roof + totalsand+total_sand_in_foundation).toFixed(2);
var total_Crush_Required = total_crush_for_Roof.toFixed(2);
var total_Bricks_Required = totalbricks+total_bricks_in_foundation;
var total_Cement_Required = (totalcement_for_Roof + totalcement+total_cement_in_foundation).toFixed(2);


navigation.navigate("HouseMaterial",{total_Steel_Required: total_Steel_Required ,total_Sand_Required: total_Sand_Required,total_Crush_Required: total_Crush_Required,total_Bricks_Required:total_Bricks_Required,total_Cement_Required:total_Cement_Required})
        }
        
        
      }
    }
    catch (error) {
      console.log(error.message);
    }
    }

  return (
    <SafeAreaView style={style.container}>
      <ScrollView>
      <ImageBackground style={style.bg} source={require('../Assets/Images/PBG.jpg')} >
      <View style={style.head}>
      <Text style={style.Text}>5 Marla </Text>
      </View>

      

          <Text style={style.label}>Enter Details</Text>
          <View style={style.new}>
            <Text style={style.label}>Total Covered Area (SQFT)</Text>
            <TextInput
              placeholder="Enter Construction Area in SQFT"
              style={style.input}
              keyboardType='numeric'
              onChangeText={Area => set_Area(Area)}
            />
            <Text style={style.label}>Total Walls Length(FT)</Text>
            <TextInput
              placeholder="Enter Length Of All Walls"
              style={style.input}
              keyboardType='numeric'
              onChangeText={(length) => set_Length(length)}
            />
            
            <Text style={style.label}>Height(FT)</Text>
            <TextInput
              placeholder="Enter Height Of Walls"
              style={style.input}
              keyboardType='numeric'
              onChangeText={(height) => setHeight(height)}
            />
          </View>
            
            {/* <View style={style.pickercont}>
                <Text style={style.label1}>Attach Bath</Text>
              <RadioGroup  style={style.rb}
                radioButtons={radioButtons} 
                onPress={onPressRadioButton} 
                layout='row'
                color='black'
                />
            </View> */}
          {/* </View>
          <Text style={style.label}>Room 2 Details</Text>
          <View style={style.new}>
            <Text style={style.label}>Width(FT)</Text>
            <TextInput
              placeholder="Enter Width"
              style={style.input}
              keyboardType='numeric'
              onChangeText={r2width => setr2width(r2width)}
            />
            <Text style={style.label}>Length(FT)</Text>
            <TextInput
              placeholder="Enter Length"
              style={style.input}
              keyboardType='numeric'
              onChangeText={(r2length) => setr2Length(r2length)}
            />
            
            <View style={style.pickercont}>
                <Text style={style.label1}>Attach Bath</Text>
              <RadioGroup  style={style.rb}
                radioButtons={radioButtons1} 
                onPress={onPressRadioButton1} 
                layout='row'
                color='black'
                />
            </View>
          </View>
          <Text style={style.label}>TV Lounge Details</Text>
          <View style={style.new}>
            <Text style={style.label}>Width(FT)</Text>
            <TextInput
              placeholder="Enter Width"
              style={style.input}
              keyboardType='numeric'
              onChangeText={tvwidth => settvwidth(tvwidth)}
            />
            <Text style={style.label}>Length(FT)</Text>
            <TextInput
              placeholder="Enter Length"
              style={style.input}
              keyboardType='numeric'
              onChangeText={(tvlength) => settvLength(tvlength)}
            />
          </View>
          <Text style={style.label}>Kitchen Details</Text>
          <View style={style.new}>
            <Text style={style.label}>Width(FT)</Text>
            <TextInput
              placeholder="Enter Width"
              style={style.input}
              keyboardType='numeric'
              onChangeText={kwidth => setkwidth(kwidth)}
            />
            <Text style={style.label}>Length(FT)</Text>
            <TextInput
              placeholder="Enter Length"
              style={style.input}
              keyboardType='numeric'
              onChangeText={(klength) => setkLength(klength)}
            />
          </View>
          <Text style={style.label}>Bath Details</Text>
          <View style={style.new}>
            <Text style={style.label}>Width(FT)</Text>
            <TextInput
              placeholder="Enter Width"
              style={style.input}
              keyboardType='numeric'
              onChangeText={bwidth => setbwidth(bwidth)}
            />
            <Text style={style.label}>Length(FT)</Text>
            <TextInput
              placeholder="Enter Length"
              style={style.input}
              keyboardType='numeric'
              onChangeText={(blength) => setbLength(blength)}
            />
          </View>
          <Text style={style.label}>Drawing Room Details</Text>
          <View style={style.new}>
            <Text style={style.label}>Width(FT)</Text>
            <TextInput
              placeholder="Enter Width"
              style={style.input}
              keyboardType='numeric'
              onChangeText={dwidth => setdwidth(dwidth)}
            />
            <Text style={style.label}>Length(FT)</Text>
            <TextInput
              placeholder="Enter Length"
              style={style.input}
              keyboardType='numeric'
              onChangeText={(dlength) => setdLength(dlength)}
            />
          </View>
          <Text style={style.label}>Wall Details</Text>
           */}
        <TouchableOpacity
            style={style.appButtonContainer}
            onPress={CheckEmpty}>
            <Text style={style.appButtonText}>Build</Text>
          </TouchableOpacity>

          

    

    </ImageBackground>
    </ScrollView>
    </SafeAreaView>
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
      fontSize:40,
      color:'white',
      textAlign:'center',
      fontWeight:'bold',  
    },
    head:{
        width:'100%',
        backgroundColor:'#4e8bed'
    },
    rb:{
        color:'black',
        fontWeight:'bold'
    },
    btn:{
        elevation: 8,
        backgroundColor: "black",
        borderRadius: 10,
        alignSelf:'center',
        marginTop:'10%',
        marginLeft:'5%',
        width:'40%',
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    btntxt:{
        fontSize: 18,
        color: "white",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    input: {
        height: 50,
        width: '95%',
        marginLeft: 12,
        borderWidth: 2,
        borderRadius: 10,
        color:'black',
        padding: 10,
        fontSize: 18,
        backgroundColor:'white'
      },
      label: {
        marginLeft: 15,
        marginTop: 10,
        marginBottom: 5,
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
      },
      label1: {
        marginLeft: 15,
        marginTop: 10,
        marginBottom: 5,
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
      },
      lb: {
        marginTop: 10,
        color: 'black',
        textAlign:'center',
        fontSize: 20,
        fontWeight: 'bold',
      },
      pickercont:{
       width:'95%',
       marginLeft:12,
       fontWeight:'bold',
       alignItems:'center',
      
      },
      picker:{
        width:'97%',
        color:'black',
        borderColor:'white',
        borderWidth:3,
        backgroundColor:'white',
        borderRadius: 30,
        height:'10%'
      },
      appButtonContainer: {
        elevation: 8,
        marginLeft: 12,
        marginTop:'10%',        
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
      fal: {
        height: 60,
        width: '95%',
        marginLeft: 12,
        borderWidth: 4,
        borderRadius: 10,
        color:'black',
        fontSize: 30,
        textAlign:'center',
        fontWeight:'bold',
      },
      new: {
        marginTop:1,
        paddingBottom:5,
        display:'flex',
        borderColor:'black',
        borderWidth:2,
        width: '95%',
        marginLeft: 12,
        borderRadius:3
      },

})