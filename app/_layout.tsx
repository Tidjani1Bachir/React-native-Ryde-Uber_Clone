import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
// import Constants from 'expo-constants';
import { tokenCache } from '@/lib/auth';
import { LogBox } from 'react-native';
// import { useColorScheme } from '@/hooks/useColorScheme';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'

LogBox.ignoreAllLogs();

// import { Slot } from 'expo-router'

// const apiKey = Constants.expoConfig.extra.apiKey;

const publishableKey =  "pk_test_bGl0ZXJhdGUtaGF3ay02MS5jbGVyay5hY2NvdW50cy5kZXYk"



// function RootLayoutNav() {
//   return (
//     <ClerkProvider publishableKey={publishableKey}>
//       <ClerkLoaded>
//         <Slot />
//       </ClerkLoaded>
//     </ClerkProvider>
//   )
// }


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
// t oprevent clerk warning


export default function RootLayout() {
  //const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    "Jakarta-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    "Jakarta-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "Jakarta-ExtraLight": require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
    "Jakarta-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
    "Jakarta-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    Jakarta: require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "Jakarta-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
  });
  

  if (!publishableKey) {
    throw new Error(
      'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
    )
  }
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider  publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(root)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      </ClerkLoaded>
    </ClerkProvider>
      
    
  );
}
