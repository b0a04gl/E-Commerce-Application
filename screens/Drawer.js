import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import AddItems from './AddItems';
import drawerItems from '../constants/drawerItems';
import Home from './HomeScreen';
import {DrawerContent} from './DrawerContent';
import EditableProfileScreen from './EditableProfileScreen';
import ProfileScreen from './ProfileScreen';
import Init from './initScreen';
import BrowseElectronics from './Category/BrowseElectronics';
import BrowseFashion from './Category/BrowseFashion';
import BrowseBeautyPersonalcare from './Category/BrowseBeautyPersonalcare';
import BrowseHomeFurniture from './Category/BrowseHomeFurniture';
import BrowseSportsBooks from './Category/BrowseSportsBooks';
import BrowseToysBaby from './Category/BrowseToysBaby';
import BrowseTVsAppliances from './Category/BrowseTVsAppliances';
import OTPAuth from './OTPAuth';
import Admin from './Admin';
import { StyleSheet, Text, View } from 'react-native';
import ProductList from './ProductList';
import SearchBar from './Components/SearchBar';
import {mocks} from '../constants';

console.disableYellowBox = true;


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const HomeStack = createStackNavigator();
const InitStack = createStackNavigator();

const styles = StyleSheet.create({
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
    }
  });
  

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

const func = () => {
  var temp = ProfileScreen;
  return(

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


      
        <Stack.Screen name="Init" component={temp} options={{
            title:'E-Commerce App',
            // gestureEnabled: false,
        }}/>

    </Stack.Navigator>

  );
}


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
        }}/>

    </Stack.Navigator>
);

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

const EditableProfileScreenStackScreen =({navigation}) =>(
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
        <Stack.Screen name="EditableProfile" component={EditableProfileScreen} options={{
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


const BrowseElectronicsStackScreen =({navigation}) =>(
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
        <Stack.Screen name="BrowseElectronics" component={BrowseElectronics} options={{
            title:'BrowseElectronics',
            headerShown: false,
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

const BrowseFashionStackScreen =({navigation}) =>(
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
        <Stack.Screen name="BrowseFashion" component={BrowseFashion} options={{
            title:'BrowseFashion',
            headerShown: false,
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
// BrowseBeautyPersonalcare

const BrowseBeautyPersonalcareStackScreen =({navigation}) =>(
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
        <Stack.Screen name="BrowseBeautyPersonalcare" component={BrowseBeautyPersonalcare} options={{
            title:'BrowseBeautyPersonalcare',
            headerShown: false,
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
// BrowseHomeFurniture


const BrowseHomeFurnitureStackScreen =({navigation}) =>(
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
        <Stack.Screen name="BrowseHomeFurniture" component={BrowseHomeFurniture} options={{
            title:'BrowseHomeFurniture',
            headerShown: false,
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

// BrowseSportsBooks
const BrowseSportsBooksStackScreen =({navigation}) =>(
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
        <Stack.Screen name="BrowseSportsBooks" component={BrowseSportsBooks} options={{
            title:'BrowseSportsBooks',
            headerShown: false,
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

// BrowseToysBaby

const BrowseToysBabyStackScreen =({navigation}) =>(
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
        <Stack.Screen name="BrowseToysBaby" component={BrowseToysBaby} options={{
            title:'BrowseToysBaby',
            headerShown: false,
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
BrowseTVsAppliances

const BrowseTVsAppliancesStackScreen =({navigation}) =>(
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
        <Stack.Screen name="BrowseTVsAppliances" component={BrowseTVsAppliances} options={{
            title:'BrowseTVsAppliances',
            headerShown: false,
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

export default function DrawerNavigator () {

  const items = [

    

    <Drawer.Screen name="Home" component={HomeStackScreen} 
        
        options={{
          title: 'Home',
          drawerIcon: ({color, size}) => (
            <Icon
              name="ios-arrow-round-back"
              size={size}
              color={color}
            />
          ),
          // gestureEnabled: false,
        }}
        />,


        <Drawer.Screen name="Admin" component={AdminStackScreen} 
        
        options={{
          title: 'Admin',
          drawerIcon: ({color, size}) => (
            <Icon
              name="ios-arrow-round-back"
              size={size}
              color={color}
            />
          ),
          // gestureEnabled: false,
        }}
        
        />,


        <Drawer.Screen name="OTPAuth" component={OTPAuthStackScreen}
        
        options={{
          title: 'OTPAuth',
          drawerIcon: ({color, size}) => (
            <Icon
              name="ios-arrow-round-back"
              size={size}
              color={color}
            />
          ),
          // gestureEnabled: false,
        }}
        
        />,
        <Drawer.Screen name="Profile" component={ProfileScreenStackScreen}
        
        options={{
          title: 'Profile',
          drawerIcon: ({color, size}) => (
            <Icon
              name="ios-arrow-round-back"
              size={size}
              color={color}
            />
          ),
          // gestureEnabled: false,
        }}
        />,
        <Drawer.Screen name="EditableProfile" component={EditableProfileScreenStackScreen} 
        
        options={{
          title: 'EditProfile',
          drawerIcon: ({color, size}) => (
            <Icon
              name="ios-arrow-round-back"
              size={size}
              color={color}
            />
          ),
          // gestureEnabled: false,
        }}
        />,

        <Drawer.Screen name="SearchBar" component={SearchBarStackScreen} 
        
        options={{
          title: 'SearchBar',
          drawerIcon: ({color, size}) => (
            <Icon
              name="ios-arrow-round-back"
              size={size}
              color={color}
            />
          ),
          // gestureEnabled: false,
        }}
        />,

        <Drawer.Screen name="ProductList" component={ProductListStackScreen} 
        
        options={{
          title: 'ProductList',
          drawerIcon: ({color, size}) => (
            <Icon
              name="ios-arrow-round-back"
              size={size}
              color={color}
            />
          ),
          // gestureEnabled: false,
        }}
        />,

        <Drawer.Screen name="BrowseElectronics" component={BrowseElectronicsStackScreen} 
        
        options={{
          title: 'Electronics',
          drawerIcon: ({color, size}) => (
            <Icon
              name="ios-arrow-round-back"
              size={size}
              color={color}
            />
          ),
          // gestureEnabled: false,
        }}
        />,

        <Drawer.Screen name="BrowseFashion" component={BrowseFashionStackScreen} 
        
        options={{
          title: 'Fashion',
          drawerIcon: ({color, size}) => (
            <Icon
              name="ios-arrow-round-back"
              size={size}
              color={color}
            />
          ),
          // gestureEnabled: false,
        }}
        />,


<Drawer.Screen name="BrowseBeautyPersonalcare" component={BrowseBeautyPersonalcareStackScreen} 
        
        options={{
          title: 'Beauty',
          drawerIcon: ({color, size}) => (
            <Icon
              name="ios-arrow-round-back"
              size={size}
              color={color}
            />
          ),
          // gestureEnabled: false,
        }}
        />,

<Drawer.Screen name="BrowseHomeFurniture" component={BrowseHomeFurnitureStackScreen} 
        
        options={{
          title: 'HomeFurn',
          drawerIcon: ({color, size}) => (
            <Icon
              name="ios-arrow-round-back"
              size={size}
              color={color}
            />
          ),
          // gestureEnabled: false,
        }}
        />,
        <Drawer.Screen name="BrowseSportsBooks" component={BrowseSportsBooksStackScreen} 
        options={{
          title: 'Sports',
          drawerIcon: ({color, size}) => (
            <Icon
              name="ios-arrow-round-back"
              size={size}
              color={color}
            />
          ),
          // gestureEnabled: false,
        }}
        
        />,
        <Drawer.Screen name="BrowseToysBaby" component={BrowseToysBabyStackScreen} 
        
        options={{
          title: 'Toys',
          drawerIcon: ({color, size}) => (
            <Icon
              name="ios-arrow-round-back"
              size={size}
              color={color}
            />
          ),
          // gestureEnabled: false,
        }}
        />,
        // <Drawer.Screen name="BrowseTVsAppliances" component={BrowseTVsAppliancesStackScreen}
        
        // options={{
        //   title: 'TVs',
        //   drawerIcon: ({color, size}) => (
        //     <Icon
        //       name="ios-arrow-round-back"
        //       size={size}
        //       color={color}
        //     />
        //   ),
        //   // gestureEnabled: false,
        // }}
        // /> ,

<Drawer.Screen name="Users" component={func} 
        
        options={{

         
          title: 'Users',
          drawerIcon: ({color, size}) => (
            <Icon
              name="home-outline"
              size={size}
              color={color}
            />
            


          ),
          // gestureEnabled: false,

          

        }}
        />

        
  ];

 items.push(
  <Drawer.Screen name="BrowseTVsAppliances" component={BrowseTVsAppliancesStackScreen}
        
  options={{
    title: 'TVs',
    drawerIcon: ({color, size}) => (
      <Icon
        name="ios-arrow-round-back"
        size={size}
        color={color}
      />
    ),
    // gestureEnabled: false,
  }}
  /> 
 )







// function ssh ({navigation}) {
//   return(
    
//       <Stack.Navigator
      
//       screenOptions={{
//           headerStyle: {
//               backgroundColor: '#ec2F4B',
//             },
//             gestureEnabled: false ,
//             headerTintColor: '#fff',
//             headerTitleStyle: {
//               fontWeight: 'bold',
//               alignSelf: 'center'
//             },
//       }}>
    
    
        
//           <Stack.Screen name="Init" component={temp} options={{
//               title:'E-Commerce App',
//               // gestureEnabled: false,
//           }}/>
    
//       </Stack.Navigator>
    
//   );
// }


 //addding item in drawer - creating component (dummy)
 const temp = function HomeScreen({ navigation }) {
  return (
    // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //   <Text>Yebbaaaahhhhh</Text>
    // </View>

<ProductList/>

  );
};

 //add a screen component : stack navigator (which has temp as component)
items.push(
  <Drawer.Screen name="UsersTemp" 
  
  
  component={

    function ssh ({navigation}) {
      return(
        
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
        
        
            
              <Stack.Screen name="AddItems" component={AddItems} options={{
                  title:'AddItems',
                  // gestureEnabled: false,
              }}/>
        
          </Stack.Navigator>
        
      );
    }

  }
        
        options={{

         
          title: 'UsersTemp',
          drawerIcon: ({color, size}) => (
            <Icon
              name="home-outline"
              size={size}
              color={color}
            />
            


          ),
          // gestureEnabled: false,

          

        }}
        />
);

//delete an screen
// items.splice(items.length-1,1);

const n = mocks.names;




    return(

      // <Text>Text inside drawer</Text>

        <NavigationContainer>

      {/* <AddItems/> */}
       {n.map(x => (
    <Text>{"it hasssssssssssss"+x}</Text>
    ))} 
    <Text>{'It hasssssssssss '+n.length}</Text>
        <Drawer.Navigator initialRouteName="Users" drawerContentOptions={{ activeBackgroundColor: '#fff', activeTintColor: '#ff788f' }} drawerContent={props => <DrawerContent {...props}/>} 
        
        >


        
      {items}

        {/* <Drawer.Screen name="Home" component={HomeStackScreen} 
        
        options={{
          title: 'Home',
          drawerIcon: ({color, size}) => (
            <Icon
              name="ios-arrow-round-back"
              size={size}
              color={color}
            />
          ),
          // gestureEnabled: false,
        }}
        /> */}
        {/* <Drawer.Screen name="Admin" component={AdminStackScreen} 
        
        options={{
          title: 'Admin',
          drawerIcon: ({color, size}) => (
            <Icon
              name="ios-arrow-round-back"
              size={size}
              color={color}
            />
          ),
          // gestureEnabled: false,
        }}
        
        /> */}
        {/* <Drawer.Screen name="OTPAuth" component={OTPAuthStackScreen}
        
        options={{
          title: 'OTPAuth',
          drawerIcon: ({color, size}) => (
            <Icon
              name="ios-arrow-round-back"
              size={size}
              color={color}
            />
          ),
          // gestureEnabled: false,
        }}
        
        /> */}
        {/* <Drawer.Screen name="Profile" component={ProfileScreenStackScreen}
        
        options={{
          title: 'Profile',
          drawerIcon: ({color, size}) => (
            <Icon
              name="ios-arrow-round-back"
              size={size}
              color={color}
            />
          ),
          // gestureEnabled: false,
        }}
        /> */}
        {/* <Drawer.Screen name="EditableProfile" component={EditableProfileScreenStackScreen} 
        
        options={{
          title: 'EditProfile',
          drawerIcon: ({color, size}) => (
            <Icon
              name="ios-arrow-round-back"
              size={size}
              color={color}
            />
          ),
          // gestureEnabled: false,
        }}
        /> */}
        {/* <Drawer.Screen name="SearchBar" component={SearchBarStackScreen} 
        
        options={{
          title: 'SearchBar',
          drawerIcon: ({color, size}) => (
            <Icon
              name="ios-arrow-round-back"
              size={size}
              color={color}
            />
          ),
          // gestureEnabled: false,
        }}
        /> */}
        {/* <Drawer.Screen name="ProductList" component={ProductListStackScreen} 
        
        options={{
          title: 'ProductList',
          drawerIcon: ({color, size}) => (
            <Icon
              name="ios-arrow-round-back"
              size={size}
              color={color}
            />
          ),
          // gestureEnabled: false,
        }}
        /> */}
        {/* <Drawer.Screen name="BrowseElectronics" component={BrowseElectronicsStackScreen} 
        
        options={{
          title: 'Electronics',
          drawerIcon: ({color, size}) => (
            <Icon
              name="ios-arrow-round-back"
              size={size}
              color={color}
            />
          ),
          // gestureEnabled: false,
        }}
        /> */}
        {/* <Drawer.Screen name="BrowseFashion" component={BrowseFashionStackScreen} 
        
        options={{
          title: 'Fashion',
          drawerIcon: ({color, size}) => (
            <Icon
              name="ios-arrow-round-back"
              size={size}
              color={color}
            />
          ),
          // gestureEnabled: false,
        }}
        /> */}
        {/* <Drawer.Screen name="BrowseBeautyPersonalcare" component={BrowseBeautyPersonalcareStackScreen} 
        
        options={{
          title: 'Beauty',
          drawerIcon: ({color, size}) => (
            <Icon
              name="ios-arrow-round-back"
              size={size}
              color={color}
            />
          ),
          // gestureEnabled: false,
        }}
        /> */}
        {/* <Drawer.Screen name="BrowseHomeFurniture" component={BrowseHomeFurnitureStackScreen} 
        
        options={{
          title: 'HomeFurn',
          drawerIcon: ({color, size}) => (
            <Icon
              name="ios-arrow-round-back"
              size={size}
              color={color}
            />
          ),
          // gestureEnabled: false,
        }}
        />
        <Drawer.Screen name="BrowseSportsBooks" component={BrowseSportsBooksStackScreen} 
        options={{
          title: 'Sports',
          drawerIcon: ({color, size}) => (
            <Icon
              name="ios-arrow-round-back"
              size={size}
              color={color}
            />
          ),
          // gestureEnabled: false,
        }}
        
        />
        <Drawer.Screen name="BrowseToysBaby" component={BrowseToysBabyStackScreen} 
        
        options={{
          title: 'Toys',
          drawerIcon: ({color, size}) => (
            <Icon
              name="ios-arrow-round-back"
              size={size}
              color={color}
            />
          ),
          // gestureEnabled: false,
        }}
        />
        <Drawer.Screen name="BrowseTVsAppliances" component={BrowseTVsAppliancesStackScreen}
        
        options={{
          title: 'TVs',
          drawerIcon: ({color, size}) => (
            <Icon
              name="ios-arrow-round-back"
              size={size}
              color={color}
            />
          ),
          // gestureEnabled: false,
        }}
        />

<Drawer.Screen name="Users" component={InitStackScreen} 
        
        options={{

         
          title: 'Users',
          drawerIcon: ({color, size}) => (
            <Icon
              name="home-outline"
              size={size}
              color={color}
            />
            


          ),
          gestureEnabled: false,

          

        }}
        /> */}


        </Drawer.Navigator>
        
        </NavigationContainer>
    );
};