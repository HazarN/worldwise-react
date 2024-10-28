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
        <Route path='/' element={<Landing />} /> {/* Landing page */}
        <Route path='/product' element={<Product />} />
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/app' element={<AppLayout />} /> {/* Main page */}
        <Route path='*' element={<NotFound />} />
        {/* Any URL that's not found above will be directed to the page above */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
