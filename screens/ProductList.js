import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Product from './Product';

const BASE_URL = 'https://raw.githubusercontent.com/sdras/sample-vue-shop/master/dist';

const products = [
  {
    name: 'Khaki Work Boots',
    price: 149,
    img: `${BASE_URL}/shoe1.png`,
    qty:0,
    category: 'Utilities',
    description:'Ever lasting!!!!'
  },
  {
    name: 'Camo Fang Backpack',
    price: 399,
    img: `${BASE_URL}/jacket1.png`,
    qty:0,
    category: 'Mens Fashion',
    description:'Super Coool!!!!'
  },
  {
    name: 'Quilted Liner Jacket',
    price: 499,
    img: `${BASE_URL}/jacket2.png`,
    qty:0,
    category: 'Travel',
    description:'Awaited one!!!!'
  },
  {
    name: 'Cotton Black Cap',
    price: 199,
    img: `${BASE_URL}/hat1.png`,
    qty:0,
    category:'Mens Fashion',
    description:'Best deal!!!!'
  },
];

export default class ProdutcList extends React.Component {
    render() {
      return (
        <ScrollView
          style={{
            flexGrow: 0,
            width: "100%",
            height: "100%",
          }}>
          {
            products.map((product, index) => {
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
