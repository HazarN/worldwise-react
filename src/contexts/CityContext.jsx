// React Libs
import { createContext, useState, useEffect, useContext } from 'react';

// The Context
const CityContext = createContext();

// The Context Provider
function CityProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [activeCity, setActiveCity] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${import.meta.env.VITE_API_URL}/cities`);
        const data = await res.json();

        setCities((cities) => data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  async function fetchCityById(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/cities/${id}`);
      const data = await res.json();

      setActiveCity((city) => data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json(); // the data that we give : newCity | DO NOT USE THE ACTUAL newCity PARAMETER

      setCities((cities) => [...cities, data]);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/cities/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      setCities((cities) => cities.filter((city) => city.id !== id));
      console.log(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
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
