import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AuthContext from "../../store/auth-context";

export const LogoutScreen = ({ navigation, route }) => {
  const authCtx = useContext(AuthContext);
  const logoutHandler = async () => {
    await authCtx.logout();
    navigation.navigate("Home");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Are you ready to logout?</Text>
      <TouchableOpacity style={styles.button} onPress={logoutHandler}>
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#ccc",
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
