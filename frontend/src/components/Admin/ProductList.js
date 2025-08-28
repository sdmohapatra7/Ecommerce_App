// src/components/Admin/ProductList.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, deleteProduct } from "../../features/productAction";
import { resetSuccess } from "../../features/productSlice";
import { Link } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import "./ProductList.css";
import Loader from "../layout/Loader/Loader";
import { toast } from "react-toastify";
export default function ProductList() {
  const dispatch = useDispatch();
  const { products, loading, error, success } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProducts());

    if (success) {
      dispatch(resetSuccess()); // reset success after delete
      dispatch(getProducts()); // refresh list
    }
  }, [dispatch, success]);

const handleDelete = (id) => {
  if (window.confirm("Are you sure you want to delete this product?")) {
    dispatch(deleteProduct(id)).then(() => {
      toast.success("Product deleted successfully");
    });
  }
};

  if (loading) return <Loader />;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="productListTable">
      {products.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>₹{product.price}</td>
                <td>
                  <span className={product.stock > 0 ? "inStock" : "outStock"}>
                    {product.stock > 0 ? product.stock : "Out of stock"}
                  </span>
                </td>
                <td className="actionsCell">
                  <Link to={`/admin/product/${product._id}`} className="editBtn">
                    <MdEdit />
                  </Link>
                  <button
                    className="deleteBtn"
                    onClick={() => handleDelete(product._id)}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}
