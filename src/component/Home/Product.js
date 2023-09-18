import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from "react-rating-stars-component";

const options ={
    edit: false,
    color: '#ffd700',
    activeColor: '#ffd700',
    size: window.innerWidth > 768 ? 20 : 15,
    value: 3,
    isHalf: true,
}
const Product = ({product}) => {
  return (
    <div>
        <Link className='productCard' to={product._id}>
            <img src={product.image} alt={product.name} />
            <p>{product.name}</p>
            <div className='productCardInfo'>
                <ReactStars
                    {...options}
                />
                <span> (256 reviews) </span>
            </div>
            <span>{product.price}</span>
        </Link>
    </div>
  )
}

export default Product