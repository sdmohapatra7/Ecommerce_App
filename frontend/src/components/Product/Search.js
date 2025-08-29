import React, { useState } from 'react';
import './Search.css';
import { useNavigate } from 'react-router-dom';

export default function Search() {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`);  // ✅ goes to /products/:keyword
        } else {
            navigate("/products");             // ✅ no keyword → all products
        }
    };

    return (
        <form className="searchBox" onSubmit={searchSubmitHandler}>
            <input
                type="text"
                placeholder="Search a Product ..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <input type="submit" value="Search" />
        </form>
    );
}
