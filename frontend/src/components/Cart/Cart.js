import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems, removeCartItem, addToCart } from "../../features/cartAction";
import Loader from "../layout/Loader/Loader";
import { toast } from "react-toastify";
import "./Cart.css";

export default function Cart() {
    const dispatch = useDispatch();
    const { cartItems, totalPrice, loading, error } = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(getCartItems());
        if (error) {
            toast.error(error);
        }
    }, [dispatch, error]);

    const increaseQuantity = (item) => {
        if (item.quantity < item.product.stock) {
            dispatch(addToCart({ productId: item.product._id, quantity: item.quantity + 1 }));
        } else {
            toast.info("Stock limit reached");
        }
    };

    const decreaseQuantity = (item) => {
        if (item.quantity > 1) {
            dispatch(addToCart({ productId: item.product._id, quantity: item.quantity - 1 }));
        }
    };

    const removeItemHandler = (productId) => {
        dispatch(removeCartItem(productId));
        toast.success("Item removed from cart");
    };

    if (loading) return <Loader />;

    return (
        <div className="cartContainer">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p className="emptyCart">Your cart is empty</p>
            ) : (
                <div className="cartItems">
                    {cartItems.map((item) => (
                        <div key={item._id} className="cartItem">
                            <img
                                src={item.image || (item.product.images && item.product.images[0]?.url)}
                                alt={item.name}
                            />
                            <div className="cartItemDetails">
                                <h4>{item.name}</h4>
                                <p>Price: ₹{item.price}</p>
                                <div className="cartItemQuantity">
                                    <button onClick={() => decreaseQuantity(item)}>-</button>
                                    <input type="number" readOnly value={item.quantity} />
                                    <button onClick={() => increaseQuantity(item)}>+</button>
                                </div>
                                <p>Subtotal: ₹{item.price * item.quantity}</p>
                                <p className="stockInfo">Stock: {item.product.stock}</p>
                                <button
                                    className="removeBtn"
                                    onClick={() => removeItemHandler(item.product._id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <h3 className="cartTotal">Total: ₹{totalPrice}</h3>
                </div>
            )}
        </div>
    );
}
