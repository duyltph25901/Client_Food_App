import { StyleSheet, Text, View, SafeAreaView, Dimensions, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const width = Dimensions.get('window').width

const SignIn = () => {
    const navigation = useNavigation()
    const url = 'http://192.168.1.14:3000/api/v1'
    const login = '/handle-login-user'
    const [email, setEmail] = useState('beedyto@gmail.com   ')
    const [pass, setPass] = useState('123123')

    const handleLogin = async () => {
        const user = {
            email: email,
            password: pass
        }
        const urlLogin = `${url}${login}`

        await fetch(urlLogin, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then((res) => {
                const code = res.status

                console.log(
                    `
                    \n>>>>> Check code login: ${code}\n
                    `
                )

                if (code === 404) {
                    Alert.alert('Opps', 'Không tìm thấy email!')
                    return false
                } if (code == 405) {
                    Alert.alert('Opps', 'Mật khẩu không đúng!')
                    return false
                }

                return res.json()
            })
            .then((data) => {
                const objectCurrent = data.objectCurrent

                console.log(
                    `
                    \n>>>>> Check data res login: ${JSON.stringify(objectCurrent)}\n
                    `
                )

                if (!objectCurrent) return false

                clearAsyncStorage()
                storeData(objectCurrent)

                navigation.navigate('Home')
            })
            .catch((err) => {
                Alert.alert('Opps', err)
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
            <View style={styles.header}>
                <Text style={{
                    fontSize: 34,
                    fontWeight: 'bold',
                    color: 'white'
                }}>Đăng nhập</Text>
            </View>
            <View style={styles.body}>
                <View style={{
                    paddingVertical: 50,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: '#EEA743',
                        marginBottom: 10
                    }}>
                        Chào mừng bạn quay trở lại
                    </Text>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: '#686868'
                    }}>
                        Đăng nhập tài khoản của bạn
                    </Text>
                </View>
                <View style={styles.bodyChild}>
                    <TextInput style={styles.input}
                        placeholder='Email'
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        keyboardType='email-address' />
                    <TextInput style={styles.input}
                        placeholder='Mật khẩu'
                        secureTextEntry={true}
                        value={pass}
                        onChangeText={(text) => setPass(text)} />
                    <View style={{
                        width: width - 30,
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                    }}>
                        <TouchableOpacity style={{
                            padding: 12,
                        }}
                            onPress={() => {
                                navigation.navigate('Forgotpassword')
                            }}>
                            <Text>Quên mật khẩu?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.bodyChild}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity style={styles.containerButton}
                            onPress={handleLogin}>
                            <Text style={styles.textButton}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                    }}>
                        <Text style={{
                            fontSize: 12,
                        }}>Bạn không có tài khoản?</Text>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('SignUp')
                        }}>
                            <Text style={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                color: '#EEA743'
                            }}>    ĐĂNG KÍ</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SignIn

const styles = StyleSheet.create({
    container: {
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEA743'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
    },
    body: {
        flex: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: width,
        borderTopLeftRadius: 100
    },
    bodyChild: {
        flex: 8 / 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        width: width - 20,
        height: 60,
        borderRadius: 12,
        paddingHorizontal: 12,
        backgroundColor: '#DDDDDD',
        marginBottom: 12,
        fontSize: 14
    },
    containerButton: {
        width: width - 20,
        height: 60,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEA743'
    },
    textButton: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    }
})