// src/pages/App.tsx
import React from "react";
import "../App.css";
import DataTable from "../components/DataTable";
import POGIssue from "../components/POGIssue";
import { usePogStore } from "../store/pogStore";

const App: React.FC = () => {
  const clickedCell = usePogStore((state) => state.clickedCell);
  const setClickedCell = usePogStore((state) => state.setClickedCell);

  const handleBack = () => setClickedCell(null);

  return (
    <div className="super-container">
      <div className="header">
        <h1>Welcome to POG Mock!</h1>
      </div>

      <div className="plano">
        <DataTable rows={4} cols={5} />

        {/* Overlay for clicked cell info */}
        {clickedCell && (
          <div className="overlay active">
            <div className="overlay-content">
              <h2>Cell Clicked!</h2>
              <p>
                Row: {clickedCell.row + 1}, Col: {clickedCell.col + 1}
              </p>
              <img
                src={clickedCell.image}
                alt="Clicked Product"
                className="overlay-image"
              />
              <button onClick={handleBack}>Back</button>

              {/* POG Issue button */}
              <POGIssue />
            </div>
            <div className="overlay-bg" onClick={handleBack} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
