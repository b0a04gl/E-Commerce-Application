import React from 'react';
import UserScreen from './UserScreen';

console.disableYellowBox = true;

class Home extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return(
            <UserScreen/>
        );
    }

}

export default Home;