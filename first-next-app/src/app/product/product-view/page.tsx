"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaRupeeSign } from 'react-icons/fa';
import './page.css';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
// Define TypeScript interfaces for product data
interface Product {
  _id: string;
  title: string;
  categoryName: string;
  price: number;
  discountPercentage: number;
  thumbnail: string;
  images: string[];
}

interface User {
  _id: string;
}

function ProductInventry() {
  const [productList, setProductList] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch products when the component mounts
  useEffect(() => {
      try {

        axios.get(`${process.env.NEXT_PUBLIC_PRODUCT_VIEW_ALL}`).then(result=>{
            setProductList(result.data.result);
        }).catch(err=>{
            console.log(err);
        });
      } catch (error) {
        console.error('Error fetching products:', error);
        Swal.fire({
          title: 'Error!',
          text: 'There was an error fetching products',
          icon: 'error'
        });
      } finally {
        setLoading(false);
      }
    },[]);

  // Function to change the main product image when a thumbnail is clicked
  const changeImg = (productImg: string, index: number) => {
    const thumbnail = document.getElementById(`thumbnail-${index}`) as HTMLImageElement;
    if (thumbnail) {
      thumbnail.src = productImg;
    }
  };

  // Function to handle order creation
  const createOrder = async (product: Product) => {
    const userString:any = localStorage.getItem('user');
    let userId: any | null = null;
    const user: User = JSON.parse(userString);
    userId = user._id;
    console.log(userId)
    if (userId) {
      const productId = product._id; // Get product ID

      Swal.fire({
        title: 'Are you sure?',
        text: `Do you want to create an order for ${product.title}?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, create order',
        cancelButtonText: 'No, cancel'
      }).then(async (result:any) => {
        if (result.isConfirmed) {
          try {
            // Check stock availability
            const stockResponse = await axios.get(`${process.env.NEXT_PUBLIC_PRODUCT_CHECK_STOCK}/${productId}`);
            const { stockAvailable } = stockResponse.data;

            if (stockAvailable) {
              // Create the order
              await axios.post(`${process.env.NEXT_PUBLIC_ORDER_CREATE}`, { userId, productId });

              // Remove stock after the order is created
              await axios.delete(`${process.env.NEXT_PUBLIC_PRODUCT_REMOVE_STOCK}/${productId}`);

              Swal.fire({
                title: 'Order created!',
                text: 'Your order has been created successfully',
                icon: 'success'
              });
            } else {
              // Notify the user if the product is out of stock
              Swal.fire({
                title: 'Out of Stock!',
                text: 'Sorry, this product is out of stock.',
                icon: 'error'
              });
            }
          } catch (err) {
            console.error('Error handling order:', err);
            Swal.fire({
              title: 'Error!',
              text: 'There was an error processing your order',
              icon: 'error'
            });
          }
        }
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'User is not logged in',
        icon: 'error'
      });
    }
  };

  return (
    <>
      {/* Main section for displaying products */}
      {!loading ? (
        <section id="product-inventry-parent">
          {productList?.map((data, index) => (
            <div id="product-invt" className='border' key={data._id}>
              {/* Main product image */}
              <div className='d-flex justify-content-center align-items-center w-100 m-2'>
              <img src={data.thumbnail} width="250px" height="250px" id={`thumbnail-${index}`} />
              </div>

              {/* Thumbnails for changing the main product image */}
              <div className="d-flex w-100 justify-content-center p-2">
                {data.images?.map((productImg, ind) =>
                  <div key={ind} className="border rounded ms-4" style={{ cursor: 'pointer' }} onClick={() => changeImg(productImg, index)}>
                    <img src={productImg} alt="image" style={{ width: '50px', height: '50px' }} />
                  </div>
                )}
              </div>

              {/* Product category */}
              <p className="text-center text-success fs-6 m-1">
                Category : <b className="fw-bold">{data.categoryName}</b>
              </p>
              {/* Product title */}
              <h6 className='text-center fw-bold'>{data.title?.slice(0, 25)}</h6>
              {/* Product price and discount */}
              <div className='text-center'>
              <h6 id="price" className='d-inline p-1'>
                Price: <b>{(data.price * 10).toFixed(2)}</b> <FaRupeeSign />
              </h6>&nbsp;&nbsp;&nbsp;
              <span className='text-center m-0'>{data.discountPercentage}% Off</span>
              </div>

              {/* Button to create an order */}
              <center>
                <button className="m-2 btn btn-primary center w-75" onClick={() => createOrder(data)}>Order now</button>
              </center>
            </div>
          ))}
        </section>
      ) : (
        <div>
          <h2>Loading...</h2>
        </div>
      )}
    </>
  );
}

export default ProductInventry;
