// src/components/layout/Header/Header.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MdAccountCircle,
  MdSearch,
  MdAddShoppingCart,
} from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../../features/userAction";
import { toast } from "react-toastify";

import logo from "../../images/logo.png";
import "./Header.css";

import ForgotPassword from "../../User/ForgotPassword";
import UpdatePassword from "../../User/UpdatePassword";

import Profile from "../../User/Profile";

export default function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showProductMenu, setShowProductMenu] = useState(false);
  const [openForgot, setOpenForgot] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openUpdatePass, setOpenUpdatePass] = useState(false);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Redux states
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(error);
    }
  };

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
              {isAuthenticated && user?.role === "admin" && (
                <>
                  <Link to="/admin/product">Add Product</Link>
                  <Link to="/admin/products">Manage Products</Link>
                </>
              )}
            </div>
          )}
        </div>

        {isAuthenticated && user?.role === "admin" && (
          <Link to="/admin/users">User Management</Link>
        )}

        
      </nav>

      {/* Right Side Icons */}
      <div className="navIcons">
        <Link to="/search">
          <MdSearch />
        </Link>

        {/* Cart with badge */}
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
              {!isAuthenticated ? (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/signup">Sign Up</Link>
                </>
              ) : (
                <>
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
                  <button
                    className="custum-btn"
                    onClick={() => setOpenUpdatePass(true)}
                  >
                    Update Password
                  </button>

                  {/* ✅ Proper logout */}
                  <button className="custum-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Popup Components */}
      <ForgotPassword
        open={openForgot}
        handleClose={() => setOpenForgot(false)}
      />
      <Profile
        open={openProfile}
        handleClose={() => setOpenProfile(false)}
      />
      <UpdatePassword
        open={openUpdatePass}
        handleClose={() => setOpenUpdatePass(false)}
      />

    </header>
  );
}
