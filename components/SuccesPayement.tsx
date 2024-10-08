
import { Link, router } from "expo-router";
import { useState } from "react";
import {  Image, ScrollView, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";

import CustomButton from "@/components/CustomButton";

import {  images } from "@/constants";

import { styled } from 'nativewind';

const StyledText = styled(Text)
// const StyledTouchableOpacity = styled(TouchableOpacity)
const StyledView = styled(View)

const StyledScrollView = styled(ScrollView)
const StyledImage = styled(Image)

const SuccesPayement = () => {
  return (
    <ReactNativeModal
    isVisible={true}
   // onBackdropPress={() => setSuccess(false)}
 >
   <StyledView className="flex flex-col items-center justify-center bg-white p-7 rounded-2xl">
     <StyledImage source={images.check} className="w-28 h-28 mt-5" />

     <StyledText className="text-2xl text-center font-JakartaBold mt-5">
       Booking placed successfully
     </StyledText>

     <StyledText className="text-md text-general-200 font-JakartaRegular text-center mt-3">
       Thank you for your booking. Your reservation has been successfully
       placed. Please proceed with your trip.
     </StyledText>
     
    <CustomButton
       title="Back Home"
       onPress={() => {
         
         router.push("/(root)/(tabs)/home");
       }}
       className="mt-5"
     /> 
   </StyledView>
 </ReactNativeModal>
  )
}

export default SuccesPayement