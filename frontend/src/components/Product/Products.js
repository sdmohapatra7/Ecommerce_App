import React, { useEffect } from 'react';
import './products.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import ProductCard from '../Home/ProductCard';
import Loader from '../layout/Loader/Loader';

export default function Products() {
    const dispatch = useDispatch();
    const { products, loading, error, productsCount } = useSelector((state) => state.products);
    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch])
    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <h2 className="productsHeading">Products</h2>

                    <div className="products">
                        {products &&
                            products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                    </div>
                </>
            )}
        </>
    )
}
