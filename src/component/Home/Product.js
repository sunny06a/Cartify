import React from 'react'
import { Link } from 'react-router-dom'

const Product = ({product}) => {
  return (
    <>
       <Link className='productCard' to={Product.id}>
        <img src={product.image} alt={product.name} />
        <p>{product.name}</p>
        <div>
            <p>Rs. {product.price}</p>
            <button>Add to Cart</button>
        </div>
        <span>Free Shipping</span>
       </Link>
    </>
  )
}

export default Product