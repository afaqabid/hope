import * as React from 'react';
import { BottomNavigation, Text, Provider as PaperProvider, Appbar, Surface } from 'react-native-paper';
import { Alert, StyleSheet } from 'react-native';
import CollectedDonationTab from '../donations/organization/CollectedDonationTab';
import NotificationsTab from '../notifications/NotificationsTab';
import { auth } from '../../firebase';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

const TabOne = () => <CollectedDonationTab/>
const TabTwo = () => <NotificationsTab/>

export default function OrganizationPortal (){
  let [fontLoaded]=useFonts({
    'Manrope-Bold': require('../../assets/fonts/Manrope-Bold.ttf'),
    'Manrope-ExtraBold': require('../../assets/fonts/Manrope-ExtraBold.ttf'),
    'Manrope-ExtraLight': require('../../assets/fonts/Manrope-ExtraLight.ttf'),
    'Manrope-Light': require('../../assets/fonts/Manrope-Light.ttf'),
    'Manrope-Medium': require('../../assets/fonts/Manrope-Medium.ttf'),
    'Manrope-Regular': require('../../assets/fonts/Manrope-Regular.ttf'),
    'Manrope-SemiBold': require('../../assets/fonts/Manrope-SemiBold.ttf'),
  });
  

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'tabOne', title: 'Collected Donations', focusedIcon: 'charity'},
    { key: 'tabTwo', title: 'Notifications', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
  ]);

  const appbarTitle = ['Donation', 'Notifications'];

  const renderScene = BottomNavigation.SceneMap({
    tabOne: TabOne,
    tabTwo: TabTwo,
  });

  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert("Are You Sure?","You'll be logged out!",[
      {text:"Yes", onPress: ()=>{
        auth.signOut().then(() => {
          console.log("User Signed Out Successfully!");
          navigation.navigate("SelectPortal")
          })
          .catch(error => alert(error.message))
      }},
      {text:"No"},
    ])
  }
  const handleProfile = () => {
      navigation.navigate('UserProfile');
  }

  return (
    <PaperProvider>
        <Surface style={styles.surface} elevation={4}>
      <Appbar.Header style={styles.topBar} >
        <Appbar.Action iconColor='#1C702B' icon="account" size={40} onPress={handleProfile} />
        <Text style={styles.appbarTitle}>{appbarTitle[index]}</Text>
        <Appbar.Action iconColor='#1C702B' style={styles.appbarLogout} size={30} icon="logout" onPress={handleLogout} />
      </Appbar.Header>
  </Surface>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={{ backgroundColor: '#FDFAF6', width:'100%', elevation:'none', color:'#FDFAF6', borderTopWidth:0.2, borderTopColor:'grey'}}
        style={styles.bottomBar}
        theme={{
          "colors": {
            "secondaryContainer": "transparent",
            "onSecondaryContainer":"#1C702B",
            "onSurface": "#1C702B",
            "onSurfaceVariant": "grey",
          },
          "fonts": {
            "labelMedium":{ 
              "fontFamily":'Manrope-Bold', 
              "fontSize":11
            }
          }}}
        sceneAnimationType='opacity'
        />
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  topBar:{
    display:'flex',
    flexDirection:'row',
    backgroundColor:'#FDFAF6',
    justifyContent:'space-between',
    
  },
  bottomBar:{

  },
  appbarTitle:{
    color:'#1C702B',
    fontFamily:'Manrope-ExtraBold',
    fontSize:18
  },
    surface: {
    width: '100%',
  },
})