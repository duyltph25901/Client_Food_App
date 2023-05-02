import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Dimensions, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionic from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import validate from '../../../../../controllers/Validate'

const width = Dimensions.get('window').width

const Password = () => {
    const navigation = useNavigation()
    const [pass, setPass] = useState('')
    const [objectCurrent, setObjectCurrent] = useState({})
    const url = 'http://192.168.1.14:3000/api/v1'
    const updatePasswordAPI = '/handle-update-password-user'
    const findUserByIDAPI = '/find-user-by-id'

    useEffect(() => {
        getObjectCurrent()
    }, [])

    const back = () => {
        navigation.reset({
            index: 0,
        })
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

    const handleUpdatePassword = async () => {
        // valdiate
        if (!pass) {
            Alert.alert('Opps', 'Vui lòng điền đầy đủ thông tin!')
            return false
        } if (!validate.validatePassword(pass)) {
            Alert.alert('Opps', 'Mật khẩu phải chứa tối thiểu 6 kí tự bao gồm cả chữ cái viết hoa, viết thường và kí tự đặc biệt!')
            return false
        } if (pass == objectCurrent.password) {
            Alert.alert('Opps', 'Mật khẩu không thay đổi!')
            return
        }

        const object = {
            password: pass,
            idUser: objectCurrent.id
        }
        const newUrl = `${url}${updatePasswordAPI}`
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

                if (code != 200) {
                    Alert.alert('Opps', 'Cập nhật không thành công!')
                    return false
                }

                Alert.alert('Opps', 'Cập nhật mật khẩu thành công!')

                return res.json()
            })
            .catch((err) => {
                Alert.alert('Opps', err.message)
            })
            .finally(async () => {
                setPass('')
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
                <Text style={styles.textTitle}>Cập nhật mật khẩu</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.containerInput}>
                    <TextInput style={styles.textInput}
                        keyboardType='visible-password'
                        placeholder='Mật khẩu mới'
                        secureTextEntry={true}
                        value={pass}
                        onChangeText={(text) => setPass(text)} />
                    <TouchableOpacity onPress={handleUpdatePassword}>
                        <Ionic name='cloud-upload-outline' size={30} color={'#EEA743'} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Password

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