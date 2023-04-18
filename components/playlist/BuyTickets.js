import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AuthContext from '../../store/auth-context';
import { OrderDetail } from './OrderDetail';

export const BuyTickets = ({ navigation, route }) => {
  const { data } = route.params;
  const authCtx = useContext(AuthContext);
  const [email, setEmail] = useState(authCtx.email);
  const [name, setName] = useState(``);
  const [qty, setQty] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [order, setOrder] = useState({});

  useEffect(() => {
    setSubtotal(12.0 * qty);
    setTax(subtotal * 0.13);
    setOrder({
      email: email,
      name: name,
      qty: qty,
      movieTitle: data.title,
      subtotal: subtotal,
      tax: tax,
      total: subtotal + tax,
    });
  }, [qty, subtotal, tax, name]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.title}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <Text>Number of Tickets: </Text>
      <View style={styles.inlineView}>
        {qty === 0 ? (
          <TouchableOpacity style={styles.inactiveButton}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setQty(qty - 1);
            }}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.counterText}>{qty}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setQty(qty + 1);
          }}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      {qty >= 1 ? (
        <OrderDetail
          data={{ ...order, id: data?.id }}
          navigation={navigation}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  orderContainer: {
    borderColor: 'gray',
    backgroundColor: 'orangered',
    margin: 20,
    borderWidth: 2,
  },
  inlineView: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 2,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: 'orangered',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  counterText: {
    margin: 5,
  },
  inactiveButton: {
    width: 50,
    opacity: 0.5,
    backgroundColor: '#ccc',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  text: {},
  pressableText: {
    marginStart: 10,
    color: 'blue',
  },
});
