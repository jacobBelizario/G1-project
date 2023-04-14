import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import { NowPlayingStackScreen } from './components/NowPlayingStackScreen';
import { MyPurchasesStackScreen } from './components/MyPurchasesStackScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NowPlayingHomeScreen } from './components/NowPlayingHomeScreen';



const Tab = createBottomTabNavigator()

export default function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false)
  return (
      <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
        name="Now Playing" 
        component={NowPlayingHomeScreen} 
        options={{
          tabBarLabel: 'Now Playing',
          tabBarIcon: ({ color, size }) => (
            <Icon name="list" color={color} size={size} />
          ),
          headerShown:false
        }}
        />
        <Tab.Screen name="My Purchases" 
        component={MyPurchasesStackScreen} 
        options={{
          tabBarLabel: 'My Purchases',
          tabBarIcon: ({ color, size }) => (
            <Icon name="ticket" color={color} size={size} />
          ),
        }}
        />
        {isLoggedIn ? 
                <Tab.Screen name="" 
                component={NowPlayingStackScreen} 
                options={{
                  tabBarLabel: 'My Purchases',
                  tabBarIcon: ({ color, size }) => (
                    <Icon name="ticket" color={color} size={size} />
                  ),
                }}
                />:null       
        }
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
