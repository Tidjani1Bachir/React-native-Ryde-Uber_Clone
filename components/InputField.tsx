import {
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { styled } from 'nativewind';
import { InputFieldProps } from "@/types/type";

const StyledText = styled(Text)
// const StyledTouchableOpacity = styled(TouchableOpacity)
const StyledView = styled(View)
const StyledTextInput = styled(TextInput)
const StyledImage = styled(Image)

const InputField = ({
  label,
  icon,
  secureTextEntry = false,
  labelStyle,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  ...props
}: InputFieldProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <StyledView className="my-2 w-full">
          <StyledText className={`text-lg font-semibold mb-3 ${labelStyle}`}>
            {label}
          </StyledText>
          {/*  */}
          <StyledView
            className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-500  ${containerStyle}`}
          >
            {icon && (
              <StyledImage source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />
            )}
            <StyledTextInput
              className={`rounded-full p-4 font-semibold text-[15px] flex-1 ${inputStyle} text-left`}
              secureTextEntry={secureTextEntry}
              {...props}
            />
          </StyledView>
        </StyledView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;