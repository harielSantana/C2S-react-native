// HomeScreen.tsx

import React from 'react';
import { ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import Card from '../../components/Card';
import FilterButton from '../../components/Filter';
import Header from '../../components/Header';
import SearchInput from '../../components/Search';
import useUsers from '../../hooks/useUsers';

const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { users, loading, handleSearch, handleFilterPress, handleEndReached, filterType } = useUsers();

  const renderItem = ({ item }: { item: any }) => (
    <Card
      title={`${item.name.title} ${item.name.first} ${item.name.last}`}
      icon={item.picture.medium}
      gender={item.gender}
      birth={item.registered.date}
    />
  );

  return (
    <KeyboardAvoidingView behavior="padding" style={{ paddingTop: insets.top, paddingHorizontal: 10 }}>
      <Header />
      <SearchWrapper>
        <SearchInput onSearch={handleSearch} placeholder="Busca..." />
        <FilterButton type={filterType} onPress={handleFilterPress}/>
      </SearchWrapper>

      <ContentWrapper
        data={users}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.login.uuid || item.email}
        onEndReached={handleEndReached}
        onEndReachedThreshold={1}
        ListFooterComponent={ <>
          {loading && 
            <LoadingWrapper>
              <ActivityIndicator size="large" color="#ddd" />
              <LoadingMessage>Carregando Mais</LoadingMessage>
            </LoadingWrapper>
          }
        </>}
      />
    </KeyboardAvoidingView>
  );
};

const SearchWrapper = styled.View`
  flex-direction: row;
  gap: 10px;
  margin-bottom: 20px;
`;

const ContentWrapper = styled.FlatList``;

const LoadingWrapper = styled.View`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LoadingMessage = styled.Text`
  text-transform: uppercase;
  font-weight: 600;
  font-size: 16px;
`;

export default HomeScreen;
