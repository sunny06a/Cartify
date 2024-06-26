import axios from "axios";
import { 
    ALL_PRODUCTS_REQUEST, 
    ALL_PRODUCTS_SUCCESS, 
    ALL_PRODUCTS_FAIL, 
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCTS_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    // NEW_REVIEW_RESET,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    NEW_REVIEW_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    // NEW_PRODUCT_RESET,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    // UPDATE_PRODUCT_RESET,
    UPDATE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    // DELETE_PRODUCT_RESET,
    DELETE_PRODUCT_FAIL,
    
    ALL_REVIEWS_REQUEST,
    ALL_REVIEWS_SUCCESS,
    ALL_REVIEWS_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_RESET,
    DELETE_REVIEW_FAIL,
    CLEAR_ERRORS } from "../constants/productConstants"


export const getProduct = (keyword='', currentPage=1, price =[0, 2500], category, ratings=0) => async (dispatch) => {
    try{
        dispatch({
            type:ALL_PRODUCTS_REQUEST
        })
        let link = `https://cartify-6qdqbt3va-sunny06as-projects.vercel.app/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${ratings}`;
        
        if(category){
            link = `https://cartify-6qdqbt3va-sunny06as-projects.vercel.app/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${ratings}`;
        
        }
        
        const {data} = await axios.get(link);
        dispatch({
            type:ALL_PRODUCTS_SUCCESS,
            payload:data
        })
    }
    catch(error){
        dispatch({
            type:ALL_PRODUCTS_FAIL,
            payload:error.response.data.message
        })
    }
}    

//get admin products
export const getAdminProduct = () => async (dispatch) => {
    try{
        dispatch({
            type:ADMIN_PRODUCTS_REQUEST
        })
        const {data} = await axios.get(`https://cartify-6qdqbt3va-sunny06as-projects.vercel.app/api/v1/admin/products`);
        dispatch({
            type:ADMIN_PRODUCTS_SUCCESS,
            payload:data.products
        })
    }
    catch(error){
        dispatch({
            type:ADMIN_PRODUCTS_FAIL,
            payload:error.response.data.message
        })
    }
}

export const getProductDetails = (id) => async (dispatch) => {
    try{
        dispatch({
            type:PRODUCT_DETAILS_REQUEST
        })
        const {data} = await axios.get(`https://cartify-6qdqbt3va-sunny06as-projects.vercel.app/api/v1/product/${id}`);
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data.product
        })
        console.log(data)
    }
    catch(error){
        dispatch({
            type:PRODUCTS_DETAILS_FAIL,
            payload:error.response.data.message
        })
    }
}

export const newReview = (reviewData) => async (dispatch) => {
    try{
        dispatch({
            type:NEW_REVIEW_REQUEST
        })
        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        const {data} = await axios.put(`https://cartify-6qdqbt3va-sunny06as-projects.vercel.app/api/v1/review`, reviewData, config);
        dispatch({
            type:NEW_REVIEW_SUCCESS,
            payload:data.success
        })
    }
    catch(error){
        dispatch({
            type:NEW_REVIEW_FAIL,
            payload:error.response.data.message
        })
    }
}

export const createProduct = (productData) => async (dispatch) => {
    try{
        dispatch({
            type:NEW_PRODUCT_REQUEST
        })
        const config = {
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }
        const {data} = await axios.post(`https://cartify-6qdqbt3va-sunny06as-projects.vercel.app/api/v1/admin/product/new`, productData, config);
        dispatch({
            type:NEW_PRODUCT_SUCCESS,
            payload:data
        })
    }
    catch(error){
        dispatch({
            type:NEW_PRODUCT_FAIL,
            payload:error.response.data.message
        })
    }
}

export const updateProduct = (id, productData) => async (dispatch) => {
    try{
        dispatch({
            type:UPDATE_PRODUCT_REQUEST
        })
        const config = {
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }
        const {data} = await axios.put(`https://cartify-6qdqbt3va-sunny06as-projects.vercel.app/api/v1/admin/product/${id}`, productData, config);
        dispatch({
            type:UPDATE_PRODUCT_SUCCESS,
            payload:data.success
        })
    }
    catch(error){
        dispatch({
            type:UPDATE_PRODUCT_FAIL,
            payload:error.response.data.message
        })
    }
}

export const deleteProduct = (id) => async (dispatch) => {
    try{
        dispatch({
            type:DELETE_PRODUCT_REQUEST
        })
        const {data} = await axios.delete(`https://cartify-6qdqbt3va-sunny06as-projects.vercel.app/api/v1/admin/product/${id}`);
        dispatch({
            type:DELETE_PRODUCT_SUCCESS,
            payload:data.success
        })
    }
    catch(error){
        dispatch({
            type:DELETE_PRODUCT_FAIL,
            payload:error.response.data.message
        })
    }
}

export const getAllReviews = (id) => async (dispatch) => {
    try{
        dispatch({
            type:ALL_REVIEWS_REQUEST
        })
        const {data} = await axios.get(`https://cartify-6qdqbt3va-sunny06as-projects.vercel.app/api/v1/reviews?id=${id}`);
        dispatch({
            type:ALL_REVIEWS_SUCCESS,
            payload:data.reviews
        })
    }
    catch(error){
        dispatch({
            type:ALL_REVIEWS_FAIL,
            payload:error.response.data.message
        })
    }
}

export const deleteReviews = (id, productId) => async (dispatch) => {
    try{
        dispatch({
            type:DELETE_REVIEW_REQUEST
        })
        const {data} = await axios.delete(`https://cartify-6qdqbt3va-sunny06as-projects.vercel.app/api/v1/reviews?id=${id}&productId=${productId}`);
        dispatch({
            type:DELETE_REVIEW_SUCCESS,
            payload:data.success
        })
    }
    catch(error){
        dispatch({
            type:DELETE_REVIEW_FAIL,
            payload:error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type:CLEAR_ERRORS
    })
}

