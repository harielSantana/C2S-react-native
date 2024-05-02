import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';

const FilterButtonContainer = styled.TouchableOpacity<{ type: string }>`
  background-color: ${({ type }) => (type === 'default' ? '#ccc' : type === 'male' ? '#5cabff' : '#ff71d2')};
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  margin-left: 5px;
`;

interface FilterButtonProps {
  onPress: () => void;
  type: 'male' | 'female' | 'default'; 
}

const FilterButton: React.FC<FilterButtonProps> = ({ onPress, type }) => {

  const getIconName = () => {
    switch (type) {
      case 'male':
        return 'male';
      case 'female':
        return 'female';
      case 'default':
        return 'filter';
      default:
        return 'filter';
    }
  };

  const getIconColor = () => {
    return type !== 'default' ? '#fff' : '#909090'; // Define a cor do ícone com base no tipo de filtro
  };

  return (
    <FilterButtonContainer onPress={onPress} type={type}>
      {type !== 'default' ? <Ionicons name={getIconName()} size={20} color={getIconColor()} /> :
      <MaterialIcons name='filter-alt' size={20} color={getIconColor()}/>}
      {/* Renderiza o texto apenas se o tipo for "default" */}
       <ButtonText>{type === 'default' ? 'Filter' : type}</ButtonText>
    </FilterButtonContainer>
  );
};

export default FilterButton;
