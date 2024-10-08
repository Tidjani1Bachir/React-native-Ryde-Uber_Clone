import React, { useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { StripeProvider } from "@stripe/stripe-react-native";
import { Image, Text, View } from "react-native";
import CustomButton from "@/components/CustomButton";
import Payment from "@/components/Payment";
import RideLayout from "@/components/RideLayout";
import { icons } from "@/constants";
import { formatTime } from "@/lib/utils";
import { useDriverStore, useLocationStore } from "@/store";
import { styled } from 'nativewind';
import { router } from "expo-router";
import SuccesPayement from "@/components/SuccesPayement";


const StyledView = styled(View)
const StyledImage = styled(Image)
const StyledText = styled(Text)
const BookRide = () => {
  const { user } = useUser();
  const { userAddress, destinationAddress } = useLocationStore();
  const { drivers, selectedDriver } = useDriverStore();
  

  const driverDetails = drivers?.filter(
    (driver) => +driver.id === selectedDriver,
  )[0];
  const [isVisible, setIsVisible] = useState(false)
  return (
    // <StripeProvider
    //   publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
    //   merchantIdentifier="merchant.com.uber"
    //   urlScheme="myapp"
    // >
      
    // </StripeProvider>

    <RideLayout title="Book Ride" snapPoints={[ "80%"]}>
        <>
          <StyledText className="text-xl font-JakartaSemiBold mb-3">
            Ride Information
          </StyledText>

          <StyledView className="flex flex-col w-full items-center justify-center mt-10">
            <StyledImage
              source={{ uri: driverDetails?.profile_image_url }}
              className="w-28 h-28 rounded-full"
            />

            <StyledView className="flex flex-row items-center justify-center mt-5 space-x-2">
              <StyledText className="text-lg font-JakartaSemiBold">
                {driverDetails?.title}
              </StyledText>

              <StyledView className="flex flex-row items-center space-x-0.5">
                <StyledImage
                  source={icons.star}
                  className="w-5 h-5"
                  resizeMode="contain"
                />
                <StyledText className="text-lg font-JakartaRegular">
                  {driverDetails?.rating}
                </StyledText>
              </StyledView>
            </StyledView>
          </StyledView>

          <StyledView className="flex flex-col w-full items-start justify-center py-3 px-5 rounded-3xl bg-general-600 mt-5">
            <StyledView className="flex flex-row items-center justify-between w-full border-b border-white py-3">
              <StyledText className="text-lg font-JakartaRegular">Ride Price</StyledText>
              <StyledText className="text-lg font-JakartaRegular text-[#0CC25F]">
                ${driverDetails?.price}
              </StyledText>
            </StyledView>

            <StyledView className="flex flex-row items-center justify-between w-full border-b border-white py-3">
              <StyledText className="text-lg font-JakartaRegular">Pickup Time</StyledText>
              <StyledText className="text-lg font-JakartaRegular">
                {formatTime(driverDetails?.time! || 5!)}
              </StyledText>
            </StyledView>

            <StyledView className="flex flex-row items-center justify-between w-full py-3">
              <StyledText className="text-lg font-JakartaRegular">Car Seats</StyledText>
              <StyledText className="text-lg font-JakartaRegular">
                {driverDetails?.car_seats}
              </StyledText>
            </StyledView>
          </StyledView>

          <StyledView className="flex flex-col w-full items-start justify-center mt-5">
            <StyledView className="flex flex-row items-center justify-start mt-3 border-t border-b border-general-700 w-full py-3">
              <StyledImage source={icons.to} className="w-6 h-6" />
              <StyledText className="text-lg font-JakartaRegular ml-2">
                {userAddress}
              </StyledText>
            </StyledView>

            <StyledView className="flex flex-row items-center justify-start border-b border-general-700 w-full py-3">
              <StyledImage source={icons.point} className="w-6 h-6" />
              <StyledText className="text-lg font-JakartaRegular ml-2">
                {destinationAddress}
              </StyledText>
            </StyledView>
          </StyledView>

          
          {/* <Payment
            fullName={user?.fullName!}
            email={user?.emailAddresses[0].emailAddress!}
            amount={driverDetails?.price!}
            driverId={driverDetails?.id}
            rideTime={driverDetails?.time!}
          /> */}

<StyledView className="mx-5 mb-10">
            <CustomButton
              title="Confirm Ride"
              onPress={() => setIsVisible(true)}
            />
          </StyledView>

          {isVisible && <SuccesPayement/>}
          
          
        </>
      </RideLayout>
  );
};

export default BookRide;