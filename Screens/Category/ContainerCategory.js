import React from 'react'
import DetailsProduct from './DetailsProduct'
import CategoryScreen from './Main'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const ContainerCategory = () => {

    const Stack = createStackNavigator()

    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName='CategoryScreen' screenOptions={{ headerShown: false }}>
                <Stack.Screen name='CategoryScreen' component={CategoryScreen} />
                <Stack.Screen name='DetailsProduct' component={DetailsProduct} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default ContainerCategory