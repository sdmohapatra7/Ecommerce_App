import React from "react";
import { ReactNavbar } from "overlay-navbar";
import { MdAccountCircle, MdSearch, MdAddShoppingCart } from "react-icons/md";
import logo from "../../images/logo.png";

const options = {
  logo,
  burgerColorHover: "#28c74f",
  logoWidth: "20vmax",
  navColor1: "white",
  logoHoverSize: "10px",
  logoHoverColor: "#28c74f",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  link1ColorHover: "#28c74f",
  link1Margin: "1vmax",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  profileIcon: true,
  ProfileIconElement: MdAccountCircle,
  profileIconUrl: "/login",
  profileIconColor: "rgba(35, 35, 35,0.8)",
  profileIconColorHover: "#28c74f",
  searchIcon: true,
  SearchIconElement: MdSearch,
  searchIconColor: "rgba(35, 35, 35,0.8)",
  searchIconColorHover: "#28c74f",
  cartIcon: true,
  CartIconElement: MdAddShoppingCart,
  cartIconColor: "rgba(35, 35, 35,0.8)",
  cartIconColorHover: "#28c74f",
  cartIconMargin: "1vmax",
};

export default function Header() {
  return <ReactNavbar {...options} />;
}
