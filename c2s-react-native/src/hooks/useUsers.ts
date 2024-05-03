import { useCallback, useEffect, useState } from 'react';
import { fetchUsers } from './_request';

export interface User {
  name: {
    title: string;
    first: string;
    last: string;
  };
  picture: {
    medium: string;
  };
  gender: string;
  registered: {
    date: string;
  };
  login: {
    uuid: string;
  };
  email: string;
}

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filterType, setFilterType] = useState<'male' | 'female' | 'default'>('default');
  const [prevFilterType, setPrevFilterType] = useState(filterType);

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const loadUsers = useCallback(async () => {
    if (filterType !== prevFilterType) {
      setPage(1);
      setPrevFilterType(filterType);
    }

    setLoading(true);
    try {
      const newUsers = await fetchUsers(page, filterType === 'default' ? null : filterType, searchTerm); 
      setUsers((prevUsers) => {
        if (page === 1) {
          return newUsers; 
        } else {
          return [...prevUsers, ...newUsers]; 
        }
      });
    } catch (error) {
      // Trate o erro aqui, se necessário
    }
    setLoading(false);
  }, [filterType, searchTerm]); // Inclua searchTerm na lista de dependências

  const handleEndReached = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSearch = (text: string) => {
    setSearchTerm(text); // Atualiza o termo de busca quando o usuário digita algo
  };

  const handleFilterPress = () => {
    setFilterType((prevFilterType) => {
      switch (prevFilterType) {
        case 'male':
          return 'female';
        case 'female':
          return 'default';
        case 'default':
          return 'male';
        default:
          return prevFilterType;
      }
    });
  };

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return {
    users,
    loading,
    filterType,
    handleSearch,
    handleFilterPress,
    fetchUsers: loadUsers,
    handleEndReached,
  };
};

export default useUsers;
