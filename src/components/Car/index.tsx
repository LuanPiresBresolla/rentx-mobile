import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useNetInfo } from '@react-native-community/netinfo';

import { Car as ModalCar } from '../../database/models/Car';
import { getAccessoryIcon } from '../../utils/getAcessoryIcon';

import { Container, Details, Brand, Name, About, Rent, Period, Price, Type, CarImage } from './styles';

interface CarProps extends RectButtonProps {
  car: ModalCar;
}

export function Car({ car, ...rest }: CarProps) {
  const MotorIcon = getAccessoryIcon(car.fuel_type);
  const netInfo = useNetInfo();

  return (
    <Container {...rest}>
      <Details>
        <Brand>{car.brand}</Brand>
        <Name>{car.name}</Name>

        <About>
          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {netInfo.isConnected === true ? car.price : '...'}</Price>
          </Rent>

          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>

      <CarImage
        source={{ uri: car.thumbnail }}
        resizeMode="contain"
      />
    </Container>
  );
}
