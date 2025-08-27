import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { toast } from 'react-toastify';
import Loader from '../layout/Loader/Loader';
import ReviewCard from './ReviewCard';
import './ProductDetails.css';

import { useSelector, useDispatch } from 'react-redux';
import { getProductDetails, createProductReview } from '../../features/productAction';
import { clearErrors } from '../../features/productSlice';
import { addToCart } from '../../features/cartAction';

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { product: productData, loading, error } = useSelector(state => state.products);
  const product = productData?.product;

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error]);

  const increaseQuantity = () => {
    if (product?.stock && quantity < product.stock) setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: product._id, quantity }));
    toast.success('Item added to cart');
  };

  const submitReviewHandler = () => {
    if (!comment || rating === 0) {
      toast.error('Please provide rating and comment');
      return;
    }
    const reviewData = { rating, comment, productId: product._id };
    dispatch(createProductReview(reviewData))
      .then(() => {
        toast.success('Review submitted successfully');
        setRating(0);
        setComment('');
        dispatch(getProductDetails(product._id));
      })
      .catch(err => toast.error(err.message));
  };

  return (
    <>
      {loading || !product ? (
        <Loader />
      ) : (
        <>
          <div className="ProductDetails">
            <div className="carouselContainer">
              <Carousel>
                {product.images?.length > 0
                  ? product.images.map((item, i) => (
                      <img
                        key={i}
                        className="CarouselImage"
                        src={item.url}
                        alt={`Slide ${i}`}
                      />
                    ))
                  : (
                    <img
                      className="CarouselImage"
                      src="/default-product.png"
                      alt="Default"
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
                <h1>₹{product.price}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity} disabled={quantity <= 1}>-</button>
                    <input type="number" readOnly value={quantity} />
                    <button onClick={increaseQuantity} disabled={quantity >= product.stock}>+</button>
                  </div>
                  <button onClick={handleAddToCart} disabled={product.stock < 1}>
                    Add to Cart
                  </button>
                </div>
                <p>
                  Status: <b className={product.stock < 1 ? 'redColor' : 'greenColor'}>
                    {product.stock < 1 ? 'OutOfStock' : 'InStock'}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description: <p>{product.description}</p>
              </div>

              <div className="submitReviewContainer">
                <h3>Submit Your Review</h3>
                <Rating
                  value={rating}
                  precision={0.5}
                  onChange={(e, val) => setRating(val)}
                />
                <textarea
                  placeholder="Write your review here..."
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                />
                <button onClick={submitReviewHandler}>Submit Review</button>
              </div>
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
