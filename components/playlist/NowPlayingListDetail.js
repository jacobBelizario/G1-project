import React, { Fragment, useContext, useState } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AuthContext from "../../store/auth-context";
import { IMAGE_API } from "@env";

export const NowPlayingListDetail = ({ navigation, route }) => {
  const authCtx = useContext(AuthContext);
  console.log(`user uid: ${authCtx.uid}`);
  const { data } = route.params;
  const imageUrl = `${IMAGE_API}${data.backdrop_path}`;
  return (
    <View>
      <Image style={styles.image} source={{ uri: imageUrl }} />

      <View style={styles.inlineView}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.title}>
          {data.vote_average * 10}%
          <Icon name="star" color={"orange"} size={20} />
        </Text>
      </View>
      <Text style={styles.date}>Release Date: {data.release_date}</Text>

      <Text style={styles.plot}>Plot</Text>
      <Text style={styles.summary}>{data.overview}</Text>

      <View style={styles.buttonContainer}>
        {authCtx.isLoggedIn ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("BuyTickets", { data: data })}
          >
            <Text style={styles.text}>Buy Tickets</Text>
          </TouchableOpacity>
        ) : (
          <Fragment>
            <Text style={{ marginBottom: 20, color: "gray" }}>
              You must be logged in to use this feature
            </Text>
            <View style={styles.buttonInactive}>
              <Text style={styles.textInactive}>Buy Tickets</Text>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.text}>Login or Create New Account</Text>
            </TouchableOpacity>
          </Fragment>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  inlineView: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  date: {
    paddingLeft: 10,
    color: "gray",
    fontSize: 15,
  },
  plot: {
    fontSize: 15,
    marginTop: 30,
    padding: 10,
    fontWeight: "bold",
  },
  summary: {
    paddingLeft: 10,
    fontSize: 12,
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
