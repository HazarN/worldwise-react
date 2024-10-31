import { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case 'logout':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      throw new Error('Unknown action given to the reducer');
  }
}
const initialState = {
  user: null,
  isAuthenticated: false,
};

// Fake user to authenticate in the app
const FAKE_USER = {
  name: 'Jack',
  email: 'jack@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=zz',
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, isAuthenticated } = state;

  const _login = (email, password) =>
    email === FAKE_USER.email &&
    password === FAKE_USER.password &&
    dispatch({ type: 'login', payload: FAKE_USER });
  const _logout = () => dispatch({ type: 'logout' });

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, _login, _logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuthContext() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error(
      'The context is tried to used outside of the provider! Check the component tree again.'
    );

  return context;
}

export { AuthProvider, useAuthContext };
