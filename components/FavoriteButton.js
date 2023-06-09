import React, { useEffect, useState } from 'react';
import { ref, get, remove, set } from 'firebase/database';
import { db, FAVORITES_REF } from '../firebase/config';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function FavoriteButton({ recipeKey, userKey, navigation, handleRefresh }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleClick = () => {
    // Code to update favorites here
    handleRefresh();
  };

  useEffect(() => {
    if (userKey && recipeKey) {
      const userFavoritesRef = ref(db, `${FAVORITES_REF}/${userKey}`);
      get(userFavoritesRef).then(snapshot => {
        const favorites = snapshot.val() || {};
        setIsFavorite(favorites[recipeKey]);
      });
    }
  }, [userKey, recipeKey, navigation, handleRefresh]);

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
      color={isFavorite ? '#d75e5e' : '#cbb4b4'}
      onPress={() => {
        handleFavorite();
        handleClick();
     }}
    />
  );
}
