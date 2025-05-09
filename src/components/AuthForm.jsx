import React, { useState } from 'react';

const API_URL = 'http://127.0.0.1:5000/capstone/v1/api/login';

export default function AuthForm() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = { type: mode, email: form.email, password: form.password };
    if (mode === 'signup') payload.name = form.name;

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        const token = Array.isArray(data) ? data[0] : data.token;
        localStorage.setItem('authToken', token);
        window.location.href = '/';
      } else {
        setMessage(data.message || 'Error occurred');
      }
    } catch {
      setMessage('Network error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {mode === 'login' ? 'Login' : 'Sign Up'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-1 w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Your name"
              />
            </div>
          )}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
          >
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-600">{message}</p>}
        <p className="mt-4 text-center text-gray-500">
          {mode === 'login' ? (
            <>Don't have an account?{' '}
              <button
                onClick={() => { setMode('signup'); setMessage(''); }}
                className="text-blue-600 hover:underline"
              >Sign Up</button>
            </>
          ) : (
            <>Already signed up?{' '}
              <button
                onClick={() => { setMode('login'); setMessage(''); }}
                className="text-blue-600 hover:underline"
              >Login</button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
