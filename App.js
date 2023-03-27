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
import UserProfile from "./screens/userProfile/UserProfile";
import NewDonationPost from "./screens/donations/donor/NewDonationPost";
import NewPhysicalItemDonationPost from "./screens/donations/donor/NewPhysicalItemDonationPost";
import NewMonetaryDonationPost from "./screens/donations/donor/NewMonetaryDonationPost";
import NewScheduleDonationPost from "./screens/donations/donor/NewScheduleDonationPost";
import NewRequestPost from "./screens/requests/donee/NewRequestPost";
import NewPhysicalItemRequestPost from "./screens/requests/donee/NewPhysicalItemRequestPost";
import NewMonetaryRequestPost from "./screens/requests/donee/NewMonetaryRequestPost";
import NewScheduleRequestPost from "./screens/requests/donee/NewScheduleRequestPost";
import ActiveDonationsPosts from "./screens/donations/donor/ActiveDonationsPosts";
import PreviousDonationsPosts from "./screens/donations/donor/PreviousDonationsPosts";
import ActiveRequestsPosts from "./screens/requests/donee/ActiveRequestPost";
import PreviousRequestsPosts from "./screens/requests/donee/PreviousRequestsPosts";
import ResetPassword from "./screens/authentication/ResetPassword";
import DonationDetails from "./screens/donations/DonationDetails";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SelectPortal" component={SelectPortal} />
        <Stack.Screen name="DonorLogin" component={DonorLogin} />
        <Stack.Screen name="DonorRegistration" component={DonorRegistration} />
        <Stack.Screen name="DonorPortal" component={DonorPortal} />
        <Stack.Screen name="DoneeLogin" component={DoneeLogin} />
        <Stack.Screen name="DoneeRegistration" component={DoneeRegistration} />
        <Stack.Screen name="DoneePortal" component={DoneePortal} />
        <Stack.Screen name="OrganizationLogin" component={OrganizationLogin} />
        <Stack.Screen
          name="OrganizationRegistration"
          component={OrganizationRegistration}
        />
        <Stack.Screen
          name="OrganizationPortal"
          component={OrganizationPortal}
        />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="NewDonationPost" component={NewDonationPost} />
        <Stack.Screen
          name="NewPhysicalItemDonationPost"
          component={NewPhysicalItemDonationPost}
        />
        <Stack.Screen
          name="NewMonetaryDonationPost"
          component={NewMonetaryDonationPost}
        />
        <Stack.Screen
          name="NewScheduleDonationPost"
          component={NewScheduleDonationPost}
        />
        <Stack.Screen name="NewRequestPost" component={NewRequestPost} />
        <Stack.Screen
          name="NewPhysicalItemRequestPost"
          component={NewPhysicalItemRequestPost}
        />
        <Stack.Screen
          name="NewMonetaryRequestPost"
          component={NewMonetaryRequestPost}
        />
        <Stack.Screen
          name="NewScheduleRequestPost"
          component={NewScheduleRequestPost}
        />
        <Stack.Screen
          name="ActiveDonationsPosts"
          component={ActiveDonationsPosts}
        />
        <Stack.Screen
          name="PreviousDonationsPosts"
          component={PreviousDonationsPosts}
        />
        <Stack.Screen
          name="ActiveRequestsPosts"
          component={ActiveRequestsPosts}
        />
        <Stack.Screen
          name="PreviousRequestsPosts"
          component={PreviousRequestsPosts}
        />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="DonationDetails" component={DonationDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
