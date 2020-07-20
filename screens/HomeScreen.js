import React from 'react';
import UserScreen from './UserScreen';

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