import React from 'react';
import { Feather } from '@expo/vector-icons';
import { Calendar as CustomCalendar, LocaleConfig } from 'react-native-calendars';

import theme from '../../styles/theme';

LocaleConfig.locales['pt-br'] = {
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jav', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'],
  today: 'Hoje'
}
LocaleConfig.defaultLocale = 'pt-br';

export function Calendar() {
  return (
    <CustomCalendar
      renderArrow={(direction) => 
        <Feather name={`arrow-${direction}`} color={theme.colors.shape} size={24} /> 
      }
      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.text_detail,
        paddingBottom: 10,
        marginBottom: 10,
      }}
      theme={{
        textDayFontFamily: theme.fonts.primary_400,
        textDayHeaderFontFamily: theme.fonts.primary_500,
        textDayFontSize: 12,
        textMonthFontSize: 20,
        textMonthFontFamily: theme.fonts.secondary_600,
        monthTextColor: theme.colors.title,        
        arrowStyle: {
          marginHorizontal: -15
        }
      }}
      firstDay={1}
      minDate={new Date()}
    />
  );
}