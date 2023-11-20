import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt, { JwtPayload } from 'jsonwebtoken';

export async function GET() {
  const cookie = cookies();

  const token = cookie.get('auth-user');

  let decoded: JwtPayload;
  try {
    decoded = jwt.verify(token?.value!, process.env.JWT_SECRET!) as JwtPayload;
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
  });

  return NextResponse.json({ user });
}
