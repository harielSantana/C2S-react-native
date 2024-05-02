
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
  const [users, setUsers] = useState<any[]>([]);
  const [filterType, setFilterType] = useState<'male' | 'female' | 'default'>('default');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    await fetchUsers(page, filterType === 'default' ? null : filterType, setUsers);
    setLoading(false);
  }, [page, filterType, setUsers]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleSearch = (text: string) => {
    console.log(text);
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

  const handleEndReached = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return {
    users,
    loading,
    filterType,
    fetchUsers: loadUsers,
    handleSearch,
    handleFilterPress,
    handleEndReached,
  };
};

export default useUsers;
