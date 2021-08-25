import React from 'react';
import Lottie from 'lottie-react-native';

import loadingCar from '../../assets/load_animated.json';

import { Container } from './styles';

export function LoadingAnimated () {
  return (
    <Container>
      <Lottie
        source={loadingCar}
        autoPlay
        loop
        style={{ height: 200 }}
        resizeMode="contain"
      />
    </Container>
  );
}
