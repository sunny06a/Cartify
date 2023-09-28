import React, { Fragment } from 'react'
import './Cart.css'
import CartItemCard from './CartItemCard'
import {useSelector} from 'react-redux'

const Cart = () => {
    const item ={
        product:'IPhone12ProMax',
        name:'Apple iPhone 12 Pro Max',
        image:'https://images-na.ssl-images-amazon.com/images/I/71MHTD3uL4L._SL1500_.jpg',
        price:6000,
        quantity:1
    }
  return (
    <Fragment>
        <div className='cartPage'>
            <div className='cartHeader'>
                <p>Product</p>
                <p>Quantity</p>
                <p>Subtotal</p>
            </div>
            <div className='cartContainer'>
                <CartItemCard item={item}/>
                <div  className='cartInput'>
                    <button onClick={()=>{}}>+</button>
                    <input type='number'placeholder='1' value={item.quantity} readOnly/>
                    <button onClick={()=>{}}>-</button>
                </div>
                <p className='cartSubtotal'>{`₹${item.price*item.quantity}`}</p>
            </div>
            <div className='cartGrossProfit'>
            <div></div>
            <div className='cartGrossProfitBox'>
                <p>Gross Total</p>
                <p>{'6000'}</p>
            </div>
            <div></div>
            <div className='checkOutBtn'>
                <button>CheckOut</button>
            </div>
            </div>
        </div>
    </Fragment>
  )
}

export default Cart