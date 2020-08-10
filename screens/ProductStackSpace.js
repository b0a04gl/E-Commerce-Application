import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProductList" component={ProductList} />
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
      
    </Stack.Navigator>
  );
}

export default MyStack;