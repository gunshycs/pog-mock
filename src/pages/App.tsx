// src/pages/App.tsx
import React, { useEffect } from "react";
import "../App.css";
import DataTable from "../components/DataTable";
import POGIssue from "../components/POGIssue";
import Cart from "../components/Cart";
import { useCartStore } from "../store/cartStore";
import { usePogStore } from "../store/pogStore";

const App: React.FC = () => {
  const clickedCell = usePogStore((state) => state.clickedCell);
  const setClickedCell = usePogStore((state) => state.setClickedCell);
  const issueData = usePogStore((state) => state.issueData);
  const updateIssueData = usePogStore((state) => state.updateIssueData);
  const { addItem } = useCartStore();

  const handleBack = () => setClickedCell(null);

  const storeName = "Tulane";
  const reviewerName = "John";

  const generateSessionId = (): string => {
    let id = "";
    for (let i = 0; i < 17; i++) {
      id += Math.floor(Math.random() * 10);
    }
    return id;
  };

  const id = generateSessionId();

  useEffect(() => {
    updateIssueData({
      storeName,
      reviewerName,
      sessionId: id,
    });
  }, [updateIssueData]);

  return (
    <div className="App-container">
      <div className="header">
        <h1>Welcome to POG Mock!</h1>
      </div>
      <Cart />

      <div className="super-container">
        <div className="plano">
          <DataTable rows={4} cols={5} />

          {clickedCell && (
            <div className="overlay active">
              <div className="overlay-content">
                <div className="overlay-header-info">
                  <button onClick={handleBack} className="btn-arrow">
                    <i className="bi bi-arrow-left"></i>
                  </button>
                  </div>
                  <div className="product-info-column">
                    <h2>{clickedCell.productName}</h2>
                    <h3>UPC: {clickedCell.productUPC}</h3>
                    <p>
                      Row: {clickedCell.row + 1}, Col: {clickedCell.col + 1}
                    </p>
                </div>
                <img
                  src={clickedCell.image}
                  alt="Clicked Product"
                  className="overlay-image"
                />

                <div className="overlay-buttons">
                  {/* Add Item */}
                  <button
                    className="pill-btn"
                    onClick={() =>
                      addItem({
                        upc: clickedCell.productUPC,
                        name: clickedCell.productName,
                      })
                    }
                  >
                    Add Item
                  </button>

                  {/* POG Issue */}
                  <POGIssue />
                </div>
              </div>
              <div className="overlay-bg" onClick={handleBack} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
