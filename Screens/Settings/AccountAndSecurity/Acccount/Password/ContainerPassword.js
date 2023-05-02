import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Password from './Main'
import AuthUser from './AuthUser'

const ContainerPassword = () => {

    const Stack = createNativeStackNavigator()

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName='Auth' screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Auth' component={AuthUser} />
                <Stack.Screen name='Password' component={Password} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default ContainerPassword