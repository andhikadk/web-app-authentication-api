'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { User } from '@prisma/client';

const HomePage = () => {
  const router = useRouter();
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/me');
        const data = await response.json();
        if (data.error) {
          setLoading(false);
          return;
        }
        setUser(data.user);
        setLoading(false);
      } catch (error) {
        throw error;
      }
    };
    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'DELETE',
      });
      router.push('/login');
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <h1 className='text-xl font-bold'>Home Page</h1>
      <div className='h-1 w-24 bg-slate-500 rounded mt-2 mb-4'></div>
      <p className='text-center mt-4'>
        {/* if loading, show loading and if not loading check whetet user is login or not */}
        {loading ? (
          'Loading...'
        ) : user ? (
          <>
            Welcome <span className='font-bold'>{user.name}</span>
          </>
        ) : (
          <>
            Please{' '}
            <Link href='/login' className='text-slate-500'>
              Login
            </Link>{' '}
            to continue
          </>
        )}
      </p>
      {user && (
        <div className='flex justify-center mt-4'>
          <a
            onClick={logout}
            className='text-red-400 text-sm cursor-pointer hover:text-red-600'>
            Logout
          </a>
        </div>
      )}
    </>
  );
};

export default HomePage;
