import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const width = Dimensions.get('window').width

const ForgotPassword = () => {

    const navigation = useNavigation()

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }}>
                    <Image source={require('../../assets/icon_back.png')}
                        style={styles.icon} />
                </TouchableOpacity>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text style={{
                        fontSize: 24,
                        fontWeight: 'bold'
                    }}>
                        Forgot password
                    </Text>
                </View>
            </View>
            <View style={styles.body}>
                <View style={{
                    width: width - 20,
                    marginVertical: 24
                }}>
                    <Text style={{
                        fontSize: 34,
                        color: 'black   ',
                        fontWeight: '200',
                        marginBottom: 12
                    }}>
                        Forgot password
                    </Text>
                    <Text style={{
                        color: '#686868'
                    }}>
                        Enter your email address and will send you a reset intrucstion
                    </Text>
                </View>
                <View style={{
                    width: width - 20,
                    paddingVertical: 24,
                }}>
                    <Text style={{
                        fontSize: 24,
                        color: '#686868',
                        fontWeight: '300'
                    }}>Email address</Text>
                    <TextInput style={{
                        width: width - 20,
                        height: 60,
                        paddingHorizontal: 12,
                        borderRadius: 12,
                        backgroundColor: '#DDDDDD',
                        marginVertical: 12,
                        fontSize: 16
                    }}
                        placeholder='Email' />
                </View>
                <TouchableOpacity style={{
                    width: width - 20,
                    height: 60,
                    borderRadius: 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#EEA743'
                }}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: 'white'
                    }}>Reset password</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    header: {
        width: width - 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        height: 30,
        width: 30,
        resizeMode: 'contain',
        tintColor: '#EEA743'
    },
    body: {
        flex: 10,
        marginVertical: 24
    }
})