import { createContext, useContext, useState, type ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedToken = localStorage.getItem('@Furniro:token');
    const storedUser = localStorage.getItem('@Furniro:user');

    if (storedToken && storedUser) {
      return JSON.parse(storedUser);
    }
    
    return null;
  });

  const login = (token: string, userData: User) => {
    localStorage.setItem('@Furniro:token', token);
    localStorage.setItem('@Furniro:user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('@Furniro:token');
    localStorage.removeItem('@Furniro:user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth should be used within an AuthProvider');
  }
  return context;
}