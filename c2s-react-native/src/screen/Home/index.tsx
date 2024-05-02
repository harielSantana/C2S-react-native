import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import Card from '../../components/Card';
import FilterButton from '../../components/Filter';
import Header from '../../components/Header';
import SearchInput from '../../components/Search';

const HomeScreen = () => {
  const insets = useSafeAreaInsets();

  const [users, setUsers] = useState<any[]>([]);
  const [searchResult, setSearchResult] = useState('');
  const [filterType, setFilterType] = useState<'male' | 'female' | 'default'>('default');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://randomuser.me/api/?page=${page}&results=2`);
      const data = await response.json();
      setUsers((prevUsers: any[]) => [...prevUsers, ...data.results]);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      // setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSearch = (text: string) => {
    setSearchResult(text);
  };

  const handleFilterPress = () => {
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

  const renderItem = ({ item }: any) => {
    const shouldRender =
      filterType === 'default' ||
      (filterType === 'male' && item.gender === 'male') ||
      (filterType === 'female' && item.gender === 'female');

    if (!shouldRender) return null;

    return <Card title={`${item.name.title} ${item.name.first} ${item.name.last}`} icon={item.picture.medium} gender={item.gender} birth={item.registered.date} />;
  };

  const handleEndReached = () => {
    setLoading(true);
    setTimeout(() => {
      // setLoading(false);
      setPage(page + 1);
    }, 4000)
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ paddingTop: insets.top, paddingHorizontal: 10 }}>
      <Header />
      <SearchWrapper>
        <SearchInput onSearch={handleSearch} placeholder="Busca..." />
        <FilterButton onPress={handleFilterPress} type={filterType} />
      </SearchWrapper>

      <ContentWrapper
        data={users}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem} 
        keyExtractor={(item: any) => item.login.uuid || item.email} 
        onEndReached={handleEndReached} 
        onEndReachedThreshold={1}
        ListFooterComponent={
        <>
          {loading && 
            <LoadingWrapper>
              <ActivityIndicator size="large" color="#ddd" />
              <LoadingMessage>Carregando Mais</LoadingMessage>
            </LoadingWrapper>
          }
        </>
        }
      />
    </KeyboardAvoidingView>
  );
};

const SearchWrapper = styled.View`
  flex-direction: row;
  gap: 10px;

  margin-bottom: 20px;
`;

const ContentWrapper = styled.FlatList`
`;

const LoadingWrapper = styled.View`
  display: flex;
  align-items: center;
  
  background-color: red;

  gap: 12px;
`; 

const LoadingMessage = styled.Text`
  text-transform: uppercase;
  font-weight: 600;
  font-size: 16px;
`;

export default HomeScreen;
