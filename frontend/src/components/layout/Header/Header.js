import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdAccountCircle, MdSearch, MdAddShoppingCart, MdMenu, MdClose, MdArrowDropDown } from "react-icons/md";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductOpen, setMobileProductOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

      {/* Desktop Nav */}
      <nav className="navLinks desktopNav">
        <Link to="/">Home</Link>

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

      {/* Right Icons */}
      <div className="navIcons">
        <Link to="/search">
          <MdSearch />
        </Link>

        <Link to="/cart" className="cartIcon">
          <MdAddShoppingCart />
          {cartItems.length > 0 && <span className="cartCount">{cartItems.length}</span>}
        </Link>

        {/* Desktop User Dropdown */}
        <div
          className="dropdown desktopNav"
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
                  <button className="custum-btn" onClick={() => setOpenProfile(true)}>Profile</button>
                  <Link to="/orders">My Orders</Link>
                  <button className="custum-btn" onClick={() => setOpenForgot(true)}>Forgot Password</button>
                  <button className="custum-btn" onClick={() => setOpenUpdatePass(true)}>Update Password</button>
                  <button className="custum-btn" onClick={handleLogout}>Logout</button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="mobileMenuIcon" onClick={() => setMobileMenuOpen(true)}>
          <MdMenu />
        </div>
      </div>

      {/* Mobile Slide Menu */}
      <div className={`mobileMenu ${mobileMenuOpen ? "open" : ""}`}>
        <div className="mobileCloseIcon" onClick={() => setMobileMenuOpen(false)}>
          <MdClose />
        </div>

        <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>

        {/* Products with nested toggle */}
        <div className="mobileDropdown">
          <button
            className="mobileDropdownBtn"
            onClick={() => setMobileProductOpen(!mobileProductOpen)}
          >
            Products <MdArrowDropDown />
          </button>
          {mobileProductOpen && (
            <div className="mobileDropdownMenu">
              <Link to="/products" onClick={() => setMobileMenuOpen(false)}>All Products</Link>
              {isAuthenticated && user?.role === "admin" && (
                <>
                  <Link to="/admin/product" onClick={() => setMobileMenuOpen(false)}>Add Product</Link>
                  <Link to="/admin/products" onClick={() => setMobileMenuOpen(false)}>Manage Products</Link>
                </>
              )}
            </div>
          )}
        </div>

        {isAuthenticated && user?.role === "admin" && (
          <Link to="/admin/users" onClick={() => setMobileMenuOpen(false)}>User Management</Link>
        )}

        {!isAuthenticated ? (
          <>
            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
            <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
          </>
        ) : (
          <>
            <button className="custum-btn" onClick={() => { setOpenProfile(true); setMobileMenuOpen(false); }}>Profile</button>
            <Link to="/orders" onClick={() => setMobileMenuOpen(false)}>My Orders</Link>
            <button className="custum-btn" onClick={() => { setOpenForgot(true); setMobileMenuOpen(false); }}>Forgot Password</button>
            <button className="custum-btn" onClick={() => { setOpenUpdatePass(true); setMobileMenuOpen(false); }}>Update Password</button>
            <button className="custum-btn" onClick={() => { handleLogout(); setMobileMenuOpen(false); }}>Logout</button>
          </>
        )}
      </div>

      {/* Popups */}
      <ForgotPassword open={openForgot} handleClose={() => setOpenForgot(false)} />
      <Profile open={openProfile} handleClose={() => setOpenProfile(false)} />
      <UpdatePassword open={openUpdatePass} handleClose={() => setOpenUpdatePass(false)} />
    </header>
  );
}
