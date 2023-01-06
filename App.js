import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DoneeLogin from "./screens/authentication/DoneeLogin";
import DoneeRegistration from "./screens/authentication/DoneeRegistration";
import DonorLogin from "./screens/authentication/DonorLogin";
import DonorRegistration from "./screens/authentication/DonorRegistration";
import OrganizationLogin from "./screens/authentication/OrganizationLogin";
import OrganizationRegistration from "./screens/authentication/OrganizationRegistration";
import SelectPortal from "./screens/authentication/SelectPortal";
import ChatScreen from "./screens/chat/ChatScreen";
import DoneePortal from "./screens/donee/DoneePortal";
import DonorPortal from "./screens/donor/DonorPortal";
import OrganizationPortal from "./screens/organization/OrganizationPortal";

const Stack=createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{headerShown:false}}> 
        <Stack.Screen name="SelectPortal" component={SelectPortal} />
        <Stack.Screen name="DonorLogin" component={DonorLogin}/>
        <Stack.Screen name="DonorRegistration" component={DonorRegistration}/>
        <Stack.Screen name="DonorPortal" component={DonorPortal}/>
        <Stack.Screen name="DoneeLogin" component={DoneeLogin}/>
        <Stack.Screen name="DoneeRegistration" component={DoneeRegistration}/>
        <Stack.Screen name="DoneePortal" component={DoneePortal}/>
        <Stack.Screen name="OrganizationLogin" component={OrganizationLogin}/>
        <Stack.Screen name="OrganizationRegistration" component={OrganizationRegistration}/>
        <Stack.Screen name="OrganizationPortal" component={OrganizationPortal}/>
        <Stack.Screen name="ChatScreen" component={ChatScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

