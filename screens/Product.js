// src/components/Product.js
import React from 'react';
import { Text, StyleSheet,View,Alert } from 'react-native';
import { Card, Button } from 'react-native-elements';
import ButtonAddRemove from '../components/Buttons/AddRemoveButton';

import * as firebase from 'firebase';
import ApiKeys from '../database/RealtimeDb';


class Product extends React.Component {

    constructor(props)
    {
        super(props);

        
        this.state = {
            item : this.props.product
        }
        if (!firebase.apps.length) {
            firebase.initializeApp(ApiKeys.firebaseConfig);
        }

        var temp = this.state.item;
        temp.qty= 0;
    
        this.setState({
            item:temp,
        });

    }

     onAddItem = () => {
        // onAddToCart(item, qty);
        // Alert.alert("Clicked Add Item...");
    var temp = this.state.item;
    temp.qty= temp.qty+1;

    this.setState({
        item:temp,
    });



      };
    
       onRemoveItem = () => {
        // onAddToCart(item, qty);
        // Alert.alert("Clicked Remove Item...");

        var temp = this.state.item;
        temp.qty= temp.qty-1;
    
        this.setState({
            item:temp,
        });

      } 

      addToDB = () => {

        

        firebase.database().ref('/cart').push(this.state.item).then(() => {
        }).catch((error) => {
            console.log(error);
        });

        

      }

    render() {
      return (
        <Card
            image={this.state.item.image}>
                
            <Text style={{marginBottom: 10, marginTop: 20 }} h2>
                {this.state.item.productName}
            </Text>
            <Text style={styles.price} h4>
            ₹{this.state.item.productPrice}
            </Text>
            
          

            <Text h6 style={styles.description}>
                added 2h ago
            </Text>

            <View style={styles.countView}>  
          <ButtonAddRemove
            title="-"
            // width={0}
            onTap={() =>this.onRemoveItem()}
          />

          <Text
            h1
            style={{ alignSelf: "center", margin: 5, fontWeight: "bold" }}
          >
           {this.state.item.qty}
          </Text>
          <ButtonAddRemove
            title="+"
            onTap={() =>this.onAddItem()}
          />
        </View>

            <Button
            type="clear"
            title='Add to Cart'
            onPress={() =>this.addToDB()} />
        </Card>
      );
    }
}

const styles = StyleSheet.create({
    name: {
        color: '#5a647d',
        fontWeight: 'bold',
        fontSize: 30
    },
    price: {
        fontWeight: 'bold',
        marginBottom: 10
    },
    description: {
        fontSize: 10,
        color: '#c1c4cd'
    },
    countView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        flex: 8,
      },
});

export default Product;
