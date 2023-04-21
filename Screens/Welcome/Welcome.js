import { StyleSheet, Text, View, SafeAreaView, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const width = Dimensions.get('window').width

const Welcome = () => {
    const navigation = useNavigation()

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerChild}>
                <Image source={require('../../assets/g12.png')} />
            </View>
            <View style={styles.containerChild}>
                <View style={[styles.bodyChild]}>
                    <Text style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: '#EEA743'
                    }}>Welcome to my app</Text>
                </View>
                <View style={[styles.bodyChild]}>
                    <TouchableOpacity style={styles.containerButton}
                        onPress={() => {
                            navigation.navigate('SignIn')
                        }}>
                        <Text style={styles.textButton}>Get started</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: width
    },
    containerChild: {
        flex: 1,
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bodyChild: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerButton: {
        width: width - 130,
        height: 60,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEA743',
    },
    textButton: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    }
})