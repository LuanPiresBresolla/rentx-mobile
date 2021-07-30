import React from 'react';

import GasolineSvg from '../../assets/gasoline.svg';

import { Container, Details, Brand, Name, About, Rent, Period, Price, Type, CarImage } from './styles';

interface Car {
  brand: string;
  name: string;
  thumbnail: string;
  rent: {
    period: string;
    price: number;
  }
}

interface CarProps {
  car: Car;
}

export function Car({ car }: CarProps) {
  return (
    <Container>
      <Details>
        <Brand>{car.brand}</Brand>
        <Name>{car.name}</Name>

        <About>
          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>{`R$ ${car.rent.price}`}</Price>
          </Rent>

          <Type>
            <GasolineSvg />
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