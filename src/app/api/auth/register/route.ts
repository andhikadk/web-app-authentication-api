import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const { name, email, password, confirmPassword } = await request.json();

  console.log(name, email, password, confirmPassword);

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user) {
    return NextResponse.json(
      { error: 'Email already exists' },
      { status: 401 }
    );
  }

  if (password !== confirmPassword) {
    return NextResponse.json(
      { error: 'Passwords do not match' },
      { status: 401 }
    );
  }

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json({ status: 'Registration successful' });
}
