import { useOAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { Alert, Image, Text, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";

import { styled } from 'nativewind';
import { googleOAuth } from "@/lib/auth";

const StyledText = styled(Text)
// const StyledTouchableOpacity = styled(TouchableOpacity)
const StyledView = styled(View)


const StyledImage = styled(Image)
const OAuth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleGoogleSignIn = async () => {
    const result = await googleOAuth(startOAuthFlow);

    if (result.code === "session_exists" || result.code === "success") {
      Alert.alert("Success", "Session exists. Redirecting to home screen.");
      router.replace("/(root)/(tabs)/home");
    }

    Alert.alert(result.success ? "Success" : "Error", result.message);
  };

  return (
    <StyledView>
      <StyledView className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <StyledView className="flex-1 h-[1px] bg-general-100" />
        <StyledText className="text-lg">Or</StyledText>
        <StyledView className="flex-1 h-[1px] bg-general-100" />
      </StyledView>

      <CustomButton
        title="Log In with Google"
        className="mt-5 w-full shadow-none"
        IconLeft={() => (
          <StyledImage
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
          />
        )}
        bgVariant="outline"
        textVariant="primary"
        onPress={handleGoogleSignIn}
      />
    </StyledView>
  );
};

export default OAuth;