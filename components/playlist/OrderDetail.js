import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const OrderDetail = ({ data }) => {
  const insertToDB = () => {
    //insert to subcollections
    //so use authCtx.email as the refiD
  };

  return (
    <View>
      <Text style={styles.heading}>Order Summary: </Text>
      <View style={styles.container}>
        <Text style={styles.heading}>{data.movieTitle}</Text>
        <Text style={styles.ordertext}>Number of Tickets: {data.qty}</Text>
        <Text style={styles.ordertext}>
          Subtotal: ${data.subtotal.toFixed(2)}
        </Text>
        <Text style={styles.ordertext}>Tax: ${data.tax.toFixed(2)}</Text>
        <Text style={styles.totalText}>Total: ${data.total.toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={insertToDB}>
        <Text style={styles.text}>Confirm Purchase</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    borderColor: "gray",
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
  },
  ordertext: {
    fontSize: 15,
    marginBottom: 5,
    marginTop: 5,
  },
  totalText: {
    fontSize: 20,
    marginBottom: 5,
    marginTop: 5,
    fontWeight: "bold",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 5,
  },
  button: {
    marginTop: 20,
    width: "100%",
    height: 50,
    backgroundColor: "orangered",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  text: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});
