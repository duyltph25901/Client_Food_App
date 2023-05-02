import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import OrderScreen from './Main'

const ContainerOrder = () => {
    const Stack = createStackNavigator()

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName='OrderScreen' screenOptions={{ headerShown: false }}>
                <Stack.Screen name='OrderScreen' component={OrderScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default ContainerOrder