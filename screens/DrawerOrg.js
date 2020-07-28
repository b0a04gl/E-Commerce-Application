import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from './HomeScreen';
import Dealer from './Dealer';
import EditProfileScreen from './EditProfileScreen';
import ProfileScreen from './ProfileScreen';
import Init from './initScreen';
import OTPAuth from './OTPAuth';
import Admin from './Admin';
import DealerProducts from './DealerProducts';
import{ AuthContext } from '../components/context';
import ProductList from './ProductList';
import SearchBar from './Components/SearchBar';
import PendingList from './PendingList';

import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';


import {AsyncStorage, FlatList,View,  TouchableHighlight,Image, StyleSheet, TouchableOpacity, ScrollView, Alert, Modal, TextInput, Button } from 'react-native';


import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList
} from '@react-navigation/drawer';





const DrawerNav = createDrawerNavigator();
const Stack = createStackNavigator();
const HomeStackScreen =({navigation}) =>(
    <Stack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#ec2F4B',
          },

          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            // alignSelf: 'center'
           
          },
    }}>
        <Stack.Screen name="Home" component={Home} options={{
            title:'Home',
            headerStyle: {
                backgroundColor: '#ec2F4B',
              },
            headerTitleAlign: 'center',
            headerLeft : () => (
                <Icon.Button  name = 'ios-menu' size={30}
                backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
            ),
            
            headerRight : () => (
                
            //     <View style={styles.iconContainer}>
            //   <Icon.Button  name = 'md-search' size={30}
            //     backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
         <Icon.Button  name = 'ios-cart' size={30}
                backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
    //   </View>
            ),

        }}/>

    </Stack.Navigator>
);


const InitStackScreen =({navigation}) =>(
    <Stack.Navigator
    
    screenOptions={{
        headerStyle: {
            backgroundColor: '#ec2F4B',
          },
          gestureEnabled: false ,
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            alignSelf: 'center'
          },
    }}>


      
        <Stack.Screen name="Init" component={Init} options={{
            title:'E-Commerce App',
            gestureEnabled: false,
        }}/>

    </Stack.Navigator>
);



const SearchBarStackScreen =({navigation}) =>(
    <Stack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#ec2F4B',
          },

          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            alignSelf: 'center'
          },
          headerLeft : () => (
            <Icon.Button  name = 'ios-arrow-round-back' size={30}
            backgroundColor = '#ec2F4B' onPress={() => navigation.goBack()}></Icon.Button>
        ),
    }}>
        <Stack.Screen name="SearchBar" component={SearchBar} options={{
            title:'SearchBar',
            headerTitleAlign: 'center',
        }}/>

    </Stack.Navigator>
);

const OTPAuthStackScreen =({navigation}) =>(
    <Stack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#ec2F4B',
          },

          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            alignSelf: 'center'
          },
    }}>
        <Stack.Screen name="OTPAuth" component={OTPAuth} options={{
            title:'OTPAuth',
            
        }}/>

    </Stack.Navigator>
);


const AdminStackScreen =({navigation}) =>(
    <Stack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#ec2F4B',
          },

          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            alignSelf: 'center'
          },
    }}>
        <Stack.Screen name="Admin" component={Admin} options={{
            title:'Admin',
            // headerShown: false,
            headerStyle: {
                backgroundColor: '#ec2F4B',
              },
            headerTitleAlign: 'center',
            headerLeft : () => (
                <Icon.Button  name = 'ios-menu' size={30}
                backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
            ),
            headerRight : () => (
                
              //     <View style={styles.iconContainer}>
              //   <Icon.Button  name = 'md-search' size={30}
              //     backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
           <Icon.Button  name = 'md-create' size={30}
                  backgroundColor = '#ec2F4B' onPress={() => navigation.navigate('AddItems')}></Icon.Button>
      //   </View>
              ),
        }}/>

    </Stack.Navigator>
);


const DealerStackScreen =({navigation}) =>(
  <Stack.Navigator screenOptions={{
      headerStyle: {
          backgroundColor: '#ec2F4B',
        },

        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          alignSelf: 'center'
        },
  }}>
      <Stack.Screen name="Dealer" component={Dealer} options={{
          title:'Dealer',
          // headerShown: false,
          headerStyle: {
              backgroundColor: '#ec2F4B',
            },
          headerTitleAlign: 'center',
          headerLeft : () => (
              <Icon.Button  name = 'ios-menu' size={30}
              backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
          ),
        
      }}/>

  </Stack.Navigator>
);


const DealerProductsStackScreen =({navigation}) =>(
  <Stack.Navigator screenOptions={{
      headerStyle: {
          backgroundColor: '#ec2F4B',
        },

        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          alignSelf: 'center'
        },
  }}>
      <Stack.Screen name="DealerProducts" component={DealerProducts} options={{
          title:'Dealer Products',
          // headerShown: false,
          headerStyle: {
              backgroundColor: '#ec2F4B',
            },
          headerTitleAlign: 'center',
          headerLeft : () => (
              <Icon.Button  name = 'ios-menu' size={30}
              backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
          ),
        
      }}/>

  </Stack.Navigator>
);

const PendingListStackScreen =({navigation}) =>(
  <Stack.Navigator screenOptions={{
      headerStyle: {
          backgroundColor: '#ec2F4B',
        },

        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          alignSelf: 'center'
        },
  }}>
      <Stack.Screen name="PendingList" component={PendingList} options={{
          title:'Pending List',
          // headerShown: false,
          headerStyle: {
              backgroundColor: '#ec2F4B',
            },
          headerTitleAlign: 'center',
          headerLeft : () => (
              <Icon.Button  name = 'ios-menu' size={30}
              backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
          ),
        
      }}/>

  </Stack.Navigator>
);

const ProductListStackScreen =({navigation}) =>(
    <Stack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#ec2F4B',
          },

          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            // alignSelf: 'center'
           
          },
    }}>
        <Stack.Screen name="ProductList" component={ProductList} options={{
            title:'ProductList',
            headerStyle: {
                backgroundColor: '#ec2F4B',
              },
            headerTitleAlign: 'center',
            headerLeft : () => (
                <Icon.Button  name = 'ios-menu' size={30}
                backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
            ),
            
            headerRight : () => (
                
                <View style={styles.iconContainer}>
              <Icon.Button  name = 'md-search' size={30}
                backgroundColor = '#ec2F4B' onPress={() => navigation.navigate('SearchBar')}></Icon.Button>
         <Icon.Button  name = 'ios-cart' size={30}
                backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
      </View>
            ),

        }}/>

    </Stack.Navigator>
);

const ProfileScreenStackScreen =({navigation}) =>(
    <Stack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#ec2F4B',
          },
        //   headerShown: false,
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            // alignSelf: 'center'
           
          },
    }}>
        <Stack.Screen name="Profile" component={ProfileScreen} options={{
            title:'Profile',
            headerStyle: {
                backgroundColor: '#ec2F4B',
              },
            headerTitleAlign: 'center',
            headerLeft : () => (
                <Icon.Button  name = 'ios-menu' size={30}
                backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
            ),

              

        }}/>

    </Stack.Navigator>
);

const EditProfileScreenStackScreen =({navigation}) =>(
    <Stack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#ec2F4B',
          },
        //   headerShown: false,
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            // alignSelf: 'center'
           
          },
    }}>
        <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{
            title:'Edit Profile',
            headerStyle: {
                backgroundColor: '#ec2F4B',
              },
            headerTitleAlign: 'center',
            headerLeft : () => (
                <Icon.Button  name = 'ios-menu' size={30}
                backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
            ),

              

        }}/>

    </Stack.Navigator>
);

const AddItemsStackScreen =({navigation}) =>(
  <Stack.Navigator screenOptions={{
      headerStyle: {
          backgroundColor: '#ec2F4B',
        },
      //   headerShown: false,
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          // alignSelf: 'center'
         
        },
  }}>
      <Stack.Screen name="AddItems" component={Popup} options={{
          title:'Add Items',
          headerStyle: {
              backgroundColor: '#ec2F4B',
            },
          headerTitleAlign: 'center',
          headerLeft : () => (
              <Icon.Button  name = 'ios-menu' size={30}
              backgroundColor = '#ec2F4B' onPress={() => navigation.openDrawer()}></Icon.Button>
          ),

            

      }}/>

  </Stack.Navigator>
);


const adminItems = [
  <DrawerNav.Screen name="Admin" component={AdminStackScreen} 
        
  options={{
    title: 'Admin',
    drawerIcon: ({color, size}) => (
      <Icon
        name="md-checkmark-circle-outline"
        size={size}
        color={color}
      />
    ),
    // gestureEnabled: false,
  }}
  
  />,

  <DrawerNav.Screen name="AddItems" component={AddItemsStackScreen}
  
  options={{
    title: 'AddItems',
    drawerIcon: ({color, size}) => (
      <Icon
        name="md-checkmark-circle-outline"
        size={size}
        color={color}
      />
    ),
    // gestureEnabled: false,
  }}
  />
  ,
  <DrawerNav.Screen name="PendingList" component={PendingListStackScreen}
        
        options={{
          title: 'PendingList',
          drawerIcon: ({color, size}) => (
            <Icon
              name="md-checkmark-circle-outline"
              size={size}
              color={color}
            />
          ),
          // gestureEnabled: false,
        }}
        />
        ,
];
const dealerItems = [
  <DrawerNav.Screen name="Dealer" component={DealerStackScreen}
        
        options={{
          title: 'Dealer',
          drawerIcon: ({color, size}) => (
            <Icon
              name="md-checkmark-circle-outline"
              size={size}
              color={color}
            />
          ),
          // gestureEnabled: false,
        }}
        />,
        <DrawerNav.Screen name="DealerProducts" component={DealerProductsStackScreen}
        
        options={{
          title: 'DealerProducts',
          drawerIcon: ({color, size}) => (
            <Icon
              name="md-checkmark-circle-outline"
              size={size}
              color={color}
            />
          ),
          // gestureEnabled: false,
        }}
        />

];
const customerItems = [
  <DrawerNav.Screen name="Home" component={HomeStackScreen} 
        
        options={{
          title: 'Home',
          drawerIcon: ({color, size}) => (
            <Icon
              name="md-checkmark-circle-outline"
              size={size}
              color={color}
            />
          ),
          // gestureEnabled: false,
        }}
        />,
        <DrawerNav.Screen name="Profile" component={ProfileScreenStackScreen}
        
        options={{
          title: 'Profile',
          drawerIcon: ({color, size}) => (
            <Icon
              name="md-checkmark-circle-outline"
              size={size}
              color={color}
            />
          ),
          // gestureEnabled: false,
        }}
        />,
        
];





   const d = [];


const type = [];

const DATA =  [];

function Popup()
{
  
    const [text,setText] = React.useState('a');
    const [modalVisible, setModalVisible] = React.useState(false);
 
 
    return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>ITEM TO BE ADDED</Text>
            <TextInput style={styles.modalTextInput} placeholder='Enter the item name' onChangeText={text => setText(text)}   />

            <TouchableHighlight
              style={{ ...styles.openButton,  paddingTop:8, marginTop:40,
                paddingBottom:15,
                marginLeft:40,
                marginRight:30,
                backgroundColor:'#ec2F4B',
                borderRadius:100,
                width : 145,
                height :35 ,
                borderWidth: 1,
                borderColor: '#fff' }}
              onPress={() => {
                setModalVisible(!modalVisible);
                
                if(text!=='')
                {
                  adminItems.push(
                    <DrawerNav.Screen name={text} component={ProductListStackScreen}

                          options={{
                  
                           drawerLabel:text,
                            title:text,
                            drawerIcon: ({color, size}) => (
                              <Icon
                                name="md-checkmark-circle-outline"
                                size={size}
                                color={color}
                              />
                          ),
                            // gestureEnabled: false,
                      }}
                          />
                  );

                  customerItems.push(
                    <DrawerNav.Screen name={text} component={ProductListStackScreen}

                          options={{
                  
                           drawerLabel:text,
                            title:text,
                            drawerIcon: ({color, size}) => (
                              <Icon
                                name="md-checkmark-circle-outline"
                                size={size}
                                color={color}
                              />
                          ),
                            // gestureEnabled: false,
                      }}
                          />
                  );
              
  
                }

              }}
            >
              <Text style={styles.textStyle}>ADD</Text>
            </TouchableHighlight>



          </View>
        </View>
      </Modal>
          
 <TouchableHighlight
              style={{ ...styles.openButton, paddingTop:8,
                marginTop:-100,
              paddingBottom:15,
              marginLeft:40,
              marginRight:30,
              backgroundColor:'#ec2F4B',
              borderRadius:100,
              width : 145,
              height :35 ,
              borderWidth: 1,
              borderColor: '#fff'}}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>ADD ITEM</Text>
            </TouchableHighlight>

  


<TouchableHighlight
              style={{ ...styles.openButton,  paddingTop:8, marginTop:40,
                paddingBottom:15,
                marginLeft:40,
                marginRight:30,
                backgroundColor:'#ec2F4B',
                borderRadius:100,
                width : 145,
                height :35 ,
                borderWidth: 1,
                borderColor: '#fff'}}
              onPress={() => {
                items.splice(items.length-1,1);  
              }}
            >
              <Text style={styles.textStyle}>DELETE ITEM</Text>
            </TouchableHighlight>

    </View>


  );

}

function DrawerContent(props) {

  const paperTheme = useTheme();

  const { signOut,updateScreens, toggleTheme } = React.useContext(AuthContext);

 

    // GLOBAL.hidden = mocks.hidden;

    return(

      
      
    
        <View style={{flex:1}}>

          <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image 
                                source={{
                                    uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                                }}
                                size={50}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>John Doe</Title>
                                <Caption style={styles.caption}>+91 9876543210</Caption>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>8</Paragraph>
                                <Caption style={styles.caption}>Orders Pending</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
                                <Caption style={styles.caption}>Orders Delivered</Caption>
                            </View>
                        </View>
                    </View> 


                    <Drawer.Section style={styles.drawerSection}>

                    <DrawerItemList {...props}/>

                    </Drawer.Section>
                    
                      <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark}/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="md-exit" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {  signOut()}}
                />
            </Drawer.Section>
        </View>
    );
}



export default function DrawerOrg(props)
{
  const { signOut,updateScreens, toggleTheme } = React.useContext(AuthContext);

 const hidden = [
   <DrawerNav.Screen name="OTPAuth" component={OTPAuthStackScreen}
        
        options={{
          // title: 'OTPAuth',
          // drawerIcon: ({color, size}) => (
          //   <Icon
          //     name="md-checkmark-circle-outline"
          //     size={size}
          //     color={color}
          //   />
          // ),
          gestureEnabled: false,
          drawerLabel: () => null,
                title: null,
                drawerIcon: () => null
        }}
        
        />,
        
        <DrawerNav.Screen name="EditProfile" component={EditProfileScreenStackScreen} 
        
        options={{
          title: 'EditProfile',
          drawerIcon: ({color, size}) => (
            <Icon
              name="md-checkmark-circle-outline"
              size={size}
              color={color}
            />
          ),
          // gestureEnabled: false,
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null
        }}
        />,

        <DrawerNav.Screen name="SearchBar" component={SearchBarStackScreen} 
        
        options={{
          // title: 'SearchBar',
          // drawerIcon: ({color, size}) => (
          //   <Icon
          //     name="md-checkmark-circle-outline"
          //     size={size}
          //     color={color}
          //   />
          // ),
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null
          // gestureEnabled: false,
        }}
        />,

        <DrawerNav.Screen name="ProductList" component={ProductListStackScreen} 
        
        options={{
          // title: 'ProductList',
          // drawerIcon: ({color, size}) => (
          //   <Icon
          //     name="md-checkmark-circle-outline"
          //     size={size}
          //     color={color}
          //   />
          // ),
           drawerLabel: () => null,
          title: null,
          drawerIcon: () => null
          // gestureEnabled: false,
        }}
        />,
 ];

  type.splice(0,0,props.userType);

  if(type[0]=='Customer')
  {
    return(
      <DrawerNav.Navigator initialRouteName="OTPAuth" drawerContentOptions={{ activeBackgroundColor: '#fff', activeTintColor: '#ff788f' }} drawerContent={props => <DrawerContent {...props}/>} >
          {customerItems}
          
      </DrawerNav.Navigator>
    );
  }

  if(type[0]=='Admin')
{
  return(
    <DrawerNav.Navigator initialRouteName="Admin" drawerContentOptions={{ activeBackgroundColor: '#fff', activeTintColor: '#ff788f' }} drawerContent={props => <DrawerContent {...props}/>} >
      {adminItems}
    </DrawerNav.Navigator>
  );
}

if(type[0]=='Dealer')
{
  return(
    <DrawerNav.Navigator initialRouteName="DealerProducts" drawerContentOptions={{ activeBackgroundColor: '#fff', activeTintColor: '#ff788f' }} drawerContent={props => <DrawerContent {...props}/>} >
      {dealerItems}
    </DrawerNav.Navigator>
  );
}
   
}



const styles = StyleSheet.create({
    modalTextInput: {
        height: 40,
        width : 200,
        margin : 15,
        // padding: 5,
        // paddingLeft: 15,
        borderBottomWidth: 1,
        borderColor: 'black',
        borderRadius: 30,
        backgroundColor: 'white',
      textAlign:'center',
 },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 45,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 20,
        elevation: 2
      },
      textStyle: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight:'bold',
        
      },
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    container: {
        flex: 1
      },
      icon: {
        paddingLeft: 10
      },
      iconContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: 80
      },
      container: {
        alignItems: 'center',
    },

    headerContainer: {
        width: '90%',
        marginTop: 40,
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
 icon: {
        height: 35,
        width: 35,
        paddingHorizontal: 10
    },

  });