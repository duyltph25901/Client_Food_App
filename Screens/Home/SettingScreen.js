import { StyleSheet, Text, View, SafeAreaView, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Ionic from 'react-native-vector-icons/Ionicons'

const width = Dimensions.get('window').width

const SettingScreen = () => {

    const myAccounts = [
        {
            id: 0,
            name: 'Tài khoản & Bảo mật'
        },
        {
            id: 1,
            name: 'Địa chỉ'
        }
    ]
    const supports = [
        {
            id: 2,
            name: 'Trung tâm hỗ trợ'
        },
        {
            id: 3,
            name: 'Điều khoản cộng đồng'
        },
        {
            id: 4,
            name: 'Điều khoản app'
        },
        {
            id: 5,
            name: 'Giới thiệu'
        },
        {
            id: 6,
            name: 'Yêu cầu hủy tài khoản'
        }
    ]

    const [settingAccounts, setSettingAccount] = useState(myAccounts)
    const [supportsUser, setSupportsUser] = useState(supports)
    const labelTitles = ['Tài khoản của tôi', 'Hỗ trợ']
    const arr = [setSettingAccount, supportsUser]

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerHeader}>
                <Text style={{
                    fontSize: 24,
                    fontWeight: '350',
                }}>Thiết lập tài khoản</Text>
            </View>
            <View style={styles.body}>
                <View>
                    <Text style={styles.textLabel}>Tài khoản của tôi</Text>
                </View>
                <FlatList data={settingAccounts}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={styles.containerItem}>
                                <Text>{item.name}</Text>
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'flex-end'
                                }}>
                                    <Ionic name={'chevron-forward-outline'} size={20} color={'#EEA743'} />
                                </View>
                            </TouchableOpacity>
                        )
                    }} />
                <View>
                    <Text style={styles.textLabel}>Hỗ trợ</Text>
                </View>
                <FlatList data={supportsUser}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={styles.containerItem}>
                                <Text>{item.name}</Text>
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'flex-end'
                                }}>
                                    <Ionic name={'chevron-forward-outline'} size={20} color={'#EEA743'} />
                                </View>
                            </TouchableOpacity>
                        )
                    }} />
                <View style={{
                    width: width,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity style={styles.containerButton}>
                        <Text style={styles.textButton}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SettingScreen

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
    },
    body: {
        flex: 9,
        width: width,
        backgroundColor: '#EEEBF6',
    },
    textLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#EEA743',
        margin: 12
    },
    containerItem: {
        width: width,
        padding: 12,
        backgroundColor: 'white',
        borderWidth: .7,
        borderColor: 'white',
        borderBottomColor: '#DDDDDD',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerButton: {
        width: width - 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEA743',
        borderRadius: 12,
        height: 60,
        marginVertical: 20
    },
    textButton: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    }
})