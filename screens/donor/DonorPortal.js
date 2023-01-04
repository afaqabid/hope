import * as React from 'react';
import { BottomNavigation, Text, Provider as PaperProvider, Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { auth } from '../../firebase';
import { useState, useEffect } from 'react';
import BlogTab from '../blog/BlogTab';
import ChatTab from '../chat/ChatTab';
import DonationsTab from '../donations/DonationsTab';
import NotificationsTab from '../notifications/NotificationsTab';
import RequestsTab from '../requests/RequestsTab';
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
      navigation.navigate("DonorLogin")
      })
      .catch(error => alert(error.message))
    }

    // auth
    //   .signInWithEmailAndPassword(email, password)
    //   .then(userCredentials => {
    //     const user = userCredentials.user;
    //     console.log('Logged in with:', user.email);
    //     navigation.navigate("DonorPortal")
    //   })
    //   .catch(error => alert(error.message))
    // }


  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title="Title" />
        <Appbar.Action icon="logout" onPress={handleLogout} />
      </Appbar.Header>      
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </>
  );
};

const styles = StyleSheet.create({
})