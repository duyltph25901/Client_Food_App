import {
  Welcome,
  Walk_1, Walk_2, Walk_3,
  SignIn, SignUp, ForgotPassword,
  BottomHome,
} from './Screens/index'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import SettingScreen from './Screens/Settings/Main'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Welcome' component={Welcome} />
        <Stack.Screen name='SignIn' component={SignIn} />
        <Stack.Screen name='SignUp' component={SignUp} />
        <Stack.Screen name='Forgotpassword' component={ForgotPassword} />
        <Stack.Screen name='Home' component={BottomHome} />
        <Stack.Screen name='SettingScreen' component={SettingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
