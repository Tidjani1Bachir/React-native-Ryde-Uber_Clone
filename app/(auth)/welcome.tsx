
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { styled } from 'nativewind';
import { withExpoSnack } from 'nativewind';

import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
;

import Swiper from "react-native-swiper";

import CustomButton from "@/components/CustomButton";
import { onboarding } from "@/constants";

// for elements To Style it directly 
const StyledText = styled(Text)

const StyledSafeAreaView = styled(SafeAreaView)

const StyledTouchableOpacity = styled(TouchableOpacity)
const StyledView = styled(View)

// const StyledCustomButton = styled(CustomButton)

const StyledImage = styled(Image)
const welcome = () => {

  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = activeIndex === onboarding.length - 1;

  
  return (
    <StyledSafeAreaView className="flex h-full items-center justify-between bg-white">
      <StyledTouchableOpacity
        onPress={() => {
          router.replace("/(auth)/sign-up");
        }}
        className="w-full flex justify-end items-end p-5"
      >
        <StyledText className="text-black text-md font-semibold">Skip</StyledText>
      </StyledTouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <StyledView className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />
        }
        activeDot={
          <StyledView className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <StyledView key={item.id} className="flex items-center justify-center p-5">
            <StyledImage
              source={item.image}
              className="w-full h-[300px]"
              resizeMode="contain"
            />
            {/* div */}
            <StyledView className="flex flex-row items-center justify-center w-full mt-10">
              <StyledText className="text-black text-3xl font-bold mx-10 text-center">
                {item.title}
              </StyledText>
            </StyledView>
            <StyledText className="text-md font-semibold text-center text-[#858585] mx-10 mt-3">
              {item.description}
            </StyledText>
          </StyledView>
        ))}
      </Swiper>

      <CustomButton
        title= {isLastSlide ? "Get Started" : "Next"} 
        onPress={() => {
          isLastSlide ? router.replace('/(auth)/sign-up') : swiperRef.current?.scrollBy(1);
        }}
        className="w-11/12 mt-10 mb-5"
      />
    </StyledSafeAreaView>
  )
}

export default welcome