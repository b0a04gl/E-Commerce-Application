import React from 'react';
import { TouchableOpacity,StyleSheet, Text, View } from 'react-native';



class Home extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return(
            <View  style={{flex:1,justifyContent: "center",alignItems: "center"}}>
                <Text >Home UI</Text>
            </View>
        );
    }

}

export default Home;