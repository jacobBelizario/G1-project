import React, { useEffect, useState } from 'react'
import { Text, View, FlatList } from 'react-native'
import { NowPlayingListItem } from './NowPlayingListItem'
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NowPlayingStackScreen } from './NowPlayingStackScreen';
import { NowPlayingListDetail } from './NowPlayingListDetail';

export const NowPlayingHomeScreen = () => {
const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
        <Stack.Screen 
        name="Now Playing" 
        component={NowPlayingStackScreen} 
        />
        <Stack.Screen 
        name="Movie Detail" 
        component={NowPlayingListDetail} 

        />
    </Stack.Navigator>
  )
}
