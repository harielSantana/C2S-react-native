import React from 'react';
import styled from 'styled-components/native';

const HeaderContainer = styled.View`
  padding: 10px;
  align-items: center;
  justify-content: center;
`;

const HeaderText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #000;
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <HeaderText>InnovateTech</HeaderText>
    </HeaderContainer>
  );
};

export default Header;
