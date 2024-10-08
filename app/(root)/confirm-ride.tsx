import { router } from "expo-router";
import { FlatList, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import DriverCard from "@/components/DriverCard";
import RideLayout from "@/components/RideLayout";
import { useDriverStore } from "@/store";
import { styled } from 'nativewind';


// const StyledTouchableOpacity = styled(TouchableOpacity)
const StyledView = styled(View)
const StyledFlatList = styled(FlatList)

const ConfirmRide = () => {
  const { drivers, selectedDriver, setSelectedDriver } = useDriverStore();

  return (
    <RideLayout title={"Choose a Rider"} snapPoints={["65%", "85%"]}>
      <StyledFlatList
        data={drivers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          /* 
          The exclamation mark (!) in TypeScript is called the non-null assertion operator. It tells the TypeScript compiler that you are certain the value will not be null or undefined at that specific point in the code, even if TypeScript is not able to determine that.
          */
          <DriverCard
            item={item}
            selected={selectedDriver!}
            setSelected={() => setSelectedDriver(Number(item.id!))}
          />
        )}
        ListFooterComponent={() => (
          <StyledView className="mx-5 mt-10">
            <CustomButton
              title="Select Ride"
              onPress={() => router.push("/(root)/book-ride")}
            />
          </StyledView>
        )}
      />
    </RideLayout>
  );
};

export default ConfirmRide;