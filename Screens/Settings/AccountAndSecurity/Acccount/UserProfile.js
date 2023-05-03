import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Dimensions, FlatList, Alert, Image, ActivityIndicator, TouchableWithoutFeedback, Platform, TouchableHighlight, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionic from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Dialog from "react-native-dialog"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import DateTime from '../../../../controllers/DateTime'

const width = Dimensions.get('window').width

const UserProfile = () => {
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
    const navigation = useNavigation()
    const [objectCurrent, setObjectCurrent] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [isOpen, setOpen] = useState(false)
    const [options, setOptions] = useState(optionArr)
    const [flagDialogUpdate, setFlagDialogUpdate] = useState(false)
    const url = 'http://192.168.1.14:3000/api/v1'
    const updateUserNameAPI = '/handle-update-user-name'
    const updateBioAPI = '/handle-update-bio'
    const updateGenderAPI = '/handle-update-gender'
    const updateDOBAPI = '/handle-update-dob'
    const findUserByIDAPI = '/find-user-by-id'
    const flagUserName = 0, flagBio = 1, flagGender = 2
    const genders = [
        { value: 0, label: 'Nữ' },
        { value: 1, label: 'Nam' }
    ]
    const [flag, setFlag] = useState(10)
    const [userNameUpdate, setUserNameUpdate] = useState('')
    const [bioUpdate, setBioUpdate] = useState('')
    const [genderUpdate, setGenderUpdate] = useState(0)

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
                setUserNameUpdate(objectCurrent.userName)
                setBioUpdate(objectCurrent.bio)
                setGenderUpdate(objectCurrent.gender)
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

    const handleUpdateDOBUser = async (date) => {
        setOpen(false)

        const formattedDate = DateTime.formatDateTime(date)
        const timeCurrent = DateTime.getTimeCurrent()

        console.log(
            `
            \n>>>>> Check date user update: ${formattedDate}\n>>>>> Check date time current: ${timeCurrent}\n
            `
        )

        const newObject = {
            dob: formattedDate,
            timeCurrent: timeCurrent,
            idUser: objectCurrent.id
        }

        const urlUpdateDOB = `${url}${updateDOBAPI}`
        fetch(urlUpdateDOB, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newObject)
        })
            .then((res) => {
                const code = res.status

                if (code != 200) {
                    Alert.alert('Opps', 'Cập nhật ngày sinh không thành công!')
                    return false
                }

                Alert.alert('Thành công', 'Cập nhật ngày sinh thành công!')

                return res.json()
            })
            .catch((err) => {
                Alert.alert('Opps', err.message)
            })
            .finally(async () => {
                clearAsyncStorage()
                try {
                    const newURL = `${url}${findUserByIDAPI}/${objectCurrent.id}`
                    const res = await fetch(newURL)
                    const json = await res.json()
                    storeData(json)

                    console.log(
                        `
                        \n>>>>> Message: Update async storage successful!\n
                        `
                    )

                    getObjectCurrent()
                } catch (err) {
                    console.log(err.message)
                }
            })
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

    const handleUpdateUserName = async () => {
        if (!userNameUpdate) {
            Alert.alert('Opps', 'Vui lòng điền đầy đủ thông tin!')
            return false
        } if (userNameUpdate == objectCurrent.userName) {
            Alert.alert('Opps', 'Tên đăng nhập không thay đổi!')
            return false
        }

        const newObject = {
            userName: userNameUpdate,
            currentTime: DateTime.getTimeCurrent(),
            idUser: objectCurrent.id
        }
        const urlUpdateUserName = `${url}${updateUserNameAPI}`
        fetch(urlUpdateUserName, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newObject)
        })
            .then((res) => {
                const code = res.status

                if (code != 200) {
                    Alert.alert('Opps', 'Cập nhật tên đăng nhập không thành công!')
                    return false
                }

                Alert.alert('Opps', 'Cập nhật tên đăng nhập thành công!')

                return res.json()
            })
            .catch((err) => {
                Alert.alert('Opps', err.message)
            })
            .finally(async () => {
                clearAsyncStorage()
                try {
                    const newURL = `${url}${findUserByIDAPI}/${objectCurrent.id}`
                    const res = await fetch(newURL)
                    const json = await res.json()
                    storeData(json)

                    console.log(
                        `
                        \n>>>>> Message: Update async storage successful!\n
                        `
                    )

                    getObjectCurrent()
                } catch (err) {
                    console.log(err.message)
                }
            })
    }

    const handleUpdateBio = async () => {
        if (!bioUpdate) {
            Alert.alert('Opps', 'Vui lòng điền đầy đủ thông tin!')
            return false
        } if (bioUpdate == objectCurrent.bio) {
            Alert.alert('Opps', 'Bio không thay đổi!')
            return false
        }

        const newObject = {
            bio: bioUpdate,
            updated_at: DateTime.getTimeCurrent(),
            idUser: objectCurrent.id
        }
        const urlUpdateBio = `${url}${updateBioAPI}`
        fetch(urlUpdateBio, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newObject)
        })
            .then((res) => {
                const code = res.status

                if (code != 200) {
                    Alert.alert('Opps', 'Cập nhật bio không thành công!')
                    return false
                }

                Alert.alert('Thành công', 'Cập nhật bio thành công')
                return res.json()
            })
            .catch((err) => {
                Alert.alert('Opps', '')
            })
    }

    const handleUpdateGender = async () => { }

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
    }
})