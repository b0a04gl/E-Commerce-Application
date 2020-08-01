import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import CartItem from "./CartItem";

const CartListView = ({ onAddItem, onRemoveItem, cartItems,extraD }) => {
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      data={cartItems}
      extraData= {extraD}
      renderItem={(item) => (
        <CartItem
          key={`${item._id}`}
          data={item}
          onAddItem={onAddItem}
          onRemoveItem={onRemoveItem}
        />
      )}
      keyExtractor={(item) => item._id}
    />
  );
};

export default CartListView;