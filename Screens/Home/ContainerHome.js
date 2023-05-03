import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './Main'
import DetailsUser from './DetailsUser'
import DetailsProduct from './DetailsProduct'

const ContainerHome = () => {

    const Stack = createStackNavigator()

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName='HomeScreen' screenOptions={{ headerShown: false }}>
                <Stack.Screen name='HomeScreen' component={HomeScreen} />
                <Stack.Screen name='DetailsUserScreen' component={DetailsUser} />
                <Stack.Screen name='DetailsProductScreen' component={DetailsProduct} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default ContainerHome