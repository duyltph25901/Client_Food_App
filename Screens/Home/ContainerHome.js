import React from 'react'
import Ionic from 'react-native-vector-icons/Ionicons'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './HomeScreen'
import CartScreen from './CartScreen'
import OrderScreen from './OrderScreen'
import ProfileScreen from './ProfileScreen'

const ContainerHomeScreen = () => {

    const Tab = createBottomTabNavigator()

    return (
        <>
            <NavigationContainer independent={true}>
                <Tab.Navigator initialRouteName='Home'
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, size, color }) => {
                            let iconName = ''
                            if (route.name == 'HomeScreen') {
                                iconName = focused ? 'ios-home' : 'ios-home-outline'
                                size = focused ? size + 7 : size + 3
                            } else if (route.name == 'CartScreen') {
                                iconName = focused ? 'cart' : 'cart-outline'
                                size = focused ? size + 7 : size + 3
                            } else if (route.name == 'OrderScreen') {
                                iconName = focused ? 'time-outline' : 'time-outline'
                                size = focused ? size + 7 : size + 3
                            } else if (route.name == 'ProfileScreen') {
                                iconName = focused ? 'person-circle-sharp' : 'person-circle-outline'
                                size = focused ? size + 7 : size + 3
                            }

                            return <Ionic name={iconName} size={size} color={color} />
                        },
                        tabBarActiveTintColor: '#EEA743',
                        tabBarInactiveTintColor: '#CCCCCC',
                        tabBarShowLabel: false,
                        headerShown: false
                    })}>
                    <Tab.Screen name='HomeScreen' component={HomeScreen} />
                    <Tab.Screen name='CartScreen' component={CartScreen} />
                    <Tab.Screen name='OrderScreen' component={OrderScreen} />
                    <Tab.Screen name='ProfileScreen' component={ProfileScreen} />
                </Tab.Navigator>
            </NavigationContainer>
        </>
    )
}

export default ContainerHomeScreen