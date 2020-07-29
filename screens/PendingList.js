import React from 'react';
import { View, Button, StyleSheet, FlatList, Image, TouchableOpacity, Text, Alert } from 'react-native';
import * as firebase from 'firebase';
import ApiKeys from '../database/RealtimeDb';

export default class PendingList extends React.Component {
   _isMounted = false;
   constructor(props) {
      super(props);
      this.state = {
         dealers: [],
         dealerProducts: [],
      };
      if (!firebase.apps.length) {
         firebase.initializeApp(ApiKeys.firebaseConfig);
      }
   }

   componentDidMount() {
      this._isMounted = true;
      firebase.database().ref('/dealers').on('value', data => {
         if (this._isMounted) {
            if (data.val()) {
               this.setState({
                  dealers: data.val(),
               });
            }
         }
      });
   }

   componentDidUpdate(prevProps, prevState) {
      if (prevState.dealers != this.state.dealers) {
         const dealers = Object.values(this.state.dealers);
         var dealerProducts = [];
         for (var i = 0; i < dealers.length; i++) {
            dealerProducts = dealerProducts.concat(dealers[i]);
         }
         this.setState({
            dealerProducts: dealerProducts,
         });
      }
   }

   componentWillUnmount() {
      this._isMounted = false;
   }

   addToProduct = (index) => {
      Alert.alert('Accept Product', 'Are you sure you want to add this product to the inventory list?', [{
         text: 'Cancel',
         style: 'cancel',
      }, {
         text: 'OK',
         onPress: () => {
            firebase.database().ref('/inventory').push(this.state.dealerProducts[index]).then(() => {
               console.log('Pushed');
            }).catch((error) => {
               console.log(error);
            });
            const products = this.state.dealerProducts;
            products.splice(index, 1);
            this.setState({
               dealerProducts: products,
            });
         }
      }]);
   };

   deleteProduct = (index) => {
      Alert.alert('Delete Product', 'Are you sure you want to reject this product?', [{
         text: 'Cancel',
         style: 'cancel',
      }, {
         text: 'OK',
         onPress: () => {
            const products = this.state.dealerProducts;
            products.splice(index, 1);
            this.setState({
               dealerProducts: products,
            });
         }
      }]);
   };

   render() {
      return (
         <View style={styles.screen}>
            <FlatList data={this.state.dealerProducts}
               renderItem={data => (
                  <View style={styles.listContainer}>
                     <Image source={require('../assets/images/add.png')} style={styles.listimage} />
                     <View style={styles.list}>
                        <Text style={styles.name}>{data.item.productName}</Text>
                        <Text style={styles.price}>{data.item.productPrice}</Text>
                     </View>
                     <TouchableOpacity onPress={this.addToProduct.bind(this, data.index)}>
                        <Image source={require('../assets/tick.png')} style={styles.Optionsimage} />
                     </TouchableOpacity>
                     <TouchableOpacity onPress={this.deleteProduct.bind(this, data.index)}>
                        <Image source={require('../assets/delete.png')} style={styles.Optionsimage} />
                     </TouchableOpacity>
                  </View>
               )} />
         </View>
      );
   }
};

const styles = StyleSheet.create({

   screen: {
      flex: 1,
   },

   listContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 0.5,
      borderColor: 'black',
      paddingHorizontal: 20,
   },

   list: {
      width: '70%',
      marginVertical: 10,
      padding: 10,
   },

   listimage: {
      height: 10,
      width: 10,
      padding: 20,
      marginHorizontal: 20,
   },

   name: {
      fontSize: 16,
   },

   price: {
      color: 'red',
   },

   Optionsimage: {
      height: 10,
      width: 10,
      padding: 15,
      marginRight: 15,
   },

});
