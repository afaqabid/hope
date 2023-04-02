import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


export default function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserProfile = async () => {
      const currentUser = firebase.auth().currentUser
      if (currentUser) {
        const userDoc = await firebase.firestore().collection('user').doc(currentUser.uid).get();
        if (userDoc.exists) {
          setUser(userDoc.data());
        }
      }
    };
    getUserProfile();
  }, []);


  return (
    <View>
    {users.map((user, index) => (
      <View key={index}>
        <Text>Name: {user.name}</Text>
        <Text>Email: {user.email}</Text>
        <Text>Phone: {user.phone}</Text>
        <Text>Address: {user.address}</Text>
        <Text>Date of Birth: {user.dob}</Text>
      </View>
    ))}
  </View>
  )
}

// const styles = StyleSheet.create({})
