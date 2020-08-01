import React, { useContext, useEffect, useRef } from "react";
import { View, StyleSheet, Image,Alert } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Text, Button } from "react-native-elements";

import CartListView from "../components/CartListView";
import AppButton from "../components/Buttons/AppButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import OrderIcon from "../assets/images/orders.png";
import PaymentTypePopup from "react-native-raw-bottom-sheet";
import ArrowIcon from "../assets/images/arrow_icon.png";

import * as firebase from 'firebase';
import ApiKeys from '../database/RealtimeDb';

const CartScreen = ({ navigation }) => {

const [cartItems,setCartItems] = React.useState([]);
const [isMounted,setIsMounted] = React.useState(false);

const popupRef = useRef();

  useEffect(() => {
   
    console.log("Goto Order Screen");
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.firebaseConfig);
    }


    setIsMounted(true);
    firebase.database().ref('/cart').on('value', (data) => {
     

            if (data.val()) {
                       var temp = data.val();
                       var keys = Object.keys(temp);
                    var x = [];
                       for(var index=0;index<keys.length;index++)
                       {
                         var key = keys[index];
                
                        x.push(temp[key]);
                        x[index]['id']=key;
                        console.log(x[index]);
                       }
                       setCartItems(x);

              
                    }
          });

          setIsMounted(false);
          
    
  }, []);

  useEffect(() => {
   
    
  }, []);

  let isLoading = false;

  const didTapOrderNow = () => {
      
   


    const empty=[]
    firebase.database().ref('/cart').set(empty).then(() => {
    }).catch((error) => {
        console.log(error);
    });

    setCartItems(empty);

    Alert.alert("Placing order...");


    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
 
    var currentOrder = {
      orderID: Math.floor((Math.random() * 1000) + 1),
    totalAmount:totalAmount(),
    orderDate : date+'/'+month+'/'+year,
    }

    firebase.database().ref('/orders').push(currentOrder).then(() => {
    }).catch((error) => {
        console.log(error);
    });

    navigation.navigate('OrderScreen' );
  };

  const onAddItem = (item, qty,index) => {
    // onAddToCart(item, qty);
    Alert.alert("Clicked Add Item..."+index);

    
    

  };

  const onRemoveItem = (item, qty,index) => {
    // onAddToCart(item, qty);
    Alert.alert("Clicked Remove Item..."+index);
  };

  const totalAmount = () => {
    let total = 0;
    if (cartItems !== undefined && cartItems.length > 0) {
      cartItems.map((item) => {
        let qty = item.qty;
        let price = item.price;
        // Alert.alert(qty+"..."+price);
        total += qty * price;
      });
    }

    return total;
  };

  return (
    <SafeAreaView style={styles.contentView} forceInset={{ top: "always" }}>
      <View style={styles.titleView}>
        <Text h4> My Cart</Text>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => {
            // navigate("Order");
            navigation.navigate('OrderScreen');
            Alert.alert("Clicked order Icon...");
          }}
        >
          <Image source={OrderIcon} style={styles.imgIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.listView}>
        {cartItems !== undefined && cartItems.length > 0 ? (
          <CartListView
            cartItems={cartItems}
            onAddItem={onAddItem}
            onRemoveItem={onRemoveItem}
          />
        ) : (
          <View
            style={{
              display: "flex",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 30, fontWeight: "500", color: "#9C9696" }}>
              Your Cart is Empty
            </Text>
          </View>
        )}
      </View>
      {cartItems !== undefined && cartItems.length > 0 && (
        <View style={styles.bottomView}>
          <View style={styles.amountDetails}>
            <Text style={{ fontSize: 18 }}> Total</Text>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>
              ₹ {totalAmount()}
            </Text>
          </View>
          <AppButton
            height={50}
            title="Order Now"
            onTap={() => popupRef.current.open()}
          />
        </View>
      )}
      <PaymentTypePopup
        ref={popupRef}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={330}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
          container: {
            justifyContent: "flex-start",
            alignItems: "center",
          },
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <View style={styles.amountDetails}>
            <Text style={{ fontSize: 18 }}> Total + (Delivery Charge ₹50)</Text>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>
              ₹ {totalAmount() + 50}
            </Text>
          </View>
        
<TouchableOpacity style={styles.options} >
<AppButton
            height={50}
            // width = {800}
            title="Cash On Delivery"
            onTap={() =>
              didTapOrderNow()

            }
          />
</TouchableOpacity>


<TouchableOpacity  style={styles.options} >
<AppButton
            height={50}
            // width = {300}
            title="Pay Through Card"
            onTap={() =>{navigation.navigate('OrderScreen');}}
          />
</TouchableOpacity>

      
<TouchableOpacity style={styles.options} >
<AppButton
            height={50}
            // width = {800}
            title="Change Delivery Address"
            onTap={() =>{navigation.navigate('OrderScreen');}}
          />
</TouchableOpacity>

        </View>
      </PaymentTypePopup>
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
    justifyContent: "space-between",
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
    width: 60,
    height: 60,
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
  options: {
    display: "flex",
    height: 80,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
    borderTopColor: "#DFDFDF",
    borderTopWidth: 0.5,
    borderBottomColor: "#DFDFDF",
    borderBottomWidth: 0.5,
  },
  optionsText: {
    fontSize: 18,
  },
  icon: {
    width: 40,
    height: 40,
  },
});

// CartScreen.navigationOptions = () => {
//   return {
//     header: null,
//   };
// };

export default CartScreen;

