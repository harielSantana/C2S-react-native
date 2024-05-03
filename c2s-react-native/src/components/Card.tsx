// Import React and necessary components
import React, { useState } from 'react';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { formatDate } from '../utils/formatDate';

// Define interface for AvatarProps
interface AvatarProps {
  icon: string;
}

// Avatar component
const Avatar: React.FC<AvatarProps> = React.memo(({ icon }) => (
  <AvatarWrapper>
    <StyledAvatar source={{ uri: icon }} />
  </AvatarWrapper>
));

// Define interface for CardProps
interface CardProps {
  title: string;
  icon: string;
  gender: string;
  birth: string;
}

// Card component
const Card: React.FC<CardProps> = React.memo(({ title, icon, gender, birth }) => {
  // Format birth date
  const formattedDate = formatDate(birth);

  // State to manage modal visibility
  const [modalVisible, setModalVisible] = useState(false);

  // Function to handle opening modal
  const handleOpenModal = () => {
    setModalVisible(true);
  };

  // Function to handle closing modal
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity onPress={handleOpenModal}>
        <Wrapper>
          <Avatar icon={icon} />
          <TextWrapper>
            <StyledTitle>{title}</StyledTitle>
            <TextBottomWrapper>
              <Text>{gender}</Text>
              <Text>{formattedDate}</Text>
            </TextBottomWrapper>
          </TextWrapper>
        </Wrapper>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <ModalContent>
          <CloseButton onPress={handleCloseModal}>
            <Text>Close Modal</Text>
          </CloseButton>

          <ModalBody>
            <Image source={{ uri: icon }} style={imageStyle} />
            <Text>{title}</Text> 
            <View style={detailsWrapper}>
              <Text>Gender: {gender}</Text>
              <Text>Birth: {formattedDate}</Text>
            </View>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
});

// Styled components
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

const ModalContent = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top:320px;
  right: 8px;

  padding: 8px;
  border-radius: 8px;
  color: #fff;

  z-index: 1;
  background-color: #ff6464;
`;

// Additional styles for modal
const ModalBody = styled.View`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  height: 60%;

  display: flex;
  align-items:center;
`;

const imageStyle = {
  width: 150,
  height: 150,
  borderRadius: 100,
  marginBottom: 10,
  top: -80
};

const detailsWrapper = {
  marginTop: 10,
};

// Export Card component
export default Card;
