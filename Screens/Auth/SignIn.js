import { StyleSheet, Text, View, SafeAreaView, TextInput, Dimensions } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

const width = Dimensions.get('window').width

const SignIn = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={{
                    color: 'black',
                    fontSize: 16,
                    fontWeight: 'bold'
                }}>Sign in</Text>
            </View>
            <View style={styles.welcome}>
                <Text style={{
                    fontSize: 33,
                    marginBottom: 10
                }}>Welcome to Tamang Food Services</Text>
            </View>
            <View style={styles.input}>
                <Text style={styles.textLabel}>EMAIL ADDRESS</Text>
                <TextInput placeholder='Email' style={styles.textInput} keyboardType='email-address' />
                <View style={styles.divider} />
                <Text style={styles.textLabel}>PASSWORD</Text>
                <TextInput placeholder='Password' style={styles.textInput} secureTextEntry={true} />
                <View style={styles.divider} />
                <TouchableOpacity style={{
                    alignSelf: 'center',
                    marginVertical: 10,
                }}>
                    <Text style={{
                        fontSize: 12,
                        color: '#868686'
                    }}>Forget Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.containerButton}>
                    <Text style={{ color: 'white' }}>SIGN IN</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.createAccount}>
                <Text style={{
                    fontSize: 12
                }}>Don't have an account? </Text>
                <TouchableOpacity>
                    <Text style={{
                        fontSize: 14,
                        color: '#EEA743'
                    }}>Create new account </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.socialMedia}>
                <TouchableOpacity style={{
                    width: width - 20,
                    height: 60,
                    borderRadius: 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 3,
                    backgroundColor: '#395998'
                }}>
                    <Text style={{ color: 'white' }}>CONNECT WITH FACEBOOK</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    width: width - 20,
                    height: 60,
                    borderRadius: 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 3,
                    backgroundColor: '#4285F4'
                }}>
                    <Text style={{ color: 'white' }}>CONNECT WITH GOOGLE</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default SignIn

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    header: {
        flex: .2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome: {
        flex: 1,
        justifyContent: 'center',
        width: width - 20,
    },
    input: {
        flex: 2,
        width: width - 20,
        justifyContent: 'center',
    },
    textLabel: {
        fontSize: 16,
        color: '#868686',
        marginBottom: 10
    },
    textInput: {
        fontSize: 16,
        marginBottom: 10,
    },
    divider: {
        width: width - 20,
        height: 1,
        backgroundColor: '#eaeaea',
        marginBottom: 10
    },
    containerButton: {
        width: width - 20,
        height: 60,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEA743',
    },
    createAccount: {
        flex: .5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width - 80,
        alignItems: 'center',
    },
    socialMedia: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})