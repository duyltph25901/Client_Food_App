import { StyleSheet, Text, View, SafeAreaView, Dimensions, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'

const width = Dimensions.get('window').width

const SignIn = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={{
                    fontSize: 34,
                    fontWeight: 'bold',
                    color: 'white'
                }}>Login</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.bodyChild}>
                    <Text style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: '#EEA743',
                        marginBottom: 10
                    }}>
                        Welcome back
                    </Text>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: '#686868'
                    }}>
                        Login to your account
                    </Text>
                </View>
                <View style={styles.bodyChild}>
                    <TextInput style={styles.input}
                        placeholder='Email' />
                    <TextInput style={styles.input}
                        placeholder='Password' />
                    <View style={{
                        width: width - 30,
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                    }}>
                        <TouchableOpacity style={{
                            padding: 12,
                        }}>
                            <Text>Forgot password?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.bodyChild}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity style={styles.containerButton}>
                            <Text style={styles.textButton}>Login</Text>
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
                        }}>Don't have an account? </Text>
                        <TouchableOpacity>
                            <Text style={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                color: '#EEA743'
                            }}>SIGN UP</Text>
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