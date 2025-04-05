'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    country: '',
    height: '',
    weight: '',
    role: '', // user or guardian
  });

  const [mode, setMode] = useState<'login' | 'signup'>('signup');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Processing...');
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, mode }),
    });

    const data = await res.json();
    setMessage(data.message);

    if (res.ok && mode === 'login') {
      const role = data.role || 'user'; // fallback just in case
      router.push(`/dashboard/${role}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {mode === 'signup' ? 'Sign Up' : 'Login'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <>
              <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required className="w-full p-2 border rounded" />
              <input type="number" name="age" placeholder="Age" onChange={handleChange} className="w-full p-2 border rounded" />
              <input type="text" name="country" placeholder="Country" onChange={handleChange} className="w-full p-2 border rounded" />
              <input type="number" name="height" placeholder="Height (cm)" onChange={handleChange} className="w-full p-2 border rounded" />
              <input type="number" name="weight" placeholder="Weight (kg)" onChange={handleChange} className="w-full p-2 border rounded" />

              <div className="flex justify-around items-center">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={formData.role === 'user'}
                    onChange={handleChange}
                    required
                  />
                  <span>User</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="guardian"
                    checked={formData.role === 'guardian'}
                    onChange={handleChange}
                    required
                  />
                  <span>Guardian</span>
                </label>
              </div>
            </>
          )}
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 border rounded" />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="w-full p-2 border rounded" />

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
            {mode === 'signup' ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          {mode === 'signup' ? 'Already have an account?' : 'New user?'}{' '}
          <button className="text-blue-600 underline" onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}>
            {mode === 'signup' ? 'Login' : 'Sign Up'}
          </button>
        </p>

        {message && <p className="text-center mt-4 text-sm text-gray-700">{message}</p>}
      </div>
    </div>
  );
}
