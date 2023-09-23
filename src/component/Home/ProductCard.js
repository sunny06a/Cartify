import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({product}) => {
  return (
    <>
       <Link className='productCard' to={ProductCard.id}>
        <img src={product.image[0].url} alt={product.name} />
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

export default ProductCard