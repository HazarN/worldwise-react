// React Libs
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Contexts
import { CityProvider } from './contexts/CityContext';
import { AuthProvider } from './contexts/FakeAuthContext';

// Components
import City from './components/City/City';
import CityList from './components/CityList/CityList';
import CountryList from './components/CountryList/CountryList';
import Form from './components/Form/Form';
import ProtectedRoute from './pages/ProtectedRoute';
import SpinnerFullPage from './components/Spinner/SpinnerFullPage';

// Importing the pages with code splitting for optimized bundle sizes
const Landing = lazy(() => import('./pages/Landing'));
const Product = lazy(() => import('./pages/Product'));
const Pricing = lazy(() => import('./pages/Pricing'));
const NotFound = lazy(() => import('./pages/NotFound'));
const AppLayout = lazy(() => import('./pages/AppLayout'));
const Login = lazy(() => import('./pages/Login'));

function App() {
  return (
    <AuthProvider>
      <CityProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
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
          </Suspense>
        </BrowserRouter>
      </CityProvider>
    </AuthProvider>
  );
}

export default App;
