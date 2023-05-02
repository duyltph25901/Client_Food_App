import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import CartScreen from './Main'

const ContainerCart = () => {

    const Stack = createStackNavigator()

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName='CartScreen' screenOptions={{ headerShown: false }}>
                <Stack.Screen name='CartScreen' component={CartScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default ContainerCart