import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Dimensions, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionic from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import validate from '../../../../controllers/Validate'

const width = Dimensions.get('window').width

const PhoneNumber = () => {

    const navigation = useNavigation()
    const [objectCurrent, setObjectCurrent] = useState({})
    const [phoneNumber, setPhoneNumber] = useState('')
    const url = 'http://192.168.1.14:3000/api/v1'
    const updatePhoneNumberAPI = '/handle-update-phone-number-user'
    const findUserByIDAPI = '/find-user-by-id'

    const back = () => {
        navigation.goBack()
    }

    useEffect(() => {
        getObjectCurrent()
    }, [])

    const handleUpdatePhoneNumber = async () => {
        // validate
        if (!phoneNumber) {
            Alert.alert('Opps', 'Bạn phải nhập vào số điện thoại!')
            return false
        } if (!validate.validatePhoneNumber(phoneNumber)) {
            Alert.alert('Opps', 'Số điện thoại không hợp lệ!')
            return false
        } if (phoneNumber == objectCurrent.phoneNumber) {
            Alert.alert('Opps', 'Số điện thoại không có gì thay đổi!')
            return false
        }

        const object = {
            phoneNumber: phoneNumber,
            idUser: objectCurrent.id
        }

        const newUrl = `${url}${updatePhoneNumberAPI}`

        fetch(newUrl, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        })
            .then((res) => {
                const code = res.status

                console.log(
                    `
                    \n>>>>> Check code update phone number: ${code}\n
                    `
                )

                if (code == 405) {
                    Alert.alert('Opps', 'Số điện thoại đã được đăng kí trước đó!')
                    return false
                } if (code == 200) {
                    Alert.alert('Thành công', 'Cập nhật số điện thoại thành công!')
                }

                return res.json()
            })
            .catch((err) => {
                Alert.alert('Opps', err.message)
                console.log(
                    `
                    \n>>>>> Message error update phone number: ${err.message}\n
                    `
                )
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
                } catch (err) {
                    console.log(err.message)
                }
            })
    }


    const getObjectCurrent = async (req, res) => {
        try {
            const value = await AsyncStorage.getItem('ObjectCurrent')
            if (value !== null) {
                console.log(
                    `
                    \n>>>>> Check user current from async storage: ${JSON.stringify(objectCurrent)}\n
                    `
                )
                setObjectCurrent(JSON.parse(value))
                setPhoneNumber(JSON.parse(value).phoneNumber)
            }
        } catch (e) {
            console.log(
                `
                \n>>>>> Message get user from async storage: ${e}\n
                `
            )
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

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerHeader}>
                <TouchableOpacity onPress={back}>
                    <Ionic name='chevron-back-outline' size={30} color={'#EEA743'} />
                </TouchableOpacity>
                <Text style={styles.textTitle}>Cập nhật điện thoại</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.containerInput}>
                    <TextInput style={styles.textInput}
                        keyboardType='phone-pad'
                        placeholder='Số điện thoại'
                        value={phoneNumber}
                        onChangeText={(text) => setPhoneNumber(text)} />
                    <TouchableOpacity onPress={handleUpdatePhoneNumber}>
                        <Ionic name='cloud-upload-outline' size={30} color={'#EEA743'} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default PhoneNumber

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
    containerInput: {
        width: width,
        padding: 12,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        flex: 1,
        height: 50,
        marginEnd: 12,
        paddingHorizontal: 12,
        color: 'black',
        fontSize: 16
    }
})