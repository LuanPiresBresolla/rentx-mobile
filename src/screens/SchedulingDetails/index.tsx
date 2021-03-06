import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

import { Acessory } from '../../components/Acessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';

import theme from '../../styles/theme';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAcessoryIcon';

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
  Accessories,
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
import { format } from 'date-fns';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { api } from '../../services/api';
import { Alert } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { useAuth } from '../../hooks/useAuth';

 interface Params {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

export function SchedulingDetails() {
  const { navigate, goBack } = useNavigation();
  const route = useRoute();
  const { user } = useAuth();
  const { car, dates } = route.params as Params;
  const netInfo = useNetInfo();

  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);
  const [loading, setLoading] = useState(false);

  const rentTotal = Number(dates.length * car.price);

  useEffect(() => {
    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
    });
  }, []);

  useEffect(() => {
    async function getCarUpdated() {
      const response = await api.get(`cars/${car.id}`);

      setCarUpdated(response.data);
    }

    if (netInfo.isConnected === true) {
      getCarUpdated();
    }
  }, [netInfo.isConnected]);

  async function handleCompleteRental() {
    try {
      setLoading(true);
      console.log({
        start_date: new Date(dates[0]),
        end_date: new Date(dates.length - 1),
      });
      await api.post(`rentals`, {
        car_id: car.id,
        user_id: user.user_id,
        start_date: new Date(dates[0]),
        end_date: new Date(dates[dates.length - 1]),
        total: rentTotal,
      }).then(() => {
        navigate('Confirmation', {
          title: 'Carro alugado!',
          message: `Agora voc?? s?? precisa ir\nat?? a concession??ria da RENTX`,
          nextScreen: 'Home',
        });
      }).catch(() => Alert.alert('Ops', 'N??o foi poss??vel confirmar o agendamento'));
    } catch (error) {
      Alert.alert('Ops', 'N??o foi poss??vel confirmar o agendamento')
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={() => goBack()} />
      </Header>

      <CarImages>
      <ImageSlider imagesUrl={!!carUpdated.photos ? carUpdated.photos : [{ id: car.thumbnail, photo: car.thumbnail }]} />
      </CarImages>

      <Content
        contentContainerStyle={{ padding: 24, alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>

        {carUpdated.accessories && (
          <Accessories>
            {carUpdated.accessories.map(accessory => (
              <Acessory
                key={accessory.type}
                icon={getAccessoryIcon(accessory.type)}
                name={accessory.name}
              />
            ))}
          </Accessories>
        )}

        <RentalPeriod>
          <CalendarIcon>
            <Feather name="calendar" size={RFValue(24)} color={theme.colors.shape} />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.startFormatted}</DateValue>
          </DateInfo>

          <Feather name="chevron-right" size={RFValue(10)} color={theme.colors.text} />

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.endFormatted}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ {car.price} x{dates.length} di??rias</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar Agora"
          color={theme.colors.success}
          onPress={handleCompleteRental}
          loading={loading}
          enabled={!loading}
        />
      </Footer>
    </Container>
  );
}
