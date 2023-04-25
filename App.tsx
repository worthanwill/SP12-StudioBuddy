import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/login';
import Register from './src/screens/register';
import Mainmenu from './src/screens/Mainmenu';
import Studios from './src/screens/studios';
import Exercises from './src/screens/exercises';
import Account from './src/screens/account';

const Stack = createStackNavigator();

const Auth = () => {
    return(
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
                name="Login"
                component={Login}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Register"
                component={Register}
            />
        </Stack.Navigator>
    );
}

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Mainmenu">
                <Stack.Screen
                    name="Mainmenu"
                    component={Mainmenu}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Auth"
                    component={Auth}
                    options={{title: 'Login'}}
                />
                <Stack.Screen
                    name="Studios"
                    component={Studios}
                />
                <Stack.Screen
                    name="Exercises"
                    component={Exercises}
                />
                <Stack.Screen
                    name="Account"
                    component={Account}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
