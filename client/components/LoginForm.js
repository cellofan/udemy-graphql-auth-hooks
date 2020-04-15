import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import AuthForm from './AuthForm';
import { LOGIN, GET_USER } from '../graphql/auth';

const LoginForm = () => {
  const history = useHistory();
  const [errors, setErrors] = useState([]);

  const [login] = useMutation(
    LOGIN,
    {
      update(cache, { data: { login } }) {
        cache.writeQuery({
          query: GET_USER,
          data: { user: login }
        });
      }
    }
  );

  const submitLogin = (email, password) => {
    login({
      variables: { email, password }
    }).then(() => {
      history.push("/dashboard");
    }).catch(res => {
      setErrors(res.graphQLErrors.map(err => err.message));
    });
  }

  return (
    <div>
      <h3>Login</h3>
      <AuthForm submit={submitLogin} errors={errors} />
    </div>
  );
};

export default LoginForm;
