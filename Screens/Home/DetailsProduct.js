import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionic from 'react-native-vector-icons/Ionicons'
import Format from '../../controllers/FormatData'

const width = Dimensions.get('window').width

const DetailsProduct = ({ navigation, route }) => {

    const [itemCurrent, setItemCurrent] = useState(route.params.item)
    const [isTruncate, setTruncate] = useState(true)

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }}>
                    <Ionic name='chevron-back-outline' size={30} color={'white'} />
                </TouchableOpacity>
                <Text style={styles.textTitle}>Chi tiết sản phẩm</Text>
                <TouchableOpacity>
                    <Ionic name='heart-circle-outline' size={30} color={'white'} />
                </TouchableOpacity>
            </View>
            <View style={styles.center}>
                <Image style={styles.imageProduct}
                    source={{ uri: itemCurrent.image }} />
            </View>
            <View style={styles.containerFooter}>
                <View style={styles.footer}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.textCategory}>{itemCurrent.category}</Text>
                        {
                            itemCurrent.discount > 0 && (
                                <Text style={styles.textDiscount}>-{itemCurrent.discount}%</Text>
                            )
                        }
                    </View>
                    <View style={styles.containerNameProduct}>
                        <Text style={styles.textProductName}>{itemCurrent.name}</Text>
                        {
                            (itemCurrent.discount > 0)
                                ? (
                                    <View>
                                        <Text style={styles.textOldPrice}>{Format.formatPriceByVnd(itemCurrent.price)}</Text>
                                        <Text style={styles.textNewPrice}>{Format.formatPriceByVnd(itemCurrent.price - itemCurrent.price * itemCurrent.discount / 100)}</Text>
                                    </View>
                                )
                                : (
                                    <Text style={styles.textNewPrice}>{Format.formatPriceByVnd(itemCurrent.price)}</Text>
                                )
                        }
                    </View>
                    <Text style={styles.textStatus}>Tình trạng: {(itemCurrent.status == 1) ? 'Còn hàng' : 'Hết hàng'}</Text>
                    <ScrollView scrollEnabled={(isTruncate ? false : true)}>
                        <TouchableOpacity onPress={() => {
                            setTruncate(!isTruncate)
                        }}>
                            <Text style={styles.textDescription}>{
                                (isTruncate) ? String(itemCurrent.description).slice(0, 200) + '...' : String(itemCurrent.description)
                            }</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView >
    )
}

export default DetailsProduct

const styles = StyleSheet.create({
    container: {
        width: width,
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EEA743',
    },
    header: {
        flex: 1,
        width: width,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    center: {
        flex: 3,
        width: width,
        backgroundColor: '#EEEBF6',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerFooter: {
        flex: 6,
        width: width,
        backgroundColor: '#EEEBF6',
    },
    textTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center'
    },
    imageProduct: {
        width: 130,
        height: 130,
        borderWidth: 2,
        borderColor: '#EEA743',
        borderRadius: 100
    },
    footer: {
        flex: 1,
        width: width,
        backgroundColor: 'white',
        borderTopEndRadius: 40,
        borderTopStartRadius: 40,
        paddingTop: 21,
        paddingHorizontal: 12
    },
    containerNameProduct: {
        flexDirection: 'row',
        marginTop: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textProductName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#EEA743',
        flex: 1,
        marginBottom: 3
    },
    textStatus: {
        fontSize: 11,
        fontStyle: 'italic',
        color: '#979797'
    },
    textDescription: {
        fontSize: 14,
        marginTop: 12
    },
    textCategory: {
        color: '#979797',
        fontSize: 13,
        fontWeight: 'bold',
        fontStyle: 'italic',
        flex: 1,
    },
    textOldPrice: {
        textDecorationLine: 'line-through',
        fontSize: 14,
        fontWeight: 'bold',
        color: 'gray'
    },
    textDiscount: {
        fontSize: 12,
        color: 'red',
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    textNewPrice: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#EEA743'
    }
})