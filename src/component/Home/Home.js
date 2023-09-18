import React, { Fragment } from 'react'
import {CgMouse} from 'react-icons/cg'
import './Home.css'
import Product from './Product.js'
import MetaData from '../layout/MetaData'
const product ={
    name:'Iphone 12',
    price:'$999',
    image:'https://images.unsplash.com/photo-1602527289245-4d9e9a5a8e9c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aXBob25lJTIwMTJ8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'
}
const Home = () => {
  return (
    <Fragment>
        <MetaData title ="sunny tomar"></MetaData>
        <div className='banner'>
            <p> Welcome to Cartify</p>
            <h1> Find Amazing Produts Below</h1>

            <a href="#container">
                <button> Scroll <CgMouse></CgMouse></button>
            </a>
        </div>

        <h2 className='homepadding'>Featured Products</h2>

        <div className='container' id='container'>
        <Product product ={product}></Product>
        <Product product ={product}></Product>
        <Product product ={product}></Product>
        <Product product ={product}></Product>
        <Product product ={product}></Product>
        <Product product ={product}></Product>
        <Product product ={product}></Product>
        <Product product ={product}></Product>
        </div>

    </Fragment>
  )
}

export default Home