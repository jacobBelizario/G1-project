import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { NowPlayingListItem } from './NowPlayingListItem';

import { API_URL, API_KEY, API_QUERY } from '@env';

// const navigation = useNavigation();
export const NowPlaying = ({ navigation }) => {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}${API_KEY}${API_QUERY}`)
      .then((response) => response.json())
      .then((data) => {
        setMovieList(data.results);
      })
      .catch((error) => console.error(error));
  }, []);
  const renderItem = ({ item }) => (
    <NowPlayingListItem
      data={item}
      onPress={() => navigation.navigate('MovieDetail', { data: item })}
    />
  );

  return (
    <FlatList
      data={movieList}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};
