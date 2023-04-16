import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState, useContext } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NowPlaying } from './playlist/NowPlaying';
import { MyPurchases } from './purchase/MyPurchases';
import { LogoutScreen } from './Auth/LogoutScreen';
import AuthContext from '../store/auth-context';

const Tab = createBottomTabNavigator();

export default function Home() {
  const authCtx = useContext(AuthContext);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="NowPlaying"
        component={NowPlaying}
        options={{
          tabBarLabel: 'Now Playing',
          tabBarIcon: ({ color, size }) => (
            <Icon name="list" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MyPurchases"
        component={MyPurchases}
        options={{
          tabBarLabel: 'My Purchases',
          tabBarIcon: ({ color, size }) => (
            <Icon name="ticket" color={color} size={size} />
          ),
        }}
      />
      {authCtx.isLoggedIn && (
        <Tab.Screen
          name="Logout"
          component={LogoutScreen}
          options={{
            tabBarLabel: 'Logout',
            tabBarIcon: ({ color, size }) => (
              <Icon name="ticket" color={color} size={size} />
            ),
          }}
        />
      )}
    </Tab.Navigator>
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
