import React from 'react';
import { Feather } from '@expo/vector-icons';
import { TextInputProps } from 'react-native';

import theme from '../../styles/theme';

import { Container, IconContainer, InputText } from './styles';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useState } from 'react';

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
}

export function PasswordInput({ iconName, value, ...rest }: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  function handleChangeVisiblePassword() {
    setIsPasswordVisible(state => !state);
  }

  return (
    <Container isFocused={isFocused}>
      <IconContainer>
        <Feather
          name={iconName}
          size={24}
          color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_detail}
        />
      </IconContainer>

      <InputText
        secureTextEntry={isPasswordVisible}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
      />

      <BorderlessButton onPress={handleChangeVisiblePassword}>
        <IconContainer>
          <Feather
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={24}
            color={theme.colors.text_detail}
          />
        </IconContainer>
      </BorderlessButton>
    </Container>
  );
}
