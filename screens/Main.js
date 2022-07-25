import React from 'react';
import Start from './Main/Start'
import { createStackNavigator,} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createStackNavigator();
const Main = () => {
    
    return (
        
            <Stack.Navigator>
                <Stack.Screen  
                    name="Start"
                    component={Start}/>
            </Stack.Navigator>
        
    );
};

export default Main;