import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useRef } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Map from "@/components/Map";
import { icons,images } from "@/constants";
import { styled } from 'nativewind';

const StyledText = styled(Text)
// const StyledTouchableOpacity = styled(TouchableOpacity)
const StyledView = styled(View)
const StyledImage = styled(Image)
const StyledTouchableOpacity = styled(TouchableOpacity)
const StyledGestureHandlerRootView = styled(GestureHandlerRootView)


//  TouchableOpacity,
//   Image,
//   FlatList,
//   ActivityIndicator,

const RideLayout = ({
  title,
  snapPoints,
  children,
}: {
  title: string;
  snapPoints?: string[];
  children: React.ReactNode;
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <StyledGestureHandlerRootView className="flex-1">
      <StyledView className="flex-1 bg-white">
        <StyledView className="flex flex-col h-screen bg-blue-500">
        <StyledView className="flex flex-col h-screen bg-blue-500">
        <StyledView className="flex flex-row absolute z-10 top-16 items-center justify-start px-5">
            <StyledTouchableOpacity onPress={() => router.back()}>
              <StyledView className="w-10 h-10 bg-white rounded-full items-center justify-center">
                <StyledImage
                  source={icons.backArrow}
                  resizeMode="contain"
                  className="w-6 h-6"
                />
              </StyledView>
            </StyledTouchableOpacity>
            <StyledText className="text-xl font-JakartaSemiBold ml-5 text-white">
              {title || "Go Back"}
            </StyledText>
          </StyledView>

          <>
              
              <StyledView className="flex flex-row items-center bg-transparent w-screen " style={{height:"70%"}}>
                <StyledImage source={images.signUpCar} className="z-0 w-full h-full"
                />
              </StyledView>
            </>
        </StyledView>

        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints || ["40%", "85%"]}
          index={0}
        >
           {title === "Choose a Rider" ? (
            <BottomSheetView
              style={{
                flex: 1,
                padding: 20,
              }}
            >
              {children}
            </BottomSheetView>
          ) : ( 
            <BottomSheetScrollView
              style={{
                flex: 1,
                padding: 20,
              }}
            >
              {children}
            </BottomSheetScrollView>
          )} 
        </BottomSheet>
        
      </StyledView>
      </StyledView>
    </StyledGestureHandlerRootView>
  );
};

export default RideLayout;