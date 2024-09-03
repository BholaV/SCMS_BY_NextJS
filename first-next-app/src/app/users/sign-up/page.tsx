"use client";
import { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import Swal from 'sweetalert2';
import '../page.css';
import axios from 'axios';

// Define interface for the form state and errors
interface SignUpErrors {
  username: string | null;
  email: string | null;
  password: string | null;
}

export default function SignUp() {
    // Define state for form inputs and error messages
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<SignUpErrors>({
        username: null,
        email: null,
        password: null,
    });

    // Validate username
    const validateUsername = (value: string): string | null => {
        if (value.trim().length === 0) return 'Username is required';
        if (!/^[a-zA-Z\s]+$/.test(value)) return 'Username must contain only letters';
        return null;
    };

    // Validate email
    const validateEmail = (value: string): string | null => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value.trim().length === 0) return 'Email is required';
        if (!emailRegex.test(value)) return 'Invalid email address';
        return null;
    };

    // Validate password
    const validatePassword = (value: string): string | null => {
        if (value.trim().length === 0) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters long';
        return null;
    };

    // Handle input change and validate field
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Validate the field that is being updated
        let error: string | null = null;
        switch (name) {
            case 'username':
                error = validateUsername(value);
                setUsername(value);
                break;
            case 'email':
                error = validateEmail(value);
                setEmail(value);
                break;
            case 'password':
                error = validatePassword(value);
                setPassword(value);
                break;
        }

        // Update the error state based on the field
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: error,
        }));
    };

    // Handle form submission
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        // Validate all fields
        const usernameError = validateUsername(username);
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        if (usernameError || emailError || passwordError) {
            setErrors({
                username: usernameError,
                email: emailError,
                password: passwordError,
            });
            return;
        }

        // Create an object to hold the form data
        const formData = {
            username,
            email,
            password,
        };

        // Send a POST request to the API
        axios.post(`${process.env.NEXT_PUBLIC_USER_SIGN_UP}`, formData)
            .then(response => {
                const user = response.data.user;
                localStorage.setItem("user",JSON.stringify(user));
                // Display success alert
                Swal.fire({
                    icon: 'success',
                    title: 'Sign Up Successful',
                    text: 'Your account has been created successfully!',
                    confirmButtonText: 'OK',
                });

                // Clear form fields
                setUsername('');
                setEmail('');
                setPassword('');
            })
            .catch(error => {
                console.error('Error:', error);
                // Display error alert
                Swal.fire({
                    icon: 'error',
                    title: 'Sign Up Failed',
                    text: error instanceof Error ? error.message : 'An error occurred during sign-up.',
                    confirmButtonText: 'Try Again',
                });
            });
    };

    return (
        <div className='main-signup-page'>
            <form className="form p-4" onSubmit={handleSubmit}>
                <p className="form-title mb-0">Create Account</p>
                <p className='text-center'>Sign up with us</p>
                
                {/* Username input */}
                <div className="input-container">
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter username"
                        value={username}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.username && <div style={{ color: 'red' }}>{errors.username}</div>}
                </div>
                
                {/* Email input */}
                <div className="input-container">
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                </div>
                
                {/* Password input */}
                <div className="input-container">
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
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
                <img className='img-content' src='https://www.nicepng.com/png/detail/635-6350140_female-computer-user-user-computer.png' alt='no image found..'/>
            </div> */}
        </div>
    );
}
