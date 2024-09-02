"use client"
import { MdEditSquare, MdDelete } from "react-icons/md";
import './page.css';
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";

// Define TypeScript types for supplier and form data
interface Supplier {
  _id: string;
  name: string;
  contact: string;
  productCategory: string;
}

interface FormData {
  contact: string;
  productCategory: string;
}

export default function SupplierCard() {
  const [supplierList, setSupplierList] = useState<Supplier[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentSupplier, setCurrentSupplier] = useState<Supplier | null>(null);
  const [phoneErr, setPhoneErr] = useState<string | null>(null);
  const [productCategoryErr, setProductCategoryErr] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    contact: '',
    productCategory: '',
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch suppliers from API
    axios.get(`${process.env.REACT_APP_SUPPLIER_FETCH}`)
      .then(response => {
        setSupplierList(response.data.suppliers);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching suppliers:', error);
        setLoading(false);
      });
  }, []);

  const handleEditClick = (supplier: Supplier) => {
    setPhoneErr(null);
    setProductCategoryErr(null);
    setCurrentSupplier(supplier);
    setFormData({
      contact: supplier.contact,
      productCategory: supplier.productCategory,
    });
    setIsEditing(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleContact = (event: ChangeEvent<HTMLInputElement>) => {
    const contactValue = event.target.value;
    const contactRegex = /^\d{10}$/;
    setFormData(prevFormData => ({
      ...prevFormData,
      contact: contactValue,
    }));
    if (contactRegex.test(contactValue)) {
      setPhoneErr(null);
    } else {
      setPhoneErr('Invalid contact number');
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { contact, productCategory } = formData;

    // Validate form inputs
    if (contact.length !== 10 || !/^\d+$/.test(contact)) {
      setPhoneErr("Contact must be a 10-digit number.");
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(productCategory)) {
      setProductCategoryErr('Product category must be alphabetic.');
      return;
    }

    // Send PUT request to update supplier details
    if (currentSupplier) {
      axios.put(`${process.env.REACT_APP_SUPPLIER_UPDATE}`, {
        name: currentSupplier.name, // Static name or from currentSupplier
        contact: formData.contact,
        productCategory: formData.productCategory,
        userId: currentSupplier._id
      })
        .then(response => {
          const updatedSupplier = response.data.user;
          setSupplierList(prevList => 
            prevList.map(supplier =>
              supplier._id === updatedSupplier._id ? updatedSupplier : supplier
            )
          );
          setIsEditing(false);
          Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: 'Supplier details have been updated successfully.',
            confirmButtonColor: '#3085d6',
          });
        })
        .catch(error => {
          console.error('Error updating supplier:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong while updating the supplier. Please try again.',
            confirmButtonColor: '#d33',
          });
        });
    }
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this supplier?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Send DELETE request to remove supplier
        axios.delete(`${process.env.REACT_APP_SUPPLIER_REMOVE}/${id}`)
          .then(() => {
            setSupplierList(prevList => prevList.filter(supplier => supplier._id !== id));
            Swal.fire('Deleted!', 'Supplier has been deleted successfully.', 'success');
          })
          .catch(err => {
            console.error('Error deleting supplier:', err);
          });
      }
    });
  };

  return (
    <>
      {/* Display list of suppliers */}
      {!loading ? (
        <section id='supply'>
          {supplierList.map((data, index) =>
            <div className="card-container" key={index}>
              <span className="pro">PRO</span>
              <img className="round" src="https://randomuser.me/api/portraits/women/79.jpg" alt="user" />
              <h3 className='text-white'>{data.name}</h3>
              <h5 style={{ fontWeight: 'bold' }}>{data.contact}</h5>
              <p>
                <span className="fs-5">Product Category</span> <br />
                <span className="fs-5 fw-bold">{data.productCategory}</span>
              </p>
              <div className="d-flex m-0 w-100 justify-content-center align-items-center p-2" style={{ width: '200px' }}>
                <div className="buttons">
                  <button className="edit-button me-3 mt-0" onClick={() => handleEditClick(data)}>
                    <MdEditSquare style={{ color: "white" }} />
                  </button>
                </div>
                <button className="delete-button me-3 mt-0" onClick={() => handleDelete(data._id)}>
                  <MdDelete style={{ color: "white" }} />
                </button>
              </div>
            </div>
          )}
        </section>
      ) : (
        <div>
          <h2>Loading...</h2>
        </div>
      )}

      {/* Edit form for updating supplier details */}
      {isEditing && (
        <section className="w-100 h-100 d-flex justify-content-center align-content-between bg-info">
          <div className="edit-form-container mt-4">
            <h2>Update Detail</h2>
            <form onSubmit={handleSubmit}>
              <label className="text-dark">
                Contact:
                <input
                  id="input-feild"
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleContact}
                />
                {phoneErr && <span className="text-danger fw-normal">{phoneErr}</span>}
              </label>
              <label className="text-dark">
                Product Category:
                <input
                  id="input-feild"
                  type="text"
                  name="productCategory"
                  value={formData.productCategory}
                  onChange={handleChange}
                />
                {productCategoryErr && <span className="text-danger fw-normal">{productCategoryErr}</span>}
              </label>
              <div className="d-flex">
                <button type="button" className="btn btn-outline-danger border m-1" onClick={() => setIsEditing(false)}>Cancel</button>
                <button type="submit" className="btn m-1 bg-primary">Save</button>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );
}
