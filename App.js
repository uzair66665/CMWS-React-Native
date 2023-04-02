import React,{useState} from 'react';
import Vendor_p from './screens/Vendor_p';
import {Node} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Add_product from './screens/Add_product';
import Productview_ven from './screens/Productview_ven';
import Show_order from './screens/Show_order';
import Customer_p from './screens/Customer_p';
import Signin from './screens/Signin';
import Login from './screens/login';
import Signup from './screens/Signup';
import CVprofile from './screens/CVprofile';
import Select_product from './screens/Select_product';
import AddProductImg from './screens/AddProductImg';
import Productview_venDetails from './screens/Productview_venDetails';
import Edit_product from './screens/Edit_product';
import C_SelectProduct from './screens/C_SelectProduct';
import Construch from './screens/Construct';
import Wall from './screens/Wall';
import WallMaterial from './screens/WallMaterial';
import SelectHouse from './screens/SelectHouse';
import FiveMarla from './screens/FiveMarla';
import HouseMaterial from './screens/HouseMaterial';
import SimpleOrder from './screens/SimpleOrder';
import CustomerCart from './screens/CustomerCart';
import SelectQuantity from './screens/SelectQuantity';
import Transporter_p from './screens/Transporter_p';
import AddVehicle from './screens/AddVehicle';

import Map from './screens/Map';
import EditVehicle from './screens/EditVehicle';
import SetLocationVendor from './screens/SetLocationVendor';
import SetLocation from './screens/SetLocation';
import SelectVehicle from './screens/SelectVehicle';
import ShowDetails from './screens/ShowDetails';
import OrderDetailsT from './screens/OrderDetailsT';
import DeliverBoy from './screens/DeliverBoy';
import MapTransporter from './screens/MapTransporter';
import Rating from './screens/Rating';
import RatingList from './screens/RatingList';
import RatingScreen from './screens/RatingScreen';
import ThreeMarla from './screens/ThreeMarla';
import TenMarla from './screens/TenMarla';
import RoofEstimation from './screens/RoofEstimation';
import DisplayRoofEstimation from './screens/DisplayRoofEstimation';
import DisplayPlaster from './screens/DisplayPlaster';
import Plaster from './screens/Plaster';
import Foundation from './screens/Foundation';
import DisplayFoundation from './screens/DisplayFoundation';
import CustomerHistory from './screens/CustomerHistory';
import CustomerHistoryDetails from './screens/CustomerHistoryDetails';
import VendorHistory from './screens/VendorHistory';
import VendorHistoryDetails from './screens/VendorHistoryDetails';



global.ip = "http://192.168.189.197/ProjectApi/Api/";
global.imgaddr='http://192.168.189.197/ProjectApi/assets/';
const Stack = createStackNavigator();

const App = () => {
  return (
    //<Wall/>
      //<FiveMarla />
      //<SelectQuantity/>
      //<Map/>
      //<SetLocation/>
      //<SelectVehicle/>
      // <ShowDetails/>
      //<DeliverBoy/>
      //<MapTransporter/>
      //<Rating/>
      //<RatingList/>
      //<RatingScreen/>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Signin"
          component={Signin}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen name="login" component={Login} options={{ headerShown: false }}/>

        <Stack.Screen name="CVprofile" component={CVprofile} options={{ headerShown: false }}/>

        <Stack.Screen name="Select_product" component={Select_product} options={{ headerShown: false }}/>

        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }}/>
        
        <Stack.Screen name="Vendor_p" component={Vendor_p} options={{ headerShown: false }}/>

        <Stack.Screen name="Add_product" component={Add_product} options={{ headerShown: false }}/>

        <Stack.Screen name="AddProductImg" component={AddProductImg} options={{ headerShown: false }}/>

        <Stack.Screen name="Productview_ven" component={Productview_ven} options={{ headerShown: false }}/>

        <Stack.Screen name="Productview_venDetails" component={Productview_venDetails} options={{ headerShown: false }}/>

        <Stack.Screen name="Edit_product" component={Edit_product} options={{ headerShown: false }}/>

        <Stack.Screen name="Show_order" component={Show_order} options={{ headerShown: false }}/>

        <Stack.Screen name="Customer_p" component={Customer_p} options={{ headerShown: false }}/>

        <Stack.Screen name="C_SelectProduct" component={C_SelectProduct} options={{ headerShown: false }}/>

        <Stack.Screen name="Construch" component={Construch} options={{ headerShown: false }}/>

        <Stack.Screen name="Wall" component={Wall} options={{ headerShown: false }}/>

        <Stack.Screen name="WallMaterial" component={WallMaterial} options={{ headerShown: false }}/>

        <Stack.Screen name="SelectHouse" component={SelectHouse} options={{ headerShown: false }}/>

        <Stack.Screen name="ThreeMarla" component={ThreeMarla} options={{ headerShown: false }}/>

        <Stack.Screen name="FiveMarla" component={FiveMarla} options={{ headerShown: false }}/>

        <Stack.Screen name="TenMarla" component={TenMarla} options={{ headerShown: false }}/>

        <Stack.Screen name="HouseMaterial" component={HouseMaterial} options={{ headerShown: false }}/>

        <Stack.Screen name="RoofEstimation" component={RoofEstimation} options={{ headerShown: false }}/>

        <Stack.Screen name="DisplayRoofEstimation" component={DisplayRoofEstimation} options={{ headerShown: false }}/>

        <Stack.Screen name="DisplayPlaster" component={DisplayPlaster} options={{ headerShown: false }}/>

        <Stack.Screen name="Plaster" component={Plaster} options={{ headerShown: false }}/>

        <Stack.Screen name="Foundation" component={Foundation} options={{ headerShown: false }}/>

        <Stack.Screen name="DisplayFoundation" component={DisplayFoundation} options={{ headerShown: false }}/>

        <Stack.Screen name="SimpleOrder" component={SimpleOrder} options={{ headerShown: false }}/>

        <Stack.Screen name="CustomerCart" component={CustomerCart} options={{ headerShown: false }}/>

        <Stack.Screen name="SelectQuantity" component={SelectQuantity} options={{ headerShown: false }}/>

        <Stack.Screen name="Transporter_p" component={Transporter_p} options={{ headerShown: false }}/>

        <Stack.Screen name="AddVehicle" component={AddVehicle} options={{ headerShown: false }}/>

        <Stack.Screen name="EditVehicle" component={EditVehicle} options={{ headerShown: false }}/>

        <Stack.Screen name="SetLocationVendor" component={SetLocationVendor} options={{ headerShown: false }}/>
        
        <Stack.Screen name="SetLocation" component={SetLocation} options={{ headerShown: false }}/>
        
        <Stack.Screen name="SelectVehicle" component={SelectVehicle} options={{ headerShown: false }}/>
        
        <Stack.Screen name="ShowDetails" component={ShowDetails} options={{ headerShown: false }}/>
        
        <Stack.Screen name="OrderDetailsT" component={OrderDetailsT} options={{ headerShown: false }}/>
        
        <Stack.Screen name="MapTransporter" component={MapTransporter} options={{ headerShown: false }}/>
        
        <Stack.Screen name="RatingScreen" component={RatingScreen} options={{ headerShown: false }}/>
        
        <Stack.Screen name="CustomerHistory" component={CustomerHistory} options={{ headerShown: false }}/>
        
        <Stack.Screen name="CustomerHistoryDetails" component={CustomerHistoryDetails} options={{ headerShown: false }}/>
        
        <Stack.Screen name="VendorHistory" component={VendorHistory} options={{ headerShown: false }}/>
        
        <Stack.Screen name="VendorHistoryDetails" component={VendorHistoryDetails} options={{ headerShown: false }}/>
        


      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
