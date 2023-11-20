'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';

const RegisterPage = () => {
  const router = useRouter();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });
      const data = await response.json();
      if (data.error) {
        alert(data.error);
      } else {
        router.push('/login');
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <h1 className='text-xl font-bold'>Register</h1>
      <div className='h-1 w-24 bg-slate-500 rounded mt-2 mb-4'></div>
      <form className='flex flex-col gap-4' onSubmit={onSubmit}>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='border border-gray-300 rounded-md p-2'
        />
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
        <label htmlFor='password'>Confirm Password</label>
        <input
          type='password'
          id='confirmPassword'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className='border border-gray-300 rounded-md p-2'
        />
        <button
          type='submit'
          className='bg-slate-500 text-white rounded-md p-2 hover:bg-slate-600'>
          Register
        </button>
      </form>
      <p className='text-center mt-4'>Already have an account?</p>
      <p className='text-center'>
        <Link href='/login' className='text-slate-500'>
          Login
        </Link>
      </p>
    </>
  );
};

export default RegisterPage;
