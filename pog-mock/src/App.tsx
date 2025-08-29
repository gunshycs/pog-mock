import React, { useState } from "react";
import "./App.css";
import DataTable from "./DataTable";

const App: React.FC = () => {
  const planogram = [
    ["A1", "B1", "C1", "D1", "E1"],
    ["A2", "B2", "C2", "D2", "E2"],
    ["A3", "B3", "C3", "D3", "E3"],
    ["A4", "B4", "C4", "D4", "E4"],
  ];

  const [clickedCell, setClickedCell] = useState<{ row: number; col: number } | null>(null);

  const handleCellClick = (row: number, col: number) => {
    setClickedCell({ row, col });
  };

  const handleBack = () => setClickedCell(null);

  return (
    <div className="super-container">
      <h1>Welcome to Pog Mock!</h1>
      <div className="plano">
        <DataTable
          rows={4}
          cols={5}
          onCellClick={handleCellClick}
        />

        {/* Overlay */}
        <div className={`overlay ${clickedCell ? "active" : ""}`}>
          {clickedCell && (
            <div className="overlay-content">
              <h2>Cell Clicked!</h2>
              <p>
                Row: {clickedCell.row + 1}, Col: {clickedCell.col + 1}
              </p>
              <button onClick={handleBack}>Back</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
