import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/login';
import Register from './src/screens/register';
import Mainmenu from './src/screens/Mainmenu';
import StudiosMain from './src/screens/studiosmain';
import StudiosCreate from './src/screens/studioscreate';
import ExercisesMain from './src/screens/exercisesmain';
import Account from './src/screens/account';

const Stack = createStackNavigator();

//auth stack
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

//studios stack
const Studios = () => {
    return(
        <Stack.Navigator initialRouteName="StudiosMain">
            <Stack.Screen
                name="StudiosMain"
                component={StudiosMain}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="StudiosCreate"
                component={StudiosCreate}
                options={{title: 'Create New Studio'}}
            />
        </Stack.Navigator>
    );
}

//main
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
                    name="ExercisesMain"
                    component={ExercisesMain}
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
