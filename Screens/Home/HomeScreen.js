import { StyleSheet, Text, View, SafeAreaView, Dimensions, Image, TouchableOpacity, ActivityIndicator, Alert, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { FlatGrid } from 'react-native-super-grid'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Ionic from 'react-native-vector-icons/Ionicons'

const width = Dimensions.get('window').width

const HomeScreen = () => {
    const numColumns = 2
    const labelDefault = 'Gợi ý cho bạn'
    const url = 'http://192.168.1.14:3000/api/v1'
    const getAllFoodAPI = '/get-all-product'

    const [data, setData] = useState([])
    const [objectCurrent, setObjectCurrent] = useState({})
    const [isLoading, setLoading] = useState(true)
    const [labelTitle, setLabelTitle] = useState('')
    const [keySearch, setKeySearch] = useState('')


    useEffect(() => {
        setLabelTitle(labelDefault)
        getObjectCurrent()
        getHomeFood()
    }, [])


    const getObjectCurrent = async (req, res) => {
        try {
            const value = await AsyncStorage.getItem('ObjectCurrent')
            if (value !== null) {
                setObjectCurrent(JSON.parse(value))
                console.log(
                    `
                    \n>>>>> Check user current from async storage: ${JSON.stringify(objectCurrent)}\n
                    `
                )
            }
        } catch (e) {
            console.log(
                `
                \n>>>>> Message get user from async storage: ${e}\n
                `
            )
        }
    }

    const formatData = (data, numColumns) => {
        const numberOfFullRows = Math.floor(data.length / numColumns)

        let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns)
        while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
            data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true })
            numberOfElementsLastRow++
        }

        return data
    }

    const getHomeFood = async (req, res) => {
        try {
            const urlGetProduct = `${url}${getAllFoodAPI}`
            const res = await fetch(urlGetProduct)
            const json = await res.json()

            setData(json)
        } catch (err) {
            Alert.alert('Opps', err)
            console.log(
                `
                \n>>>>> Message error get food: ${err}\n
                `
            )
        } finally {
            setLoading(false)
        }
    }

    const formatPriceByVnd = (price) => {
        let vnd = new Intl.NumberFormat('VN', {
            style: 'currency',
            currency: 'VND',
        })

        return `${vnd.format(price)}`
    }

    const handleSearchFoodName = async () => {
        if (!keySearch || String(keySearch).length === 0) {
            setLabelTitle(labelDefault)
            getHomeFood()

            return false
        }

        setLoading(true)
        setData([])
        setLabelTitle(`Kết quả tìm kiếm cho ${keySearch}:`)

        const searchAPI = '/handle-search-product-by-name'
        const urlSearch = `${url}${searchAPI}`

        const objectSearch = {
            keyName: keySearch
        }

        await fetch(urlSearch, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objectSearch)
        })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                // setData(data)
                console.log(
                    `
                    \n>>>>> Check data res search: ${JSON.stringify(data.results)}\n
                    `
                )
                setData(data.results)
            })
            .catch((err) => {
                Alert.alert('Oppps', err)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerHeader}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#EEA734',
                        marginBottom: 3
                    }}>Xin chào</Text>
                    <Text style={{
                        fontSize: 24,
                    }}>{
                            objectCurrent.userName
                        }</Text>
                </View>
                <TouchableOpacity style={styles.containerImage}>
                    <Image style={{
                        height: 50,
                        width: 50,
                        resizeMode: 'center',
                        borderRadius: 10000,
                    }}
                        source={{ uri: objectCurrent.image }} />
                </TouchableOpacity>
            </View>
            <View style={styles.containerSearch}>
                <View style={{
                    width: width - 12,
                    backgroundColor: '#DDDDDD',
                    height: 50,
                    borderRadius: 12,
                    paddingHorizontal: 12,
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <TextInput style={{
                        height: 40,
                        flex: 1,
                        fontSize: 14,
                        color: 'black'
                    }}
                        placeholder='Tìm kiếm tên món ăn...'
                        value={keySearch}
                        onChangeText={(text) => {
                            if (!text) {
                                getHomeFood()
                                setLabelTitle(labelDefault)
                            }
                            setKeySearch(text)
                        }}
                        onSubmitEditing={handleSearchFoodName} />
                    <TouchableOpacity style={{
                        paddingStart: 12,
                    }}
                        onPress={handleSearchFoodName}>
                        <Ionic name={'search-outline'} size={30} color={'#EEA743'} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.containerTabBar}>
                <Text style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                }}>{labelTitle}</Text>
            </View>
            <View style={styles.containerMain}>
                {
                    (isLoading)
                        ? (
                            <ActivityIndicator />
                        )
                        : (
                            <FlatGrid data={formatData(data, numColumns)}
                                style={{
                                    flex: 1,
                                    backgroundColor: '#EEEBF6'
                                }}
                                keyExtractor={(item, index) => item.id}
                                itemDimension={130}
                                spacing={5}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity style={styles.containerItem}>
                                            <Text style={{
                                                fontSize: 18,
                                                fontWeight: 'bold',
                                                marginBottom: 7
                                            }}>{
                                                    item.name.length > 14 ? item.name.slice(0, 14) + "..." : item.name
                                                }</Text>
                                            <Text style={{
                                                fontSize: 14,
                                                fontStyle: 'italic',
                                                color: 'gray',
                                                marginBottom: 7,
                                            }}>{item.category}</Text>
                                            <Image source={{ uri: item.image }}
                                                style={{
                                                    height: 130,
                                                    width: 130,
                                                    borderRadius: 100,
                                                    marginBottom: 7
                                                }} />
                                            <View style={{
                                                flexDirection: 'row',
                                                flex: 1,
                                            }}>
                                                <View style={{
                                                    flex: 1,
                                                    justifyContent: 'center'
                                                }}>
                                                    {
                                                        (item.discount > 0)
                                                            ? (
                                                                <View>
                                                                    <View style={{ flexDirection: 'row' }}>
                                                                        <Text style={{
                                                                            textDecorationLine: 'line-through',
                                                                            textDecorationColor: '#EEA743',
                                                                            color: '#DDDDDD',
                                                                            fontStyle: 'italic'
                                                                        }}>{formatPriceByVnd(item.price)}</Text>
                                                                        <Text style={{
                                                                            fontSize: 10,
                                                                            fontWeight: 'bold',
                                                                            fontStyle: 'italic',
                                                                            color: 'red'
                                                                        }}>  -{item.discount}%</Text>
                                                                    </View>
                                                                    <Text style={{
                                                                        fontSize: 14,
                                                                        fontWeight: 'bold',
                                                                        color: 'red'
                                                                    }}>{formatPriceByVnd(item.price - (item.price * item.discount / 100))}</Text>
                                                                </View>
                                                            )
                                                            : (
                                                                <View style={{ flexDirection: 'row' }}>
                                                                    <Text style={{
                                                                        fontSize: 14,
                                                                        fontWeight: 'bold',
                                                                    }}>{formatPriceByVnd(item.price)}</Text>
                                                                </View>
                                                            )
                                                    }
                                                </View>
                                                <TouchableOpacity style={{
                                                    height: 30,
                                                    width: 30,
                                                    borderRadius: 12,
                                                    backgroundColor: '#EEA743',
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                    <Text style={{
                                                        color: 'white'
                                                    }}>+</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }} />
                        )
                }
            </View>
        </SafeAreaView >
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEEBF6'
    },
    containerHeader: {
        flex: 1,
        width: width,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12
    },
    containerSearch: {
        width: width,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerTabBar: {
        width: width,
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 12
    },
    containerMain: {
        flex: 7,
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerImage: {
        width: 54,
        height: 54,
        borderRadius: 1000,
        borderColor: '#EEA743',
        borderWidth: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerItem: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 7,
        justifyContent: 'center',
        alignItems: 'center'
    }
})