'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createSupabaseClient } from '@/lib/client'; //from '@/lib/supabase/client';
import AuthForm from '../components/AuthForm';
import PrimaryButton from '../components/PrimaryButton';
import Footer from '../components/Footer';

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || 'signIn';
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const supabase = createSupabaseClient();
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      

      if (user && mode === 'signIn') {
        router.push('/auth?mode=updateProfile');
      } else {
        setUser(user);
        setLoading(false);
      }
    }
    fetchUser();
  }, [mode, router]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Authentication
        </h1>
        {user ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-medium text-gray-700 mb-4 text-center">
              Welcome, {user.email}
            </h2>
            <div className="flex justify-center gap-4">
              <form action="/auth/signOut">
                <PrimaryButton
                  type="submit"
                  className="bg-red-500 text-white hover:bg-red-600"
                >
                  Sign Out
                </PrimaryButton>
              </form>
              <form action="/auth/updateProfile">
                <PrimaryButton
                  type="submit"
                  className="bg-blue-500 text-white hover:bg-blue-600"
                >
                  Update Profile
                </PrimaryButton>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex justify-center gap-4 mb-6">
            <a href="/auth?mode=signIn">
              <PrimaryButton
                className={`${
                  mode === 'signIn'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Sign In
              </PrimaryButton>
            </a>
            <a href="/auth?mode=signUp">
              <PrimaryButton
                className={`${
                  mode === 'signUp'
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Sign Up
              </PrimaryButton>
            </a>
          </div>
        )}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <AuthForm mode={mode} session={user ? { user } : null} />
        </div>
      </div>
      <Footer />
    </div>
  );
}