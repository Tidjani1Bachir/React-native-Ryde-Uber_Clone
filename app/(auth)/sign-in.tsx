;
import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { useCallback, useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { styled } from 'nativewind';

const StyledText = styled(Text)
// const StyledTouchableOpacity = styled(TouchableOpacity)
const StyledView = styled(View)

const StyledScrollView = styled(ScrollView)
const StyledImage = styled(Image)

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = useCallback(async () => {
     if (!isLoaded) return;

     try {
       const signInAttempt = await signIn.create({
         identifier: form.email,
         password: form.password,
       });

       if (signInAttempt.status === "complete") {
         await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(root)/(tabs)/home");
       } else {
    //     See https://clerk.com/docs/custom-flows/error-handling for more info on error handling
         console.log(JSON.stringify(signInAttempt, null, 2));
         Alert.alert("Error", "Log in failed. Please try again.");
     }
     } catch (err: any) {
       console.log(JSON.stringify(err, null, 2));
       Alert.alert("Error", err.errors[0].longMessage);
   }
   
  }, [isLoaded, form.email, form.password]);

  // [isLoaded, form]
  return (
    <StyledScrollView className="flex-1 bg-white">
      <StyledView className="flex-1 bg-white">
        <StyledView className="relative w-full h-[250px]">
          <StyledImage source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <StyledText className="text-2xl text-black font-semibold absolute bottom-5 left-5">
            Welcome 👋
            
          </StyledText>
        </StyledView>

        <StyledView className="p-5">
          <InputField
            label="Email"
            placeholder="Enter email"
            icon={icons.email}
            textContentType="emailAddress"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />

          <InputField
            label="Password"
            placeholder="Enter password"
            icon={icons.lock}
            secureTextEntry={true}
            textContentType="password"
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />

          <CustomButton
            title="Sign In"
            onPress={onSignInPress}
            className="mt-6"
          />

          <OAuth />

          <Link
            href="/sign-up"
            className="text-lg text-center text-general-200 mt-10"
          >
            Don't have an account?{" "}
            <StyledText className="text-primary-500">Sign Up</StyledText>
          </Link>
        </StyledView>
      </StyledView>
    </StyledScrollView>
  );
};

export default SignIn;