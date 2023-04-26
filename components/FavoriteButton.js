import React, { useEffect, useState } from 'react';
import { ref, get, remove, set } from 'firebase/database';
import { db, FAVORITES_REF } from '../firebase/config';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function FavoriteButton({ recipeKey, userKey, navigation }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (userKey && recipeKey) {
        console.log('nyt se tekee')
      const userFavoritesRef = ref(db, `${FAVORITES_REF}/${userKey}`);
      get(userFavoritesRef).then(snapshot => {
        const favorites = snapshot.val() || {};
        setIsFavorite(favorites[recipeKey]);
      });
    }
  }, [userKey, recipeKey, navigation]);

  const handleFavorite = () => {
    const userFavoritesRef = ref(db, `${FAVORITES_REF}/${userKey}/${recipeKey}`);
    if (isFavorite) {
      remove(userFavoritesRef).then(() => setIsFavorite(false));
    } else {
      set(userFavoritesRef, true).then(() => setIsFavorite(true));
    }
  };

  return (
    <MaterialCommunityIcons
      name={isFavorite ? 'heart' : 'heart-outline'}
      size={30}
      color={isFavorite ? 'red' : 'black'}
      onPress={handleFavorite}
    />
  );
}
