//This is an example code to Add Search Bar Filter on Listview//
import React, { Component } from 'react';
//import react in our code.
import * as firebase from 'firebase';
import ApiKeys from '../../database/RealtimeDb';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  ActivityIndicator,
  Alert,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';
import { Rating} from 'react-native-elements';
//import all the components we are going to use.
import { Searchbar } from 'react-native-paper';
export default class App extends Component {
  constructor(props) {
    super(props);
    //setting default state
    this.state = { isLoading: false, text: '' };
    this.arrayholder = [];

    if (!firebase.apps.length) {
        firebase.initializeApp(ApiKeys.firebaseConfig);
      }

  }

  componentDidMount() {
    // return fetch('https://jsonplaceholder.typicode.com/posts')
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     this.setState(
    //       {
    //         isLoading: false,
    //         dataSource: responseJson
    //       },
    //       function() {
    //         this.arrayholder = responseJson;
    //       }
    //     );
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });


    


  }
  SearchFilterFunction(searchText) {

    // console.log("Item : "+itemData);
    console.log("Text : "+searchText);


    

    if (searchText == ""){
        this.setState({
            text:"",
            dataSource:[],
        });
      }else{
        
        const dbRef = firebase.database().ref("recentProducts");
      
        const item = [];
    

        // console.log("---------------------------------------------------------");
    
        // dbRef.orderByChild("productName").equalTo(searchText).on("child_added", (snap) => {
        //     // console.log(snap.val());
    
        //     if(item.includes(snap.val())==false)
        //         item.push(snap.val());
        // });

     if(item.length==0)   
     {   console.log("---------------------------------------------------------");
    
        dbRef.orderByChild("productName").startAt(searchText).endAt(searchText+"\uf8ff").on("child_added", (snap) => {
            // console.log(snap.val());
            item.push(snap.val());
        });

        
    
    }
    console.log("---------------------------------------------------------");
        console.log(item);

this.setState({
    dataSource:item,
    isLoading:false,
    text:searchText
});

      }
    

   
   

  }
  ListViewItemSeparator = () => {
    //Item sparator view
    return (
      <View
        style={{
          height: 0.3,
          width: '90%',
          backgroundColor: '#080808',
        }}
      />
    );
  };
  render() {
    if (this.state.isLoading) {
      //Loading View while data is loading
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      //ListView to show with textinput used as search bar
      <View style={styles.viewStyle}>
       
<Searchbar
      placeholder="Search"
      onChangeText={text => this.SearchFilterFunction(text)}
    value={this.state.text}
    />
        
        <ScrollView >
 

        <FlatList


          data={this.state.dataSource}
          // ItemSeparatorComponent={this.ListViewItemSeparator}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
 
        <TouchableOpacity
                style={smallStyles.smallCard}
                // onPress={}
                // disabled={disable}
              >
                <Image style={smallStyles.foodImageSmall} source={item.image} />
                <View style={smallStyles.productInfo}>
                  <Text style={smallStyles.title}>{item.productName}</Text>
                  <Text style={smallStyles.resturentTitle}>
                    {item.category.toString().toUpperCase()}
                  </Text>
                  <Rating
                    style={smallStyles.rating}
                    type="heart"
                    readonly
                    ratingCount={5}
                    imageSize={20}
                  />
                </View>
                <View style={smallStyles.shopView}>
                  <Text style={smallStyles.price}>₹{item.productPrice}</Text>
                 </View>
             </TouchableOpacity>

          )}
          
          // enableEmptySections={true}
          // style={{ marginTop: 10 }}
          keyExtractor={(item, index) => index}
        />

</ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'center',
    flex: 1,
    marginTop: 40,
    padding: 16,
  },
  textStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
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
});


const smallStyles = StyleSheet.create({
  smallCard: {
    flex: 1,
    height: 100,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "white",
    borderColor: "#E5E5E5",
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: "500",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  resturentTitle: {
    fontSize: 16,
    display: "flex",
    color: "#565555",
  },
  price: {
    fontSize: 18,
    fontWeight: "400",
    display: "flex",
    color: "#EA5656",
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
    flex: 1,
    padding: 5,
    justifyContent: "space-around",
  },
  shopView: {
    justifyContent: "space-around",
    padding: 10,
    alignItems: "center",
  },
  productSize: {
    fontSize: 20,
    fontWeight: "600",
    color: "#848484",
  },
});