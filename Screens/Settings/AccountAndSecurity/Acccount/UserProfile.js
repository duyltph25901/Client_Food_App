import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Dimensions, FlatList, Alert, Image, ActivityIndicator, TouchableWithoutFeedback, Platform, TouchableHighlight, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionic from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Dialog from "react-native-dialog"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import DropDownPicker from 'react-native-dropdown-picker'
import DateTime from '../../../../controllers/FormatData'

const width = Dimensions.get('window').width

const UserProfile = () => {
    // api 
    const url = 'http://192.168.1.14:3000/api/v1'
    const updateAPI = '/handle-update-user-info'
    const findUserByIDAPI = '/find-user-by-id'
    // array
    const genders = [
        { value: 0, label: 'Nữ' },
        { value: 1, label: 'Nam' }
    ]
    const optionArr = [
        {
            id: 0,
            name: 'Tên'
        },
        {
            id: 1,
            name: 'Bio'
        },
        {
            id: 2,
            name: 'Giới tính'
        },
        {
            id: 3,
            name: 'Ngày sinh'
        },
    ]
    // navigation
    const navigation = useNavigation()
    // state
    const [objectCurrent, setObjectCurrent] = useState({}) // get object from async storage
    const [isLoading, setLoading] = useState(true) // show activity indicator
    const [isOpen, setOpen] = useState(false) // show date time picker dialog
    const [options, setOptions] = useState(optionArr) // data flatlist
    const [flagDialogUpdate, setFlagDialogUpdate] = useState(false) // show dialog update information
    const [flag, setFlag] = useState(10) // value check category dialog (ex: dialog update user name or dialog update bio...)
    const [items, setItem] = useState(genders) // data genders 
    const [isOpenDropDownPicker, setOpenDropDownPicker] = useState(false) // check status dropdown picker
    const [userNameUpdate, setUserNameUpdate] = useState('') // value input user name update default
    const [bioUpdate, setBioUpdate] = useState('') // value input bio update default
    const [genderUpdate, setGenderUpdate] = useState(0) // value input gender update default
    // flag 
    const flagUserName = 0, flagBio = 1, flagGender = 2, flagDOB = 3

    useEffect(() => {
        getObjectCurrent()
    }, [])

    const back = () => {
        navigation.goBack()
    }

    const getObjectCurrent = async () => {
        try {
            const value = await AsyncStorage.getItem('ObjectCurrent')
            if (value !== null) {
                console.log(
                    `
                    \n>>>>> Check user current from async storage: ${JSON.stringify(objectCurrent)}\n
                    `
                )
                setObjectCurrent(JSON.parse(value))
                // setUserNameUpdate(objectCurrent.userName)
                // setBioUpdate(objectCurrent.bio)
                // setGenderUpdate(objectCurrent.gender)
            }
        } catch (e) {
            console.log(
                `
                \n>>>>> Message get user from async storage: ${e}\n
                `
            )
        } finally {
            setLoading(false)
        }
    }

    const clearAsyncStorage = async () => {
        try {
            await AsyncStorage.clear()
            console.log('\n>>>>> Message: AsyncStorage cleared\n');
        } catch (error) {
            console.error(`
                \n>>>>> Message: ${error}\n
            `)
        }
    }

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('ObjectCurrent', jsonValue)

            console.log(`\n>>>>> Message: Save object current by async storage successful!\n`)
        } catch (e) {
            console.log(`\n>>>>> Message: ${e}!\n`)
        }
    }

    const showDialogUpdate = (flag, item) => {
        if (flag == flagUserName || flag == flagBio || flag == flagGender) {
            setFlagDialogUpdate(true)
        } else {
            setOpen(true)
        }
    }

    const handleUpdateUser = async () => {
        setFlagDialogUpdate(false)
        switch (flag) {
            case flagUserName: {
                handleUpdateUserName()
                break
            } case flagBio: {
                handleUpdateBio()
                break
            } case flagGender: {
                handleUpdateGender()
                break
            } default: {
                break
            }
        }
    }

    const handleUpdateDOBUser = async (date) => {
        setOpen(false)

        const formattedDate = DateTime.formatDateTime(date)

        handleUpdateInformationUser(formattedDate, flagDOB)
    }

    const handleUpdateUserName = async () => {
        if (!userNameUpdate) {
            Alert.alert('Opps', 'Vui lòng điền đầy đủ thông tin!')
            return false
        } if (userNameUpdate == objectCurrent.userName) {
            Alert.alert('Opps', 'Tên đăng nhập không thay đổi!')
            return false
        }

        handleUpdateInformationUser(userNameUpdate, flagUserName)
    }

    const handleUpdateBio = async () => {
        if (!bioUpdate) {
            Alert.alert('Opps', 'Vui lòng điền đầy đủ thông tin!')
            return false
        } if (bioUpdate == objectCurrent.bio) {
            Alert.alert('Opps', 'Bio không thay đổi!')
            return false
        }

        handleUpdateInformationUser(bioUpdate, flagBio)
    }

    const handleUpdateGender = async () => {
        if (genderUpdate == objectCurrent.gender) {
            Alert.alert('Opps', 'Giới tính không thay đổi!')
            return
        }

        handleUpdateInformationUser(genderUpdate, flagGender)
    }

    const handleUpdateInformationUser = async (valueUpdate, flagUpdateType) => {
        const messageSuccess = (flag == flagBio)
            ? 'Cập nhật bio thành công!'
            : (flag == flagUserName ? 'Cập nhật tên đăng nhập thành công!'
                : (flag == flagGender) ? 'Cập nhật giới tính thành công!' : 'Cập nhật ngày sinh thành công!')
        const messageFail = (flag == flagBio)
            ? 'Cập nhật bio không thành công!'
            : (
                (flag == flagUserName)
                    ? 'Cập nhật tên đăng nhập không thành công!'
                    : (
                        (flag == flagGender) ? 'Cập nhật giới tính không thành công!' : 'Cập nhật ngày sinh không thành công!'
                    )
            )
        const urlUpdate = `${url}${updateAPI}`
        const newObject = {
            fieldUpdateValue: valueUpdate,
            updated_at: DateTime.getTimeCurrent(),
            idUser: objectCurrent.id,
            flag: flagUpdateType
        }
        fetch(urlUpdate, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newObject)
        })
            .then((res) => {
                const code = res.status

                if (code != 200) {
                    Alert.alert('Opps', messageFail)
                    return
                }

                Alert.alert('Thành công', messageSuccess)

                return res.json()
            })
            .catch((err) => {
                Alert.alert('Opps', err.message)
            })
            .finally(() => {
                loadDataAfterUpdate()
                clearInput()
            })
    }

    const loadDataAfterUpdate = async () => {
        clearAsyncStorage()
        try {
            // handle add new value storage
            const newURL = `${url}${findUserByIDAPI}/${objectCurrent.id}`
            const res = await fetch(newURL)
            const json = await res.json()
            storeData(json)

            console.log(
                `
                        \n>>>>> Message: Update async storage successful!\n
                        `
            )

            // change value ui
            getObjectCurrent()
        } catch (err) {
            console.log(err.message)
        }
    }

    const clearInput = () => {
        setUserNameUpdate('')
        setBioUpdate('')
        setGenderUpdate(0)
    }

    return (
        <SafeAreaView style={styles.container}>
            {
                isLoading
                    ? (
                        <ActivityIndicator />
                    )
                    : (
                        <TouchableWithoutFeedback onPress={() => {
                            setShowPicker(false)
                        }}>
                            <>
                                <View style={styles.containerHeader}>
                                    <TouchableOpacity onPress={back}>
                                        <Ionic name='chevron-back-outline' size={30} color={'#EEA743'} />
                                    </TouchableOpacity>
                                    <Text style={styles.textTitle}>Sửa hồ sơ</Text>
                                </View>
                                <View style={styles.body}>
                                    <TouchableOpacity>
                                        {
                                            isLoading
                                                ? (
                                                    <ActivityIndicator />
                                                )
                                                : (
                                                    <Image style={styles.imageUser}
                                                        source={{ uri: objectCurrent.image }} />
                                                )
                                        }
                                    </TouchableOpacity>

                                    <FlatList style={styles.list}
                                        scrollEnabled={false}
                                        data={options}
                                        keyExtractor={(item, index) => item.id}
                                        renderItem={({ item }) => {
                                            return (
                                                <TouchableOpacity style={styles.containerItem}
                                                    onPress={() => {
                                                        showDialogUpdate(item.id, item)
                                                        setFlag(item.id)
                                                    }}>
                                                    <Text style={styles.textItem}>{item.name}</Text>
                                                    {
                                                        item.id == 0 && (
                                                            <>
                                                                <Text style={styles.textItemValue}>{objectCurrent.userName}</Text>
                                                            </>
                                                        )
                                                    }
                                                    {
                                                        item.id == 1 && (
                                                            <>
                                                                <Text style={styles.textItemValue}>{
                                                                    String(objectCurrent.bio).length >= 15 ? String(objectCurrent.bio).slice(0, 15) : String(objectCurrent.bio)
                                                                }</Text>
                                                            </>
                                                        )
                                                    }
                                                    {
                                                        item.id == 2 && (
                                                            <>
                                                                <Text style={styles.textItemValue}>{
                                                                    objectCurrent.gender == 0 ? 'Nữ' : 'Nam'
                                                                }</Text>
                                                            </>
                                                        )
                                                    }
                                                    {
                                                        item.id == 3 && (
                                                            <>
                                                                <Text style={styles.textItemValue}>{objectCurrent.dob}</Text>
                                                            </>
                                                        )
                                                    }
                                                    <Ionic name='chevron-forward-outline' size={20} color={'#EEA743'} />
                                                </TouchableOpacity>
                                            )
                                        }} />
                                </View>
                            </>
                        </TouchableWithoutFeedback>
                    )
            }
            {
                flagDialogUpdate && (
                    <Dialog.Container visible={true}>
                        <Dialog.Title>
                            {
                                (flag == flagGender
                                    ? 'Cập nhật giới tính'
                                    : (flag == flagBio ? 'Cập nhật Bio' : 'Cập nhật tên người dùng'))
                            }
                        </Dialog.Title>
                        {
                            (flag == flagUserName) && (
                                <TextInput value={userNameUpdate}
                                    onChangeText={(text) => setUserNameUpdate(text)}
                                    style={styles.textInput}
                                    placeholder='Tên của bạn' />
                            )
                        }
                        {
                            (flag == flagBio) && (
                                <TextInput value={bioUpdate}
                                    onChangeText={(text) => setBioUpdate(text)}
                                    style={styles.textInput}
                                    placeholder='Mô tả về bạn' />
                            )
                        }
                        {
                            (flag == flagGender) && (
                                <DropDownPicker
                                    schema={{
                                        label: 'label',
                                        value: 'value'
                                    }}
                                    open={isOpenDropDownPicker}
                                    value={genderUpdate}
                                    items={items}
                                    setOpen={setOpenDropDownPicker}
                                    setValue={setGenderUpdate}
                                    setItems={setItem}
                                    style={styles.dropDownPicker}
                                />
                            )
                        }
                        <Dialog.Button label="Hủy" onPress={() => setFlagDialogUpdate(false)} />
                        <Dialog.Button label="Cập nhật" onPress={handleUpdateUser} />
                    </Dialog.Container>
                )
            }
            {
                isOpen && (
                    <DateTimePickerModal
                        isDarkModeEnabled={false}
                        isVisible={isOpen}
                        textColor='black'
                        mode="date"
                        datePickerModeAndroid={'spinner'}
                        onConfirm={handleUpdateDOBUser}
                        onCancel={() => { setOpen(false) }}
                    />
                )
            }

        </SafeAreaView>
    )
}

export default UserProfile

const styles = StyleSheet.create({
    container: {
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    containerHeader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 12
    },
    textTitle: {
        fontSize: 24,
        fontWeight: '300',
        flex: 1,
        textAlign: 'center'
    },
    body: {
        flex: 9,
        alignItems: 'center',
        backgroundColor: '#EEEBF6',
        width: width,
        padding: 12
    },
    imageUser: {
        height: 100,
        width: 100,
        borderWidth: 3,
        borderColor: '#EEA743',
        borderRadius: 100
    },
    list: {
        flex: 1,
        width: width,
        marginTop: 20,
    },
    containerItem: {
        width: width,
        backgroundColor: 'white',
        borderBottomColor: '#DDDDDD',
        borderTopColor: 'white',
        borderStartColor: 'white',
        borderEndColor: 'white',
        borderWidth: 1,
        paddingVertical: 21,
        paddingHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textItem: {
        fontSize: 14,
        flex: 1,
    },
    textItemValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
        marginEnd: 10
    },
    textInput: {
        height: 60,
        borderWidth: 1,
        borderColor: 'white',
        marginHorizontal: 21,
        marginVertical: 12,
        borderRadius: 12,
        paddingHorizontal: 12,
        fontSize: 14,
        color: 'white'
    },
    dropDownPicker: {
        marginVertical: 30,
        width: width - 200,
        alignSelf: 'center'
    }
})