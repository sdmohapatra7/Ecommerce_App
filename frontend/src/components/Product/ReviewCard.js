import React from 'react';
import Rating from "@mui/material/Rating";
import profilePng from "../images/profile.png"; // default user image

export default function ReviewCard({ review }) {
    return (
        <div className="reviewCard">
            <img src={profilePng} alt="User" />
            <p>{review.name}</p>
            <Rating
                value={review.rating ?? 0}
                readOnly
                precision={0.5}
            />
            <span className="reviewCardComment">{review.comment}</span>
        </div>
    );
}
