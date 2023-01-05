import { StyleSheet, Text, ScrollView } from 'react-native'
import React from 'react'
import { Card, Provider as PaperProvider } from 'react-native-paper'

export default function BlogTab() {
  return (
    <>
    <ScrollView >
      <Card style={styles.container}>
        <Card.Cover source={{ uri: 'https://media.geeksforgeeks.org/wp-content/uploads/20220217151648/download3-200x200.png' }} />
          <Card.Content>
            <Text variant="titleLarge">Flood In America</Text>
            <Text variant="bodyMedium">Roughly 18,000 years ago an ancient lake in Siberia about 120 km </Text>
        </Card.Content>
     </Card>
   </ScrollView>
   </>
  );
};

//const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  container :{
    alignContent:'center',
    margin: 25,
   }
})