import React from 'react';
import LoginScreen from './LR/Login';
import Register from './LR/Register'

import { createStackNavigator,} from '@react-navigation/stack';




const LR = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen  
                name="LoginScreen"
                component={LoginScreen}
                options ={{ headerShown: false}} />
            <Stack.Screen 
            name="Register"
            component={Register}/> 
        </Stack.Navigator>
);
};

export default LR;