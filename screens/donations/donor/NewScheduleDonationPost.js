import {
  Keyboard,
  Button as ButtonNative,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Provider as PaperProvider,
  Text,
  Button,
  SegmentedButtons,
  Banner,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { auth, db, storage } from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import Colors from "../../../assets/constants/Colors";
import * as Location from "expo-location";
import { ref as dbRef, push, set } from "firebase/database";

export default function NewScheduleDonationPost() {
  let [fontLoaded] = useFonts({
    "Manrope-Bold": require("../../../assets/fonts/Manrope-Bold.ttf"),
    "Manrope-ExtraBold": require("../../../assets/fonts/Manrope-ExtraBold.ttf"),
    "Manrope-ExtraLight": require("../../../assets/fonts/Manrope-ExtraLight.ttf"),
    "Manrope-Light": require("../../../assets/fonts/Manrope-Light.ttf"),
    "Manrope-Medium": require("../../../assets/fonts/Manrope-Medium.ttf"),
    "Manrope-Regular": require("../../../assets/fonts/Manrope-Regular.ttf"),
    "Manrope-SemiBold": require("../../../assets/fonts/Manrope-SemiBold.ttf"),
  });

  const [segBtnValue, setSegBtnValue] = useState("");

  const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );

  const navigation = useNavigation();

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let postLoc = "Waiting..";
  let longitude = 0;
  let latitude = 0;
  if (errorMsg) {
    postLoc = errorMsg;
  } else if (location) {
    postLoc = `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`;
    longitude = location.coords.longitude;
    latitude = location.coords.latitude;
  }

  const [image, setImage] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);

  const uploadImage = async () => {
    // convert image into blob image
    const blobImage = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });
    // set metadata of image
    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: "image/jpeg",
    };
    // upload image on storage
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, "DonationPostImages/" + Date.now());
    const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);

    // Listen for state changes, errors, and completion of the upload.
    await uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImgUrl(downloadURL);
        });
      }
    );
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [donationDate, setDonationDate] = useState("");
  const [donationTime, setDonationTime] = useState("");

  async function uploadPost() {
    if (
      image == null ||
      title.trim() == "" ||
      description.trim() == "" ||
      segBtnValue.trim() == "" ||
      donationDate.trim() == "" ||
      donationTime.trim() == ""
    ) {
      alert("Please fill all fields");
    } else {
      if (imgUrl == null) {
        await uploadImage();
      }
      if (imgUrl != null) {
        console.log("Here!");
        var tempRef = dbRef(db, "hope/donations/" + auth.currentUser.displayName);
        var newPostRef = push(tempRef);
        set(newPostRef, {
          imgUrl: imgUrl,
          title: title,
          username: auth.currentUser.displayName,
          category: segBtnValue,
          description: description,
          longitude: longitude,
          latitude: latitude,
          scheduled: true,
          dateScheduled: donationDate,
          timeScheduled: donationTime
        })
          .then()
          .catch((error) => {
            alert(error);
          });
        alert("Post Uploaded Successfully!");
        navigation.navigate("DonorPortal");

        //    -----------------------------------------------------------------
        // set(dbRef(db, "hope/donations/" + auth.currentUser.displayName), {
        //   imgUrl: imgUrl,
        //   title: title,
        //   username: auth.currentUser.displayName,
        //   category: segBtnValue,
        //   description: description,
        //   longitude: longitude,
        //   latitude: latitude,
        // })
        //   .then()
        //   .catch((error) => {
        //     alert(error);
        //   });
        // alert("Post Uploaded Successfully!");
        // navigation.navigate("DonorPortal");
      } else {
        alert("Wait! Image is uploading!");
      }
    }
  }
  return (
    <PaperProvider>
      <SafeAreaView style={styles.mainContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "position" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView>
            <View style={styles.imageContainer}>
              <Text style={styles.titleTxt}>Images</Text>
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{ width: "100%", height: "100%" }}
                />
              )}
            </View>
            {/* <Button style={styles.btnCancel}>
              <Text style={styles.btnTxtCancel} onPress={Pickimage}>Upload Image</Text>
            </Button> */}
            <ButtonNative title="Upload Image" onPress={pickImage} />
            <View style={styles.detailsContainer}>
              <View style={styles.dateAndTimeCard}>
                <View style={styles.dateCard}>
                  <Text style={styles.titleTxt}>Date</Text>
                  <TextInput
                    value={donationDate}
                    onChangeText={(donationDate) => setDonationDate(donationDate)}
                    style={styles.donationDate}
                    placeholder="DDMMYYYY"
                  ></TextInput>

                </View>
                <View style={styles.timeCard}>
                  <Text style={styles.titleTxt}>Time</Text>
                  <TextInput
                    value={donationTime}
                    onChangeText={(donationTime) => setDonationTime(donationTime)}
                    style={styles.donationTime}
                    placeholder="In 24hrs"
                  ></TextInput>

                </View>
              </View>
              <Text style={styles.titleTxt}>Title</Text>
              <TextInput
                value={title}
                onChangeText={(title) => setTitle(title)}
                style={styles.donationTitle}
                placeholder="Write Donation Title Here."
              ></TextInput>
              <Text style={styles.titleTxt}>Select Category</Text>
              <SegmentedButtons
                value={segBtnValue}
                onValueChange={setSegBtnValue}
                style={{
                  width: 350,
                  height: 35,
                  marginTop: 3,
                }}
                buttons={[
                  {
                    value: "food",
                    label: "Food",
                  },
                  {
                    value: "clothes",
                    label: "Clothes",
                  },
                  { value: "goods", label: "Goods" },
                ]}
              />
              <Text style={styles.titleTxt}>Description</Text>
              <TextInput
                value={description}
                multiline={true}
                style={styles.description}
                placeholder="Write Donation Description Here."
                onChangeText={(text) => setDescription(text)}
              ></TextInput>
              <View style={styles.btnContainer}>
                <Button style={styles.btnPost} onPress={uploadPost}>
                  <Text style={styles.btnTxtPost}>Post</Text>
                </Button>
                <Button style={styles.btnCancel}>
                  <Text
                    style={styles.btnTxtCancel}
                    onPress={() => {
                      navigation.navigate("NewDonationPost");
                    }}
                  >
                    Cancel
                  </Text>
                </Button>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    backgroundColor: "#FDFAF6",
  },
  imageContainer: {
    height: "50%",
    backgroundColor: "white",
    width: "100%",
    margin: 0,
    borderRadius: 10,
    padding: 10,
    marginBottom: 5,
  },

  dateAndTimeCard:{
    display:'flex',
    flexDirection:'row',
    justifyContent:"space-between",
    width:'80%',
    height:'25%',
  },

  detailsContainer: {
    height: "50%",
    backgroundColor: "transparent",
    width: "100%",
    margin: 10,
    borderRadius: 10,
    display: "flex",
  },

  titleTxt: {
    fontSize: 20,
    color: "#1C702B",
    fontFamily: "Manrope-ExtraBold",
    marginLeft: 5,
    marginBottom: 0,
  },

  donationDate: {
    height: 40,
    fontFamily: "Manrope-Regular",
    fontSize: 18,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    width: 120,
  },

  donationTime: {
    height: 40,
    fontFamily: "Manrope-Regular",
    fontSize: 18,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    width: 120,
  },



  donationTitle: {
    height: 45,
    fontFamily: "Manrope-Regular",
    width: "95%",
    fontSize: 18,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },

  description: {
    height: 45,
    fontFamily: "Manrope-Regular",
    width: "95%",
    fontSize: 18,
    backgroundColor: "white",
    padding: 10,
    height: 120,
    borderRadius: 5,
  },

  btnContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
  },
  btnPost: {
    backgroundColor: "#1C702B",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    height: 55,
    minWidth: "45%",
    marginTop: 10,
  },
  btnCancel: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    height: 55,
    minWidth: "45%",
    borderWidth: 2,
    borderColor: "#1C702B",
    marginTop: 10,
    marginLeft: 10,
  },
  btnTxtPost: {
    color: "white",
    fontSize: 18,
    fontFamily: "Manrope-Bold",
    justifyContent: "center",
    alignItems: "center",
  },
  btnTxtCancel: {
    color: "#1C702B",
    fontSize: 18,
    fontFamily: "Manrope-Bold",
    justifyContent: "center",
    alignItems: "center",
  },
});
