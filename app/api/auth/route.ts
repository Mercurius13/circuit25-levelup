import { NextRequest, NextResponse } from 'next/server';
import { auth, db } from '@/lib/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { mode, ...userData } = body;

  const { name, email, password, age, country, height, weight, role } = userData;

  if (mode === 'signup') {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        age,
        country,
        height,
        weight,
        role: role || 'user',
        createdAt: new Date().toISOString(),
      });

      return NextResponse.json({ message: 'Signup successful!' });
    } catch (error: any) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }

  if (mode === 'login') {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, 'users', user.uid));

      if (!userDoc.exists()) {
        return NextResponse.json({ message: 'User data not found' }, { status: 404 });
      }

      const userData = userDoc.data();

      return NextResponse.json({
        message: `Welcome back, ${userData.name}!`,
        role: userData.role,
      });
    } catch (error: any) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }
  }

  return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
}
