import React from 'react';
import { View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <View
        style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        }}>
        <Image
            source={require('./src/assets/studio-buddy-logo.png')}
            style={{width: '90%', resizeMode: 'contain', margin: 30}}
            />
      </View>
    </NavigationContainer>
  );
};
export default App;
