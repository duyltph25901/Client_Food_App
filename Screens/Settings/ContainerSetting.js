import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AccountScreenContainer, AddressScreen } from './AccountAndSecurity/index'
import { CommunityTerms, Introduce, RequestDeleteAccount, SuppoterCenter, TermsOfApplication, } from './Supported/index'
import SettingScreen from './Main'

const Stack = createStackNavigator()

const ContainerSetting = () => {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName='SettingScreen' screenOptions={{ headerShown: false }}>
                <Stack.Screen name='SettingScreen' component={SettingScreen} />
                <Stack.Screen name='AccountAndSecurityContainer' component={AccountScreenContainer} />
                <Stack.Screen name='CommunityTerms' component={CommunityTerms} />
                <Stack.Screen name='Introduce' component={Introduce} />
                <Stack.Screen name='RequestDeleteAccount' component={RequestDeleteAccount} />
                <Stack.Screen name='SuppoterCenter' component={SuppoterCenter} />
                <Stack.Screen name='TermsOfApplication' component={TermsOfApplication} />
                <Stack.Screen name='AdddressScreen' component={AddressScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default ContainerSetting