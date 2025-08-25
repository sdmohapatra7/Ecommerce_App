import React, { useEffect } from 'react';
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from './ProductCard';
import MetaData from '../layout/MetaData';

import { getProducts } from "../../features/productAction";
import { clearErrors } from "../../features/productSlice";
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';


// const product = {
//     name: 'Red TShirt',
//     images:[{url:'https://i.ibb.co/DRST11n/1.webp'}],
//     price: '3000',
//     _id:'shakti'
// }
export default function Home() {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(
        (state) => state.products
    );

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProducts());
    }, [dispatch,error,alert]);
    return (
        <>
            {loading ? (
                <Loader/>
            ) : (
                <>
                    <MetaData title='Ecommerce' />
                    <div className="banner">
                        <p>Welcome to ESmart</p>
                        <h1>FIND AMAZING PRODUCTS BELOW</h1>

                        <a href="#container">
                            <button>
                                Scroll <CgMouse />
                            </button>
                        </a>
                    </div>

                    <h2 className="homeHeading">Featured Products</h2>

                    <div className="container" id="container">
                        {products && products.map((product, index) => <Product product={product} key={index} />)}
                    </div>
                </>
            )}
        </>
    )
}
