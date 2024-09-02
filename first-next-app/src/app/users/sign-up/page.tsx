"use client"
import { useState, FormEvent } from 'react';
import Link from 'next/link';
import Swal from 'sweetalert2';
import '../page.css';

export default function SignUp() {
    // Define state for form inputs
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // Handle form submission
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        // Create an object to hold the form data
        const formData = {
            username,
            email,
            password,
        };
        console.log(formData);

        try {
            // Call your API endpoint here
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to sign up');
            }

            const result = await response.json();
            console.log('Success:', result);
            // Display success alert
            Swal.fire({
                icon: 'success',
                title: 'Sign Up Successful',
                text: 'Your account has been created successfully!',
                confirmButtonText: 'OK',
            });
            // Optionally, redirect or reset the form
        } catch (error) {
            console.error('Error:', error);
            // Display error alert
            Swal.fire({
                icon: 'error',
                title: 'Sign Up Failed',
                text: error instanceof Error ? error.message : 'An error occurred during sign-up.',
                confirmButtonText: 'Try Again',
            });
        }
    };

    return (
        <div className='main-signup-page'>
            <form className="form p-4" onSubmit={handleSubmit}>
                <p className="form-title mb-0">Create Account</p>
                <p className='text-center'>Sign up with us</p>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-container">
                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-container">
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit">
                    Sign up
                </button>
                <p className="signup-link">
                    Already have an account?
                    <Link href="/users/sign-in"> Sign in</Link>
                </p>
            </form>
             {/* <div className='border'>
                <img className='img-content'  src='https://www.nicepng.com/png/detail/635-6350140_female-computer-user-user-computer.png' alt='no image found..'/>
            </div> */}
        </div>
    );
}
