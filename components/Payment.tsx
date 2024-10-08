import { useAuth } from "@clerk/clerk-expo";
import { useStripe } from "@stripe/stripe-react-native";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";

import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";
import { fetchAPI } from "@/lib/fetch";
import { useLocationStore } from "@/store";
import { PaymentProps } from "@/types/type";
import { styled } from 'nativewind';


const StyledView = styled(View)
const StyledImage = styled(Image)
const StyledText = styled(Text)
// const StyledAlert = styled(Alert)
const Payment = ({
  fullName,
  email,
  amount,
  driverId,
  rideTime,
}: PaymentProps) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const {
    userAddress,
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationAddress,
    destinationLongitude,
  } = useLocationStore();
const [isVisible, setIsVisible] = useState(false)
  // const { userId } = useAuth();
  // const [success, setSuccess] = useState<boolean>(false);

  // const openPaymentSheet = async () => {
  //   await initializePaymentSheet();

  //   const { error } = await presentPaymentSheet();

  //   if (error) {
  //     Alert.alert(`Error code: ${error.code}`, error.message);
  //   } else {
  //     setSuccess(true);
  //   }
  // };

  // const initializePaymentSheet = async () => {
  //   const { error } = await initPaymentSheet({
  //     merchantDisplayName: "Example, Inc.",
  //     intentConfiguration: {
  //       mode: {
  //         amount: parseInt(amount) * 100,
  //         currencyCode: "usd",
  //       },
  //       confirmHandler: async (
  //         paymentMethod,
  //         shouldSavePaymentMethod,
  //         intentCreationCallback,
  //       ) => {
  //         const { paymentIntent, customer } = await fetchAPI(
  //           "/(api)/(stripe)/create",
  //           {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify({
  //               name: fullName || email.split("@")[0],
  //               email: email,
  //               amount: amount,
  //               paymentMethodId: paymentMethod.id,
  //             }),
  //           },
  //         );

  //         if (paymentIntent.client_secret) {
  //           const { result } = await fetchAPI("/(api)/(stripe)/pay", {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify({
  //               payment_method_id: paymentMethod.id,
  //               payment_intent_id: paymentIntent.id,
  //               customer_id: customer,
  //               client_secret: paymentIntent.client_secret,
  //             }),
  //           });

  //           if (result.client_secret) {
  //             await fetchAPI("/(api)/ride/create", {
  //               method: "POST",
  //               headers: {
  //                 "Content-Type": "application/json",
  //               },
  //               body: JSON.stringify({
  //                 origin_address: userAddress,
  //                 destination_address: destinationAddress,
  //                 origin_latitude: userLatitude,
  //                 origin_longitude: userLongitude,
  //                 destination_latitude: destinationLatitude,
  //                 destination_longitude: destinationLongitude,
  //                 ride_time: rideTime.toFixed(0),
  //                 fare_price: parseInt(amount) * 100,
  //                 payment_status: "paid",
  //                 driver_id: driverId,
  //                 user_id: userId,
  //               }),
  //             });

  //             intentCreationCallback({
  //               clientSecret: result.client_secret,
  //             });
  //           }
  //         }
  //       },
  //     },
  //     returnURL: "myapp://book-ride",
  //   });

  //   if (!error) {
  //     // setLoading(true);
  //   }
  // };

  return (
    <>
      <CustomButton
        title="Confirm Ride"
        className="my-10"
        onPress={() => {
          
          setIsVisible(true);
        }}
      />

      <ReactNativeModal
         isVisible={false}
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
    </>
  );
};

export default Payment;