import React from 'react';
import { Image } from 'react-native'; // Import Image component
import styled from 'styled-components/native';
import { formatDate } from '../utils/formatDate';

interface AvatarProps {
  icon: string;
}

const Avatar: React.FC<AvatarProps> = React.memo(({ icon }) => (
  <AvatarWrapper>
    <StyledAvatar source={{ uri: icon }} />
  </AvatarWrapper>
));

interface CardProps {
  title: string;
  icon: string; // Assuming the icon URL is a string
  gender: string;
  birth: string; // Assuming birth is a string in milliseconds or a parsable format
}

const Card: React.FC<CardProps> = React.memo(({ title, icon, gender, birth }) => {

  // Use the formatDate function
  const formattedDate = formatDate(birth);

  return (
    <Wrapper>
      <Avatar icon={icon} />
      <TextWrapper>
        <StyledTitle>{title}</StyledTitle>

        <TextBottomWrapper>
          <TextBottom>{gender}</TextBottom>
          <TextBottom>{formattedDate}</TextBottom>
        </TextBottomWrapper>
      </TextWrapper>
    </Wrapper>
  );
});

const Wrapper = styled.View`
  display: flex;
  flex-direction: row;

  justify-content: stretch;

  gap: 15px;

  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;

  border: 2px solid #52525225;
`;

const AvatarWrapper = styled.View`
  width: 23%;
`;

const StyledAvatar = styled(Image)`
  width: 80px;
  height: 80px;
  border-radius: 100px;
`;

const TextWrapper = styled.View`
  width: 72%;
  gap: 10px;
`;

const StyledTitle = styled.Text`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 5px;
`;

const TextBottomWrapper = styled.View`
  display: flex;
  flex-direction: row;

  justify-content: space-between;

  gap: 10px;
`;

const TextBottom = styled.Text`
  color: #333;
`;

export default Card;
