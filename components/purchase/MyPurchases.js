import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import AuthContext from "../../store/auth-context";
import { getAllUserPurchase } from "../../helpers/db-helper";
import { PurchaseListItem } from "./PurchaseListItem";
import Spinner from "react-native-loading-spinner-overlay";

export const MyPurchases = ({ navigation }) => {
  const authCtx = useContext(AuthContext);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function getPurchases() {
      const fetchPurchases = await getAllUserPurchase(authCtx.uid);
      setPurchases(fetchPurchases);
    }
    setLoading(true);
    authCtx.isLoggedIn ? getPurchases() : null;
    setLoading(false);
  }, [authCtx.isLoggedIn]);
  const renderItem = ({ item }) => <PurchaseListItem data={item.data()} />;
  return (
    <View>
      <Spinner
        visible={loading}
        textContent={"Loading..."}
        textStyle={styles.spinnerTextStyle}
      />
      {authCtx.isLoggedIn ? (
        <View>
          {purchases.length > 0 ? (
            <FlatList
              data={purchases}
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
            onPress={() => navigation.navigate("Login")}
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
    justifyContent: "center",
    alignItems: "center",
    height: 400,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonInactive: {
    opacity: 0.5,
    backgroundColor: "#ccc",
    paddingVertical: 12,
    width: 300,
    paddingHorizontal: 24,
    borderRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "orangered",
    paddingVertical: 12,
    width: 300,
    paddingHorizontal: 24,
    borderRadius: 5,
    elevation: 3,
  },
  text: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  textInactive: {
    color: "gray",
    fontSize: 18,
    textAlign: "center",
  },
  spinnerTextStyle: {
    color: "orangered",
  },
});
