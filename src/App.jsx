import React, { useReducer } from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import axios from 'axios';
import MakeCoffee from './components/MakeCoffee.jsx';
import FindCoffee from './components/FindCoffee.jsx';
import AppContext from './functions.jsx';
import FavoritesDisplay from './components/FavoritesDisplay.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';

axios.defaults.withCredentials = true;

function App() {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3004';

  const initialAppState = {
    coffee: 70,
    milk: { evapMilk: false, condMilk: true },
    ice: false,
    sugar: 'Regular',
  };

  const UPDATE_DIAGRAM_COFFEE = 'UPDATE_DIAGRAM_COFFEE';
  const UPDATE_DIAGRAM_MILK = 'UPDATE_DIAGRAM_MILK';
  const UPDATE_DIAGRAM_ICE = 'UPDATE_DIAGRAM_ICE';
  const UPDATE_DIAGRAM_SUGAR = 'UPDATE_DIAGRAM_SUGAR';

  const reducer = (state, action) => {
    switch (action.type) {
      case UPDATE_DIAGRAM_COFFEE:
        return { ...state, coffee: action.payload };
      case UPDATE_DIAGRAM_MILK:
        return { ...state, milk: action.payload };
      case UPDATE_DIAGRAM_ICE:
        return { ...state, ice: action.payload };
      case UPDATE_DIAGRAM_SUGAR:
        return { ...state, sugar: action.payload };
      default:
        return state;
    }
  };

  const [appState, dispatch] = useReducer(reducer, initialAppState);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const contextState = {
    BACKEND_URL,
    appState,
    dispatch,
    keywords: {
      UPDATE_DIAGRAM_COFFEE,
      UPDATE_DIAGRAM_MILK,
      UPDATE_DIAGRAM_ICE,
      UPDATE_DIAGRAM_SUGAR,
    },
  };

  return (
    <BrowserRouter>
      <AppContext.Provider value={contextState}>
        <Routes>
          <Route path="/makeCoffee" element={<MakeCoffee />} />
          <Route path="/findCoffee" element={<FindCoffee />} />
          <Route path="/favorites" element={<FavoritesDisplay />} />
          <Route path="/map" />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" />
          <Route path="/profile" />
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
