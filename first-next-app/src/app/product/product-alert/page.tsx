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
        <div className="container  p-2 mt-3">
            <h3 className="text-center">Stock Level</h3>
            <div className="d-flex flex-wrap">
                {products.map((data,index)=>(<div className="p-2 w-25" key={index}>
                    <div className="m-2 d-flex rounded justify-content-center p-2 align-items-center border flex-column">
                    <h5>{index+1}</h5>
                    <img src={data.thumbnail} style={{width:'150px',height:'150px'}}/>
                    <h6 className="text-center mt-2">{data.title.slice(0,20)}</h6>
                    <h5 className="text-center">Price: {(data.price*10).toFixed(2)}</h5>
                    <p className="fs-5">Stock: <span className="text-danger">{data.stock}</span></p>
                    </div >
                </div>))}
            </div>
        </div>
    );
}
