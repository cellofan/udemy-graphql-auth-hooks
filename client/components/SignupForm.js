import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import AuthForm from './AuthForm';
import { SIGNUP, GET_USER } from '../graphql/auth';

const SignupForm = () => {
  const history = useHistory();
  const [errors, setErrors] = useState([]);

  const [signup] = useMutation(
    SIGNUP,
    {
      update(cache, { data: { signup } }) {
        cache.writeQuery({
          query: GET_USER,
          data: { user: signup }
        });
      }
    }
  );

  const submitSignup = (email, password) => {
    signup({
      variables: { email, password }
    }).then(() => {
      history.push("/dashboard");
    }).catch(res => {
      setErrors(res.graphQLErrors.map(err => err.message));
    });
  }

  return (
    <div>
      <h3>Signup</h3>
      <AuthForm submit={submitSignup} errors={errors} />
    </div>
  );
};

export default SignupForm;
