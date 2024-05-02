import React, { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import FilterButton from '../../components/Filter';
import Header from '../../components/Header';
import SearchInput from '../../components/Search';


const FilteredText = styled.Text`
  font-size: 18px;
  margin-top: 20px;
`;

const SearchWrapper = styled.View`
  flex-direction:row;
  gap: 10px;
`

const HomeScreen = () => {
  const insets = useSafeAreaInsets(); // Get the safe area insets

  const [searchResult, setSearchResult] = useState('');
  const [filterType, setFilterType] = useState<'male' | 'female' | 'default'>('default'); // Estado para controlar o tipo de filtro


  const handleSearch = (text: string) => {
    setSearchResult(text);
  };

  const handleFilterPress = () => {
    // Alterna entre os tipos de filtro: male, female e default
    switch (filterType) {
      case 'male':
        setFilterType('female');
        break;
      case 'female':
        setFilterType('default');
        break;
      case 'default':
        setFilterType('male');
        break;
      default:
        break;
    }
  };


  return (
    <KeyboardAvoidingView behavior="padding" style={{ paddingTop: insets.top, paddingHorizontal: 20 }}>    
      <Header/>
      <SearchWrapper>
        <SearchInput onSearch={handleSearch} placeholder="Search..." />
        <FilterButton onPress={handleFilterPress} type={filterType} />
        
      </SearchWrapper>
      <FilteredText>Filtered Data:</FilteredText>
      
    </KeyboardAvoidingView>
  );
};

export default HomeScreen