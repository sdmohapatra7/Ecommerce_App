import React, { useEffect } from 'react';
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from './Product.js';
import MetaData from '../layout/MetaData';

import { getProduct } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';



// const product = {
//     name: 'Red TShirt',
//     images:[{url:'https://i.ibb.co/DRST11n/1.webp'}],
//     price: '3000',
//     _id:'shakti'
// }
export default function Home() {
    const dispatch = useDispatch();
    const { loading, error, products, productsCount } = useSelector(
        (state) => state.products
    );

    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);
    return (
        <>
            {loading ? (
                'loading'
            ) : (
                <>
                    <MetaData title='Ecommerce' />
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
                        {products && products.map((product, index) => <Product product={product} key={index} />)}
                    </div>
                </>
            )}
        </>
    )
}
