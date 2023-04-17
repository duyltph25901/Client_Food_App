import { StyleSheet, Text, View, SafeAreaView, Dimensions, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'

const width = Dimensions.get('window').width

const SignUp = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={{
                    fontSize: 34,
                    fontWeight: 'bold',
                    color: 'white',
                    marginBottom: 10
                }}>Sign up</Text>
                <Text style={{
                    color: 'white',
                    fontSize: 14
                }}>Create your new account</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.bodyChild}>
                    <TextInput style={styles.input}
                        placeholder='User name' />
                    <TextInput style={styles.input}
                        placeholder='Email' />
                    <TextInput style={styles.input}
                        placeholder='Password' />
                    <TextInput style={styles.input}
                        placeholder='Phone number' />
                    <TouchableOpacity style={styles.containerButton}>
                        <Text style={styles.textButton}>Create new account</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    flex: 1.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        fontSize: 12,
                    }}>You aldready have an account?</Text>
                    <TouchableOpacity>
                        <Text style={{
                            fontSize: 14,
                            fontWeight: 'bold',
                            color: '#EEA743'
                        }}>SIGN IN</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SignUp

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
        flex: 6.5,
        justifyContent: 'flex-end',
        alignItems: 'center',
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
        color: 'white',
        fontWeight: 'bold'
    }
})