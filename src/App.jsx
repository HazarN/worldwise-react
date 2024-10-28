// React Libs
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Landing from './pages/Homepage';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import NotFound from './pages/NotFound';
import AppLayout from './pages/AppLayout';
import Login from './pages/Login';

function App() {
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
          <Route index element={<>Cities</>} />

          <Route path='cities' element={<>Cities</>} />
          <Route path='countries' element={<>Countries</>} />
          <Route path='form' element={<>Form</>} />
        </Route>

        {/* Any URL that's not found above will be directed to the page above */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
