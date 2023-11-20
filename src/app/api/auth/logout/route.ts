import { NextResponse } from 'next/server';

export async function DELETE() {
  const response = NextResponse.json({ status: 'Logout successful' });
  response.cookies.delete('auth-user');
  return response;
}
