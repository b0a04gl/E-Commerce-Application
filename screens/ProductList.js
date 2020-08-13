import React from 'react';
import { View, StyleSheet, ScrollView,Text } from 'react-native';
import ButtonAddRemove from '../components/Buttons/AddRemoveButton';
import Product from './Product';
import * as firebase from 'firebase';
import ApiKeys from '../database/RealtimeDb';
import { Card, Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppButton from "../components/Buttons/AppButton";
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
      keys: [],
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
                     keys: keys,
                   }
                 );   
              }
    });
  }

  store = (product,navigation, index) =>{
    console.log("Current Product : "+product);
    firebase.database().ref('/currents').set(product).then(() => {
    }).catch((error) => {
        console.log(error);
    });
    var key = {
      key: this.state.keys[index],
      category: this.state.category,
    };
    firebase.database().ref('/key').set(key).then(() => {
    }).catch((error) => {
        console.log(error);
    });
    navigation.navigate('Details');

  }


    render() {

      const {navigation} = this.props;

      return (
        <ScrollView
          style={{
            flexGrow: 0,
            width: "100%",
            height: "100%",
          }}>

            {/* <View>
            <Button
            type="clear"
            title='Add to Cart'
            onPress={() =>navigation.navigate('Home',{num:12})} />
              </View> */}
          {
            this.state.products.map((product, index) => {


                

              return(
                <View style={styles.row} key={index}>
                    <View style={styles.col}>
                      
                      <Product product={product} />
                      <TouchableOpacity style={styles.options} >
<AppButton
            height={30}
            width = {100}
            title="Details >>>"
            onTap={() =>this.store(product,navigation,index)   }
          />
</TouchableOpacity>
                     
                    </View>
                </View>
              
              )

              
            })
          }
        </ScrollView>
      );
    }
}

// class Product extends React.Component {

//   constructor(props)
//   {
//       super(props);

//       console.log("reached.............");
      
//       this.state = {
//           item : this.props.product
//       }
//       if (!firebase.apps.length) {
//           firebase.initializeApp(ApiKeys.firebaseConfig);
//       }

//       var temp = this.state.item;
//       temp.qty= 0;
  
//       this.setState({
//           item:temp,
//       });

//   }

//    onAddItem = () => {
//       // onAddToCart(item, qty);
//       // Alert.alert("Clicked Add Item...");
//   var temp = this.state.item;
//   temp.qty= temp.qty+1;

//   this.setState({
//       item:temp,
//   });



//     };
  
//      onRemoveItem = () => {
//       // onAddToCart(item, qty);
//       // Alert.alert("Clicked Remove Item...");

//       var temp = this.state.item;
//       temp.qty= temp.qty-1;
  
//       this.setState({
//           item:temp,
//       });

//     } 

//     addToDB = () => {

      

//       firebase.database().ref('/cart').push(this.state.item).then(() => {
//       }).catch((error) => {
//           console.log(error);
//       });

      

//     }

//   render() {


//     const {navigation} = this.props;

//     return (
//       <Card
      
//           image={this.state.item.image}>
              
//           <Text style={{marginBottom: 10, marginTop: 20 }} h2>
//               {this.state.item.productName}
//           </Text>
//           <Text style={styles.price} h4>
//           ₹{this.state.item.productPrice}
//           </Text>
          
        

//           <Text h6 style={styles.description}>
//               added 2h ago
//           </Text>

//           <View style={styles.countView}>  
//         <ButtonAddRemove
//           title="-"
//           // width={0}
//           onTap={() =>this.onRemoveItem()}
//         />

//         <Text
//           h1
//           style={{ alignSelf: "center", margin: 5, fontWeight: "bold" }}
//         >
//          {this.state.item.qty}
//         </Text>
//         <ButtonAddRemove
//           title="+"
//           onTap={() =>this.onAddItem()}
//         />
//       </View>

//           <Button
//           type="clear"
//           title='Add to Cart'
//           onPress={() =>this.addToDB()} />


          
//       </Card>
//     );
//   }
// }

const styles = StyleSheet.create({
  row: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
  },
  col: {
      flex: 1,
  },
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
      options: {
        // display: "flex",
        // height: 80,
        // justifyContent: "space-between",
        // alignItems: "center",
        // flexDirection: "row",
        // paddingLeft: 50,
        // paddingRight: 20,
        // borderTopColor: "#DFDFDF",
        // borderTopWidth: 0.5,
        // borderBottomColor: "#DFDFDF",
        // borderBottomWidth: 0.5,

        marginTop:10

      },
});
