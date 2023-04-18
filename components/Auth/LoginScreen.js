import React, { useContext, useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AuthContext from "../../store/auth-context";

export const LoginScreen = ({ navigation, route }) => {
  const authCtx = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNewAccount, setIsNewAccount] = useState(false);

  const handleSignUp = async () => {
    console.log(`signing up with email: ${email} and password: ${password}`);
    const signUpRes = await authCtx.signup({ email, password });

    if (signUpRes.status) {
      navigation.navigate("Home");
    } else {
      Alert.alert(signUpRes.message);
    }
  };

  const handleLogin = async () => {
    console.log(`Logging in with email: ${email} and password: ${password}`);
    const loginRes = await authCtx.login({ email, password });
    console.log(loginRes);
    if (loginRes.status) {
      navigation.navigate("Home");
    } else {
      Alert.alert(loginRes.message);
    }
  };

  return (
    <View style={styles.container}>
      {isNewAccount ? (
        <Text style={styles.heading}>Sign Up</Text>
      ) : (
        <Text style={styles.heading}>Login</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      {!isNewAccount && (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      )}
      {isNewAccount && (
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      )}

      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {isNewAccount ? "Already have an account?" : "New user?"}
        </Text>
        <Pressable onPress={() => setIsNewAccount((prev) => !prev)}>
          <Text style={styles.pressableText}>
            {isNewAccount ? "login" : "sign up"}
          </Text>
        </Pressable>
      </View>
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
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "orangered",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  text: {},
  pressableText: {
    marginStart: 10,
    color: "blue",
  },
});
