// src/components/Home/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { addWishlist, deleteWishlist } from "../../features/userAction";
import './ProductCard.css';
import noImage from '../images/no-image.png';
import { toast } from 'react-toastify';
import Loader from '../layout/Loader/Loader';
export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // check if product is in wishlist
  const inWishlist = user?.wishlist?.some(
    (item) => item._id.toString() === product._id.toString()
  );

const toggleWishlist = (e) => {
  e.preventDefault();

  if (inWishlist) {
    dispatch(deleteWishlist(product._id))
      .unwrap()
      .then((res) => {
        toast.success("Removed from wishlist 🗑️");
      })
      .catch((err) => toast.error(err));
  } else {
    dispatch(addWishlist(product._id))
      .unwrap()
      .then((res) => {
        toast.success("Added to wishlist ❤️");
      })
      .catch((err) => toast.error(err));
  }
};


  return (
    <div className='productCard'>
      {/* Only image clickable */}
      <Link to={`/product/${product._id}`}>
        <img
          src={product?.images?.[0]?.url || noImage}
          alt={product?.name || 'Product Image'}
        />
      </Link>

      {/* Non-clickable text */}
      <p>{product?.name}</p>

      <div className='rating-review'>
        <Rating
          value={product?.ratings || 0}
          readOnly
          precision={0.5}
          size="small"
        />
        <div className="productCardReview">
          ({product?.numOfReviews || 0} Reviews)
        </div>
      </div>

      <span>
        {new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
        }).format(product?.price || 0)}
      </span>

      {/* ❤️ Heart Toggle */}
      <button className="wishlistBtn" onClick={toggleWishlist}>
        {inWishlist ? (
          <FavoriteIcon style={{ color: "red" }} />
        ) : (
          <FavoriteBorderIcon style={{ color: "gray" }} />
        )}
      </button>
    </div>
  );
}
