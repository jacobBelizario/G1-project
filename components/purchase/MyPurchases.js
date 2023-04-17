import React, { useContext, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import AuthContext from "../../store/auth-context";

export const MyPurchases = ({ navigation }) => {
  const authCtx = useContext(AuthContext);
  const [purchases, setPurchases] = useState([]);

  return (
    <View>
      {authCtx.isLoggedIn ? (
        <View></View>
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
});
