import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';

import { api } from '../../services/api';

import { Container, Header, HeaderContent, TotalCars, CarList } from './styles';
import { CarDTO } from '../../dtos/CarDTO';
import { Loading } from '../../components/Loading';

export function Home() {
  const { navigate } = useNavigation();
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState<CarDTO[]>([]);

  useEffect(() => {
    async function loadCars() {
      try {
        const response = await api.get('cars');

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
    navigate('CarDetails', { car });
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          <TotalCars>Total de {cars.length} carros</TotalCars>
        </HeaderContent>
      </Header>

      {loading ? <Loading /> : (
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          contentContainerStyle={{ padding: 24 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Car car={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
    </Container>
  );
}
