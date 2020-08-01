import React from 'react';
import { View, ScrollView, StyleSheet, FlatList, Image, TouchableOpacity, Text, Alert } from 'react-native';
import * as firebase from 'firebase';
import ApiKeys from '../database/RealtimeDb';

export default class PendingList extends React.Component {
   _isMounted = false;
   constructor(props) {
      super(props);
      this.state = {
         dealers: [],
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

   componentWillUnmount() {
      this._isMounted = false;
   }

   addToProduct = (key, productIndex) => {
      Alert.alert('Accept Product', 'Are you sure you want to add this product to the inventory list?', [{
         text: 'Cancel',
         style: 'cancel',
      }, {
         text: 'OK',
         onPress: () => {
            firebase.database().ref('/inventory/'+this.state.dealers[key][productIndex].category).push(this.state.dealers[key][productIndex]).then(() => {
               firebase.database().ref('dealers/' + key + '/' + productIndex.toString()).update({ status: 'Accepted' });
            }).catch((error) => {
               console.log(error);
            });
            firebase.database().ref('/recentProducts').push(this.state.dealers[key][productIndex]).then(() => {
            }).catch((error) => console.log(error));
         }
      }]);
   };

   deleteProduct = (key, productIndex) => {
      Alert.alert('Delete Product', 'Are you sure you want to reject this product?', [{
         text: 'Cancel',
         style: 'cancel',
      }, {
         text: 'OK',
         onPress: () => {
            firebase.database().ref('dealers/' + key + '/' + productIndex.toString()).update({ status: 'Rejected' });
         }
      }]);
   };

   render() {
      return (
         <ScrollView keyboardShouldPersistTaps='always' style={styles.screen}>
            {Object.keys(this.state.dealers).map((key, index) => (
               <View style={styles.display}>
                  <Text style={styles.text}>Dealer ID:{key}</Text>
                  <FlatList data={this.state.dealers[key]}
                     renderItem={data => (
                        <View style={styles.listContainer}>
                           <Image source={data.item.image} style={styles.listimage} />
                           <View style={styles.list}>
                              <Text style={styles.name}>{data.item.productName}</Text>
                              <Text style={styles.price}>{data.item.productPrice}</Text>
                           </View>
                           {data.item.status === 'Pending' ?
                              <View style={styles.img}>
                                 <TouchableOpacity onPress={this.addToProduct.bind(this, key, data.index)}>
                                    <Image source={require('../assets/tick.png')} style={styles.Optionsimage} />
                                 </TouchableOpacity>
                                 <TouchableOpacity onPress={this.deleteProduct.bind(this, key, data.index)}>
                                    <Image source={require('../assets/delete.png')} style={styles.Optionsimage} />
                                 </TouchableOpacity>
                              </View> :
                              <Text style={styles.status}>{data.item.status}</Text>
                           }
                        </View>
                     )} />
               </View>
            ))
            }
         </ScrollView>
      );
   }
};

const styles = StyleSheet.create({

   screen: {
      flex: 1,
   },

   display: {
      marginVertical: 10,
   },

   text: {
      color: 'blue',
      fontSize: 16,
   },

   listContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 0.5,
      borderColor: 'black',
      paddingLeft: 20,
      paddingRight: 30,
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

   img: {
      flexDirection: 'row',
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
      marginRight: 10,
   },

   status: {
      fontSize: 15,
      marginRight: 20,
      fontWeight: 'bold',
   }

});
