import React, { useState, useReducer, useMemo, useRef, useCallback } from 'react';
import useCharacters from '../hooks/useCharacters';
import Search from './Search';
import '../styles/Characters.css'

const initialState = {
  favorites: []
}

const API = 'https://rickandmortyapi.com/api/character/';

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVORITE':
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };
    default:
      return state;
  }
}

const Characters = () => {
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
  const [search, setSearch] = useState('');
  const searchInput = useRef(null);

  const characters = useCharacters(API);

  const handleClick = favorite => {
    dispatch({ type: 'ADD_TO_FAVORITE', payload: favorite })
  }

  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value);
  }, [])

  const filteredUsers = useMemo(() =>
    characters.filter((user) => {
      return user.name.toLowerCase().includes(search.toLowerCase());
    }),
  [characters, search]
  )

  

  return (
    <>
    <div className='Characters'>
      {favorites.favorites.map(favorite => (
        <>
        <div className='Characters__favorite'>
            <img className='Characters__imagen' src={favorite.image} alt={favorite.name} />
            <small>{favorite.name}</small>
        </div>
        </> 
      ))}
    </div>
    <br />
    <div className="col">
      <div className="row mb-3">
        <Search 
          search={search} 
          searchInput={searchInput} 
          handleSearch={handleSearch} 
        />
      </div>
    </div>
    <div className='container-sm'>
      <div className='row row-cols-1 row-cols-md-2 g-4'>
        {filteredUsers.map((character) => (
        <div className='col col-6 col-md-4 col-lg-3' key={character.id}>
          <div className="card-rick">
            <img className="rounded" src={character.image} alt={character.name} />
            <div className="card-body">
              <h5 className="card-title">{character.name}</h5>
              <button type='button' className="btn btn-primary" onClick={() => handleClick(character)}>Agregar a Favoritos</button>
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Characters;
