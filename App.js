import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NowPlaying } from './components/playlist/NowPlaying';
import { MyPurchases } from './components/purchase/MyPurchases';
import { LogoutScreen } from './components/Auth/LogoutScreen';
import { LoginScreen } from './components/Auth/LoginScreen';
import Home from './components/HomeScreen';
import { NowPlayingListDetail } from './components/playlist/NowPlayingListDetail';
import { AuthContextProvider } from './store/auth-context';
import { BuyTickets } from './components/playlist/BuyTickets';
import { DbContextProvider } from './store/db-context';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthContextProvider>
      <DbContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: { backgroundColor: 'orangered' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Logout" component={LogoutScreen} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="NowPlaying" component={NowPlaying} />
            <Stack.Screen name="MovieDetail" component={NowPlayingListDetail} />
            <Stack.Screen name="MyPurchases" component={MyPurchases} />
            <Stack.Screen name="BuyTickets" component={BuyTickets} />
          </Stack.Navigator>
        </NavigationContainer>
      </DbContextProvider>
    </AuthContextProvider>
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
