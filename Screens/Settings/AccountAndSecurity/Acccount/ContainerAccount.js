import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AccountScreen from './Main'
import ContainerPassword from './Password/ContainerPassword'
import PhoneNumber from './PhoneNumber'
import UserProfile from './UserProfile'
import Email from './Email'

const AccountContainer = () => {

    const Stack = createNativeStackNavigator()

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName='AccountScreen' screenOptions={{ headerShown: false }}>
                <Stack.Screen name='AccountScreen' component={AccountScreen} />
                <Stack.Screen name='ContainerPassword' component={ContainerPassword} />
                <Stack.Screen name='PhoneNumber' component={PhoneNumber} />
                <Stack.Screen name='UserProfile' component={UserProfile} />
                <Stack.Screen name='Email' component={Email} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AccountContainer