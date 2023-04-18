import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
export const PurchaseListItem = ({ data }) => {
  return (
    <View styles={styles.listItem}>
      <View style={styles.inlineView}>
        <Icon
          name="ticket"
          style={styles.iconStyle}
          color={"orangered"}
          size={50}
        />
        <View>
          <Text style={styles.listItemTitle}>{data.movieTitle}</Text>
          <Text
            style={styles.listItemDate}
          >{`Number Purchased: ${data.qty}`}</Text>
          <Text
            style={{ fontSize: 12, color: "orangered" }}
          >{`Total paid: $${data.total}`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inlineView: {
    flexDirection: "row",
    padding: 5,
    margin: 10,
    justifyContent: "flex-start",
  },
  iconStyle: {
    marginRight: 10,
  },
  listItem: {
    backgroundColor: "#fff",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  listItemDate: {
    fontSize: 12,
  },
});
