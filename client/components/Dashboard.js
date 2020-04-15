import React from 'react';
import { useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { GET_USER } from '../graphql/auth';

const Dashboard = () => {
  const history = useHistory();
  const { loading, data } = useQuery(GET_USER);

  if (loading) return <div />;

  if (data.user == null) {
    history.push('/login');
  }

  return (
    <h4>You are logged in!</h4>
  );
};

export default Dashboard;
