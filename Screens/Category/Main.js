import { StyleSheet, Text, View, SafeAreaView, TextInput, Dimensions, TouchableOpacity, FlatList, ActivityIndicator, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import Ionic from 'react-native-vector-icons/Ionicons'

const width = Dimensions.get('window').width

const CategoryScreen = () => {
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [keySearch, setKeySearch] = useState('')
    const url = 'http://192.168.1.14:3000/api/v1'
    const getRiceFoodAPI = '/get-all-rice'
    const getAllFoodAPI = '/get-all-product'
    const searchAPI = '/handle-search-product-by-name'
    const lengthNameMax = 13

    useEffect(() => {
        getFoods()
    }, [])


    const getFoods = async () => {
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
        if (!keySearch || String(keySearch).length === 0) return false

        setLoading(true)
        setData([])

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
                        placeholderTextColor={'gray'}
                        value={keySearch}
                        onChangeText={(text) => {
                            if (!text) {
                                getFoods()
                            }
                            setKeySearch(text)
                        }}
                        onSubmitEditing={handleSearchFoodName} />
                    <Ionic name={'search-outline'} size={30} color={'#EEA743'} />
                </View>
            </View>
            <View style={styles.containerFilterByCategory}>
                <Text style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 18
                }}>Thể loại</Text>
            </View>
            <View style={styles.containerShowList}>
                {
                    (isLoading)
                        ? (
                            <ActivityIndicator />
                        ) : (
                            <FlatList data={data}
                                keyExtractor={(item, index) => item.id}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={styles.containerItem}>
                                            <Image source={{ uri: item.image }}
                                                style={styles.imageItem} />
                                            <View style={styles.containerVerticalTextItem}>
                                                <Text style={{
                                                    fontSize: 18,
                                                    fontWeight: 'bold',
                                                    marginBottom: 7
                                                }}>{
                                                        String(item.name).length > lengthNameMax ? String(item.name).slice(0, lengthNameMax) + "..." : String(item.name)
                                                    }</Text>
                                                <Text style={{
                                                    fontSize: 14,
                                                    fontStyle: 'italic',
                                                    color: 'gray',
                                                    marginBottom: 7,
                                                }}>{item.category}</Text>
                                                <View>
                                                    {
                                                        (item.discount > 0)
                                                            ? (
                                                                <View style={{ flexDirection: 'row' }}>
                                                                    <Text style={{
                                                                        textDecorationLine: 'line-through',
                                                                        textDecorationColor: '#EEA743',
                                                                        color: '#DDDDDD',
                                                                        fontStyle: 'italic',
                                                                        marginEnd: 7
                                                                    }}>{formatPriceByVnd(item.price)}</Text>
                                                                    <Text style={{
                                                                        fontSize: 14,
                                                                        fontWeight: 'bold',
                                                                        color: 'red'
                                                                    }}>{formatPriceByVnd(item.price - item.price * item.discount / 100)}</Text>
                                                                </View>
                                                            )
                                                            : (
                                                                <Text style={{
                                                                    fontSize: 14,
                                                                    fontWeight: 'bold',
                                                                }}>{formatPriceByVnd(item.price)}</Text>
                                                            )
                                                    }
                                                </View>
                                            </View>
                                            {
                                                (item.discount > 0)
                                                    ? (
                                                        <View style={{ flex: 1 }}>
                                                            <Text style={{
                                                                fontSize: 10,
                                                                fontWeight: 'bold',
                                                                fontStyle: 'italic',
                                                                color: 'red',
                                                            }}>-{item.discount}%</Text>
                                                        </View>
                                                    ) : <View style={{ flex: 1, }}></View>
                                            }
                                            <View style={{
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <TouchableOpacity style={styles.containerButton}>
                                                    <Text style={{ color: '#EEA743' }}>+</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )
                                }}
                            />
                        )
                }
            </View>
        </SafeAreaView>
    )
}

export default CategoryScreen

const styles = StyleSheet.create({
    container: {
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEEBF6'
    },
    containerSearch: {
        flex: 1,
        width: width,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    containerFilterByCategory: {
        flex: .7,
        width: width,
        justifyContent: 'center',
        paddingHorizontal: 12
    },
    containerShowList: {
        flex: 8.3,
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerItem: {
        width: width - 12,
        padding: 12,
        borderRadius: 12,
        marginBottom: 12,
        backgroundColor: 'white',
        flexDirection: 'row'
    },
    imageItem: {
        width: 100,
        height: 100,
        borderRadius: 100,
        resizeMode: 'cover'
    },
    containerVerticalTextItem: {
        marginHorizontal: 12,
        justifyContent: 'center',
    },
    containerButton: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#EEA743'
    }
})