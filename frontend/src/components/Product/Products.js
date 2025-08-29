import React, { useEffect, useState } from 'react';
import './products.css';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from "../../features/productAction";
import { clearErrors } from "../../features/productSlice";
import ProductCard from '../Home/ProductCard';
import Loader from '../layout/Loader/Loader';
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import { Slider, Typography } from "@mui/material";
import { toast } from 'react-toastify';

export default function Products() {
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);

    const { products, loading, error, productsCount, resultPerPage } = useSelector((state) => state.products);

    // ✅ you already had this, just ensuring it passes to thunk correctly
    const { keyword } = useParams();

    const setCurrentPageNo = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        // 🔹 change: pass object instead of separate args
        dispatch(getProducts({ keyword, page: currentPage, price }));
    }, [dispatch, keyword, currentPage, price, error]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <h2 className="productsHeading">Products</h2>

                    <div className="products">
                        {products && products.length > 0 ? (
                            products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))
                        ) : (
                            <p className="noProductsFound">No products found.</p>
                        )}
                    </div>

                    <div className="filterBox">
                        <Typography>Price</Typography>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            min={0}
                            max={25000}
                        />
                    </div>

                    {resultPerPage && productsCount > resultPerPage && (
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
    );
}
