import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import theme from '../../styles/theme';

import { Container, Title } from './styles';

interface ButtonProps extends RectButtonProps {
  title: string;
  color?: string;
  loading?: boolean;
}

export function Button({ title, color, loading, enabled = true, ...rest }: ButtonProps) {
  return (
    <Container color={color} enabled={enabled} {...rest} style={{ opacity: (!enabled ?? loading) ? 0.5 : 1 }}>
      {loading ? (
        <ActivityIndicator size="small" color={theme.colors.shape} />
      ) : (
        <Title>{title}</Title>
      )}
    </Container>
  );
}
