/* eslint-disable max-len */
import React, { useContext } from 'react';
import {
  Box, Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb, SliderMark,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import AppContext from '../../functions.jsx';
import typoStyles from '../Typography.module.css';
import Preset from './Preset.jsx';

function CoffeeDiagramMain() {
  const { appState, dispatch, keywords } = useContext(AppContext);
  const coffeeLayerProportion = appState.coffee;
  const waterLayerProportion = 100 - appState.coffee;

  const { UPDATE_DIAGRAM_COFFEE, SET_FAVORITE } = keywords;

  const coffeeWrapperVariant = {
    hidden: {
      y: '-100vh',
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.5,
        when: 'beforeChildren',
        duration: 0.5,
      },
    },
  };

  const layerVariant = {
    hidden: {
      x: '-10',
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      delay: 0.2,
      staggeredChildren: 0.2,
      transition: {
        delay: 1,
      },
    },
  };

  const handleCoffeeLayer = (value) => {
    dispatch({ type: SET_FAVORITE, payload: false });
    if (value >= 60 && value <= 100) {
      dispatch({ type: UPDATE_DIAGRAM_COFFEE, payload: value });
    }
  };

  console.log(appState);

  return (
    <>
      <div className="small-logo-wrapper">
        <img src="../../images/logo-icon/full-logo.png" alt="small-logo" className="small-logo-icon" />
      </div>
      <div className={typoStyles['title-main']}> Make your own Coffee</div>
      <Preset />
      <motion.div
        className="coffee-main-page-wrapper"
        variants={coffeeWrapperVariant}
        initial="hidden"
        animate="visible"
      >
        <div id="coffee-img-wrapper">
          <img
            src="../../images/logo-icon/coffeecup-outline.png"
            alt="coffee-cup-outline"
            id="coffee-cup-outline"
          />
        </div>
        <div className="all-layers-wrapper">
          <AnimatePresence>

            {appState.ice
          && (
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              exit={{ opacity: 0, transition: 0.1 }}
              className="ice-image"
            >
              {' '}
              ICE IMAGE
            </motion.div>
          )}
            { (appState.milk.evapMilk || appState.milk.condMilk)
          && (
          <motion.div
            variants={layerVariant}
            className="milk-layer"
            exit={{ opacity: 0, transition: 0.1 }}
          />
          ) }
          </AnimatePresence>
          <motion.div
            className="water-layer"
            style={{ height: `${(waterLayerProportion / 100) * 90}%` }}
            variants={layerVariant}
          >
            water
          </motion.div>
          <motion.div
            className="coffee-layer"
            style={{ height: `${(coffeeLayerProportion / 100) * 90}%` }}
            variants={layerVariant}
          >
            coffee
          </motion.div>
        </div>
      </motion.div>
      <Box mx="auto">
        <Slider step={10} aria-label="slider-ex-2" value={coffeeLayerProportion} max={100} colorScheme="pink" defaultValue={70} onChange={handleCoffeeLayer} id="proportion-slider">
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
          <SliderMark
            value={coffeeLayerProportion}
            textAlign="center"
            bg="pink.400"
            color="white"
            mt="-10"
            ml="-5"
            w="12"
          >
            {coffeeLayerProportion}
            %
          </SliderMark>
        </Slider>
      </Box>
      <Box width={300} sx={{ mx: 'auto' }} className="slider-label">
        <div> Coffee</div>
        <div> Water</div>
      </Box>

    </>
  );
}

export default CoffeeDiagramMain;
