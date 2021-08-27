import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface ContainerProps {
  isFocused: boolean;
}

export const Container = styled.View<ContainerProps>`
  flex-direction: row;
  margin-bottom: 6px;

  ${({ theme, isFocused }) => isFocused && css`
    border-bottom-width: 2px;
    border-bottom-color: ${theme.colors.main};
  `};
`;

export const IconContainer = styled.View`
  width: 55px;
  height: 55px;
  justify-content: center;
  align-items: center;
  margin-right: 2px;

  background: ${({ theme }) => theme.colors.background_secondary};
`;

export const InputText = styled.TextInput`
  flex: 1;
  padding: 0 23px;
  background: ${({ theme }) => theme.colors.background_secondary};

  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
`;
