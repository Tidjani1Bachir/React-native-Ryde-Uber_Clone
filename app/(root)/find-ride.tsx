import { router } from "expo-router";
import { Text, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import GoogleTextInput2 from "@/components/GoogleTextInput2";
import RideLayout from "@/components/RideLayout";
import { icons } from "@/constants";
import { useLocationStore } from "@/store";
import { styled } from 'nativewind';


const StyledText = styled(Text)
const StyledView = styled(View)



const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();

  return (
    <RideLayout title="Ride" snapPoints={["70%"]}>
      <StyledView className="my-3">
        <StyledText className="text-lg font-JakartaSemiBold mb-3">From</StyledText>

        <GoogleTextInput2
          icon={icons.target}
          initialLocation={userAddress!}
          containerStyle="bg-neutral-100"
          textInputBackgroundColor="#f5f5f5"
          handlePress={(location) => setUserLocation(location)}
        />
      </StyledView>

      <StyledView className="my-3">
        <StyledText className="text-lg font-JakartaSemiBold mb-3">To</StyledText>

        <GoogleTextInput2
          icon={icons.map}
          initialLocation={destinationAddress!}
          containerStyle="bg-neutral-100"
          textInputBackgroundColor="transparent"
          handlePress={(location) => setDestinationLocation(location)}
        />
      </StyledView>

      <CustomButton
        title="Find Now"
        onPress={() => router.push(`/(root)/confirm-ride`)}
        className="mt-5"
      />
    </RideLayout>
  );
};

export default FindRide;