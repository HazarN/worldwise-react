// React Libs
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Contexts
import { CityProvider } from './contexts/CityContext';
import { AuthProvider } from './contexts/FakeAuthContext';

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
import Form from './components/Form/Form';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <CityProvider>
        <BrowserRouter>
          <Routes>
            {/* Landing page */}
            <Route index element={<Landing />} />
            <Route path='product' element={<Product />} />
            <Route path='pricing' element={<Pricing />} />
            <Route path='login' element={<Login />} />

            {/* Main page */}
            <Route
              path='app'
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              {/* Default path is /cities */}
              <Route index element={<Navigate replace to={'cities'} />} />

              <Route path='cities' element={<CityList />} />
              <Route path='cities/:id' element={<City />} />

              <Route path='countries' element={<CountryList />} />
              <Route path='form' element={<Form />} />
            </Route>

            {/* Any URL that's not found above will be directed to the page above */}
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CityProvider>
    </AuthProvider>
  );
}

export default App;
