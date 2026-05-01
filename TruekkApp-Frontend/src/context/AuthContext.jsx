import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { fetchCurrentUser, loginUser, logoutUser, registerUser } from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const saveSession = ({ token, user }) => {
    if (token) {
      localStorage.setItem('auth_token', token);
    }

    if (user) {
      localStorage.setItem('auth_user', JSON.stringify(user));
      setUser(user);
    }
  };

  const clearSession = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setUser(null);
  };

  useEffect(() => {
    const hydrate = async () => {
      const token = localStorage.getItem('auth_token');
      const cachedUser = localStorage.getItem('auth_user');

      if (!token) {
        setLoading(false);
        return;
      }

      if (cachedUser) {
        setUser(JSON.parse(cachedUser));
      }

      try {
        const response = await fetchCurrentUser();
        const currentUser = response.data?.user;

        if (currentUser) {
          localStorage.setItem('auth_user', JSON.stringify(currentUser));
          setUser(currentUser);
        }
      } catch {
        clearSession();
      } finally {
        setLoading(false);
      }
    };

    hydrate();
  }, []);

  const login = async (credentials) => {
    const response = await loginUser(credentials);

    saveSession({
      token: response.data?.token,
      user: response.data?.user,
    });

    return response;
  };

  const register = async (payload) => {
    const response = await registerUser(payload);

    saveSession({
      token: response.data?.token,
      user: response.data?.user,
    });

    return response;
  };

  const logout = async () => {
    try {
      await logoutUser();
    } finally {
      clearSession();
    }
  };

  // 🔥 NUEVO → actualizar user (avatar, etc.)
  const updateUser = (newUser) => {
    localStorage.setItem('auth_user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: !!user,
      login,
      logout,
      register,
      updateUser, // 👈 importante
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};