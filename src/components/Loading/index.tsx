import React from 'react';
import { ActivityIndicator } from 'react-native';
import theme from '../../styles/theme';

export function Loading() {
  return (
    <ActivityIndicator color={theme.colors.main} size="large" style={{ flex: 1 }} />
  );
}
