import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  height: 113px;

  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  background: ${({ theme }) => theme.colors.header};
`;

export const TotalCars = styled.Text``;