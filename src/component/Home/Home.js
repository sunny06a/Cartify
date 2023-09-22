import React,{Fragment} from 'react';
import {CgMouse} from 'react-icons/cg';
import './Home.css';
import Product from "./Product.js"
import MetaData from '../layout/MetaData';
const product = {
    name: 'Product 1',
    price: 100,
    image: 'https://picsum.photos/200/300',
    id: 1
}
const Home = () => {
    return (
        <Fragment>
            <MetaData title={'Cartify | Buy Best Products Online'}/>
            <div className='banner'>
                <p>Welcome to Cartify</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>

                <a href="#container">
                    <button>
                        Scroll <CgMouse/>
                    </button>
                </a>
            </div>
            <h2 id='homeHeading'>Featured Products</h2>
            <div className='container' id='container'>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            </div>
        </Fragment>
    )
}

export default Home