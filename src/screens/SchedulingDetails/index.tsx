import React from 'react';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

import { Acessory } from '../../components/Acessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';

import SpeedSvg from '../../assets/speed.svg';
import AccelerationSvg from '../../assets/acceleration.svg';
import ForceSvg from '../../assets/force.svg';
import GasolineSvg from '../../assets/gasoline.svg';
import ExchangeSvg from '../../assets/exchange.svg';
import PeopleSvg from '../../assets/people.svg';

import theme from '../../styles/theme';

import { 
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Acessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
 } from './styles';

export function SchedulingDetails() {
  return (
    <Container>
      <Header>
        <BackButton />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={['https://w7.pngwing.com/pngs/444/585/png-transparent-2018-audi-tt-rs-car-audi-rs5-coupe-audi-compact-car-car-performance-car-thumbnail.png', 'https://w7.pngwing.com/pngs/444/585/png-transparent-2018-audi-tt-rs-car-audi-rs5-coupe-audi-compact-car-car-performance-car-thumbnail.png']} />
      </CarImages>

      <Content
        contentContainerStyle={{ padding: 24, alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        <Details>
          <Description>
            <Brand>Lamborghini</Brand>
            <Name>Huracan</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580</Price>
          </Rent>
        </Details>

        <Acessories>
          <Acessory icon={SpeedSvg} name="380Km/h" />
          <Acessory icon={AccelerationSvg} name="3.2s" />
          <Acessory icon={ForceSvg} name="800 HP" />
          <Acessory icon={GasolineSvg} name="Gasolina" />
          <Acessory icon={ExchangeSvg} name="Auto" />
          <Acessory icon={PeopleSvg} name="2 Pessoas" />
        </Acessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather name="calendar" size={RFValue(24)} color={theme.colors.shape} />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>18/06/2021</DateValue>
          </DateInfo>

          <Feather name="chevron-right" size={RFValue(10)} color={theme.colors.text} />

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>18/06/2021</DateValue>
          </DateInfo>
        </RentalPeriod>
      
        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ 580 x3 diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ 2.900</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button title="Alugar Agora" color={theme.colors.success} />
      </Footer>
    </Container>
  );
}