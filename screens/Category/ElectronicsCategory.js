import React from 'react';
import { TouchableOpacity,StyleSheet, Text, View } from 'react-native';
import ProductList from '../ProductList';
import Browse from './BrowseElectronics';

export default class ElectronicsCategory extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        const { navigation } = this.props;
        return(
            <ProductList />
        );
    }

}





