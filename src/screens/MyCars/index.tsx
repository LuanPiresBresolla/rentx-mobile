import { useNavigation } from '@react-navigation/native';
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

export interface CarProps {
  car: CarDTO;
  id: number;
  user_id: number;
  startDate: string;
  endDate: string;
}

export function MyCars() {
  const { navigate, goBack } = useNavigation();
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCars() {
      try {
        const response = await api.get('schedules_byuser?user_id=1');

        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    loadCars();
  }, []);

  function handleCarDetails(car: CarDTO) {
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
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign name="arrowright" color={theme.colors.title} size={20} style={{ marginHorizontal: 10 }} />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
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
