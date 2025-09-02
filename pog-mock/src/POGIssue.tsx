import React, { useState } from "react";
import html2canvas from "html2canvas";

interface POGIssueProps {
  planoSelector: string; // css selector
  clickedCell: { row: number; col: number } | null;
  rows: number;
  cols: number;
}

const POGIssue: React.FC<POGIssueProps> = ({
  planoSelector,
  clickedCell,
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handlePOGIssue = async () => {
    if (!clickedCell) return;

    const planoDiv = document.querySelector<HTMLDivElement>(planoSelector);
    if (!planoDiv) return;

    // hide overlay temp for the screenshot
    const overlay = document.querySelector<HTMLElement>(".overlay");
    if (overlay) overlay.style.display = "none";

    // capture screenshot of the planogram
    const canvas = await html2canvas(planoDiv);
    const ctx = canvas.getContext("2d");
    console.log('canvas size: ' + canvas.width, canvas.height);
    if (ctx) {

      const table = planoDiv.querySelector("table");
      const cell = table?.rows[clickedCell.row]?.cells[clickedCell.col] ?? null;

      if (cell) {
        //get the dimensions of the product cell and planogram div
        const product = cell.getBoundingClientRect();
        console.log('cell size: ', product)
        // const planoRect = planoDiv.getBoundingClientRect();
        // console.log('planogram size: ', planoRect)

        //draw bounding box relative to the plano div and product cell
        ctx.strokeStyle = "red";
        ctx.lineWidth = 5;
        ctx.strokeRect(product.x, product.y, product.width, product.height);
      }

      //get the planograms width and height in canvas coordinates
      // const planoRect = planoDiv.getBoundingClientRect();
      // const scaleX = canvas.width / planoDiv.clientWidth;
      // const scaleY = canvas.height / planoDiv.clientHeight;

      // //center of the planogram in cavas coords
      // const centerX = (((planoRect.width / 2) * scaleX) + 500);
      // const centerY = (planoRect.height / 2) * scaleY;

      // const x = centerX - size / 2;
      // const y = centerY - size / 2;

      // ctx.strokeStyle = 'red';
      // ctx.lineWidth = 5;
      // ctx.strokeRect(x,y,size,size);

      // const size = 100;
      // const x = canvas.width / 2 - size / 2;
      // const y = canvas.height / 2 - size / 2;

      // ctx.strokeStyle = "red";
      // ctx.lineWidth = 5;
      // ctx.strokeRect(x, y, size, size);
      // ctx.save();
      

    }

    // show preview of sc
    const imgURL = canvas.toDataURL("image/png");
    setPreview(imgURL);

    // restore the overlay in the main app
    if (overlay) overlay.style.display = "flex";
  };
// debug outpur display
  return (
    <div>
      <button onClick={handlePOGIssue} disabled={!clickedCell}>
        POG Issue
      </button>

      {preview && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setPreview(null)}
              style={{
                position: "absolute",
                top: "-40px",
                right: "0",
                background: "red",
                color: "white",
                border: "none",
                padding: "8px 12px",
                cursor: "pointer",
              }}
            >
              ✕ Close
            </button>
            <img
              src={preview}
              alt="POG Issue Preview"
              style={{
                maxWidth: "90vw",
                maxHeight: "80vh",
                border: "2px solid white",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default POGIssue;
