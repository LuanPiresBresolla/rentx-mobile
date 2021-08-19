import React from 'react';

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
  About,
  Acessories,
  Footer,
 } from './styles';
import { useNavigation } from '@react-navigation/native';

export function CarDetails() {
  const { navigate, goBack } = useNavigation();

  function handleConfirmRental() {
    navigate('Scheduling');
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={() => goBack()} />
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

        <About>
          O Gerador de Texto Lorem Ipsum pode ser utilizado para você que está desenvolvendo seu projeto e precisa de
          texto aleatório para preencher os espaços e fazer testes. Assim, dá para testar o layout e a formatação
          antes de utilizar com conteúdo real.
        </About>
      </Content>

      <Footer>
        <Button title="Escolher período do aluguel" onPress={handleConfirmRental} />
      </Footer>
    </Container>
  );
}
