import React,{Fragment, useEffect} from 'react';
import {CgMouse} from 'react-icons/cg';
import './Home.css';
import ProductCard from "./ProductCard.js"
import MetaData from '../layout/MetaData';
import { getProduct } from '../../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';

// const product = {
//     name: 'Product 1',
//     price: 100,
//     image: 'https://picsum.photos/200/300',
//     id: 1
// }

const Home = () => {
    const dispatch = useDispatch();
    // const {loading, products, error} = useSelector(state => state.products);
    
    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);

    const {products} = useSelector((state) => state.products.products);
    console.log(products);
    return (
        <Fragment>
          <MetaData title="Cartify" />

          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
    )
}

export default Home