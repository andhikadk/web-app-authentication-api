import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const validatePassword = await bcrypt.compare(password, user.password);

  if (!validatePassword) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const secret = process.env.JWT_SECRET!;

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    secret,
    {
      expiresIn: 60 * 60 * 24,
    }
  );

  let response = NextResponse.json({
    status: 'Login successful',
    token,
  });

  response.cookies.set('auth-user', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24,
    path: '/',
  });

  return response;
}
