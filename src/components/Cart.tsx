import React from "react";
import { useEffect } from "react";
import { usePogStore } from "../store/pogStore";
import { useCartStore } from "../store/cartStore";
import store1 from "../badge-in/store1.png";
import store2 from "../badge-in/store2.png";
import store3 from "../badge-in/store3.png";
import "../cart.css"; // optional CSS for styling

const Cart: React.FC = () => {
  const issueData = usePogStore((state) => state.issueData);
  const { cartItems, removeItem, clearCart } = useCartStore();
  const updateIssueData = usePogStore((state) => state.updateIssueData);

  useEffect(() => {
    updateIssueData({
      badgeInImages: [store1, store2, store3],
    });
  }, [updateIssueData]);

  return (
    <div className="side-panel">
      <h3>Cart / Badge Preview</h3>
      <div className="cart-content">
        <div className="init-info">
          <div className="init-info-items">
            <p>Session ID {issueData.sessionId}</p>
            <p>Store {issueData.storeName}</p>
            <p>Reviewer {issueData.reviewerName}</p>
          </div>
        </div>
        <div className="badge-in-images">
          <h3>Badge In Images</h3>
          <ul className="badge-list">
            <li>
              <img src={store1} alt="Store 1" className="badge-image-cart" />
            </li>
            <li>
              <img src={store2} alt="Store 2" className="badge-image-cart" />
            </li>
            <li>
              <img src={store3} alt="Store 3" className="badge-image-cart" />
            </li>
          </ul>
        </div>
        <div className="cart">
          <h4>Your Cart</h4>
          <button onClick={clearCart} style={{ marginBottom: "10px" }}>
            Clear Cart
          </button>
          <ul className="cart-items">
            {cartItems.length === 0 && <li>No items yet</li>}
            {cartItems.map((item) => (
              <li
                key={item.upc}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "5px",
                }}
              >
                <span>
                  {item.name} {item.quantity && `x${item.quantity}`}
                </span>
                <button
                  onClick={() => removeItem(item.upc)}
                  style={{ marginLeft: "auto" }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Cart;
