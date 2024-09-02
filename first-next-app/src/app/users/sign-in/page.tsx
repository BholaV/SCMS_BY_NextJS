"use client"
import { useState, FormEvent } from 'react';
import Link from 'next/link';
import React from 'react';
import Swal from 'sweetalert2';
import '../page.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

export default function SignIn() {
    // State hooks for form fields and submission status
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Handle form submission
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault(); // Prevent default form submission behavior

        setLoading(true); // Set loading state
        setError(null); // Reset error state

        try {
            const response = await fetch('/api/signin', { // Replace with your API endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Sign in failed');
            }

            // Handle successful sign-in
            const data = await response.json();
            Swal.fire({
                icon: 'success',
                title: 'Sign In Successful',
                text: 'Welcome back!',
                confirmButtonText: 'OK',
            });

            console.log('Sign in successful:', data);
            // Redirect or update state as needed
        } catch (err) {
            // Handle sign-in failure
            console.error('Error during sign-in:', err);
            Swal.fire({
                icon: 'error',
                title: 'Sign In Failed',
                text: err instanceof Error ? err.message : 'An error occurred during sign-in.',
                confirmButtonText: 'Try Again',
            });
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (<>
        <div className='main-signup-page'>
        {/* <div className='border'>
                <img className='img-content'  src='https://www.nicepng.com/png/detail/635-6350140_female-computer-user-user-computer.png' alt='no image found..'/>
            </div> */}
            <form className="form p-4" onSubmit={handleSubmit}>
                <h1 className="form-title mb-0">Welcome Back</h1>
                <p className='text-center'>Sign in with your account</p>
                <div className="input-container">
                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-label="Email"
                        required
                    />
                </div>
                <div className="input-container">
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        aria-label="Password"
                        required
                    />
                </div>
                <button type="submit" className="submit" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign in'}
                </button>
                <p className="signup-link">
                    No account?
                    <Link href="/users/sign-up"> Sign up</Link>
                </p>
            </form>
        </div>
    </>
    );
}
