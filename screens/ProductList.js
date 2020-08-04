import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Product from './Product';
import * as firebase from 'firebase';
import ApiKeys from '../database/RealtimeDb';
// const BASE_URL = 'https://raw.githubusercontent.com/sdras/sample-vue-shop/master/dist';

// const products = [
//   {
//     productName: 'Khaki Work Boots',
//     productPrice: 149,
//     category: 'Utilities',
//     description:'Ever lasting!!!!',
//     image: `${BASE_URL}/shoe1.png`,
//     qty:0,
    
//   },
//   {
//     productName: 'Camo Fang Backpack',
//     productPrice: 399,
//     image: `${BASE_URL}/jacket1.png`,
//     qty:0,
//     category: 'Mens Fashion',
//     description:'Super Coool!!!!'
//   },
//   {
//     productName: 'Quilted Liner Jacket',
//     productPrice: 499,
//     image: `${BASE_URL}/jacket2.png`,
//     qty:0,
//     category: 'Travel',
//     description:'Awaited one!!!!'
//   },
//   {
//     productName: 'Cotton Black Cap',
//     productPrice: 199,
//     image: `${BASE_URL}/hat1.png`,
//     qty:0,
//     category:'Mens Fashion',
//     description:'Best deal!!!!'
//   },
// ];

export default class ProdutcList extends React.Component {


  constructor(props)
  {
    super(props);
    

    const {index, routes} = this.props.navigation.dangerouslyGetState();
    const currentRoute = routes[index].name;
    console.log('current screen : ', routes[index].name);
    this.state = {
      products:[],
      category : routes[index].name,
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.firebaseConfig);
    }

  }

  componentDidMount()
  {
  //'/inventory/'+this.state.category  
    firebase.database().ref('/inventory/'+this.state.category).on('value', (data) => {
     

      if (data.val()) {
                 var temp = data.val();
                 var keys = Object.keys(temp);
              var x = [];
                 for(var index=0;index<keys.length;index++)
                 {
                   var key = keys[index];
          
                  x.push(temp[key]);
                  x[index]['id']=key;
                  x[index]['qty']=0;
                  // console.log(x[index].image);
                 }
                
                 this.setState(
                   {
                     products:x,
                   }
                 );
        
              }
    });
  }

    render() {
      return (
        <ScrollView
          style={{
            flexGrow: 0,
            width: "100%",
            height: "100%",
          }}>
          {
            this.state.products.map((product, index) => {
              return(
                <View style={styles.row} key={index}>
                    <View style={styles.col}>
                      <Product product={product} />
                    </View>
                </View>
              )
            })
          }
        </ScrollView>
      );
    }
}

const styles = StyleSheet.create({
  row: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
  },
  col: {
      flex: 1,
  },
});
