import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useState } from 'react';
import { StatusBar, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import * as Yup from 'yup';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import theme from '../../../styles/theme';


import { Container, Header, Steps, Title, SubTitle, Form, FormTitle  } from './styles';

export function SignUpFirstStep() {
  const { navigate, goBack } = useNavigation();

  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [driverLicense, setDriverLicense] = useState('');

  async function handleNextStep() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required('CNH obrigatória'),
        email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
        nome: Yup.string().required('Nome obrigatório'),
      });

      const user = {
        nome,
        email,
        driverLicense,
      };

      await schema.validate(user);

      navigate('SignUpSecondStep', { user });
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
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>Crie sua{`\n`}conta</Title>
          <SubTitle>Faça seu cadastro de{`\n`}forma rápida e fácil.</SubTitle>

          <Form>
            <FormTitle>1. Dados</FormTitle>

            <Input
              iconName="user"
              placeholder="Nome"
              value={nome}
              onChangeText={setNome}
            />

            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              value={driverLicense}
              onChangeText={setDriverLicense}
            />
          </Form>

          <Button
            title="Próximo"
            enabled={true}
            loading={false}
            onPress={handleNextStep}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
