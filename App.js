import React from "react";
import {View, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import Routes from "./src/routes";

export default function App(){
  return(
<>
<NavigationContainer>
  <StatusBar backgroundColor="#a36efc" barStyle="light-content" />
 <Routes/>
 </NavigationContainer>
</>
  )
}

