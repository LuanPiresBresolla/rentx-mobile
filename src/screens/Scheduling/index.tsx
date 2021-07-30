import React from 'react';
import { StatusBar } from 'react-native';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';

import theme from '../../styles/theme';

import ArrowSvg from '../../assets/arrow.svg';

import { Container, Header, Title, RentalPeriod, DateInfo, DateTitle, DateValue, Content, Footer } from './styles';

export function Scheduling() {
  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton color={theme.colors.shape} />

        <Title>
          Escolha uma{`\n`}
          data de início e{`\n`}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected>18/06/2021</DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={false}></DateValue>
          </DateInfo>
        </RentalPeriod>        
      </Header>

      <Content
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <Calendar />
      </Content>

      <Footer>
        <Button title="Confirmar" />
      </Footer>
    </Container>
  );
}