import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to={'/'}>Home</NavLink>
        </li>

        <li>
          <NavLink to={'/pricing'}>Pricing</NavLink>
        </li>

        <li>
          <NavLink to={'/product'}>Product</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
