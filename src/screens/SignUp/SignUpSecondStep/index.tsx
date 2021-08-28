import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { useState } from 'react';
import { StatusBar, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import * as Yup from 'yup';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { PasswordInput } from '../../../components/PasswordInput';
import theme from '../../../styles/theme';

import { Container, Header, Steps, Title, SubTitle, Form, FormTitle  } from './styles';

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  }
}

export function SignUpSecondStep() {
  const { navigate, goBack } = useNavigation();
  const routes = useRoute();

  const { user } = routes.params as Params;

  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  async function handleRegister() {
    try {
      const schema = Yup.object().shape({
        passwordConfirmation: Yup.string().required('Confirmação de senha obrigatória'),
        password: Yup.string().required('Senha obrigatória'),
      });

      await schema.validate({ passwordConfirmation, password });

      if (password !== passwordConfirmation) {
        Alert.alert('As senhas não conferem', 'Verifique seus dados e tente novamente');
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Ops', error.message);
      } else {
        Alert.alert('Erro na autenticação', 'Ocorreu um erro ao fazer login, verifique suas credencias e tente novamente');
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />

          <Header>
            <BackButton onPress={goBack} />
            <Steps>
              <Bullet />
              <Bullet active />
            </Steps>
          </Header>

          <Title>Crie sua{`\n`}conta</Title>
          <SubTitle>Faça seu cadastro de{`\n`}forma rápida e fácil.</SubTitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>

            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
            />

            <PasswordInput
              iconName="lock"
              placeholder="Repetir Senha"
              value={passwordConfirmation}
              onChangeText={setPasswordConfirmation}
            />
          </Form>

          <Button
            title="Cadastrar"
            color={theme.colors.success}
            enabled={true}
            loading={false}
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
