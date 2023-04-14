import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { NowPlayingListItem } from './NowPlayingListItem'
import { useNavigation } from '@react-navigation/native';

const apikey = "a07e43d1c79220d6b6120c89fe99f954"

// const navigation = useNavigation();
export const NowPlayingStackScreen = ({navigation}) => {
  
  const [movieList,setMovieList] = useState([])
  
  useEffect(()=> {
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&
    language=en-US&page=1&region=CA`)
    .then(response => response.json())
    .then(data => {
        setMovieList(data.results)
    
    })
    .catch(error => console.error(error));
  },[])
  const renderItem = ({ item }) => (
    <NowPlayingListItem data={item} onPress={() => navigation.navigate('Movie Detail',{data:item})} />
  );

  return (
        <FlatList
        data={movieList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        />
  )
}
