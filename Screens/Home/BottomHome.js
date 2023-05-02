import React from 'react'
import Ionic from 'react-native-vector-icons/Ionicons'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ContainerSetting from '../Settings/ContainerSetting'
import ContainerCategory from '../Category/ContainerCategory'
import ContainerCart from '../Cart/ContainerCart'
import ContainerOrder from '../Order/ContainerOrder'
import ContainerHome from './ContainerHome'

const BottomHome = () => {

    const Tab = createBottomTabNavigator()

    return (
        <>
            <NavigationContainer independent={true}>
                <Tab.Navigator initialRouteName='HomeScreen'
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, size, color }) => {
                            let iconName = ''
                            if (route.name == 'HomeContainer') {
                                iconName = focused ? 'ios-home' : 'ios-home-outline'
                                size = focused ? size + 7 : size + 3
                            } else if (route.name == 'CategoryContainer') {
                                iconName = focused ? 'ios-list' : 'ios-list-outline'
                                size = focused ? size + 7 : size + 3
                            } else if (route.name == 'CartContainer') {
                                iconName = focused ? 'cart' : 'cart-outline'
                                size = focused ? size + 7 : size + 3
                            } else if (route.name == 'OrderContainer') {
                                iconName = focused ? 'time' : 'time-outline'
                                size = focused ? size + 7 : size + 3
                            } else if (route.name == 'SettingContainer') {
                                iconName = focused ? 'md-settings' : 'md-settings-outline'
                                size = focused ? size + 7 : size + 3
                            }

                            return <Ionic name={iconName} size={size} color={color} />
                        },
                        tabBarActiveTintColor: '#EEA743',
                        tabBarInactiveTintColor: '#CCCCCC',
                        tabBarShowLabel: false,
                        headerShown: false
                    })}>
                    <Tab.Screen name='HomeContainer' component={ContainerHome} />
                    <Tab.Screen name='CategoryContainer' component={ContainerCategory} />
                    <Tab.Screen name='CartContainer' component={ContainerCart} />
                    <Tab.Screen name='OrderContainer' component={ContainerOrder} />
                    <Tab.Screen name='SettingContainer' component={ContainerSetting} />
                </Tab.Navigator>
            </NavigationContainer>
        </>
    )
}

export default BottomHome