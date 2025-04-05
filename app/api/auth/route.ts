import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'users.json');

type User = {
  name: string;
  email: string;
  password: string;
  age?: string;
  country?: string;
  height?: string;
  weight?: string;
  role?: 'user' | 'guardian';
};

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { mode, ...userData } = body;

  let users: User[] = [];

  try {
    const fileData = await readFile(filePath, 'utf-8');
    users = JSON.parse(fileData);
  } catch (err) {
    console.log('No existing file. Creating new user list.');
  }

  const existingUser = users.find(u => u.email === userData.email);

  if (mode === 'signup') {
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists.' }, { status: 400 });
    }

    // Save the user including their role
    users.push(userData);
    await writeFile(filePath, JSON.stringify(users, null, 2));
    return NextResponse.json({ message: 'Signup successful!' });
  }

  if (mode === 'login') {
    if (!existingUser || existingUser.password !== userData.password) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
  
    return NextResponse.json({
      message: `Welcome back, ${existingUser.name}!`,
      role: existingUser.role,
    });
  }
  

  return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
}
