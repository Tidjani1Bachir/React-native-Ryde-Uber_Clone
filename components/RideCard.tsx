import { Image, Text, View } from "react-native";

import { icons } from "@/constants";
import { formatDate, formatTime } from "@/lib/utils";
import { Ride } from "@/types/type";
import { styled } from 'nativewind';

const StyledText = styled(Text)

const StyledView = styled(View)
const StyledImage = styled(Image)

const RideCard = ({ ride }: { ride: Ride }) => {
  return (
    <StyledView className="flex flex-row items-center justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 mb-3">
      <StyledView className="flex flex-col items-start justify-center p-3">
        <StyledView className="flex flex-row items-center justify-between">
          <StyledImage
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${ride.destination_longitude},${ride.destination_latitude}&zoom=14&apiKey=ca9c3a62650d4c04b58274124bd7a7ed`,
            }}
            className="w-[80px] h-[90px] rounded-lg"
          />

          <StyledView className="flex flex-col mx-5 gap-y-5 flex-1">
            <StyledView className="flex flex-row items-center gap-x-2">
              <StyledImage source={icons.to} className="w-5 h-5" />
              <StyledText className="text-md font-JakartaMedium" numberOfLines={1}>
                {ride.origin_address}
              </StyledText>
            </StyledView>

            <StyledView className="flex flex-row items-center gap-x-2">
              <StyledImage source={icons.point} className="w-5 h-5" />
              <StyledText className="text-md font-JakartaMedium" numberOfLines={1}>
                {ride.destination_address}
              </StyledText>
            </StyledView>
          </StyledView>
        </StyledView>

        <StyledView className="flex flex-col w-full mt-5 bg-general-500 rounded-lg p-3 items-start justify-center">
          <StyledView className="flex flex-row items-center w-full justify-between mb-5">
            <StyledText className="text-md font-JakartaMedium text-gray-500">
              Date & Time
            </StyledText>
            <StyledText className="text-md font-JakartaBold" numberOfLines={1}>
            {formatDate(ride.created_at)}, {formatTime(ride.ride_time)}
              
            </StyledText>
          </StyledView>

          <StyledView className="flex flex-row items-center w-full justify-between mb-5">
            <StyledText className="text-md font-JakartaMedium text-gray-500">
              Driver
            </StyledText>
            <StyledText className="text-md font-JakartaBold">
              {ride.driver.first_name} {ride.driver.last_name}
            </StyledText>
          </StyledView>

          <StyledView className="flex flex-row items-center w-full justify-between mb-5">
            <StyledText className="text-md font-JakartaMedium text-gray-500">
              Car Seats
            </StyledText>
            <StyledText className="text-md font-JakartaBold">
              {ride.driver.car_seats}
            </StyledText>
          </StyledView>

          <StyledView className="flex flex-row items-center w-full justify-between">
            <StyledText className="text-md font-JakartaMedium text-gray-500">
              Payment Status
            </StyledText>
            <StyledText
              className={`text-md capitalize font-JakartaBold ${ride.payment_status === "paid" ? "text-green-500" : "text-red-500"}`}
            >
              {ride.payment_status}
            </StyledText>
          </StyledView>
        </StyledView>
      </StyledView>
    </StyledView>
  );
};

export default RideCard;