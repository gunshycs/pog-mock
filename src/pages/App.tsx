// src/pages/App.tsx
import React from "react";
import { useEffect } from "react";
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
  const handleBack = () => setClickedCell(null);
  const { addItem } = useCartStore();

  // const storeNames = ["Tulane", "T-Mobile", "Truist"];
  // const reviewerNames = ["John", "Stephany", "Daryl"];
  const storeName = "Tulane";
  const reviewerName = "John";

    useEffect(() => {
    updateIssueData({
      storeName,
      reviewerName,
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

        {/* Overlay for clicked cell info */}
        {clickedCell && (
          <div className="overlay active">
            <div className="overlay-content">
              <h2>{clickedCell.productName}</h2>
              <h3>UPC: {clickedCell.productUPC}</h3>
              <p>
                Row: {clickedCell.row + 1}, Col: {clickedCell.col + 1}
              </p>
              <img
                src={clickedCell.image}
                alt="Clicked Product"
                className="overlay-image"
                />
                <button onClick={() => addItem({
                  upc: clickedCell.productUPC,
                  name: clickedCell.productName,
                })}>Add item</button>
              <button onClick={handleBack}>Back</button>

              {/* POG Issue button */}
              <POGIssue />
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
