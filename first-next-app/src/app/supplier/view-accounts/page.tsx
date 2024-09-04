"use client"
import { MdEditSquare, MdDelete } from "react-icons/md";
import './page.css';
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import 'bootstrap/dist/css/bootstrap.min.css';

interface Supplier {
    _id: string;
    name: string;
    contact: string;
    productCategory: string;
}

interface FormData {
    username: string,
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
        username: '',
        contact: '',
        productCategory: '',
    });
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const apiUrl = process.env.NEXT_PUBLIC_SUPPLIER_ALL;

        if (apiUrl) {
            axios.get(apiUrl)
                .then(response => {
                    setSupplierList(response.data.suppliers || []);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching suppliers:', error);
                    setLoading(false);
                });
        } else {
            console.error('API URL is not defined');
            setLoading(false);
        }
    }, [supplierList,isEditing]);

    const handleEditClick = (supplier: Supplier) => {
        setPhoneErr(null);
        setProductCategoryErr(null);
        setCurrentSupplier(supplier);
        setFormData({
            username: supplier.name,
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

        if (contact.length !== 10 || !/^\d+$/.test(contact)) {
            setPhoneErr("Contact must be a 10-digit number.");
            return;
        }
        if (!/^[a-zA-Z\s]+$/.test(productCategory)) {
            setProductCategoryErr('Product category must be alphabetic.');
            return;
        }

        if (currentSupplier) {
            const updateUrl = process.env.NEXT_PUBLIC_SUPPLIER_UPDATE;
            if (updateUrl) {
                axios.put(updateUrl, {
                    name: currentSupplier.name,
                    contact: formData.contact,
                    productCategory: formData.productCategory,
                    userId: currentSupplier._id
                })
                    .then(response => {
                        const updatedSupplier = response.data.supplier;
                        console.log(updatedSupplier)
                        console.log(supplierList)
                        setSupplierList(prevList =>
                            prevList.map(supplier =>
                              supplier._id === updatedSupplier._id ? updatedSupplier : supplier
                            )
                          );
                        setSupplierList(supplierList)
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
                const deleteUrl = `${process.env.NEXT_PUBLIC_SUPPLIER_REMOVE}/${id}`;
                axios.delete(deleteUrl)
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
            {!isEditing && (
                <section id='supply'>
                    {supplierList.map((data) =>
                        <div className="card-container" key={data._id}>
                            <span className="pro">PRO</span>
                            <img className="round" src="https://randomuser.me/api/portraits/women/79.jpg" alt="user" />
                            <h3 className='text-white'>{data.name}</h3>
                            <h5 className="fw-bold text-white">{data.contact}</h5>
                            <p>
                                <span className="fs-5 text-white">Product Category</span> <br />
                                <span className="fs-5 fw-bold text-white">{data.productCategory}</span>
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
            )}

            {isEditing && (
                <section id="supply">
                    <div className="edit-form border">
                        <h2 className="text-center text-dark">Update Detail</h2>
                        <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                                <label className="form-label text-dark">
                                    Name:
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="usernmae"
                                        value={formData.username}
                                    />
                                </label>
                            </div>
                            <div className="mb-3">
                                <label className="form-label text-dark">
                                    Contact:
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="contact"
                                        value={formData.contact}
                                        onChange={handleContact}
                                    />
                                    {phoneErr && <div className="form-text text-danger">{phoneErr}</div>}
                                </label>
                            </div>
                            <div className="mb-3">
                                <label className="form-label text-dark">
                                    Product Category:
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="productCategory"
                                        value={formData.productCategory}
                                        onChange={handleChange}
                                    />
                                    {productCategoryErr && <div className="form-text text-danger">{productCategoryErr}</div>}
                                </label>
                            </div>
                            <div className="d-flex justify-content-between">
                                <button type="button" className="btn btn-outline-danger" onClick={() => setIsEditing(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </section>
            )}
        </>
    );
}
