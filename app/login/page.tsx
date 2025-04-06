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
role: '',
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
const role = data.role || 'user';
router.push(`/dashboard/${role}`);
}
};

const inputClass =
'w-full p-2 border border-[var(--highlight)] rounded bg-white placeholder-black text-black';

return (
<div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-6">
<div className="relative w-full max-w-md">
{/* Glowing Background */}
<div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-teal-400 via-pink-500 to-purple-500 blur-xl opacity-50 animate-pulse"></div>

{/* Actual Card */}
<div className="w-full bg-[var(--card-bg)] p-8 rounded-2xl shadow-xl border border-[var(--highlight)] backdrop-blur-sm">
<h1 className="text-2xl font-bold mb-6 text-center text-white">
{mode === 'signup' ? 'Sign Up' : 'Login'}
</h1>
<form onSubmit={handleSubmit} className="space-y-4">
{mode === 'signup' && (
<>
<input type="text" name="name" placeholder="Full Name" onChange={handleChange} required className={inputClass} />
<input type="number" name="age" placeholder="Age" onChange={handleChange} required className={inputClass} />
<input type="text" name="country" placeholder="Country" onChange={handleChange} required className={inputClass} />
<input type="number" name="height" placeholder="Height (cm)" onChange={handleChange} required className={inputClass} />
<input type="number" name="weight" placeholder="Weight (kg)" onChange={handleChange} required className={inputClass} />

<div className="flex justify-around items-center">
<label className="flex items-center space-x-2 text-white">
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
<label className="flex items-center space-x-2 text-white">
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
<input type="email" name="email" placeholder="Email" onChange={handleChange} required className={inputClass} />
<input type="password" name="password" placeholder="Password" onChange={handleChange} required className={inputClass} />

<button type="submit" className="w-full bg-[var(--highlight)] text-white py-2 rounded font-semibold shadow-md hover:opacity-90 transition">
{mode === 'signup' ? 'Sign Up' : 'Login'}
</button>
</form>

<p className="text-sm text-center mt-4 text-white">
{mode === 'signup' ? 'Already have an account?' : 'New user?'}{' '}
<button className="text-teal underline" onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}>
{mode === 'signup' ? 'Login' : 'Sign Up'}
</button>
</p>

{message && <p className="text-center mt-4 text-sm text-white">{message}</p>}
</div>
</div>
</div>

);
}
