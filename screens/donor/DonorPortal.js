import * as React from 'react';
import { BottomNavigation, Text, Provider as PaperProvider, Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import BlogTab from '../blog/BlogTab';
import ChatTab from '../chat/ChatTab';
import DonationsTab from '../donations/DonationsTab';
import NotificationsTab from '../notifications/NotificationsTab';
import RequestsTab from '../requests/RequestsTab';
import { auth } from '../../firebase';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const TabOne = () => <DonationsTab/>
const TabTwo = () => <RequestsTab/>
const TabThree = () => <ChatTab/>
const TabFour = () => <BlogTab/>
const TabFive = () => <NotificationsTab/>

export default function DonorPortal (){
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'tabOne', title: 'Donations', focusedIcon: 'heart', unfocusedIcon: 'heart-outline'},
    { key: 'tabTwo', title: 'Requests', focusedIcon: 'album' },
    { key: 'tabThree', title: 'Chat', focusedIcon: 'history' },
    { key: 'tabFour', title: 'Blog', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
    { key: 'tabFive', title: 'Notifications', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
  ]);

  const appbarTitle = ['Donations', 'Requests', 'Chat', 'Blog', 'Notifications'];

  const renderScene = BottomNavigation.SceneMap({
    tabOne: TabOne,
    tabTwo: TabTwo,
    tabThree: TabThree,
    tabFour: TabFour,
    tabFive: TabFive,
  });

  const navigation = useNavigation();

  const handleLogout = () => {
    auth.signOut().then(() => {
      console.log("User Signed Out Successfully!");
      navigation.navigate("SelectPortal")
      })
      .catch(error => alert(error.message))
    }
  return (
    <PaperProvider>
      <Appbar.Header style={styles.topBar} >
        <Appbar.Content title={appbarTitle[index]} />
        <Appbar.Action style={styles.appbarLogout} icon="logout" onPress={handleLogout} />
      </Appbar.Header>      
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={{ backgroundColor: 'grey'}}
        />
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  topBar:{
    display:'flex',
    flexDirection:'row',
    backgroundColor:'grey',
    color:'white',
    alignItems:'center',
    textAlign:'center',
    justifyContent:'center'
  },

})