import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
} from 'react-native';
import { useState } from "react";
import axios from 'axios';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function LoginScreen() {
    
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const doLogin=()=>{
        const requestData = {
            userId: id,
            userPw: password,
          };
         // API URL 설정
        const apiUrl = 'http://43.200.179.53:3000/login';

        // Axios를 이용하여 POST 요청 보내기
        axios.post(apiUrl, requestData)
        .then(response => {
            // 요청이 성공한 경우 응답 데이터 처리
            console.log('전송 성공:', response.data);
            Alert.alert(                     
            response.data["message"],                    // 첫번째 text: 타이틀 제목
            "아이디와 비밀번호를 확인 해주세요",                         // 두번째 text: 그 밑에 작은 제목
                [                              // 버튼 배열
            {
                text: "아니요",                              // 버튼 제목
                onPress: () => console.log("아니라는데"),     //onPress 이벤트시 콘솔창에 로그를 찍는다
                style: "cancel"
            },
            { text: "네", onPress: () => console.log("그렇다는데") }, //버튼 제목
                                                                    // 이벤트 발생시 로그를 찍는다
            ],
            { cancelable: false }
            );
        })
        .catch(error => {
            // 요청이 실패한 경우 에러 처리
            console.error('전송 실패:', error);
        });

    }

    // render(){
        return (
            <View style={styles.container}>
                <View style={styles.titleArea}>
                <Image
                    style={styles.logoPhoto}
                    source={require('./assets/images/logo.png')}
                />
                </View>
                <View style={styles.formArea}>
                    <TextInput 
                        style={styles.textForm} 
                        placeholder={"ID"}
                        value={id}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(text) => setId(text)}/>
                    <TextInput 
                        style={styles.textForm} 
                        placeholder={"PW"}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(text)=> setPassword(text)} />

                </View>
                <View style={styles.TailArea}>
                  <View style={styles.buttonArea}>
                      <TouchableOpacity 
                          style={styles.buttonLogin}
                          onPress={doLogin}>
                          <Text style={styles.buttonTitle}>로그인</Text>
                      </TouchableOpacity>
                  </View>
                  <View style={styles.buttonArea}>
                      <TouchableOpacity 
                          style={styles.buttonJoin}
                          onPress={doLogin}>
                          <Text style={styles.buttonTitle}>회원가입</Text>
                      </TouchableOpacity>
                  </View>
                </View>
            </View>
        );
    //}
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