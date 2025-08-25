import React from "react";
import { ReactNavbar } from "overlay-navbar";
import { MdAccountCircle, MdSearch, MdAddShoppingCart } from "react-icons/md";
import logo from "../../images/logo.png";

const options = {
  logo,
  burgerColorHover: "#eb4034",
  logoWidth: "20vmax",
  navColor1: "white",
  logoHoverSize: "10px",
  logoHoverColor: "#eb4034",
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
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  profileIcon: true,
  ProfileIconElement: MdAccountCircle,
  profileIconUrl: "/login",
  profileIconColor: "rgba(35, 35, 35,0.8)",
  profileIconColorHover: "#eb4034",
  searchIcon: true,
  SearchIconElement: MdSearch,
  searchIconColor: "rgba(35, 35, 35,0.8)",
  searchIconColorHover: "#eb4034",
  cartIcon: true,
  CartIconElement: MdAddShoppingCart,
  cartIconColor: "rgba(35, 35, 35,0.8)",
  cartIconColorHover: "#eb4034",
  cartIconMargin: "1vmax",
};

export default function Header() {
  return <ReactNavbar {...options} />;
}
