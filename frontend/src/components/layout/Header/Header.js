import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MdAccountCircle,
  MdSearch,
  MdAddShoppingCart,
} from "react-icons/md";
import logo from "../../images/logo.png";
import "./Header.css";

export default function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showProductMenu, setShowProductMenu] = useState(false);

  return (
    <header className="customNavbar">
      {/* Logo */}
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="navLinks">
        <Link to="/">Home</Link>

        {/* Product Dropdown */}
        <div
          className="dropdown"
          onMouseEnter={() => setShowProductMenu(true)}
          onMouseLeave={() => setShowProductMenu(false)}
        >
          <span>Products ▾</span>
          {showProductMenu && (
            <div className="dropdown-menu">
              <Link to="/products">All Products</Link>
              <Link to="/admin/product">Add Product</Link>
              <Link to="/admin/products">Manage Products</Link>
            </div>
          )}
        </div>

        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      {/* Right Side Icons */}
      <div className="navIcons">
        <Link to="/search">
          <MdSearch />
        </Link>
        <Link to="/cart">
          <MdAddShoppingCart />
        </Link>

        {/* User Dropdown */}
        <div
          className="dropdown"
          onMouseEnter={() => setShowUserMenu(true)}
          onMouseLeave={() => setShowUserMenu(false)}
        >
          <MdAccountCircle className="icon" />
          {showUserMenu && (
            <div className="dropdown-menu user-menu">
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
              <Link to="/account">Profile</Link>
              <Link to="/orders">My Orders</Link>
              <Link to="/password/forgot">Forgot Password</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
