// React Libs
import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from 'react';

// The Context
const CityContext = createContext();

// useReducer properties
function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return {
        ...state,
        isLoading: true,
      };
    case 'cities/loaded':
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case 'city/loaded':
      return {
        ...state,
        isLoading: false,
        activeCity: action.payload,
      };
    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
      };
    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    case 'rejected':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error('Unknown action given to the reducer');
  }
}
const initialState = {
  cities: [],
  activeCity: {},
  isLoading: false,
  error: null,
};

// The Context Provider
function CityProvider({ children }) {
  const [{ cities, activeCity, isLoading }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchCities() {
      try {
        dispatch({ type: 'loading' });
        const res = await fetch(`${import.meta.env.VITE_API_URL}/cities`);
        const data = await res.json();

        dispatch({ type: 'cities/loaded', payload: data });
      } catch (err) {
        console.log(err);
        dispatch({ type: 'rejected', payload: err });
      }
    }

    fetchCities();
  }, []);

  const fetchCityById = useCallback(
    async (id) => {
      if (id === activeCity.id) return;

      try {
        dispatch({ type: 'loading' });
        const res = await fetch(`${import.meta.env.VITE_API_URL}/cities/${id}`);
        const data = await res.json();

        dispatch({ type: 'city/loaded', payload: data });
      } catch (err) {
        console.log(err);
        dispatch({ type: 'rejected', payload: err });
      }
    },
    [activeCity.id]
  );

  async function createCity(newCity) {
    try {
      dispatch({ type: 'loading' });
      const res = await fetch(`${import.meta.env.VITE_API_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json(); // the data that we give : newCity | DO NOT USE THE ACTUAL newCity PARAMETER

      dispatch({ type: 'city/created', payload: data });
    } catch (err) {
      console.log(err);
      dispatch({ type: 'rejected', payload: err });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: 'loading' });
      const res = await fetch(`${import.meta.env.VITE_API_URL}/cities/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      dispatch({ type: 'city/deleted', payload: id });
      console.log(data);
    } catch (err) {
      dispatch({ type: 'rejected', payload: err });
    }
  }

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        activeCity,
        fetchCityById,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

// The Context Consumer
function useCityContext() {
  const context = useContext(CityContext);

  if (context === undefined)
    throw new Error(
      'The context is tried to used outside of the provider! Check the component tree again.'
    );

  return context;
}

export { CityProvider, useCityContext };
