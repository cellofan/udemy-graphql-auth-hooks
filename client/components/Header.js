import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_USER, LOGOUT } from '../graphql/auth';

const Header = () => {
  const { loading, data } = useQuery(GET_USER);
  const [logout] = useMutation(
      LOGOUT,
      {
        update(cache) {
          cache.writeQuery({
            query: GET_USER,
            data: { user: null }
          });
        }
      }
  );

  if (loading) return <div />;

  const renderButtons = () => {
    const { user } = data;
    if (user) {
      return (
        <li>
          <a onClick={logout}>Logout</a>
        </li>
      );
    } else {
      return (
        <div>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </div>
      );
    }
  }

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo left">Home</Link>
        <ul className="right">
          {renderButtons()}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
