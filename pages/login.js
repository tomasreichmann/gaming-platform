import React from 'react';
import { useAuth } from '../src/firebase/auth';
import Login from '../src/components/auth/Login';

export default function LoginRoute() {
  const auth = useAuth();
  console.log('auth', auth);
  return (
    <Login />
  );
}
