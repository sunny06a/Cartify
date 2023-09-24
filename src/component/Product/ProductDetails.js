import React, { Fragment, useEffect } from 'react'
import Carousel from 'react-material-ui-carousel'
import './ProductDetails.css'
import {useSelector,useDispatch} from 'react-redux'
import { clearErrors, getProductDetails } from '../../actions/productActions'
import {useParams} from 'react-router-dom'
import { Rating } from '@mui/material'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader/Loader'

const ProductDetails = (match) => {
  const dispatch = useDispatch()
  const params = useParams()
  const {loading,product,error} = useSelector(state => state.productDetails)
  useEffect(() => {
    if(error){
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(params.id))
  }, [dispatch, params.id, error])

  return (
    <Fragment>
      {
        loading ? (<Loader/>) :
        (
          <Fragment>
            
       <MetaData title={`${product.name} --  CArtify`} />
          <div className="ProductDetails">
            <div>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating value={product.ratings} readOnly={true} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button >-</button>
                    <input readOnly type="number" />
                    <button >+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                   
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button  className="submitReview">
                Submit Review
              </button>
            </div>
          </div>
          <h3 className="reviewsHeading">REVIEWS</h3>
          </Fragment>
        )
      }
</Fragment>
  )
}

export default ProductDetails