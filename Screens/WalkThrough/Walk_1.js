import { StyleSheet, Text, View, SafeAreaView, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const width = Dimensions.get('window').width

const Walk_1 = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../../assets/g12.png')}
                    style={{
                        height: 75,
                        width: 75,
                        resizeMode: 'contain'
                    }} />
                <Text style={{
                    fontSize: 28,
                    fontWeight: 'bold',
                    color: 'black',
                    textAlign: 'center',
                    flex: 1
                }}>Tamang FoodService</Text>
            </View>
            <View style={styles.image}>
                <Image source={require('../../assets/illustration_2.png')}
                    style={{
                        flex: 1,
                        resizeMode: 'contain'
                    }} />
            </View>
            <View style={styles.text}>
                <Text style={{
                    fontSize: 28,
                    fontWeight: 'bold',
                    marginBottom: 20
                }}>All your favorites</Text>
                <Text style={{
                    fontSize: 16,
                    textAlign: 'center',
                    color: '#3A3A3A'
                }}>Order from the best local restaurants with easy, on-demand delivery.</Text>
            </View>
            <View stle={{ flex: 1 }}>
                <Image source={require('../../assets/Indicator.png')} />
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.containerButton}>
                    <Text style={styles.textButton}>GET STARTED</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Walk_1

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: width
    },
    header: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        display: 'flex',
        width: width - 80,
    },
    image: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        flex: 1,
        justifyContent: 'center',
        width: width - 80,
        alignItems: 'center',
    },
    footer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerButton: {
        width: width - 20,
        height: 60,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEA347'
    },
    textButton: {
        fontSize: 14,
        color: 'white'
    }
})