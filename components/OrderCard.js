import React, { useContext, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import * as firebase from 'firebase';
import ApiKeys from '../database/RealtimeDb';
import { Text, Rating } from 'react-native-elements';
import moment from 'moment';
import WaitingIcon from "../assets/images/orders.png";
import AppButton from './Buttons/AppButton';
import AsyncStorage from '@react-native-community/async-storage';

const deviceWidth = Math.round(Dimensions.get('window').width);


const OrderCard = ({ data, onSelect, onCancel }) => {


  const [userToken, setUserToken] = React.useState('');
  useEffect(() => {
    // onViewOrders();

    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.firebaseConfig);
    }

    AsyncStorage.getItem('userToken').then((userToken) => {
      if (userToken) {
        
      
        setUserToken(userToken);
      }
    });

}, []);

  const {
    orderID,
    totalAmount,
    orderDate,
    key,
    paidThrough,
    orderStatus,
    items,
  } = data.item;

  const checkCancelOption = (orderDate) => {
    let date = moment(orderDate);
    var now = moment();
    console.log(key);
    if (now < date) {
      return (
        <Text
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            fontSize: 16,
            color: '#7FBB69',
            fontWeight: '600',
          }}
        >
          Delivered
        </Text>
      );
    } else {



      // firebase.database().ref('orders/'+userToken+'/'+key).remove();

      return (
        <AppButton
          title={'Cancel Now'}
          width={90}
          height={40}
          onTap={onCancel}
        />
      );
    }
  };

  return (
    <TouchableOpacity
      style={smallStyles.smallCard}
      onPress={(data) => onSelect(data)}
    >
      <View style={smallStyles.productInfo}>
        <View
          style={{
            flex: 6,
            padding: 5,
            paddingLeft: 20,
          }}
        >
          <Text style={smallStyles.title}>Order ID: {orderID}</Text>
          <Text style={smallStyles.orderDateTitle}>
            {moment(orderDate).format('MMM Do, HH:mm A')}
          </Text>
          <Text style={smallStyles.price}>₹{totalAmount}</Text>
        </View>
        <View
          style={{
            flex: 6,
            justifyContent: 'space-around',
            padding: 5,
            flexDirection: 'row',
          }}
        >
          {checkCancelOption(orderDate)}
          <Image source={WaitingIcon} style={smallStyles.statusOnGoing} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const smallStyles = StyleSheet.create({
  smallCard: {
    flex: 1,
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    borderColor: '#E5E5E5',
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
  },

  title: {
    fontSize: 22,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderDateTitle: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: '400',
    display: 'flex',
    color: '#565555',
  },
  price: {
    fontSize: 25,
    fontWeight: '600',
    display: 'flex',
    color: '#EA5656',
    marginTop: 5,
  },
  statusOnGoing: {
    height: 60,
    width: 60,
    marginTop:-10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
  },
  statusCompleted: {
    height: 80,
    width: 80,
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
  },

  rating: {
    alignSelf: 'flex-start',
  },
  productInfo: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default OrderCard;