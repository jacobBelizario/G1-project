import React, { Fragment } from 'react'
import { Text,View,StyleSheet,Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
export const NowPlayingListDetail = ({route},isLoggedIn) => {

  const {data} = route.params
  const imageUrl = `https://image.tmdb.org/t/p/w500${data.backdrop_path}`
  return (
    <View>
    <Image
        style={styles.image}
        source={{ uri: imageUrl }}
    />

    <View style={styles.inlineView}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.title}>{(data.vote_average*10)}%<Icon name="star" color={'orange'} size={20}/></Text>
    </View>
    <Text style={styles.date}>Release Date: {data.release_date}</Text>

    
    <Text style={styles.plot}>Plot</Text>
    <Text style={styles.summary}>{data.overview}</Text>

    <View style={styles.buttonContainer}>

    {isLoggedIn ?
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Buy Tickets</Text>
      </TouchableOpacity>

      :
      //React tricks
      <Fragment>
      <Text>You must be logged in to use this feature</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Buy Tickets</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Login or Create New Account</Text>
      </TouchableOpacity>
      </Fragment>
    }


    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    image: {
      width: '100%',
      height: 300,
      resizeMode: 'cover',
    },
    inlineView: {
        flexDirection: 'row',
        justifyContent:'space-between',
        padding: 10,
        borderRadius: 5,
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold'
      },
      date: {
        paddingLeft:10,
        color:'gray',
        fontSize: 15,
      },
      plot: {
        fontSize:15,
        marginTop:30,
        padding:10,
        fontWeight:'bold'
      },
      summary: {
        paddingLeft:10,
        fontSize:12,
      },
      buttonContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
      button: {
        backgroundColor: 'salmon',
        paddingVertical: 12,
        width:300,
        paddingHorizontal: 24,
        borderRadius: 5,
        elevation: 3,
      },
      text: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
      },
  });