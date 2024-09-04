"use client";
import { useState, FormEvent, ChangeEvent } from 'react';
import Link from 'next/link';
import Swal from 'sweetalert2';
import '../page.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';
// import 'bootstrap/dist/css/bootstrap.min.css';

export default function SignIn() {
    const router = useRouter();
    // State hooks for form fields, errors, and submission status
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<{ email: string | null; password: string | null }>({
        email: null,
        password: null,
    });
    const [loading, setLoading] = useState<boolean>(false);

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
        if (value.length < 6) return 'Password must be at least 6 characters';
        return null;
    };

    // Handle input change and validate field
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        let error: string | null = null;
        if (name === 'email') {
            error = validateEmail(value);
            setEmail(value);
        } else if (name === 'password') {
            error = validatePassword(value);
            setPassword(value);
        }

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: error,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault(); // Prevent default form submission behavior

        setLoading(true); // Set loading state
        setErrors({ email: null, password: null }); // Reset errors

        // Validate all fields
        const emailError = validateEmail(email);
        const passwordError = validatePassword(password);

        if (emailError || passwordError) {
            setErrors({
                email: emailError,
                password: passwordError,
            });
            setLoading(false); // Reset loading state
            return;
        }

        axios.post(`${process.env.NEXT_PUBLIC_USER_SIGN_IN}`, {email,password})
            .then(response => {
                const user = response.data.user;
                localStorage.setItem("user",JSON.stringify(user));
                // Display success alert
                Swal.fire({
                    icon: 'success',
                    title: 'Sign In Successfully..',
                    text: 'Yeah🤩 ! Welcome back',
                    confirmButtonText: 'OK',
                });
                router.replace("/dashboard")
                // Clear form fields
                setEmail('');
                setPassword('');
            })
            .catch(error => {
                console.error('Error:', error.response.data.error);
                // Display error alert
                Swal.fire({
                    icon: 'error',
                    title: 'Sign Up Failed',
                    text: error instanceof Error ? error.response.data.error : 'An error occurred during sign-up.',
                    confirmButtonText: 'Try Again',
                });
            });
    };

    return (
        <div className='main-signup-page'>
            <form className="form p-4" onSubmit={handleSubmit}>
                <h1 className="form-title mb-0">Welcome Back</h1>
                <p className='text-center'>Sign in with your account</p>

                {/* Email input */}
                <div className="input-container">
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={handleInputChange}
                        aria-label="Email"
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
                        aria-label="Password"
                        required
                    />
                    {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
                </div>

                <button type="submit" className="submit" >
                    Sign in
                </button>

                <p className="signup-link">
                    No account?
                    <Link href="/users/sign-up"> Sign up</Link>
                </p>
            </form>
        </div>
    );
}
