

import { TouchableOpacity } from 'react-native-gesture-handler'
import {  router } from "expo-router";
export const SignOutButton = () => {
  

  return (
    // Clicking this button signs out a user
    // and redirects them to the home page "/".
    <TouchableOpacity
    onPress={() => {
         
      router.push("/(auth)/welcome");
    }}
    >

    </TouchableOpacity>
  
  )
}