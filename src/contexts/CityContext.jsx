// React Libs
import { createContext, useState, useEffect, useContext } from 'react';

// The Context
const CityContext = createContext();

// The Context Provider
function CityProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${import.meta.env.VITE_API_URL}/cities`);
        const data = await res.json();

        setCities(cities => data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
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
