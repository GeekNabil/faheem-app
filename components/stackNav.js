import React, { Component } from 'react'; 
import { createStackNavigator, createAppContainer } from "react-navigation";
import Find from './find';
import Search from './search';


const StackNav = createStackNavigator(
  {
    find : {screen : Find},
    search : {screen : Search},
   
  },{
        headerMode: "none",
        mode: "modal",
        defaultNavigationOptions: {
          gesturesEnabled: false
        }
      
    }
) ;
 
export default createAppContainer(StackNav)