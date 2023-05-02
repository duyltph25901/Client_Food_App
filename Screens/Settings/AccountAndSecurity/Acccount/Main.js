import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import Ionic from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import hideInformation from '../../../../controllers/HideInfo'

const width = Dimensions.get('window').width

const AccountScreen = () => {

    const chooseArr = [
        {
            id: 0,
            name: 'Hồ sơ người dùng'
        },
        {
            id: 1,
            name: 'Tên người dùng'
        },
        {
            id: 2,
            name: 'Điện thoại'
        },
        {
            id: 3,
            name: 'Email'
        },
        {
            id: 4,
            name: 'Đổi mật khẩu'
        },
    ]
    const [options, setOptions] = useState(chooseArr)
    const [objectCurrent, setObjectCurrent] = useState({})
    const [email, setEmail] = useState('null')
    const [phoneNumber, setPhoneNumber] = useState('null')
    const [userName, setUserName] = useState('null')
    const [isLoading, setLoading] = useState(true)
    const navigation = useNavigation()

    useEffect(() => {
        getObjectCurrent()
    }, [])

    const handleNavigation = (item) => {
        switch (item.id) {
            case 0: {
                navigation.navigate('UserProfile')
                break
            } case 1: {
                break
            } case 2: {
                navigation.navigate('PhoneNumber')
                break
            } case 3: {
                navigation.navigate('Email')
                break
            } case 4: {
                navigation.navigate('Password')
                break
            }
        }
    }


    const back = () => {
        navigation.goBack()
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
                showInfoObjectCurrent()
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

    const showInfoObjectCurrent = async () => {
        setPhoneNumber(objectCurrent.phoneNumber)
        setUserName(objectCurrent.userName)
        setEmail(objectCurrent.email)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerHeader}>
                <TouchableOpacity onPress={back}>
                    <Ionic name='chevron-back-outline' size={30} color={'#EEA743'} />
                </TouchableOpacity>
                <Text style={styles.textTitle}>Tài khoản & bảo mật</Text>
            </View>
            <View style={styles.body}>
                <FlatList data={options}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={styles.containerItem}
                                onPress={() => handleNavigation(item)}>
                                <Text style={styles.textItem}>{item.name}</Text>
                                {
                                    isLoading
                                        ? (
                                            <View>
                                                <ActivityIndicator />
                                            </View>
                                        )
                                        :
                                        <View style={{ marginEnd: 7 }}>
                                            {
                                                (item.name == 'Tên người dùng')
                                                    ? (
                                                        <Text>{userName}</Text>
                                                    )
                                                    : null
                                            }
                                            {
                                                (item.name == 'Email')
                                                    ? (
                                                        <Text>{email}</Text>
                                                    )
                                                    : null
                                            }
                                            {
                                                (item.name == 'Điện thoại')
                                                    ? (
                                                        <Text>{phoneNumber}</Text>
                                                    ) : null
                                            }
                                        </View>
                                }
                                {
                                    (item.name != 'Tên người dùng')
                                        ? (
                                            <Ionic name={'chevron-forward-outline'} size={20} color={'#EEA743'} />
                                        ) : null
                                }
                            </TouchableOpacity>
                        )
                    }} />
            </View>
        </SafeAreaView>
    )
}

export default AccountScreen

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
        width: width,
        flexDirection: 'row',
        paddingHorizontal: 12,
    },
    textTitle: {
        fontSize: 24,
        fontWeight: '300',
        flex: 1,
        textAlign: 'center'
    },
    body: {
        flex: 9,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEEBF6',
        paddingTop: 15
    },
    containerItem: {
        width: width,
        paddingHorizontal: 12,
        paddingVertical: 15,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'white',
        borderBottomColor: '#DDDDDD',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textItem: {
        flex: 1,
    }
})