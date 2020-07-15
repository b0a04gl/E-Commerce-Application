import React from 'react';
import { TouchableOpacity,StyleSheet, Text, View } from 'react-native';



const styles = StyleSheet.create({
    SubmitButtonStyle1: {
 
        marginTop:275,
        paddingTop:8,
        paddingBottom:15,
        marginLeft:109,
        marginRight:30,
        backgroundColor:'#ec2F4B',
        borderRadius:100,
        width : 145,
        height :35 ,
        borderWidth: 1,
        borderColor: '#fff'
      },
      SubmitButtonStyle2: {
 
        marginTop:40,
        paddingTop:8,
        paddingBottom:15,
        marginLeft:109,
        marginRight:30,
        backgroundColor:'#ec2F4B',
        borderRadius:100,
        width : 145,
        height :35 ,
        borderWidth: 1,
        borderColor: '#fff'
      },

    SubmitButtonStyle3: {
 
        marginTop:40,
        paddingTop:8,
        paddingBottom:15,
        marginLeft:109,
        marginRight:30,
        backgroundColor:'#ec2F4B',
        borderRadius:100,
        width : 145,
        height :35 ,
        borderWidth: 1,
        borderColor: '#fff'
      },
     
      TextStyle:{
          color:'#fff',
          textAlign:'center',
      }
});



class Init extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {

        const { navigate } = this.props.navigation;

        return(
            <View style={{ flex: 1,backgroundColor: '#fff'}}>
            <TouchableOpacity
                    style={styles.SubmitButtonStyle1}
                    activeOpacity = { .5 }
                    onPress={() => navigate('Home')}
                 >
 
            <Text style={styles.TextStyle}> CUSTOMER </Text>
            
            </TouchableOpacity>   

            <TouchableOpacity
                    style={styles.SubmitButtonStyle2}
                    activeOpacity = { .5 }
                   
                 >
 
            <Text style={styles.TextStyle}> ADMIN </Text>
            
            </TouchableOpacity>   


            <TouchableOpacity
                    style={styles.SubmitButtonStyle3}
                    activeOpacity = { .5 }
                   
                 >
 
            <Text style={styles.TextStyle}> DEALER </Text>
            
            </TouchableOpacity>   

            </View>
        );
    }
}

export default Init;