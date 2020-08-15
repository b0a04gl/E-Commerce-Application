import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";

import { Text, Badge, Button } from "react-native-elements";
import * as firebase from 'firebase';
import ApiKeys from '../database/RealtimeDb';
import ButtonAddRemove from "./Buttons/AddRemoveButton";
import AppButton from './Buttons/AppButton';
import AsyncStorage from '@react-native-community/async-storage';

const CartItem = ({ data, onAddItem, onRemoveItem }) => {
  const { id, productName, productPrice, qty, category, description } = data.item;
  const [currentItem, setCurrentItem] = React.useState(data.item);
  const [userToken, setUserToken] = React.useState('');

  React.useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.firebaseConfig);
    }

    firebase.database().ref('/cart/' + userToken + '/' + id).on('value', (data) => {


      if (data.val()) {



        var temp = data.val();
        setCurrentItem(temp);



      }
    });
    AsyncStorage.getItem('userToken').then((userToken) => {
      if (userToken) {
        setUserToken(userToken);
      }
    });

  }, []);

  const add = () => {


    console.log(currentItem);
    // firebase.database().ref('/cart/'+id).once('value', (data) => {


    //   if (data.val()) {


    var temp = currentItem;
    temp.qty = qty + 1;

    setCurrentItem(temp);

    firebase.database().ref('/cart/' + userToken + '/' + id).update({ qty: qty + 1 }).then((
    ) => {
    }).catch((error) => {
      console.log(error);
    });

    //           }
    // });


  }

  const remove = () => {
    if (qty > 1) {

      var temp = currentItem;
      temp.qty = qty - 1;

      setCurrentItem(temp);

      firebase.database().ref('/cart/' + userToken + '/' + id).update({ qty: qty - 1 }).then((
      ) => {
      }).catch((error) => {
        console.log(error);
      });
    }
    else {
      firebase.database().ref('/cart/' + userToken + '/' + id).remove();
    }

  }

  // let currentQty = qty;

  return (
    <View style={styles.smallCard}>
      <View style={styles.productInfo}>
        <Text style={styles.title}>{productName}</Text>
        <Text style={styles.resturentTitle}>
          {category.toString().toUpperCase()}
        </Text>
        <Text style={styles.foodDescription}>{description}</Text>
      </View>
      <View style={styles.priceView}>
        <Text style={styles.price}>₹{productPrice}</Text>
        {/* <Text style={styles.price}>₹{_id}</Text> */}
        <View style={styles.countView}>
          <TouchableOpacity style={styles.options} >
            <AppButton
              height={35}
              width={35}
              title="-"
              onTap={() =>
                remove()

              }
            />
          </TouchableOpacity>

          <Text
            h4
            style={{ alignSelf: "center", margin: 5, fontWeight: "600" }}
          >
            {qty}
          </Text>
          <TouchableOpacity style={styles.options} >
            <AppButton
              height={35}
              width={35}
              title="+"
              onTap={() =>
                //  Alert.alert("Add")
                add()
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: 10,
  },
  smallCard: {
    flex: 1,
    minHeight: 100,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "white",
    borderColor: "#E5E5E5",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: "300",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  resturentTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 4,
    marginBottom: 4,
    display: "flex",
    color: "#565555",
  },
  foodDescription: {
    fontSize: 16,
    fontWeight: "300",
    display: "flex",
    color: "#565555",
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    display: "flex",
    color: "#EA5656",
    alignSelf: "center",
  },
  foodImageSmall: {
    borderRadius: 10,
    height: 99,
    width: 99,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#581845",
    alignSelf: "center",
  },
  rating: {
    alignSelf: "flex-start",
  },
  productInfo: {
    flex: 9,
    justifyContent: "space-around",
  },

  priceView: {
    flex: 3,
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  countView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flex: 8,
  },
  badge: {
    backgroundColor: "green",
  },
  //Button
  btnAddRemove: {
    borderColor: "#f15b5d",
    borderRadius: 5,
    borderWidth: 0.5,
  },
  btnTitleStyle: {
    color: "#f15b5d",
  },
});

export default CartItem;