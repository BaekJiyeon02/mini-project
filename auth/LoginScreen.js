import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class LoginScreen extends React.Component{
    
    static navigationOptions = {
        header: null,
    };

    _doLogin(){
        // do something
        this.props.navigation.replace('TabNavigator')
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.titleArea}>
                <Image
                    style={styles.logoPhoto}
                    source={require('../assets/images/hcwr.png')}
                />
                </View>
                <View style={styles.formArea}>
                    <TextInput 
                        style={styles.textForm} 
                        placeholder={"ID"}/>
                    <TextInput 
                        style={styles.textForm} 
                        placeholder={"PW"}
                        secureTextEntry={true} />

                </View>
                <View style={styles.TailArea}>
                  <View style={styles.buttonArea}>
                      <TouchableOpacity 
                          style={styles.buttonLogin}
                          onPress={this._doLogin.bind(this)}>
                          <Text style={styles.buttonTitle}>로그인</Text>
                      </TouchableOpacity>
                  </View>
                  <View style={styles.buttonArea}>
                      <TouchableOpacity 
                          style={styles.buttonJoin}
                          onPress={this._doLogin.bind(this)}>
                          <Text style={styles.buttonTitle}>회원가입</Text>
                      </TouchableOpacity>
                  </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: wp('10%'),
        paddingRight: wp('10%'),
        justifyContent: 'center',
    },
    titleArea: {
        // width: '100%',
        // padding: wp('10%'),
        flex: 0.8,
        alignItems: 'center',
        //backgroundColor : "blue",
        justifyContent:'flex-end',
        
    },
    title: {
        fontSize: wp('10%'),
    },
    formArea: {
        width: '100%',
        paddingBottom: wp('10%'),
        flex: 0.2,
        //backgroundColor: "green"
    },
    textForm: {
        borderWidth: 0.5,
        borderColor: '#888',
        width: '100%',
        height: hp('5%'),
        paddingLeft: 5,
        paddingRight: 5,
        marginBottom: 5,
    },
    buttonArea: {
        width: '100%',
        height: hp('7%'),
    },
    buttonLogin: {
        backgroundColor: "#90bad1",
        width: "100%",
        height: "80%",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
  
      buttonJoin: {
        backgroundColor: "#90b2d1",
        width: "100%",
        height: "80%",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonTitle: {
        color: 'white',
    },
    TailArea:{
      flex:1,
      // backgroundColor:"red",
    },
    logoPhoto: {
        width: 200,
        height: 150, 
        marginBottom: 20,

    }
})