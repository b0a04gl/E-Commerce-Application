import React from 'react';
import { TouchableOpacity,StyleSheet, Text, View } from 'react-native';
import Shibi from './Shibi';


class Home extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return(
            <Shibi/>
        );
    }

}

export default Home;