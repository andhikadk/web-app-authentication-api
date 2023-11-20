'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.error) {
        alert(data.error);
      } else {
        router.push('/');
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <h1 className='text-xl font-bold'>Login</h1>
      <div className='h-1 w-20 bg-slate-500 rounded mt-2 mb-4'></div>
      <form className='flex flex-col gap-4' onSubmit={onSubmit}>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='border border-gray-300 rounded-md p-2'
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='border border-gray-300 rounded-md p-2'
        />
        <button
          type='submit'
          className='bg-slate-500 text-white rounded-md p-2 hover:bg-slate-600'>
          Login
        </button>
      </form>
      <p className='text-center mt-4'>Don&apos;t have an account?</p>
      <p className='text-center'>
        <Link href='/register' className='text-slate-500'>
          Register
        </Link>
      </p>
    </>
  );
};

export default LoginPage;
