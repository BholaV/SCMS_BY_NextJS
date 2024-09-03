"use client"
import { BiCategory } from "react-icons/bi";
import { FaPhoneAlt, FaUser } from "react-icons/fa";
import './page.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";

// Define TypeScript interfaces for the component state
interface SupplierFormState {
  contact: string;
  category: string;
  username: string;
  error: string | null;
  categoryError: string | null;
}

export default function SupplierAccCreation() {
  // Inline styles for the section
  const style: React.CSSProperties = {
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    height: '83vh',
    zIndex: 10
  };

  // State hooks for form inputs and error messages
  const [contact, setContact] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  // Handle contact input and validate format
  const handleContact = (event: ChangeEvent<HTMLInputElement>) => {
    const contactValue = event.target.value;
    const contactRegex = /^\d{10}$/;
    setContact(contactValue);
    if (contactRegex.test(contactValue)) {
      setError(null);  // Clear error if valid
    } else {
      setError('Invalid contact number');  // Set error if invalid
    }
  };

  // Handle category input and validate length
  const handleCategory = (event: ChangeEvent<HTMLInputElement>) => {
    const categoryValue = event.target.value;
    setCategory(categoryValue);
    if (categoryValue.length < 3) {
      setCategoryError('Invalid category!');  // Set error if too short
    } else {
      setCategoryError(null);  // Clear error if valid
    }
  };

  // Validate and handle username input
  const checkUserName = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e || !e.target) return; // Prevent errors if event is undefined
    const usernameValue = e.target.value.trim();
    const nameError = document.getElementById("name") as HTMLSpanElement;
    let status = true;
  
    // Validate username input
    if (usernameValue.length === 0) {
      status = false;
      nameError.innerHTML = "Name is required";
      nameError.style.color = 'red';
    } else if (!/^[a-zA-Z\s]+$/.test(usernameValue)) {
      status = false;
      nameError.innerHTML = "Name must be characters and spaces only";
      nameError.style.color = 'red';
    } else {
      nameError.innerHTML = "";
      setUsername(usernameValue);
      status = true;
    }
  
    return status;
  };
  
  // Handle form submission and make HTTP request to create a new supplier
  const register = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (checkUserName({ target: { value: username } } as ChangeEvent<HTMLInputElement>) && username && category && contact) {
      axios.post(process.env.REACT_APP_SUPPLIER_ADD as string, { contact, productCategory: category, name: username })
        .then(result => {
          if (result.data.message === 'User already exists') {
            Swal.fire({
              icon: "error",
              title: "Account already exists.",
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "Account created successfully.",
            });
            // Clear form fields
            setContact("");
            setCategory("");
            setUsername("");
          }
        })
        .catch(err => {
          console.error(err);
          Swal.fire({
            icon: "error",
            title: "Something went wrong.",
          });
        });
    }
  };

  return (
    <>
      <section id="supply-bg" className='d-flex justify-content-center align-items-center flex-column p-5' style={style}>
        <form className="form" onSubmit={register}>
          <h2 className='text-dark m-1'>Supplier Account Form</h2>

          {/* Username input */}
          <div className="flex-column m-0">
            <label className="text-dark mt-3">Name</label>
          </div>
          <div className="inputForm">
            <FaUser className="fs-4" />
            <input 
              type="text" 
              value={username} 
              required 
              onChange={checkUserName} 
              className="input" 
              placeholder="Enter your Name" 
            />
          </div>
          <span id='name'></span>

          {/* Contact input */}
          <div className="flex-column">
            <label className="text-dark mt-3">Contact</label>
          </div>
          <div className="inputForm">
            <FaPhoneAlt className="fs-4" />
            <input 
              type="text" 
              value={contact} 
              required 
              onChange={handleContact} 
              className="input" 
              placeholder="Enter phone" 
            />
          </div>
          {error && <div style={{ color: 'red' }}>{error}</div>}

          {/* Product category input */}
          <div className="flex-column">
            <label className="text-dark mt-3">Product Category</label>
          </div>
          <div className="inputForm">
            <BiCategory className="fs-4" />
            <input 
              type="text" 
              value={category} 
              required 
              onChange={handleCategory} 
              className="input" 
              placeholder="Enter product category" 
            />
          </div>
          {categoryError && <div style={{ color: 'red' }}>{categoryError}</div>}

          {/* Submit button */}
          <center>
            <button className="button-submit w-75">Create Account</button>
          </center>
        </form>
      </section>
    </>
  );
}
