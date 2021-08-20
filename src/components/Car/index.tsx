import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import GasolineSvg from '../../assets/gasoline.svg';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAcessoryIcon';

import { Container, Details, Brand, Name, About, Rent, Period, Price, Type, CarImage } from './styles';

interface CarProps extends RectButtonProps {
  car: CarDTO;
}

export function Car({ car, ...rest }: CarProps) {
  const MotorIcon = getAccessoryIcon(car.fuel_type);

  return (
    <Container {...rest}>
      <Details>
        <Brand>{car.brand}</Brand>
        <Name>{car.name}</Name>

        <About>
          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>{`R$ ${car.rent.price}`}</Price>
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
