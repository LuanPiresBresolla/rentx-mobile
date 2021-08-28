import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface Props {
  isFocused: boolean;
}

export const Container = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`;

export const IconContainer = styled.View<Props>`
  width: 55px;
  height: 55px;
  justify-content: center;
  align-items: center;
  margin-right: 2px;

  background: ${({ theme }) => theme.colors.background_secondary};

  ${({ theme, isFocused }) => isFocused && css`
    border-bottom-width: 2px;
    border-bottom-color: ${theme.colors.main};
  `};
`;

export const InputText = styled.TextInput<Props>`
  flex: 1;
  padding: 0 23px;
  background: ${({ theme }) => theme.colors.background_secondary};

  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};

  ${({ theme, isFocused }) => isFocused && css`
    border-bottom-width: 2px;
    border-bottom-color: ${theme.colors.main};
  `};
`;
