"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import { MdCurrencyRupee } from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';
// Define the type for a product
interface Product {
    title: string;
    thumbnail: string;
    price: number;
    stock: number;
}

export default function ProductStockAlert() {
    // State to hold the list of products
    const [products, setProducts] = useState<Product[]>([]);

    // Fetch low stock products when the component mounts
    useEffect(() => {
        // Fetch data from the API
        axios.get(`${process.env.NEXT_PUBLIC_PRODUCT_FETCH_LOW_STOCK}`)
            .then(result => {
                // Update state with the fetched products
                setProducts(result.data);
            })
            .catch(err => {
                // Log any errors that occur during the fetch
                console.error(err);
            });
    }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <div className="container p-2 mt-3">
        <h3 className="text-center">Stock Level</h3>
        <div className="d-flex justify-content-center align-items-between flex-row flex-wrap">
            {products.map((data, index) => (
                <div className="product-item p-2" key={index}>
                    <div className="d-flex flex-column rounded align-items-center p-2 border" style={{width:'250px'}}>
                        <h5>{index + 1}</h5>
                        <img src={data.thumbnail} alt={data.title} style={{ width: '150px', height: '150px' }} />
                        <h6 className="text-center mt-2">{data.title.slice(0, 20)}</h6>
                        <h5 className="text-center">Price: {(data.price * 10).toFixed(2)}</h5>
                        <p className="fs-5">Stock: <span className="text-danger">{data.stock}</span></p>
                    </div>
                </div>
            ))}
        </div>
    </div>
    
    );
}
