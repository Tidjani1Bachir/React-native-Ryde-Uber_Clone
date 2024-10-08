

import { View, Image,TextInput ,TouchableOpacity } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { icons } from "@/constants";
import {  TextInputType} from "@/types/type";
import { GoogleInputProps } from "@/types/type";
import { styled } from 'nativewind';

const StyledView = styled(View)

const StyledImage = styled(Image)
const StyledTouchableOpacity = styled(TouchableOpacity)



const GoogleTextInput2 = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: TextInputType) => {
  return (
    <StyledView
      // Adjust for iOS or Android
      className={`flex flex-row items-center justify-between relative z-50 rounded-xl p-2 ${containerStyle}`} 
    >
      <TextInput
  placeholder="Where do you want to go"
  style={{ alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginHorizontal: 20,
    position: "relative",
    shadowColor: "#d4d4d4", }}
    // onSubmitEditing={NavigateToFindRidePage}
  />
  <StyledTouchableOpacity
  style={{ left:"30%",}}
  // onPress={NavigateToFindRidePage}
  >
  <StyledImage
           source={icon ? icon : icons.search}
           className="w-6 h-6"
           resizeMode="contain"
         />
  </StyledTouchableOpacity>
      {/* <StyledTouchableOpacity className="justify-end items-center  " style={{ left:"200%",}} onPress={NavigateToFindRidePage}>
         <StyledImage
           source={icon ? icon : icons.search}
           className="w-6 h-6"
           resizeMode="contain"
         />
      </StyledTouchableOpacity> */}
{/* <TextInput
  placeholder="Where do you want to go" 
  
  
  
  style={{ alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginHorizontal: 20,
    position: "relative",
    shadowColor: "#d4d4d4", }} // Styling 
  {/* // onChangeText={(text) => this.setState({ text })} // Handle text input changes
  // value={this.state.text} // Display the current text value
/> */}

   
    
      {/* <GooglePlacesAutocomplete
        fetchDetails={true}
        placeholder="Search"
        debounce={200}
        
        
        query={{
          key: googlePlacesApiKey,
          language: "en",
        }}
        
        textInputProps={{
          
          placeholder: initialLocation ?? ",
        }} 
      />
         */}
    </StyledView>
  );
};

export default GoogleTextInput2;

