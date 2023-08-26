import React, { useEffect, useState } from 'react';
import './products.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import ProductCard from '../Home/ProductCard';
import Loader from '../layout/Loader/Loader';
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";

export default function Products() {
    const dispatch = useDispatch();
    const [currentPage,setCurrentPage] = useState(1);
    const { products, loading, error, productsCount,resultPerPage } = useSelector((state) => state.products);
    const { keyword } = useParams();
    const setCurrentPageNo = (e)=>{
        setCurrentPage(e);
    }
    useEffect(() => {
        dispatch(getProduct(keyword,currentPage));
    }, [dispatch, keyword, currentPage]);
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
                    {resultPerPage < productsCount && (
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
                    )}
                </>
            )}
        </>
    )
}
