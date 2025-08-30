// src/components/Product/ProductDetails.js
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { toast } from 'react-toastify';
import Loader from '../layout/Loader/Loader';
import ReviewCard from './ReviewCard';
import './ProductDetails.css';
import noImage from '../images/no-image.png';
import { useSelector, useDispatch } from 'react-redux';
import {
  getProductDetails,
  createProductReview,
  updateReview,
  deleteReview,
} from '../../features/productAction';
import { clearErrors } from '../../features/productSlice';
import { addToCart } from '../../features/cartAction';

// Popup for editing review
function ReviewPopup({ open, onClose, review, onSubmit }) {
  const [rating, setRating] = useState(review?.rating || 0);
  const [comment, setComment] = useState(review?.comment || "");

  useEffect(() => {
    setRating(review?.rating || 0);
    setComment(review?.comment || "");
  }, [review]);

  if (!open) return null;

  return (
    <div className="popupOverlay">
      <div className="popupContent">
        <h3>Edit Review</h3>
        <Rating
          value={rating}
          precision={0.5}
          onChange={(e, val) => setRating(val)}
        />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="popupActions">
          <button
            onClick={() => onSubmit({ ...review, rating, comment })}
            className="btnPrimary"
          >
            Save
          </button>
          <button onClick={onClose} className="btnSecondary">Cancel</button>
        </div>
      </div>
    </div>
  );
}

// Popup for delete confirmation
function DeleteConfirm({ open, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <div className="popupOverlay">
      <div className="popupContent">
        <h3>Delete Review?</h3>
        <p>Are you sure you want to delete this review?</p>
        <div className="popupActions">
          <button onClick={onConfirm} className="btnDanger">Yes, Delete</button>
          <button onClick={onClose} className="btnSecondary">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(state => state.products);
  const { user } = useSelector(state => state.user);

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  // Popup states
  const [editPopup, setEditPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

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
     if (!user) {
    toast.error("Please login to add items to cart");
    return;
  }
    dispatch(addToCart({ productId: product._id, quantity }));
    toast.success('Item added to cart');
  };

  const submitReviewHandler = () => {
    if (!user) {
    toast.error("Please login to submit a review");
    return;
  }
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

  const handleEditSubmit = (updatedReview) => {
  const reviewData = {
    rating: updatedReview.rating,
    comment: updatedReview.comment,
  };

  dispatch(updateReview({
    reviewId: updatedReview._id,
    reviewData,   // 👈 pass JSON object
  }))
    .then(() => {
      toast.success('Review updated successfully');
      dispatch(getProductDetails(product._id));
      setEditPopup(false);
    })
    .catch(err => toast.error(err.message));
};

const handleDeleteConfirm = () => {
  dispatch(deleteReview({
    reviewId: selectedReview._id,
    productId: product._id,   // 👈 add this
  }))
    .then(() => {
      toast.success('Review deleted successfully');
      dispatch(getProductDetails(product._id));
      setDeletePopup(false);
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
            {/* ---- Carousel ---- */}
            <div className="carouselContainer">
              <Swiper
                className="productSwiper"
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                spaceBetween={10}
                slidesPerView={1}
                loop={true}
              >
                {(
                  product?.images?.filter(img => img?.url && img.url.trim() !== "")?.length
                    ? product.images.filter(img => img?.url && img.url.trim() !== "")
                    : [{ url: noImage }]
                ).map((item, i) => (
                  <SwiperSlide className="productSlide" key={i}>
                    <img
                      className="productSlideImage"
                      src={item?.url || noImage}
                      alt={product?.name ? `${product.name} ${i + 1}` : `Product ${i + 1}`}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = noImage;
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* ---- Product Info ---- */}
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

              {/* ---- Submit Review ---- */}
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

          {/* ---- Reviews ---- */}
          <h3 className="reviewsHeading">REVIEWS</h3>
          {product.reviews && product.reviews.length > 0 ? (
            <div className="reviews">
              {product.reviews.map(review => (
                <ReviewCard
                  key={review._id}
                  review={review}
                  isOwner={user && user._id !== review.user}
                  // isOwner={true}
                  onEdit={() => { setSelectedReview(review); setEditPopup(true); }}
                  onDelete={() => { setSelectedReview(review); setDeletePopup(true); }}
                />
              ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </>
      )}

      {/* Popups */}
      <ReviewPopup
        open={editPopup}
        onClose={() => setEditPopup(false)}
        review={selectedReview}
        onSubmit={handleEditSubmit}
      />

      <DeleteConfirm
        open={deletePopup}
        onClose={() => setDeletePopup(false)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
