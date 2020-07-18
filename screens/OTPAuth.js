import * as React from "react";
import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity, Platform ,Alert} from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import * as firebase from "firebase";
import Form from 'react-native-form';


export default function App({navigation}) {

    const [enterCode, setEnterCode] = React.useState(false);
    const country = {
    cca2: 'IND',
    callingCode: '91'
  }
  
  const recaptchaVerifier = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState();
  const firebaseConfig = firebase.apps.length ? firebase.app().options : {
        "apiKey": "AIzaSyDXts_z81jdPnBThNwrC-rEdwESyg89K_E",
        "authDomain": "e-commerce-b1423.firebaseapp.com",
        "databaseURL":  "https://e-commerce-b1423.firebaseio.com",
        "projectId": "e-commerce-b1423",
        "storageBucket": "e-commerce-b1423.appspot.com",
        "messagingSenderId": "828771404482",
        "appId": "1:828771404482:web:4d8d2bd1ef23c009c1095b",
        "measurementId": "G-XHNS2RLH33"
      };
      // firebase.initializeApp(firebaseConfig)  
  // const check = firebase.apps.length ? firebase.initializeApp(firebaseConfig);
  const [message, showMessage] = React.useState((!firebaseConfig || Platform.OS === 'web')
    ? { text: "To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device."}
    : undefined);


    setTimeout(() => {
      if (!firebase.apps.length) {
          try {
              firebase.initializeApp(firebaseConfig)
          } catch (err) {
              console.log(err)
          }
      }

  }, 100)


  let headerText = `What's your ${enterCode ? 'verification code' : 'phone number'}?`
  let buttonText = enterCode ? 'Verify confirmation code' : 'Send confirmation code';
  let textStyle = enterCode ? {
    height: 50,
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    // fontFamily: 'Courier'
  } : {};
  
// firebase.initializeApp(firebaseConfig);
  return (
   

    
    <View style={styles.container}>

      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />

    <Text style={styles.header}>{headerText}</Text>

    <Form  style={styles.form}>

    {enterCode==false?
    
      <View>

            <View style={{ flexDirection: 'row' }}>



            <TextInput
            style = {styles.textInput}
                name={'phoneNumber' }
                type={'TextInput'}
                underlineColorAndroid={'transparent'}
                autoCapitalize={'none'}
                autoCorrect={false}
                onChangeText={setPhoneNumber}
                placeholder={enterCode ? '_ _ _ _ _ _' : 'Phone Number'}
                keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'phone-pad'}
                style={[ styles.textInput, textStyle ]}
                returnKeyType='go'
                autoFocus
                placeholderTextColor={'#000000'}
                selectionColor={'#fff'}
                maxLength={enterCode ? 6 : 20}
            />

        </View>

        <TouchableOpacity style={styles.button} 



        onPress={async () => {
        // The FirebaseRecaptchaVerifierModal ref implements the
        // FirebaseAuthApplicationVerifier interface and can be
        // passed directly to `verifyPhoneNumber`.
        if(enterCode==false)
        {
        try {
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            const verificationId = await phoneProvider.verifyPhoneNumber(
            phoneNumber,
            recaptchaVerifier.current
            );
            setVerificationId(verificationId);
            showMessage({
            text: "Verification code has been sent to your phone.",
            });
            Alert.alert("Verification code has been sent to your phone.");
            setEnterCode(true);
        } catch (err) {
            showMessage({ text: `Error: ${err.message}`, color: "red" });
        }
        }
        }}
        >
            <Text style={styles.buttonText}>{ buttonText }</Text>
        </TouchableOpacity>


      </View>
      
      
      
      : null
  }
        
      
      {
        enterCode ?
        
        <View>

            <View style={{ flexDirection: 'row' }}>



            <TextInput
                style = {styles.textInput}
                name={'code'  }
                type={'TextInput'}
                underlineColorAndroid={'transparent'}
                autoCapitalize={'none'}
                autoCorrect={false}
                onChangeText={setVerificationCode}
                placeholder={enterCode ? '_ _ _ _ _ _' : 'Phone Number'}
                keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
                style={[ styles.textInput, textStyle ]}
                returnKeyType='go'
                autoFocus
                placeholderTextColor={'#000000'}
                selectionColor={'#fff'}
                maxLength={enterCode ? 6 : 20}
            />

            </View>

            <TouchableOpacity style={styles.button} 
                onPress={async () => {
                if(enterCode)
                {
                try {
                const credential = firebase.auth.PhoneAuthProvider.credential(
                    verificationId,
                    verificationCode
                );
                await firebase.auth().signInWithCredential(credential);
                showMessage({ text: "Phone authentication successful 👍" });
                Alert.alert( "Phone authentication successful 👍" );
                setEnterCode(false);
                navigation.navigate("Home");
                } catch (err) {
                showMessage({ text: `Error: ${err.message}`, color: "red" });
                }
                }}
             }
            >
            <Text style={styles.buttonText}>{ buttonText }</Text>
            </TouchableOpacity>

            </View>

        : null

      }

    </Form>

    
  </View>

     
  
  );
}
const brandColor = '#744BAC';

const styles = StyleSheet.create({
  countryPicker: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1
  },
  header: {
    textAlign: 'center',
    marginTop: 60,
    fontSize: 22,
    margin: 20,
    color: '#4A4A4A',
  },
  form: {
    margin: 20
  },
  textInput: {
    padding: 0,
    margin: 0,
    flex: 1,
    
    color: '#000000',
    height: 50,
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    height: 50,
    backgroundColor: '#ec2F4B',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    // fontFamily: 'Helvetica',
    fontSize: 16,
    fontWeight: 'bold'
  },
  wrongNumberText: {
    margin: 10,
    fontSize: 14,
    textAlign: 'center'
  },
  disclaimerText: {
    marginTop: 30,
    fontSize: 12,
    color: 'grey'
  },
  callingCodeView: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  callingCodeText: {
    fontSize: 20,
    color: brandColor,
    // fontFamily: 'Helvetica',
    fontWeight: 'bold',
    paddingRight: 10
  }
});