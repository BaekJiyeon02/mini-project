// SignUpScreen.js
// 회원가입 페이지

import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import { Component, useState, useRef, useAsync } from "react";
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import CustomButton from './CustomButton'; // 커스텀 버튼 가져오기


export default function SignUpScreen() {

    let [Checklist, setChecklist] = useState({
        pwCheck: false,
        pwString: false,
        
        idCheck: false,
        idString: false,
        
        nicknameCheck: false,
        // nicknameString: false,
    });

    const navigation = useNavigation();
    const passwordInput =useRef();
    const passwordCheckInput =useRef();
    const idInput =useRef();

    const [idValue, setId] = useState("");
    const [passwordValue, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [nicknameValue, setNickname] = useState("");

    const apiUrl ='http://43.201.9.115:3000/create-user';

    const apiUrlIdCheck = 'http://43.201.9.115:3000/check-id';
    const apiUrlNicknameCheck = 'http://43.201.9.115:3000/check-nickname';

    const [isLoading, setIsLoading] = useState(false); // 추가: 로딩 스피너를 위한 상태 추가


    // const joinClick = async () => {
    //     await focusOutNickname();
    //     await focusOutId();
    //     await focusOutPw();
        
    //     console.log("여기 실행한다!?!?!",Checklist.idCheck, Checklist.pwCheck, Checklist.nicknameCheck);

    //     if (Checklist.pwCheck && Checklist.idCheck && Checklist.nicknameCheck) {
    //         console.log("여기 실행?!?!");
    //         await doJoin();
    //     }
    // }
//-------------------------------------------------
    // let joinClick = new Promise((resolve, reject) => {
    //     focusOutNickname();
    //     focusOutId();
    //     focusOutPw();
    //     // 우리가 수행한 비동기 작업이 성공한 경우 resolve(...)를 호출하고, 실패한 경우 reject(...)를 호출합니다.
    //     // 이 예제에서는 setTimeout()을 사용해 비동기 코드를 흉내냅니다.
    //     // 실제로는 여기서 XHR이나 HTML5 API를 사용할 것입니다.
    //     setTimeout( function() {
    //       doJoin(); // 와! 문제 없음!
    //     }, 1500)
    //   })

    const delay = (milliseconds) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, milliseconds);
        });
    };
    
    const doJoin=async()=>{
    
        if (Checklist.pwCheck && Checklist.idCheck && Checklist.nicknameCheck) {
            const requestData = {
                userId: idValue,
                userPw: passwordValue,
                nickname: nicknameValue,
            };
    
            setIsLoading(true);
            
            try {
                const response = await axios.post(apiUrl, requestData);
                console.log('전송 성공:', response.data);
                
                if (response.data["message"] === "회원 가입이 완료되었습니다") {
                    Alert.alert(response.data["message"], "=^._.^= ∫");
                    navigation.navigate('Login');
                }
                else if(response.data["property"]==400){
                    Alert.alert(response.data["message"], "입력해주시길 바랍니다.");
                }
            } catch (error) {
                console.error('전송 실패:', error);
            } finally {
                setIsLoading(false);
            }
        }else{

            if(passwordCheck==""){
                Alert.alert("비밀번호 확인을 해주세요");
                passwordCheckInput.current.focus();
            }
            else if(passwordValue!== passwordCheck){
                if(Checklist.pwString==true){
                    Alert.alert("입력하신 비밀번호가 일치하지 않습니다");
                    passwordCheckInput.current.focus();
                }
                Checklist.pwCheck=false;
            }
            console.log(Checklist.idCheck, Checklist.pwCheck, Checklist.nicknameCheck);
        }
    }
    const focusOutNickname=async()=>{

        //닉네임 조건 체크
        // if(!nicknameStringTest()){
        //     return 0;
        // }
        const requestData = {
            nickname: nicknameValue
        }
        // 로딩 상태를 true로 설정하여 로딩 스피너 표시
        setIsLoading(true);
        //await 변경 구간!
        axios.post(apiUrlNicknameCheck, requestData)
        .then(response => {
            console.log('전송 성공:',response.data)
            console.log("out",Checklist.nicknameCheck, response.data["property"]) ;
                if(response.data["property"]===200 && !Checklist.nicknameCheck){
                     Checklist.nicknameCheck=true;
                      console.log("확인하셈!",Checklist.nicknameCheck);
                // console.log(Checklist.nicknameCheck);
                    }
                    if(response.data["property"]==401){
                        Alert.alert("이미 사용 중인 닉네임입니다");
                        Checklist.nicknameCheck=false;
                    }
                    if(response.data["property"]==400){
                        Alert.alert(response.data["message"]);
                        Checklist.nicknameCheck=false;
                    }
                })
            .catch(error => {
                // 요청이 실패한 경우 에러 처리
                console.error('전송 실패:', error);
            }).finally(() => {
                // 요청이 완료되면 로딩 상태를 false로 설정하여 로딩 스피너 제거
                setIsLoading(false);
            });
        }
    const focusOutId = async() => {
        const requestData = {
            userId: idValue
        };
        if(await idStringTest()){
            console.log("먹고자고");
            return 0;
        }
        
        console.log("focusOutId");
        //await 변경구간!
        await axios.post(apiUrlIdCheck, requestData)
        .then(response => {
            console.log('전송 성공:',response.data);
            console.log("뾰잉out",Checklist.idCheck, response.data["property"]) ;
            if(response.data["property"]==200 && !Checklist.idCheck){
                Checklist.idCheck=true; // 원하는 값으로 변경
                console.log(Checklist.idCheck);

            }
            if(response.data["property"]==401){
                Alert.alert("이미 사용 중인 아이디입니다");
                Checklist.idCheck=false;
            }
            if(response.data["property"]==400){
                Alert.alert(response.data["message"]);
                Checklist.idCheck=false;
            }
        })
        .catch(error => {
            // 요청이 실패한 경우 에러 처리
            console.error('전송 실패:', error);
        });        
    };

    const focusOutPw=async()=>{
        if(Checklist.pwString==false){
            pwStringTest(1);
            return 0;
        }
        if(passwordValue !== passwordCheck){
            if(Checklist.pwString==true){
                Alert.alert("입력하신 비밀번호가 일치하지 않습니다");
            }
                Checklist.pwCheck =false; // 원하는 값으로 변경
            }
        else{
            Checklist.pwCheck =true; // 원하는 값으로 변경

        }
    }

    // String 조건 확인 함수

    // password String 조건 확인
    const pwStringTest= (fromAddress) => {

        console.log("야호",passwordValue,/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/g.test(passwordValue),Checklist.pwString);
        
        if((/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$ @$!%*#?&]{8,}$/g.test(passwordValue))){
                Checklist.pwString=true; // 원하는 값으로 변경

        }
        else if(passwordValue!=""){
            if(fromAddress!=1){
                Alert.alert("비밀번호는 8자리 이상의 영문, 숫자, 특수기호의 조합이어야 합니다");

                Checklist.pwString=false; // 원하는 값으로 변경
                passwordInput.current.focus();
        }
        else if(passwordValue==""){
            Checklist.pwString=false; // 원하는 값으로 변경
        }
    }
}

    // id String 조건 확인
    const idStringTest= () => {

        console.log("야호호",idValue,/^(?=.*[a-zA-Z])(?=.*[0-9]).{6,20}$/g.test(idValue),Checklist.idString);
        
        if((/^(?=.*[a-zA-Z])(?=.*[0-9]).{6,20}$/g.test(idValue))){
            Checklist.idString= true; // 원하는 값으로 변경
        }
        else if(idValue!=""){
            Alert.alert("아이디는 6자 이상 영문, 숫자의 조합이여야 합니다");
            Checklist.idString= false; // 원하는 값으로 변경
            idInput.current.focus();
        }
        else if(idValue==""){
            setChecklist((prevChecklist) => ({
                ...prevChecklist,
                idString: false, // 원하는 값으로 변경
            }));
        }
    }

      // nickname String 조건 확인
    //   const nicknameStringTest= () => {

    //     console.log("야호호",nicknameValue,/^(?=.*[a-zA-Z])(?=.*[0-9]).{6,20}$/g.test(nicknameValue),Checklist.nicknameString);
        
    //     if((/^(?=.*[a-zA-Z])(?=.*[0-9]).{6,20}$/g.test(nicknameValue))){
    //         setChecklist((prevChecklist) => ({
    //             ...prevChecklist,
    //             nicknameString: true, // 원하는 값으로 변경
    //           }));
    //     }
    //     else if(nicknameValue!=""){
    //         Alert.alert("아이디는 6자 이상 영문, 숫자의 조합이여야 합니다");
    //         setChecklist((prevChecklist) => ({
    //             ...prevChecklist,
    //             nicknameString: false, // 원하는 값으로 변경
    //         }));
    //         idInput.current.focus();
    //     }
    //     else if(nicknameValue==""){
    //         setChecklist((prevChecklist) => ({
    //             ...prevChecklist,
    //             nicknameString: false, // 원하는 값으로 변경
    //         }));
    //     }
    // }
    
    const handlePress = () => {
        Keyboard.dismiss(); // 키보드를 숨기는 함수
    };

    // 회원가입 완료 함수
    const joinClick = async () => {
        if(passwordValue==""){
            Alert.alert("입력되지 않은 값이 존재합니다", "입력해주시길 바랍니다.");
            console.log("박정재 먹고자고");
            Checklist.pwCheck = false;
    }
        await focusOutNickname();
        await focusOutId();
        await focusOutPw();
        
        // delay for 1500 milliseconds
        console.log("여기 실행한다!?!?!",Checklist.idCheck, Checklist.pwCheck, Checklist.nicknameCheck,Checklist.idString, Checklist.pwString);
        if (Checklist.pwCheck && Checklist.pwString && Checklist.idCheck && Checklist.idString && Checklist.nicknameCheck){
            Alert.alert(                     
                "회원가입을 하시겠습니까?",                   // 첫번째 text: 타이틀 제목            
                '',
                [ // 버튼 배열
                { text: "취소",                 // 버튼 제목          
                  onPress: ()=> console.log("회원가입 취소")},    //onPress 이벤트시 콘솔창에 로그를 찍는다                                     
                { text: "확인",                 //버튼 제목
                  onPress: ()=> doJoin()}       // 이벤트 발생시 함수 실행            
                ]
                );
            }
        };

    // render(){
        return (
            <TouchableWithoutFeedback onPress={handlePress}> 
            <View style={styles.container}>
                <View style={styles.titleArea}>
                <Image
                    style={styles.logoPhoto}
                    source={require('../assets/images/logo.png')}
                />
                </View>
                <View style={styles.formArea}>
                    <TextInput 
                        style={styles.textForm} 
                        placeholder={"ID"}
                        value={idValue}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(text) => setId(text)}
                        onBlur={focusOutId} 
                        ref ={idInput}/> 
                    <TextInput 
                        style={styles.textForm} 
                        placeholder={"PW"}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                        value={passwordValue}
                        onChangeText={(text)=> setPassword(text)}
                        onBlur={pwStringTest}
                        ref={passwordInput}
                        blurOnSubmit={false}
                        onSubmitEditing={()=> Keyboard.dismiss()}/>
                    <TextInput 
                        style={styles.textForm} 
                        placeholder={"PW Check"}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                        value={passwordCheck}
                        onChangeText={(text)=> setPasswordCheck(text)} 
                        onBlur ={focusOutPw}
                        ref={passwordCheckInput}
                        textContentType="oneTimeCode"
                        />
                    <TextInput 
                        style={styles.textForm} 
                        placeholder={"닉네임"}
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={nicknameValue}
                        onChangeText={(text)=> setNickname(text)} 
                        onBlur={focusOutNickname}
                        />

                </View>
                <Text></Text>
                <View style={styles.TailArea}>
                  <View style={styles.buttonArea}>
                    <CustomButton
                        title = '회원가입'
                        buttonColor = '#85BEFE'
                        onPress={joinClick}
                    />
                  </View>
                </View>
            </View>
            </TouchableWithoutFeedback>
        );
    //}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleArea: {        
    },
    formArea: {
    },
    textForm: {
        borderWidth: 0.5,
        borderColor: '#888',
        width: 290,
        height: 45,
        paddingLeft: 20,
        marginTop: 10,
    },
    buttonArea: {
    },
    logoPhoto: {
        width: 150,
        height: 150, 
        justifyContent: 'center',
        marginBottom: 20,
    },
})