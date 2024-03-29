import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';

import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from 'react-native-dropdown-picker';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Dropdown } from 'react-native-element-dropdown';




export default function MemoFolderScreen({}) {
    const data = [
        { label: '생성순', value: 1 },
        { label: '이름순', value: 0 },
    ];

      const navigation = useNavigation();

    const [folderList, setFolderList] = useState([]);
    const [folderName, setFolderName] = useState("");
    const [memoList, setMemoList] = useState([]);
    const [memoListHeight, setHeight] = useState(0);
    const [userId, setId] = useState("");
    const [folderId, setFolderId] = useState("");
    const [byCreate,setByCreate] =useState(1);
    const [byName,setByName] =useState(0);
    const [selectedItem, setSelectedItem] = useState(null);
    const [value, setValue] = useState({ label: '생성순', value: byCreate });
    const [isFocus, setIsFocus] = useState(false);



    useEffect(() => {

        AsyncStorage.multiGet(['userId', 'folderId']).then(values => {
            const parsedUserId = JSON.parse(values[0][1]);
            const parsedFolderId = JSON.parse(values[1][1]);

            setId(parsedUserId);
            setFolderId(parsedFolderId);
            fetchData(parsedFolderId,byCreate, byName);
        });
    }, []);

    const fetchData = async (parsedFolderId, byCreate, byName) => {
        try {
            const requestDataMemo = {
                folderId: parsedFolderId,
                byCreate: byCreate,
                byName: byName
            };

            const responseMemo = await axios.post('http://43.201.9.115:3000/return-folderMemo', requestDataMemo);
            const memoListData = responseMemo.data;
            console.log(memoListData)

            setFolderName(responseMemo.data["folderName"]);
            setMemoList(responseMemo.data.data);

            if(memoListData.data.length>1){
                setHeight((memoListData.data.length)*120)
            }
            console.log("height",memoListHeight);
            console.log(memoListData.data.length);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const moveToMemo =(memoId)=>{
        console.log(memoId);
        saveId(memoId);
        // Your logic here
        navigation.navigate('MemoFile');
    }
    const saveId=async(memoId,folderId) => {
        try {
            // await AsyncStorage.setItem("userId", JSON.stringify(userId));
            await AsyncStorage.setItem("memoId", JSON.stringify(memoId));

            console.log('메모 아이디 저장 성공'); // 확인용
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleArea}>
                <Text style={styles.title}>MEMO</Text>
            </View>
            <Text style={styles.titleFolderName}>{folderName}</Text>
            <View style={styles.subseperator}/>
            <View style={styles.extraButtonArea}>
            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(selectedValue) => {
                    let create = 0;
                    let name = 0;
                    if (selectedValue["label"] === "이름순") {
                        create = 0;
                        name = 1;
                        setByName(1);
                        setByCreate(0);
                    } 
                    
                    else if (selectedValue["label"] === "생성순") {
                        create = 1;
                        name = 0;
                        setByName(0);
                        setByCreate(1);
                    }

                    fetchData(folderId, create, name);
                    console.log(selectedValue);
                    setValue(selectedValue);
                }}
                />
                </View>
            <View style={styles.memoListArea}>
            <ScrollView
                vertical
                contentContainerStyle={{
                ...styles.scrollViewMemo,
                    height: memoListHeight,}}
                showsHorizontalScrollIndicator={false}
            >
                {/*메모 리스트*/}
                {memoList.map((memo, index) => (
                    <TouchableOpacity
                        style={styles.memoButton}
                        onPress={() => moveToMemo(memo.memoId)}
                        key={index}
                    >
                        <View style={styles.memoTitleArea}>
                            <Image
                            style={styles.memoImage}
                            source={require('../assets/icons/memo/Memo_main_folderIcon.png')}
                            /><Text style={styles.memoTitle}>{
                            memo.memoName}</Text></View>
                            {/*Text 길이제한*/}
                        <Text style={styles.memoInfo} numberOfLines={3}>{memo.content}</Text>
                    </TouchableOpacity>
                ))}

            </ScrollView>
            </View>
            <View style={styles.iconButton}>
                {/** 메인 페이지 (일정) 이동 버튼 */}
                <TouchableOpacity 
                    style={styles.buttonIcon}
                    onPress={() => navigation.navigate('main')}>
                        <Image style={styles.IconImage} 
                               source={require('../assets/icons/Calendar_icon.png')} />
                </TouchableOpacity>
                {/** To-do 리스트 페이지 이동 버튼 */}
                <TouchableOpacity 
                    style={styles.buttonIcon}
                    onPress={() => navigation.navigate('main')}>
                        <Image style={styles.IconImage} 
                               source={require('../assets/icons/Todo_icon.png')} />
                </TouchableOpacity>
                {/** To-do 리스트 페이지 이동 버튼 */}
                <TouchableOpacity 
                    style={styles.buttonIcon}
                    onPress={() => navigation.navigate('main')}>
                        <Image style={styles.IconImage} 
                               source={require('../assets/icons/Memo_icon.png')} />
                </TouchableOpacity>
                {/** 마이페이지 이동 버튼 */}
                <TouchableOpacity 
                    style={styles.buttonIcon}
                    onPress={() => navigation.navigate('main')}>
                        <Image style={styles.IconImage} 
                               source={require('../assets/icons/MyPage_icon.png')} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    titleArea: {
        alignItems: 'center',
        backgroundColor: "white",
        justifyContent: 'center',
        marginBottom: 20,
        flex:0.2,
        // backgroundColor: "red"
    },
    title: {
        fontSize: 40,
    },
    titleFolderName: {

        fontSize: 27,
        margin: 10,
    },
    scrollViewMemo: {
        alignItems: 'center',
        // backgroundColor:"yellow",
        flexDirection: 'collum',
        justifyContent: 'space-between',
    },
    memoListArea: {
        flex: 0.8,
        // backgroundColor: "blue",
    },
    subseperator: {            // 구분자
        height: 1,
        backgroundColor: 'black',
        marginTop: 5,
        margin: 10,
    },
    miniButtonArea:{
        flexDirection: "row"
    },
    miniButton: {
        width: 40,
        height:40,
        // backgroundColor:"red",

    },
    deleteButton :{
        width: 40,
        height:40,
        flex:1,
    },
    
    selectButton :{
        width: 40,
        height:40,
        flex:1,
    },
    
    addButton :{
        width: 40,
        height:40,
        flex:1,
    },
    memoList:{
        backgroundColor:"green",
        flex:1,
        alignItems: 'center',
        
    },
    memoButton: {
        backgroundColor: "#EEEEEE",
        width: 360,
        height: 100,
        alignItems: 'flex-start',
        paddingTop: 15,
        borderRadius: 15,
        marginRight: 10,
        paddingLeft:10,
        marginBottom: 10,

    },
    memoTitleArea: {
        color: '#404040',
        flexDirection: "row",
        width:150,
        alignItems: 'center',
    },
    memoTitle :{
        fontSize:15,
    },
    memoImage : {
        width: 30,
        height : 25,
    },
    memoInfo: {
        marginTop: 7,
        color: '#404040',
        width:335,
        fontSize:13,
    },
    buttonIcon: {

    },
    iconButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    IconImage: {
        width: 55,
        height: 55,
        margin: 12,
    },
     dropdown: {
         height: 70,
         width:100,
         paddingHorizontal: 8,
        },
        icon: {
            marginRight: 5,
        },
        label: {
            position: 'absolute',
            backgroundColor: 'white',
            left: 22,
            top: 8,
            zIndex: 999,
            paddingHorizontal: 8,
            fontSize: 14,
        },
        placeholderStyle: {
            fontSize: 16,
        },
        selectedTextStyle: {
            fontSize: 16,
        },
        iconStyle: {
            width: 20,
            height: 20,
        },
        inputSearchStyle: {
            height: 40,
            fontSize: 16,
        },
        extraButtonArea : {
            alignItems: "flex-end",
            height: 50,      
    },

});