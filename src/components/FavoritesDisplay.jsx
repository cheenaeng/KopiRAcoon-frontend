import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Container } from '@chakra-ui/react';
import AppContext from '../functions.jsx';
import CoffeeName from './coffee-components/CoffeeName.jsx';
import NavBar from './NavBar.jsx';
import CreateNote from './favorites-notes-components/CreateNote.jsx';

function FavoritesDisplay() {
  const [favoritesList, setFavoritesList] = useState([]);
  const { BACKEND_URL } = useContext(AppContext);

  useEffect(() => {
    const findFavorites = async () => {
      const allFavList = await axios.get(`${BACKEND_URL}/allFavorites`);
      console.log(allFavList.data.allCoffeeData);
      setFavoritesList(allFavList.data.allCoffeeData);
    };
    findFavorites();
  }, []);

  console.log(favoritesList);
  return (
    <Container className="main-container-wrapper" maxWidth="410px">
      <div className="small-logo-wrapper">
        <img src="../../images/logo-icon/full-logo.png" alt="small-logo" className="small-logo-icon" />
      </div>
      <h1>Show all favorites</h1>
      {favoritesList.map((favCoffee) => (
        <div>
          {CoffeeName(favCoffee.proportion)}
          <div>
            <CreateNote coffeeId={favCoffee.coffeeId} />
          </div>
        </div>
      ))}
      <NavBar />
    </Container>
  );
}

export default FavoritesDisplay;
