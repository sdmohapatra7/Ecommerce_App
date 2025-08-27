import React, { useEffect, useState } from 'react';
import Carousel from "react-material-ui-carousel";
import { useParams } from 'react-router-dom';
import Rating from "@mui/material/Rating";
import { toast } from 'react-toastify';
import Loader from "../layout/Loader/Loader";
import ReviewCard from './ReviewCard.js';
import './ProductDetails.css';

import { useSelector, useDispatch } from 'react-redux';
import { getProductDetails } from "../../features/productAction";
import { clearErrors } from "../../features/productSlice";

export default function ProductDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { product: productData, loading, error } = useSelector(state => state.products);
    const product = productData?.product; // actual product object

    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        if (product?.stock && quantity < product.stock) {
            setQuantity(prev => prev + 1);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProductDetails(id));
    }, [dispatch, id, error]);

    return (
        <>
            {loading || !product ? (
                <Loader />
            ) : (
                <>
                    <div className="ProductDetails">
                        <div className="carouselContainer">
                            <Carousel>
                                {product.images?.length > 0 ? (
                                    product.images.map((item, i) => (
                                        <img
                                            className="CarouselImage"
                                            key={i}
                                            src={item.url}
                                            alt={`${i} Slide`}
                                        />
                                    ))
                                ) : (
                                    <img
                                        className="CarouselImage"
                                        src="/default-product.png"
                                        alt="Default Slide"
                                    />
                                )}
                            </Carousel>
                        </div>

                        <div className="detailsContainer">
                            <div className="detailsBlock-1">
                                <h2>{product.name}</h2>
                                <p>Product # {product._id}</p>
                            </div>

                            <div className="detailsBlock-2">
                                <Rating
                                    size="large"
                                    value={product.ratings ?? 0}
                                    readOnly
                                    precision={0.5}
                                />
                                <span className="detailsBlock-2-span">
                                    ({product.numOfReviews ?? 0} Reviews)
                                </span>
                            </div>

                            <div className="detailsBlock-3">
                                <h1>{`₹${product.price}`}</h1>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decreaseQuantity} disabled={quantity <= 1}>-</button>
                                        <input readOnly type="number" value={quantity} />
                                        <button onClick={increaseQuantity} disabled={quantity >= product.stock}>+</button>
                                    </div>
                                    <button disabled={product.stock < 1}>
                                        Add to Cart
                                    </button>
                                </div>

                                <p>
                                    Status:{" "}
                                    <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                                        {product.stock < 1 ? "OutOfStock" : "InStock"}
                                    </b>
                                </p>
                            </div>

                            <div className="detailsBlock-4">
                                Description: <p>{product.description}</p>
                            </div>

                            <button className="submitReview">
                                Submit Review
                            </button>
                        </div>
                    </div>

                    <h3 className="reviewsHeading">REVIEWS</h3>

                    {product.reviews && product.reviews.length > 0 ? (
                        <div className="reviews">
                            {product.reviews.map(review => (
                                <ReviewCard key={review._id} review={review} />
                            ))}
                        </div>
                    ) : (
                        <p className="noReviews">No Reviews Yet</p>
                    )}
                </>
            )}
        </>
    );
}
