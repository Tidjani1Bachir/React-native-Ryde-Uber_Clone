
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";
import { fetchAPI } from "@/lib/fetch";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";

import { styled } from 'nativewind';
import { useSignUp } from '@clerk/clerk-expo'
const StyledText = styled(Text)
// const StyledTouchableOpacity = styled(TouchableOpacity)
const StyledView = styled(View)

const StyledScrollView = styled(ScrollView)
const StyledImage = styled(Image)

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });


  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  // here
  const onPressVerify = async () => {
    if (!isLoaded) return;
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });
      if (completeSignUp.status === "complete") {
        // !create a database user

        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: completeSignUp.createdUserId,
          }),
        });
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({
          ...verification,
          state: "success",
        });
      } else {
        setVerification({
          ...verification,
          error: "Verification failed. Please try again.",
          state: "failed",
        });
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "failed",
      });
    }
  };
  return (
    <StyledScrollView className="flex-1 bg-white">
      <StyledView className="flex-1 bg-white">
        <StyledView className="relative w-full h-[250px]">
          <StyledImage source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <StyledText className="StyledText-2xl StyledText-black font-semibold absolute bottom-5 left-5">
            Create Your Account
          </StyledText>
        </StyledView>
        <StyledView className="p-5">
          <InputField
            label="Name"
            placeholder="Enter name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
          <InputField
            label="Email"
            placeholder="Enter email"
            icon={icons.email}
            
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter password"
            icon={icons.lock}
            secureTextEntry={true}
            
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
          <CustomButton
            title="Sign Up"
            onPress={onSignUpPress}
            className="mt-6"
          />
{/* google auth */}
          <OAuth />

          <Link
            href="/sign-in"
            className="text-lg text-center text-general-200 mt-10"
          >
            Already have an account?{" "}
            <StyledText className="text-primary-500">Log In</StyledText>
          </Link>
        </StyledView>
        
        {/* verification model  */}

        {/*!⁡⁢⁣⁢ReactNativeModal is a package from npm⁡ check here ⁡⁢⁣⁢for more info https://www.npmjs.com/package/react-native-modal⁡  */}

{/*  for pending */}
        <ReactNativeModal
          isVisible={verification.state === "pending"}
          // onBackdropPress={() =>
          //   setVerification({ ...verification, state: "default" })
          // }
          onModalHide={() => {
            //  if (verification.state === "success") {
            // }}
              // setShowSuccessModal(true);
              setVerification({ ...verification, state: "success" })
          }
            }
          
        >
          <StyledView className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <StyledText className="font-JakartaExtraBold text-2xl mb-2">
              Verification
            </StyledText>
            <StyledText className="font-Jakarta mb-5">
              We've sent a verification code to {form.email}.
            </StyledText>

            <InputField
              label={"Code"}
              icon={icons.lock}
              placeholder={"12345"}
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code) =>
                setVerification({ ...verification, code })
              }
            />
            {verification.error && (
              <StyledText className="text-red-500 text-sm mt-1">
                {verification.error}
              </StyledText>
            )}
            
            <CustomButton
              title="Verify Email"
              onPress={onPressVerify}
              className="mt-5 bg-success-500"
            />
          </StyledView>
        </ReactNativeModal>
{/*  for success */}
         <ReactNativeModal isVisible={verification.state === "success"}>
          <StyledView className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <StyledImage
              source={images.check}
              className="w-[110px] h-[110px] mx-auto my-5"
            />
            <StyledText className="text-3xl font-JakartaBold  text-center">
              Verified
            </StyledText>
            <StyledText className="text-base text-gray-400 font-semibold text-center mt-2">
              You have successfully verified your account.
            </StyledText>
            <CustomButton
              title="Browse Home"
              onPress={() => router.push(`/(root)/(tabs)/home`)}
              className="mt-5"
            />
          </StyledView>
        </ReactNativeModal> 
      </StyledView>
    </StyledScrollView>
  );
};
export default SignUp;