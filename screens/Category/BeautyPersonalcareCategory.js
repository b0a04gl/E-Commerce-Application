import React from 'react';
import { TouchableOpacity,StyleSheet, Text, View } from 'react-native';

import ProductList from '../ProductList';

export default class BeautyPersonalcare extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return(
            <ProductList/>
        );
    }

}
