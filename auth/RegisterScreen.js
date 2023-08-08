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
import { useNavigation } from '@react-navigation/native';


export default function LoginScreen() {
const [Checklist, setChecklist] = useState({
        pwCheck: false,
        idCheck: false,
        nicknameCheck: false,
      });
const navigation = useNavigation();
    
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [nickname, setNickname] = useState("");

    const apiUrl ='http://43.200.179.53:3000/create-user';

    const apiUrlIdCheck = 'http://43.200.179.53:3000/check-id';
    const apiUrlNicknameCheck = 'http://43.200.179.53:3000/check-nickname';

    const [isLoading, setIsLoading] = useState(false); // 추가: 로딩 스피너를 위한 상태 추가

    const doJoin=()=>{

        console.log("확인요", Checklist.idCheck);
        focusOutId();
        focusOutNickname();

        const requestData = {
            userId: id,
            userPw: password,
            nickname: nickname,
          };

         // API URL 설정
        // Axios를 이용하여 post 요청 보내기
        console.log(Checklist.pwCheck, Checklist.idCheck, Checklist.nicknameCheck);
        if(Checklist.pwCheck==true && Checklist.idCheck==true && Checklist.nicknameCheck ==true){

            setIsLoading(true);
            axios.post(apiUrl, requestData)
            .then(response => {
                // 요청이 성공한 경우 응답 데이터 처리
                console.log('전송 성공:', response.data);
                Alert.alert(                     
                response.data["message"],"=^._.^= ∫");
                if(response.data["success"]===true){
                    navigation.navigate('Login');
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
        else{
            // if(Checklist.nicknameCheck==false){
            //     Alert.alert("이미 사용 중인 닉네임입니다");
            // }
            // else if(Checklist.idCheck==false){
            //     Alert.alert("이미 사용 중인 아이디입니다");
            // }
            // if(Checklist.idCheck!=true){
            //     console.log(Checklist.idCheck);
            //     focusOutId()
            // }
            // if(Checklist.nicknameCheck!=true){
            //     focusOutNikname();
            // }
            if(passwordCheck==""){
                Alert.alert("비밀번호 확인을 해주세요");
            }
            else if(password !== passwordCheck){
                Alert.alert("입력하신 비밀번호가 일치하지 않습니다");
                Checklist.pwCheck=false;
            }
            // else if(password === passwordCheck){
            //     Checklist.pwCheck=true;
            // }
            console.log(Checklist.idCheck, Checklist.pwCheck, Checklist.nicknameCheck);
        }
    }
    const focusOutNickname=async()=>{
        const requestData = {
            nickname: nickname
        }
            console.log("out");
    
            // 로딩 상태를 true로 설정하여 로딩 스피너 표시
            setIsLoading(true);
            axios.post(apiUrlNicknameCheck, requestData)
            .then(response => {
                console.log('전송 성공:',response.data)
                if(response.data["property"]===200 && !Checklist.nicknameCheck)
                    Checklist.nicknameCheck=true;
                    setChecklist((prevChecklist) => ({
                        ...prevChecklist,
                        nicknameCheck: true, // 원하는 값으로 변경
                      }));
                // console.log(Checklist.nicknameCheck);
                    if(response.data["property"]==401){
                        Alert.alert("이미 사용 중인 닉네임입니다");
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
            userId: id
        };
        console.log("focusOutId");
        await axios.post(apiUrlIdCheck, requestData)
        .then(response => {
            console.log('전송 성공:',response.data);
            if(response.data["property"]==200 && !Checklist.idCheck){
                setChecklist((prevChecklist) => ({
                    ...prevChecklist,
                    idCheck: true, // 원하는 값으로 변경
                  }));
                console.log(Checklist.idCheck);
            }
            if(response.data["property"]==401){
                Alert.alert("이미 사용 중인 아이디입니다");
            }   
        })
        .catch(error => {
            // 요청이 실패한 경우 에러 처리
            console.error('전송 실패:', error);
        });        
    };

    const focusOutPw=()=>{

        if(password !== passwordCheck){
            Alert.alert("입력하신 비밀번호가 일치하지 않습니다");
            setChecklist((prevChecklist) => ({
                ...prevChecklist,
                pwCheck: false, // 원하는 값으로 변경
              }));
        }
        else{
            setChecklist((prevChecklist) => ({
                ...prevChecklist,
                pwCheck: true, // 원하는 값으로 변경
              }));
        }
    }

    // render(){
        return (
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
                        value={id}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(text) => setId(text)}
                        onBlur={focusOutId} /> 
                    <TextInput 
                        style={styles.textForm} 
                        placeholder={"PW"}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(text)=> setPassword(text)}/>
                    <TextInput 
                        style={styles.textForm} 
                        placeholder={"PW Check"}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                        value={passwordCheck}
                        onChangeText={(text)=> setPasswordCheck(text)} 
                        onBlur ={focusOutPw}/>
                    <TextInput 
                        style={styles.textForm} 
                        placeholder={"닉네임"}
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={nickname}
                        onChangeText={(text)=> setNickname(text)} 
                        onBlur={focusOutNickname}/>

                </View>
                <View style={styles.TailArea}>
                  <View style={styles.buttonArea}>
                      <TouchableOpacity 
                        style={styles.buttonJoin}
                        onPress={doJoin}>
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
        flex: 1,
        alignItems: 'center',
        //backgroundColor : "blue",
        justifyContent:'flex-end',
        
    },
    title: {
        fontSize: wp('10%'),
    },
    formArea: {
        width: '100%',
        paddingBottom: wp('15%'),
        flex: 0.5,
        //backgroundColor: "green"
    },
    textForm: {
        borderWidth: 0.5,
        borderColor: '#888',
        width: '100%',
        height: hp('5%'),
        paddingLeft: 5,
        paddingRight: 5,
        marginBottom: 10,
    },
    buttonArea: {
        width: '100%',
        height: hp('7%'),
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
      flex:0.9,
      // backgroundColor:"red",
    },
    logoPhoto: {
        width: 200,
        height: 150, 
        marginBottom: 20,

    }
})