"use client"
import { useEffect, useState, FormEvent } from 'react';
import './page.css';
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { FaRegEdit, FaStar } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";
import Swal from 'sweetalert2';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
// Define TypeScript interfaces for data structures
interface Product {
    _id: string;
    title: string;
    categoryName: string;
    price: number;
    discountPercentage: number;
    description: string;
    rating: number;
    thumbnail: string;
    images: string[];
}

interface Order {
    _id: string;
    status: string;
    productId: Product;
}

interface User {
    _id: string;
}
interface FormData {
    status: string;
    title: string;
    orderId: string;
    productId: string;
}

// Define environment variables
const orderAllUrl = process.env.NEXT_PUBLIC_ORDER_ALL as string;
const orderRemoveUrl = process.env.NEXT_PUBLIC_ORDER_REMOVE as string;
const productAddStockUrl = process.env.NEXT_PUBLIC_PRODUCT_ADD_STOCK as string;
const orderUpdateUrl = process.env.NEXT_PUBLIC_ORDER_UPDATE as string;

export default function MyOrder() {
    const [isEditing, setIsEditing] = useState(false);
    const [active, setActive] = useState(true);
    const [orders, setOrders] = useState<Order[]>([]);
    const [formData, setFormData] = useState<FormData>({
        title: '',
        status: '',
        productId: '',
        orderId: ''
    });

    const userId = (typeof window !== 'undefined' && localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user") as string)._id : '';

    useEffect(() => {
        if (userId) {
            axios.get(`${orderAllUrl}/${userId}`)
                .then(result => setOrders(result.data))
                .catch(err => console.error(err));
        }
    }, [userId]);

    const changeImg = (productImg: string, index: number) => {
        const thumbnail = document.getElementById(`thumbnail-${index}`) as HTMLImageElement;
        if (thumbnail) thumbnail.src = productImg;
    };

    const editOrder = (data: Order) => {
        setFormData({
            status: data.status,
            title: data.productId.title,
            orderId: data._id,
            productId: data.productId._id
        });
        setActive(false)
        setIsEditing(true);
    };

    const removeOrder = (order: Order, index: number) => {
        const orderId = order._id;
        const productId = order.productId._id;
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this record!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it',
            customClass: {
                confirmButton: 'btn btn-primary', // Bootstrap success button
                cancelButton: 'btn btn-danger'    // Bootstrap danger button
              }
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${orderRemoveUrl}/${orderId}`)
                    .then(() => axios.post(`${productAddStockUrl}/${productId}`))
                    .then(() => {
                        const newOrders = [...orders];
                        newOrders.splice(index, 1);
                        setOrders(newOrders);
                        Swal.fire('Deleted!', 'Your record has been deleted and stock has been added.', 'success');
                    })
                    .catch(stockError => {
                        console.error(stockError);
                        Swal.fire('Error!', 'Failed to add stock after deleting the order.', 'error');
                    });
            }
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { status, orderId } = formData;
        axios.put(`${orderUpdateUrl}/${orderId}`, { status })
            .then((updatedOrder) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Updated!',
                    text: 'Supplier details have been updated successfully.',
                    confirmButtonColor: '#3085d6',
                });
                setOrders(prevOrders => prevOrders.map(order =>
                    order._id === orderId ? { ...order, status } : order
                ));
                setIsEditing(false);
                setActive(true);
            })
            .catch(err => {
                console.error(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong while updating the Order Status. Please try again.',
                    confirmButtonColor: '#d33',
                });
                setIsEditing(false);
                setActive(true);
            });
    };
    const handelCancel = () => {
        setIsEditing(false);
        setFormData({ title: '', status: '', productId: '', orderId: '' });
        setActive(true)
    }

    return (
        <>
            {active && <section>
                {orders.length !== 0 ? (
                    <div className="container p-3">
                        {orders.map((data, index) => (
                            <section className='border p-2 mt-4' key={index}>
                                <h2>Order {index + 1}</h2>
                                <div className='d-flex' id='myOrder-child-div'>
                                    <div className='border m-1 d-flex'>
                                        <div className='d-flex flex-column align-items-center justify-content-center'>
                                            {data.productId.images.map((proImg, ind) => (
                                                <div className='border m-2 p-1' key={ind} style={{ width: '70px', height: '70px', cursor: 'pointer' }} onClick={() => changeImg(proImg, index)}>
                                                    <img style={{ width: '50px', height: '50px' }} src={proImg} alt='no image found' />
                                                </div>
                                            ))}
                                        </div>
                                        <div>
                                            <img src={data.productId.thumbnail} style={{ maxWidth: '300px', maxHeight: '300px' }} alt='no image found' id={`thumbnail-${index}`} />
                                        </div>
                                    </div>
                                    <div id='product-detail' className='border m-1 text-left position-relative w-75 p-2' style={{ textAlign: 'left' }}>
                                        <h3>{data.productId.title} </h3>
                                        <FaRegEdit className='text-primary' style={{ position: 'absolute', top: '4', right: '50', fontSize: '39px', cursor: 'pointer' }} onClick={() => editOrder(data)} />
                                        <MdDelete className='text-danger' style={{ position: 'absolute', top: '4', right: '4', fontSize: '39px', cursor: 'pointer' }} onClick={() => removeOrder(data, index)} />
                                        <h4>Category: <span className='fw-normal'>{data.productId.categoryName}</span></h4>
                                        <h2>
                                            <MdCurrencyRupee /> {(data.productId.price * 10 - (10 * (parseInt(data.productId.price.toString()) * parseInt(data.productId.discountPercentage.toString())) / 100)).toFixed(2)}
                                            &nbsp;&nbsp;<span className='text-secondary'><del>{(data.productId.price * 10).toFixed(2)}</del></span>
                                            <span className='text-success fs-3'> {data.productId.discountPercentage}% off</span>
                                        </h2>
                                        <p style={{ fontSize: '18px' }}>Description: {data.productId.description}</p>
                                        <span className='bg-success text-light p-1'>{data.productId.rating} <FaStar className='mb-1' /></span>
                                    </div>
                                </div>
                                <section id='myOrder' className='container'>
                                    <div className='col-md-12'>
                                        <div className="card m-1 p-0">
                                            <div className="d-flex flex-column justify-content-around align-content-around ms-auto" style={{ width: '97%' }}>
                                                <div className="row d-flex justify-content-center">
                                                    <div className="col-12" id='myOrder-child'>
                                                        {data.status === "Cancelled" ? (
                                                            <ul id="progressbar" className="text-center">
                                                                <li style={{ width: '50%' }} className="active step0"></li>
                                                                <li style={{ width: '50%' }} className={`step0 ${data.status === 'Cancelled' ? 'active' : ''}`}></li>
                                                            </ul>
                                                        ) : (
                                                            <ul id="progressbar" className="text-center">
                                                                <li className="active step0"></li>
                                                                <li className={`step0 ${data.status === 'Order Shipped' || data.status === 'Out for delivery' || data.status === 'Delivered' ? 'active' : ''}`}></li>
                                                                <li className={`step0 ${data.status === 'Out for delivery' || data.status === 'Delivered' ? 'active' : ''}`}></li>
                                                                <li className={`step0 ${data.status === 'Delivered' ? 'active' : ''}`}></li>
                                                            </ul>
                                                        )}
                                                    </div>
                                                </div>
                                                {data.status === "Cancelled" ? (
                                                    <div className="d-flex justify-content-around">
                                                        <div className="d-flex align-items-start icon-content ms-3" id='img-content'>
                                                            <img className="icon" src="https://i.imgur.com/9nnc9Et.png" />
                                                            <div className="ms-2">
                                                                <p className="font-weight-bold">Order<br />Confirmed</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex icon-content" id='img-content'>
                                                            <img className="icon" src="https://i.imgur.com/HdsziHP.png" />
                                                            <div className="ms-2">
                                                                <p className="font-weight-bold">Order<br />Cancelled</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="d-flex justify-content-around">
                                                        <div className="d-flex icon-content ms-3" id='img-content'>
                                                            <img className="icon" src="https://i.imgur.com/9nnc9Et.png" />
                                                            <div className="ms-2">
                                                                <p className="font-weight-bold">Order<br />Confirmed</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex icon-content" id='img-content'>
                                                            <img className="icon" src="https://i.imgur.com/u1AzR7w.png" />
                                                            <div className="ms-2">
                                                                <p className="font-weight-bold">Order<br />Shipped</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex icon-content" id='img-content'>
                                                            <img className="icon" src="https://i.imgur.com/TkPm63y.png" />
                                                            <div className="ms-2">
                                                                <p className="font-weight-bold">Out<br />for delivery</p>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex icon-content" id='img-content'>
                                                            <img className="icon" src="https://i.imgur.com/HdsziHP.png" />
                                                            <div className="ms-2">
                                                                <p className="font-weight-bold">Order<br />Delivered</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </section>
                        ))}
                    </div>
                ) : (
                    <div className='d-flex justify-content-center align-items-center flex-column' style={{ height: '80vh' }}>
                        <img src="https://miraaf.com/assets/images/no_order1.png"  alt='no image found' className='border rounded m-2' />
                        <Link href="/">
                            <button className='btn btn-primary bg-primary' style={{ width: '200px' }}>Order Now</button>
                        </Link>
                    </div>
                )}
            </section>}

            {isEditing && (
                <section className="edit-form-section">
                    <div className="edit-form-container">
                        <form onSubmit={handleSubmit} className="edit-form">
                        <h4>Update Order Details</h4>
                            <label className="form-label">
                                Product Name:
                                <input
                                    type="text"
                                    value={formData.title}
                                    readOnly
                                    className="form-input"
                                />
                            </label>
                            <label className="form-label">
                                Order Status:
                                <select
                                    value={formData.status}
                                    className="form-select"
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                >
                                    <option value="Order Confirmed">Order Confirmed</option>
                                    <option value="Order Shipped">Order Shipped</option>
                                    <option value="Out for delivery">Out for delivery</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                            </label>
                            <div className="form-buttons">
                                <button type="button" className="btn btn-cancel btn-outline-danger" onClick={handelCancel}>Cancel</button>
                                <button type="submit" className="btn btn-primary btn-save">Save</button>
                            </div>
                        </form>
                    </div>
                </section>
            )}
        </>
    );
}
