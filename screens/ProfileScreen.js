import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import firebase from 'firebase';
import ApiKeys from '../database/RealtimeDb';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class ProfileScreen extends React.Component
{
    
  constructor(props)
  {
    super(props);
    this.state = {
      email : 'abc',
      password : 'noono',
      fname : 'First Name',
      lname : 'Last Name',
      phone : 'Phone',
      city : 'City',
      type : '',
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.firebaseConfig);
  }

  }


  componentDidMount() {
    let dbRef = firebase.database().ref('currentUser');
    if (dbRef) {
      dbRef.on('value', (data) => {
        
        var temp = data.val();

        this.setState({
          fname : temp.fname,
          lname : temp.lname,
          phone : temp.phone,
          city : temp.city,
          email : temp.email,
          type : temp.type,
          password : temp.password,
      });
        
    })
    }

    console.log(this.state.email+":"+this.state.pwd);

}

    render()
    {
        const {navigation} = this.props;

        const {index, routes} = this.props.navigation.dangerouslyGetState();
        const currentRoute = routes[index].name;
        console.log('current screen : ', routes[index].name);

        return (


            
            
            <SafeAreaView style={styles.container}>
        
              <View style={styles.userInfoSection}>
                <View style={{flexDirection: 'row', marginTop: 15}}>
                  <Avatar.Image 
                    source={{
                      uri: 'https://api.adorable.io/avatars/80/abott@adorable.png',
                    }}
                    size={80}
                  />
                  <View style={{marginLeft: 20}}>
                    <Title style={[styles.title, {
                      marginTop:15,
                      marginBottom: 5,
                    }]}>{this.state.fname+" "+this.state.lname}</Title>
                    <Caption style={styles.caption}>{this.state.type}</Caption>
                  </View>
                </View>
              </View>
        
              <View style={styles.userInfoSection}>
                <View style={styles.row}>
                  <Icon name="map-marker-radius" color="#777777" size={20}/>
                  <Text style={{color:"#777777", marginLeft: 20}}>{this.state.city}</Text>
                </View>
                <View style={styles.row}>
                  <Icon name="phone" color="#777777" size={20}/>
                  <Text style={{color:"#777777", marginLeft: 20}}>{'+91 '+this.state.phone}</Text>
                </View>
                <View style={styles.row}>
                  <Icon name="email" color="#777777" size={20}/>
                  <Text style={{color:"#777777", marginLeft: 20}}>{this.state.email}</Text>
                </View>
              </View>
        
              <View style={styles.infoBoxWrapper}>
                  <View style={[styles.infoBox, {
                    borderRightColor: '#dddddd',
                    borderRightWidth: 1
                  }]}>
                    <Title>100</Title>
                    <Caption>Orders Delivered</Caption>
                  </View>
                  <View style={styles.infoBox}>
                    <Title>12</Title>
                    <Caption>Orders Pending</Caption>
                  </View>
              </View>
        
              <View style={styles.menuWrapper}>
                <TouchableRipple onPress={() => {navigation.navigate('WishList')}}>
                  <View style={styles.menuItem}>
                    <Icon name="heart-outline" color="#ec2F4B" size={25}/>
                    <Text style={styles.menuItemText}>My Wishlist</Text>
                  </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => {navigation.navigate('OrderScreen')}}>
                  <View style={styles.menuItem}>
                    <Icon name="briefcase-upload-outline" color="#ec2F4B" size={25}/>
                    <Text style={styles.menuItemText}>My Orders</Text>
                  </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => {navigation.navigate('CartScreen')}}>
                  <View style={styles.menuItem}>
                    <Icon name="cart-outline" color="#ec2F4B" size={25}/>
                    <Text style={styles.menuItemText}>My Cart</Text>
                  </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => {navigation.navigate('EditProfile')}}>
                  <View style={styles.menuItem}>
                    <Icon name="account-check-outline" color="#ec2F4B" size={25}/>
                    <Text style={styles.menuItemText}>My Account</Text>
                  </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => {navigation.navigate('Settings')}}>
                  <View style={styles.menuItem}>
                    <Icon name="settings-outline" color="#ec2F4B" size={25}/>
                    <Text style={styles.menuItemText}>Settings</Text>
                  </View>
                </TouchableRipple>
              </View>
            </SafeAreaView>
          );
    }

  
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});