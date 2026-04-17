// src/components/Product/ReviewCard.js
import React from "react";
import Rating from "@mui/material/Rating";
import "./ProductDetails.css";

export default function ReviewCard({ review, isOwner, onEdit, onDelete }) {
  return (
    <div className="reviewCard">
      <p className="reviewUser">{review.name}</p>
      <Rating value={review.rating} readOnly precision={0.5} />
      <span className="reviewComment">{review.comment}</span>

      {isOwner && (
        <div className="reviewActions">
          <button onClick={onEdit} className="btnSmall">Edit</button>
          <button onClick={onDelete} className="btnSmall btnDanger">Delete</button>
        </div>
      )}
    </div>
  );
}
