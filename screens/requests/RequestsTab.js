import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import MapView, { Marker } from "react-native-maps";
import RequestHead from "../../components/RequestHead";
import Colors from "../../assets/constants/Colors";
import { db } from "../../firebase";
import { onValue, ref, child, get } from "firebase/database";

export default function RequestsTab() {
  var locationList = [];
  const [test, setTest] = useState([]);

  useEffect(() => {
    setLocations();
  }, []);

  async function setLocations() {
    const dbRef = ref(db);
    await get(child(dbRef, "hope/requests/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach(function (childSnapshot) {
            var key = childSnapshot.key;

            var childData = childSnapshot.val();
            for( var key in childData)
            {
              locationList.push({
                latitude: childData[key].latitude,
                longitude: childData[key].longitude,
              });
            }
          });
        } else {
        }
      })
      .catch((error) => {
        console.error(error);
      });
    setTest(locationList);
  }

  return (
    <PaperProvider>
      <SafeAreaView style={styles.mainContainer}>
        <View>
          <MapView style={styles.upperView}>
            {test.map((obj) => (
              <>
                <Marker
                  coordinate={{
                    longitude: obj.longitude,
                    latitude: obj.latitude,
                  }}
                />
              </>
            ))}
          </MapView>
        </View>
        <View style={styles.lowerView}>
          <ScrollView>
            <RequestHead />
          </ScrollView>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  upperView: {
    backgroundColor: "black",
    height: 300,
    marginTop: -40,
    width: "100%",
  },
  lowerView: {
    height: "56%",
    backgroundColor: "#EFECEB",
  },
});
