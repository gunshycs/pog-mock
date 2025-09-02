import React, { useState } from "react";
import "./App.css";
import DataTable from "./DataTable";
import POGIssue from "./POGIssue";

const App: React.FC = () => {
  const [clickedCell, setClickedCell] = useState<{
    row: number;
    col: number;
    image: string;
  } | null>(null);


  const handleCellClick = (row: number, col: number, image: string) => {
    setClickedCell({ row, col, image });
  };

  const handleBack = () => setClickedCell(null);

  return (
    <div className="super-container">
      <div className="header">
        <h1>Welcome to Pog Mock!</h1>
      </div>

      <div className="plano">
        <DataTable rows={4} cols={5} onCellClick={handleCellClick} />

        {/*overlay is always in DOM; active class toggles slide */}
        <div className={`overlay ${clickedCell ? "active" : ""}`}>
          <div className="overlay-content">
            {clickedCell && (
              <>
                <h2>Cell Clicked!</h2>
                <p>
                  Row: {clickedCell.row + 1}, Col: {clickedCell.col + 1}
                </p>
                <img
                  src={clickedCell.image}
                  alt="Clicked Product"
                  className="overlay-image"
                />
              </>
            )}
            <button onClick={handleBack}>Back</button>
            <POGIssue
              planoSelector=".plano"
              clickedCell={clickedCell ? { row: clickedCell.row, col: clickedCell.col } : null}
              rows={4}
              cols={5}
            />
          </div>
          <div className="overlay-bg" onClick={handleBack}>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
