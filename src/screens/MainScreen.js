import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';


function mainScreen() {
    return(
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1}}>
          <TabStack.Navigator>
            <TabStack.Screen name="Connect" component={HomeScreen}/>
            <TabStack.Screen name="Connect" component={Board}/>
            <TabStack.Screen name="Connect" component={Chat}/>
            <TabStack.Screen name="Connect" component={Profile}/>
          </TabStack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    );
  }

  const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor:"white",
      paddingTop:30
    },
    NanumRG:{
        fontSize: 20,
        fontFamily: 'NanumGothic',
        marginLeft: 20,
        marginTop: 30
        
      },
      input: {
        backgroundColor:"white",
        height: 40,
        margin: 5,
        marginLeft: 20,
        marginRight: 20,
        borderBottomWidth: 1.5,
      }
})

  export default mainScreen;