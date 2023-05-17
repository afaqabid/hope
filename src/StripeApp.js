import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import { Menu, Provider, Button as RNPButton } from "react-native-paper";
import { auth, db } from "../firebase";
import { child, get, onValue, push, ref, set, update } from "firebase/database";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import Colors from "../assets/constants/Colors";
import fonts from "fonts";
import { useNavigation } from "@react-navigation/native";

const API_URL = "http://192.168.18.9:19000";

const StripeApp = (props) => {
  let [fontLoaded] = useFonts({
    "Manrope-Bold": require("../assets/fonts/Manrope-Bold.ttf"),
    "Manrope-ExtraBold": require("../assets/fonts/Manrope-ExtraBold.ttf"),
    "Manrope-ExtraLight": require("../assets/fonts/Manrope-ExtraLight.ttf"),
    "Manrope-Light": require("../assets/fonts/Manrope-Light.ttf"),
    "Manrope-Medium": require("../assets/fonts/Manrope-Medium.ttf"),
    "Manrope-Regular": require("../assets/fonts/Manrope-Regular.ttf"),
    "Manrope-SemiBold": require("../assets/fonts/Manrope-SemiBold.ttf"),
  });

  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currency: "usd",
      }),
    });
    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

  const navigation = useNavigation();

  const [amount, setAmount] = useState(0);

  const handlePayPress = async () => {
    //1.Gather the customer's billing information (e.g., email)
    if (!cardDetails?.complete) {
      Alert.alert("Please enter Complete card details!");
      return;
    }
    const billingDetails = {
      email: auth.currentUser.email,
    };
    //2.Fetch the intent client secret from the backend
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      //2. confirm the payment
      if (error) {
        console.log("Unable to process payment");
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          paymentMethodType: "Card",
          customer: "Hello",
          billingDetails: billingDetails,
          amount: amount,
        });
        console.log(paymentIntent);
        if (error) {
          alert(`Payment Confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          alert("Payment Successful");
          console.log("Payment successful ", paymentIntent);
          uploadPost();
          uploadPostTwo();
          updateBalance();
          navigation.navigate("DonorPortal");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const openMenu = () => {
    setVisible(true);
    fetchOrganizations();
  };

  const closeMenu = () => setVisible(false);

  const handleMenuItemPress = (item) => {
    setSelectedItem(item);
    closeMenu();
  };

  var organizationsList = [];
  const [list, setList] = useState([]);
  const [test, setTest] = useState([]);

  async function fetchOrganizations() {
    const dbRef = ref(db);
    await get(child(dbRef, "hope/users/organization/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          snapshot.forEach(function (childSnapshot) {
            var key = childSnapshot.key;
            var childData = childSnapshot.val();
            organizationsList.push(key);
            setList(organizationsList);
            setTest(list);
          });
        } else {
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    fetchOrganizations();
  }, []);

  async function uploadPost() {
    var tempRef = ref(db, "hope/donations/" + auth.currentUser.displayName);
    var newPostRef = push(tempRef);
    set(newPostRef, {
      imgUrl:
        "https://img.freepik.com/free-vector/stack-money-gold-coins-3d-cartoon-style-icon-coins-with-dollar-sign-wad-cash-currency-flat-vector-illustration-wealth-investment-success-savings-economy-profit-concept_74855-26108.jpg",
      title: amount + " donated to " + selectedItem,
      username: auth.currentUser.displayName,
      description: "Money Donated to " + selectedItem,
      category: "money",
      longitude: 0,
      latitude: 0,
      date:
        new Date().getDate() +
        "/" +
        new Date().getMonth() +
        "/" +
        new Date().getMonth(),
      time: new Date().getHours() + ":" + new Date().getMinutes(),
      status: "completed",
      doneeName: selectedItem,
    })
      .then()
      .catch((error) => {
        alert(error);
      });
  }

  async function uploadPostTwo() {
    var tempRef = ref(db, "hope/organizationDonations/" + selectedItem);
    var newPostRef = push(tempRef);
    set(newPostRef, {
      amount: amount,
      donorName: auth.currentUser.displayName,
      date:
        new Date().getDate() +
        "/" +
        new Date().getMonth() +
        "/" +
        new Date().getMonth(),
      time: new Date().getHours() + ":" + new Date().getMinutes(),
    })
      .then()
      .catch((error) => {
        alert(error);
      });
  }


  const [oldAmount, setOldAmount] = useState(0)

  function updateBalance() {
    const dbRef = ref(db, "hope/users/organization/" + selectedItem);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setOldAmount(data["totalAmount"]);
     });
     
      update(ref(db, "hope/users/organization/" + selectedItem), {
     totalAmount: parseInt(amount) + parseInt(oldAmount),
     })
     
   
  }

  return (
    <Provider>
      <SafeAreaView>
        <Text style={styles.heading}>Donate To Organization</Text>
        <View style={styles.container}>
          <Text style={styles.titleTxt}>Enter Amount</Text>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <RNPButton onPress={openMenu}>
                {selectedItem || "Select"}
              </RNPButton>
            }
          >
            {test.map((organization) => (
              <>
                <Menu.Item
                  onPress={() => handleMenuItemPress(organization)}
                  title={organization}
                />
              </>
            ))}
          </Menu>
          <Text style={styles.titleTxt}>Enter Amount</Text>
          <TextInput
            value={amount}
            onChangeText={(amount) => setAmount(amount)}
            style={styles.donationTitle}
            keyboardType="numeric"
            placeholder="Enter Donation Amount Here."
          ></TextInput>
          <Text style={styles.titleTxt}>Enter Card Details</Text>
          <CardField
            postalCodeEnabled={false}
            placeholder={{
              number: "4242 4242 4242 4242",
            }}
            cardStyle={styles.card}
            style={styles.cardContainer}
            onCardChange={(cardDetails) => {
              setCardDetails(cardDetails);
            }}
          />
          <Button onPress={handlePayPress} title="Pay" disabled={loading} />
        </View>
      </SafeAreaView>
    </Provider>
  );
};
export default StripeApp;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    margin: 20,
    marginTop: "30%",
  },
  heading: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Manrope-ExtraBold",
    color: Colors.main,
  },
  input: {
    backgroundColor: "#efefefef",
    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },
  card: {
    backgroundColor: "#efefefef",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
  titleTxt: {
    fontSize: 20,
    color: "#1C702B",
    fontFamily: "Manrope-ExtraBold",
    marginLeft: 5,
    marginBottom: 0,
  },
  donationTitle: {
    height: 45,
    fontFamily: "Manrope-Regular",
    width: "95%",
    fontSize: 18,
    backgroundColor: "#efefefef",
    padding: 10,
    borderRadius: 5,
  },
});
