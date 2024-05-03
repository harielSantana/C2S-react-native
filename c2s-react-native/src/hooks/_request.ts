import { User } from './useUsers'; // Importe o tipo User do arquivo useUsers

export const fetchUsers = async (
  page: number,
  gender: string | null,
  searchTerm: string | null // Adicione um parâmetro para o termo de busca
) => {
  try {
    let url = `https://randomuser.me/api/?page=${page}&results=20`;
    if (gender) {
      url += `&gender=${gender}`;
    }
    if (searchTerm) {
      url += `&name=${searchTerm}`; // Adicione o termo de busca à URL da API
    }
    // console.log(url);
    const response = await fetch(url);
    const data = await response.json();

    return data.results as User[]; // Retorna os usuários obtidos da API
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; // Lança o erro para ser tratado no código que chama fetchUsers
  }
};
