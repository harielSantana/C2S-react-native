import React, { useState } from 'react';
import styled from 'styled-components/native';

interface SearchInputProps {
  onSearch: (text: string) => void; // Função para lidar com a busca
  placeholder?: string;
}

const SearchInputContainer = styled.View`
  width: 70%;
`;

const TextInput = styled.TextInput`
  padding: 10px;
  border: 2px solid #ccc;
`;

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, placeholder = 'Search' }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (text: string) => {
    setSearchTerm(text);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <SearchInputContainer>
      <TextInput
        placeholder={placeholder}
        value={searchTerm}
        onChangeText={handleInputChange}
        onSubmitEditing={handleSearch} // Chamada quando o usuário pressiona 'Enter'
      />
    </SearchInputContainer>
  );
};

export default SearchInput;
