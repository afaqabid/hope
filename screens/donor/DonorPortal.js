import * as React from 'react';
import { BottomNavigation, Text, Provider as PaperProvider } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import BlogTab from '../blog/BlogTab';
import ChatTab from '../chat/ChatTab';
import DonationsTab from '../donations/DonationsTab';
import NotificationsTab from '../notifications/NotificationsTab';
import RequestsTab from '../requests/RequestsTab';

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

  return (
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
  );
};

const styles = StyleSheet.create({
})