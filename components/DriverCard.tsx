import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { icons } from "@/constants";
import { formatTime } from "@/lib/utils";
import { DriverCardProps } from "@/types/type";
import { styled } from 'nativewind';


const StyledView = styled(View)
const StyledTouchableOpacity = styled(TouchableOpacity)
const StyledText = styled(Text)
const StyledImage = styled(Image)
const DriverCard = ({ item, selected, setSelected }: DriverCardProps) => {
  return (
    <StyledTouchableOpacity
      onPress={setSelected}
      className={`${
        selected === item.id ? "bg-general-600" : "bg-white"
      } flex flex-row items-center justify-between py-5 px-3 rounded-xl`}
    >
      <StyledImage
        source={{ uri: item.profile_image_url }}
        className="w-14 h-14 rounded-full"
      />

      <StyledView className="flex-1 flex flex-col items-start justify-center mx-3">
        <StyledView className="flex flex-row items-center justify-start mb-1">
          <StyledText className="text-lg font-JakartaRegular">{item.title}</StyledText>

          <StyledView className="flex flex-row items-center space-x-1 ml-2">
            <StyledImage source={icons.star} className="w-3.5 h-3.5" />
            <StyledText className="text-sm font-JakartaRegular">4</StyledText>
          </StyledView>
        </StyledView>

        <StyledView className="flex flex-row items-center justify-start">
          <StyledView className="flex flex-row items-center">
            <StyledImage source={icons.dollar} className="w-4 h-4" />
            <StyledText className="text-sm font-JakartaRegular ml-1">
              ${item.price || "40"}
            </StyledText>
          </StyledView>

          <StyledText className="text-sm font-JakartaRegular text-general-800 mx-1">
            |
          </StyledText>
{/* {formatTime(item.time!)} */}
          <StyledText className="text-sm font-JakartaRegular text-general-800">
             20 min
          </StyledText>

          <StyledText className="text-sm font-JakartaRegular text-general-800 mx-1">
            |
          </StyledText>

          <StyledText className="text-sm font-JakartaRegular text-general-800">
            {item.car_seats} seats
          </StyledText>
        </StyledView>
      </StyledView>

      <StyledImage
        source={{ uri: item.car_image_url }}
        className="h-14 w-14"
        resizeMode="contain"
      />
    </StyledTouchableOpacity>
  );
};

export default DriverCard;