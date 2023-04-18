import React, { useContext, useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import AuthContext from '../../store/auth-context';
import { PurchaseListItem } from './PurchaseListItem';
import Spinner from 'react-native-loading-spinner-overlay';
import DbContext from '../../store/db-context';

export const MyPurchases = ({ navigation }) => {
  const authCtx = useContext(AuthContext);
  const dbCtx = useContext(DbContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('is user logged in', authCtx.isLoggedIn);
    //fetch user purchases for the first time when this renders
    setLoading(true);
    async function getPurchases() {
      const fetchPurchases = await dbCtx.getPurchases(authCtx.email);
    }
    authCtx.isLoggedIn && getPurchases();
    setLoading(false);
  }, [authCtx.isLoggedIn]);

  useEffect(() => {
    console.log('is user logged in', authCtx.isLoggedIn);
    //fetch user purchases for the first time when this renders
    setLoading(true);
    async function getPurchases() {
      console.log('about to fetch user data');
      const fetchPurchases = await dbCtx.getPurchases(authCtx.email);
    }
    authCtx.isLoggedIn && getPurchases();
    setLoading(false);
  }, []);

  const renderItem = ({ item }) => <PurchaseListItem data={item.data()} />;
  return (
    <View>
      {loading && (
        <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      )}

      {authCtx.isLoggedIn ? (
        <View>
          {dbCtx.myPurchases.length > 0 ? (
            <FlatList
              data={dbCtx.myPurchases}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          ) : (
            <View style={styles.container}>
              <Text>No Purchases buy a ticket now</Text>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>This feature is only for users</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonInactive: {
    opacity: 0.5,
    backgroundColor: '#ccc',
    paddingVertical: 12,
    width: 300,
    paddingHorizontal: 24,
    borderRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'orangered',
    paddingVertical: 12,
    width: 300,
    paddingHorizontal: 24,
    borderRadius: 5,
    elevation: 3,
  },
  text: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  textInactive: {
    color: 'gray',
    fontSize: 18,
    textAlign: 'center',
  },
  spinnerTextStyle: {
    color: 'orangered',
  },
});
