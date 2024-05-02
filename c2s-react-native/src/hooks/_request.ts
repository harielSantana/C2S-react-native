export const fetchUsers = async (page: number, gender: string | null, setUsers: React.Dispatch<React.SetStateAction<any[]>>) => {
    try {
      let url = `https://randomuser.me/api/?page=${page}&results=20`;
      if (gender) {
        url += `&gender=${gender}`;
      }
    //   console.log(url);
      const response = await fetch(url);
      const data = await response.json();
  
      setUsers((prevUsers) => [...prevUsers, ...data.results]);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };