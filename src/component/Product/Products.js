import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productActions";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import "./Products.css";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
 
const Products = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  
  const params = useParams();
  const keyword = params.keyword;
  
    const setCurrentPageNo = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

  const { loading, products, error, productsCount , resultPerPage } =
    useSelector((state) => state.products);
  useEffect(
    () => {
      dispatch(getProduct(keyword, currentPage));
      console.log(currentPage);
    },
    [dispatch,keyword,currentPage],
    
  );
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className="productsHeading">Latest Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
         {
            resultPerPage < productsCount && 
            (
                <div className="paginationBox">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="1st"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              </div>
            )
         }
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
