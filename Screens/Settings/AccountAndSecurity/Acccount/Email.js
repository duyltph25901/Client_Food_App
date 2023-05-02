import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Dimensions, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionic from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import validate from '../../../../controllers/Validate'

const width = Dimensions.get('window').width

const Email = () => {
    const navigation = useNavigation()
    const [objectCurrent, setObjectCurrent] = useState({})
    const [email, setEmail] = useState('')
    const url = 'http://192.168.1.14:3000/api/v1'
    const updateEmailAPI = '/handle-update-email-user'
    const findUserByIDAPI = '/find-user-by-id'

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
                setEmail(JSON.parse(value).email)
            }
        } catch (e) {
            console.log(
                `
                \n>>>>> Message get user from async storage: ${e}\n
                `
            )
        }
    }

    const handleUpdateEmail = async () => {
        // validate
        if (!email) {
            Alert.alert('Opps', 'Vui lòng điền địa chỉ email đầy đủ!')
            return false
        } if (!validate.validateEmail(email)) {
            Alert.alert('Opps', 'Email không đúng dịnh dạng!')
            return false
        } if (email == objectCurrent.email) {
            Alert.alert('Opps', 'Email không thay đổi!')
            return false
        }


        const newUrl = `${url}${updateEmailAPI}`
        const object = {
            email: email,
            idUser: objectCurrent.id
        }
        fetch(newUrl, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        })
            .then((res) => {
                const code = res.code

                console.log(
                    `
                    \n>>>>> Check code update email user: ${code}\n
                    `
                )

                if (code == 405) {
                    Alert.alert('Opps', 'Email đã được đăng kí!')
                    return false
                } if (code == 200) {
                    Alert.alert('Thành công', 'Cập nhật email thành công!')
                }

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
                <Text style={styles.textTitle}>Cập nhật địa chỉ email</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.containerInput}>
                    <TextInput style={styles.textInput}
                        keyboardType='email-address'
                        placeholder='Email'
                        value={email}
                        onChangeText={(text) => setEmail(text)} />
                    <TouchableOpacity onPress={handleUpdateEmail}>
                        <Ionic name='cloud-upload-outline' size={30} color={'#EEA743'} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Email

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