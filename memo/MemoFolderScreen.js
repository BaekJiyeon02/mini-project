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
import AntDesign from '@expo/vector-icons/AntDesign';



export default function MemoFolderScreen({}) {
    const data = [
        { label: '생성순', value: '1' },
        { label: '이름순', value: '2' },

      ];

      const navigation = useNavigation();

    const [folderList, setFolderList] = useState([]);
    const [memoList, setMemoList] = useState([]);
    const [userId, setId] = useState("");
    const [byCreate,setByCreate] =useState(1);
    const [byName,setByName] =useState(0);
    const [memoListHeight, setHeight] = useState(800);
    const [selectedItem, setSelectedItem] = useState(null);
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);



    useEffect(() => {
        AsyncStorage.getItem('userId').then(userId => {
            const parsedUserId = JSON.parse(userId);
            setId(parsedUserId);
            fetchData(parsedUserId);
        });
    }, []);

    const fetchData = async (parsedUserId) => {
        try {
            const requestDataFolder = {
                userId: parsedUserId,
            };
            const requestDataMemo = {
                userId: parsedUserId,
                byCreate: byCreate,
                byName: byName
            };
            const responseFolder = await axios.post('http://43.200.179.53:3000/folder-memo', requestDataFolder);
            setFolderList(responseFolder.data.data);
            const responseMemo = await axios.post('http://43.200.179.53:3000/unfolder-memo', requestDataMemo);
            setMemoList(responseMemo.data.data);
            if(memoList.length>6){
                setHeight(memoListHeight+((800-memoListHeight)*100))
            }
            console.log(memoListHeight);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const moveToFolder = (folderId) => {
        // Your logic here
    }
    const moveToMemo =(memoId)=>{

    }
    const renderLabel = () => {
        if (value || isFocus) {
          return (
            <Text style={[styles.label, isFocus && { color: 'blue' }]}>
              Dropdown label
            </Text>
          );
        }
        return null;
      };

    return (
        <View style={styles.container}>
            <View style={styles.titleArea}>
                <Text style={styles.title}>Memo</Text>
            </View>
            <View style={styles.folderListArea}>
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
          placeholder={!isFocus ? '생성순' : '...'}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
        //   renderLeftIcon={() => (
        //     <Image style={styles.selectButton}
        //             source={require('../assets/icons/memo/Memo_main_sort.png')}/>
        //   )}
        />
            <ScrollView
                horizontal
                contentContainerStyle={styles.scrollViewFolder}
                showsHorizontalScrollIndicator={false}
            >
                {/*폴더 리스트*/}
                {folderList.map((folder, index) => (
                    <TouchableOpacity
                        style={styles.folderButton}
                        onPress={() => moveToFolder(folder.folderId)}
                        key={index}
                    >
                        <View style={styles.folderTitleArea}>
                            <Image
                            style={styles.folderImage}
                            source={require('../assets/icons/memo/Memo_main_folderIcon.png')}
                            /><Text style={styles.folderTitle} numberOfLines={1}>{
                            folder.folderName}</Text></View>
                        <Text style={styles.folderInfo}>메모 {folder.memoCount}개</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.miniButtonArea}>
                <TouchableOpacity style={styles.miniButton}>
                    <Image style={styles.deleteButton}
                    source={require('../assets/icons/memo/Memo_main_delete.png')}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.miniButton}>
                    <Image style={styles.addButton}
                    source={require('../assets/icons/memo/Memo_main_add.png')}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.miniButton}>
                    <Image style={styles.selectButton}
                    source={require('../assets/icons/memo/Memo_main_sort.png')}/>
                </TouchableOpacity>
                </View>
            </View>
            <View style={styles.subseperator}/>
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
        flex:0.1,
        // backgroundColor: "red"
    },
    title: {
        fontSize: 40,
    },
    folderListArea: {
        flexDirection: "row",
        width: '100%',
        flex: 0.35,
        alignItems: 'flex-end',
        justifyContent: 'center',
        // backgroundColor: "green",
        flexDirection: 'column',
    },
    scrollViewFolder: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginBottom: 20,
        height:126,
        // backgroundColor: "blue",
    },
    scrollViewMemo: {
        alignItems: 'center',
        // backgroundColor:"yellow",
        flexDirection: 'collum',
        justifyContent: 'space-between',
    },
    folderButton: {
        backgroundColor: "#EEEEEE",
        width: 170,
        height: 120,
        alignItems: 'flex-start',
        paddingTop: 15,
        borderRadius: 15,
        marginRight: 10,
        paddingLeft:10,
    },
    folderTitleArea: {
        color: '#404040',
        flexDirection: "row",
        width:130,
        alignItems: 'center',
    },
    folderTitle :{
        fontSize:17,
    },
    folderImage : {
        width: 30,
        height : 25,
    },
    folderInfo: {
        marginTop: 10,
        color: '#404040',
    },
    memoListArea: {
        flex: 0.5,
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
        marginBottom:10,
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
    //   borderColor: 'gray',
    //   borderWidth: 0.5,
    //   borderRadius: 8,
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

});