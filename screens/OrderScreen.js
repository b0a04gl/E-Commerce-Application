import React, { useContext, useEffect, useRef } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Text, Button } from "react-native-elements";
import OrderListView from "../components/OrderListView";
import BackIcon from"../assets/images/back_arrow.png";
import * as firebase from 'firebase';
import ApiKeys from '../database/RealtimeDb';

// import { Context as UserContext } from "../../dataStore/userAccessContext";

const OrderScreen = ({ navigation }) => {
//   const { state, onViewOrders, onViewOrderDetails } = useContext(UserContext);

//   const { orders } = state;

const [orders,setOrders] = React.useState([]);

  useEffect(() => {
    // onViewOrders();

    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.firebaseConfig);
    }


   
    firebase.database().ref('/orders').on('value', (data) => {
     

            if (data.val()) {
                       var temp = data.val();
                       var keys = Object.keys(temp);
                    var x = [];
                       for(var index=0;index<keys.length;index++)
                       {
                         var key = keys[index];
                        
                        x.push(temp[key]);
                       }
                       setOrders(x);

              
                    }
          });

         
          
    

  }, []);

  const didSelect = ({ item }) => {
    // onViewOrderDetails(item);
  };

  const onCancel = ({ item }) => {
    console.log(item);
  };

  const didTapBack = () => {
    navigation.goBack();
  };



  return (
    <SafeAreaView style={styles.contentView} forceInset={{ top: "always" }}>
      <View style={styles.titleView}>
        <TouchableOpacity onPress={() => didTapBack()}>
          <Image style={styles.imgIcon} source={BackIcon} />
        </TouchableOpacity>
        <Text h4 style={{ flex: 1, textAlign: "center", marginRight: 40 }}>
          My Orders
        </Text>
      </View>
      {orders !== undefined && orders.length > 0 ? (
        <View style={styles.listView}>
          <OrderListView
            orders={orders}
            didSelectItem={didSelect}
            onCancel={onCancel}
          />
        </View>
      ) : (
        <View style={styles.listView}>
          <View
            style={{
              display: "flex",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 30, fontWeight: "500", color: "#9C9696" }}>
              Your Order is Empty
            </Text>
          </View>
        </View>
      )
       
          }
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentView: {
    backgroundColor: "#F2F2F2",
    flex: 1,
    justifyContent: "space-between",
  },
  titleView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
  },
  listView: {
    flex: 9,
  },
  bottomView: {
    flex: 2,
  },

  imgIcon: {
    width: 40,
    height: 50,
  },
  searchOptions: {
    display: "flex",
    height: 60,
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  topCategory: {
    height: 100,
    backgroundColor: "green",
  },

  amountDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    margin: 5,
  },
});

// OrderScreen.navigationOptions = () => {
//   return {
//     header: null,
//   };
// };

export default OrderScreen;