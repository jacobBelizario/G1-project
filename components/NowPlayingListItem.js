import React from 'react'
import { Text, TouchableOpacity , StyleSheet } from 'react-native'

export const NowPlayingListItem = ({data,onPress}) => {
  return (
    <TouchableOpacity style={styles.listItem} onPress={onPress}>
      <Text style={styles.listItemTitle}>{data.title}</Text>
      <Text style={styles.listItemDate}>{`Release Date: ${data.release_date}`}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    listItem: {
      backgroundColor: '#fff',
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    listItemTitle: {
      fontSize: 16,
    },
    listItemDate: {
        fontSize: 12,
      },
  });
