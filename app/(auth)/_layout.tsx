import { Stack } from 'expo-router';



const Layout =()  =>{
  //const colorScheme = useColorScheme();
  

  return (
    
      <Stack>
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        
      </Stack>
    
  );
}
export default Layout
