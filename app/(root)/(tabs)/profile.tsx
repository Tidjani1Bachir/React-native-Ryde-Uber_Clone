import { useUser } from "@clerk/clerk-expo";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import InputField from "@/components/InputField";
import { styled } from 'nativewind';
const StyledScrollView = styled(ScrollView)
const StyledView = styled(View)

const StyledImage = styled(Image)
const StyledText = styled(Text)
const StyledSafeAreaView = styled(SafeAreaView)
const Profile = () => {
  const { user } = useUser();

  return (
    <StyledSafeAreaView className="flex-1">
      <StyledScrollView
        className="px-5"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <StyledText className="text-2xl font-JakartaBold my-5">My profile</StyledText>

        <StyledView className="flex items-center justify-center my-5">
          <StyledImage
            source={{
              uri: user?.externalAccounts[0]?.imageUrl ?? user?.imageUrl,
            }}
            style={{ width: 110, height: 110, borderRadius: 110 / 2 }}
            className=" rounded-full h-[110px] w-[110px] border-[3px] border-white shadow-sm shadow-neutral-300"
          />
        </StyledView>

        <StyledView className="flex flex-col items-start justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 px-5 py-3">
          <StyledView className="flex flex-col items-start justify-start w-full">
            <InputField
              label="First name"
              placeholder={user?.firstName || "Not Found"}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

            <InputField
              label="Last name"
              placeholder={user?.lastName || "Not Found"}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

            <InputField
              label="Email"
              placeholder={
                user?.primaryEmailAddress?.emailAddress || "Not Found"
              }
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

            <InputField
              label="Phone"
              placeholder={user?.primaryPhoneNumber?.phoneNumber || "Not Found"}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />
          </StyledView>
        </StyledView>
      </StyledScrollView>
    </StyledSafeAreaView>
  );
};

export default Profile;