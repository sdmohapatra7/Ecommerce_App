import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MdAccountCircle,
  MdSearch,
  MdAddShoppingCart,
} from "react-icons/md";
import { useSelector } from "react-redux";  // ✅ import redux state
import logo from "../../images/logo.png";
import "./Header.css";

import ForgotPassword from "../../User/ForgotPassword";
import Profile from "../../User/Profile";

export default function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showProductMenu, setShowProductMenu] = useState(false);
  const [openForgot, setOpenForgot] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  // ✅ Get cart items count from Redux
  const { cartItems } = useSelector((state) => state.cart);

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

        {/* ✅ Cart with badge */}
        <Link to="/cart" className="cartIcon">
          <MdAddShoppingCart />
          {cartItems.length > 0 && (
            <span className="cartCount">{cartItems.length}</span>
          )}
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

              <button
                className="custum-btn"
                onClick={() => setOpenProfile(true)}
              >
                Profile
              </button>

              <Link to="/orders">My Orders</Link>

              <button
                className="custum-btn"
                onClick={() => setOpenForgot(true)}
              >
                Forgot Password
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ✅ Popup Components */}
      <ForgotPassword
        open={openForgot}
        handleClose={() => setOpenForgot(false)}
      />
      <Profile
        open={openProfile}
        handleClose={() => setOpenProfile(false)}
      />
    </header>
  );
}
