// React Libs
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Pages
import Landing from './pages/Homepage';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import NotFound from './pages/NotFound';
import AppLayout from './pages/AppLayout';
import Login from './pages/Login';

// Components
import City from './components/City/City';
import CityList from './components/CityList/CityList';
import CountryList from './components/CountryList/CountryList';

function App() {
  // States
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Effects
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

  // Body
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page */}
        <Route index element={<Landing />} />
        <Route path='product' element={<Product />} />
        <Route path='pricing' element={<Pricing />} />
        <Route path='login' element={<Login />} />

        {/* Main page */}
        <Route path='app' element={<AppLayout />}>
          {/* Default path is /cities */}
          <Route index element={<Navigate replace to={'cities'} />} />

          <Route
            path='cities'
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path='cities/:id' element={<City />} />

          <Route
            path='countries'
            element={<CountryList cities={cities} isLoading={isLoading} />}
          />
          <Route path='form' element={<>Form</>} />
        </Route>

        {/* Any URL that's not found above will be directed to the page above */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
