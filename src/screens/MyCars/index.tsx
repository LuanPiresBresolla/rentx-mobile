import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { Loading } from '../../components/Loading';
import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';
import theme from '../../styles/theme';
import { AntDesign } from '@expo/vector-icons';

import {
  Container, Header, Title, SubTitle, CarList, Content, Appointments, AppointmentsTitle, AppointmentsQuantity,
  CarWrapper, CarFooter, CarFooterTitle, CarFooterPeriod, CarFooterDate,
} from './styles';
import { LoadingAnimated } from '../../components/LoadingAnimated';
import { Car as ModelCar } from '../../database/models/Car';
import { format, parseISO } from 'date-fns';

export interface DataProps {
  id: string;
  car: ModelCar;
  start_date: string;
  end_date: string;
}

export function MyCars() {
  const { navigate, goBack } = useNavigation();
  const [cars, setCars] = useState<DataProps[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(() => {
    async function loadCars() {
      try {
        const response = await api.get('rentals');
        const rentals = response.data.map((item: DataProps) => {
          return {
            ...item,
            start_date: format(parseISO(item.start_date), 'dd/MM/yyyy'),
            end_date: format(parseISO(item.end_date), 'dd/MM/yyyy'),
          }
        });

        setCars(rentals);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    loadCars();
  });

  function handleCarDetails(car: ModelCar) {
    navigate('CarDetails', { car, disabled: true });
  }

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton color={theme.colors.shape} onPress={() => goBack()} />

        <Title>
          Seus agendamentos,{`\n`}
          estão aqui.
        </Title>

        <SubTitle>
          Conforto, segurança e praticidade.
        </SubTitle>
      </Header>

      <Content>
        <Appointments>
          <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
          <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
        </Appointments>

        {loading ? <LoadingAnimated /> : (
          <CarList
            data={cars}
            keyExtractor={item => String(item.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car car={item.car} onPress={() => handleCarDetails(item.car)} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>

                  <CarFooterPeriod>
                    <CarFooterDate>{item.start_date}</CarFooterDate>
                    <AntDesign name="arrowright" color={theme.colors.title} size={20} style={{ marginHorizontal: 10 }} />
                    <CarFooterDate>{item.end_date}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        )}
      </Content>
    </Container>
  );
}
