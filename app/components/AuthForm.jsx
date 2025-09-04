'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PrimaryButton from './PrimaryButton';
import { handleSignUp } from '../actions/signActions';

export default function AuthForm({ mode, session }) {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (formData) => {
    setError(null);
    if(mode === 'signUp') {
      const response = await handleSignUp(formData);
      if(response.error){
        setError(response.error);
        return;
      }
    }
    const response = await fetch(
      mode === 'signIn'
        ? '/api/auth/signIn'
        : mode === 'signUp'
        ? '/api/auth/signUp'
        : '/api/auth/updateProfile',
      {
        method: 'POST',
        body: formData,
      }
    );

    const result = await response.json();
    if (result.error) {
      setError(result.error);
    } else {
      router.push(result.redirect || '/dashboard');
    }
  };

  return (
    <form action={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border rounded-md p-2 w-full"
          required={mode !== 'updateProfile'}
          defaultValue={session?.user?.email || ''}
          disabled={mode === 'updateProfile'}
        />
      </div>
      {(mode === 'signIn' || mode === 'signUp') && (
        <>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border rounded-md p-2 w-full"
              required
            />
          </div>
          {mode === 'signUp' && (
            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="border rounded-md p-2 w-full"
                required
              />
            </div>
          )}
        </>
      )}
      <div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="border rounded-md p-2 w-full"
          defaultValue={session?.user?.user_metadata?.name || ''}
          required={mode === 'signUp'}
        />
      </div>
      <div>
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          className="border rounded-md p-2 w-full"
          defaultValue={session?.user?.user_metadata?.phone_number || ''}
        />
      </div>
      <div>
        <input
          type="text"
          name="location"
          placeholder="Location"
          className="border rounded-md p-2 w-full"
          defaultValue={session?.user?.user_metadata?.location || ''}
        />
      </div>
      <div>
        <input
          type="date"
          name="birthday"
          placeholder="Birthday"
          className="border rounded-md p-2 w-full"
          defaultValue={session?.user?.user_metadata?.birthday || ''}
          required={mode === 'signUp'}
        />
      </div>
      <PrimaryButton
        type="submit"
        className="bg-blue-600 text-white hover:bg-blue-700 w-full"
      >
        {mode === 'signIn' ? 'Sign In' : mode === 'signUp' ? 'Sign Up' : 'Update Profile'}
      </PrimaryButton>
    </form>
  );
}