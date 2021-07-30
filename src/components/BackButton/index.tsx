import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { BorderlessButtonProps } from 'react-native-gesture-handler';

import theme from '../../styles/theme';

import { Container } from './styles';

interface BackButtonProps extends BorderlessButtonProps{
  color?: string;
}

export function BackButton({ color, ...rest }: BackButtonProps) {
  return (
    <Container {...rest}>
      <MaterialIcons 
        name="chevron-left"
        size={24}
        color={color ? color : theme.colors.text}
      />
    </Container>
  );
}