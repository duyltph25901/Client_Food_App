import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Dimensions, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionic from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'


const width = Dimensions.get('window').width

const AuthUser = () => {
    const navigation = useNavigation()
    const [objectCurrent, setObjectCurrent] = useState({})
    const [pass, setPass] = useState('')

    useEffect(() => {
        setPass('')
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

    const handleAuthUser = () => {
        if (!pass) {
            Alert.alert('Opps', 'Vui lòng điền đầy đủ thông tin!')
            return false
        } if (pass != objectCurrent.password) {
            Alert.alert('Opps', 'Mật khẩu không chính xác!')
            return false
        }

        navigation.navigate('Password')
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
                        placeholder='Nhập mật khẩu cũ'
                        placeholderTextColor={'gray'}
                        secureTextEntry={true}
                        value={pass}
                        onChangeText={(text) => setPass(text)} />
                    <TouchableOpacity onPress={handleAuthUser}>
                        <Ionic name='checkmark-done-outline' size={30} color={'#EEA743'} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default AuthUser

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