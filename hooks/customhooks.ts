import { useQuery } from 'react-query';
import axios from 'axios';

// Define types for the data
interface Category {
  id: number;
  title: string;
}

interface User {
  id: number;
  name: string;
  categories: Category[];
}

// Fetch user data
const fetchUser = async (token: string): Promise<User> => {
  const { data } = await axios.get<{ user: User }>("/api/getUser", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.user;
};

// Fetch categories data
const fetchCategories = async (pageNo: string): Promise<Category[]> => {
  const { data } = await axios.get<{ categories: Category[] }>(`/api/categories?page=${pageNo}`);
  return data.categories;
};

// Custom hook for user data
export const useUser = (token: string | null) => {
  return useQuery<User>(['user', token], () => fetchUser(token!), {
    enabled: !!token,
  });
};

// Custom hook for categories data
export const useCategories = (pageNo: string | null) => {
  return useQuery<Category[]>(['categories', pageNo], () => fetchCategories(pageNo!), {
    enabled: !!pageNo,
  });
};
