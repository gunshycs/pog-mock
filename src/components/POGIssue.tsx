import React, { useState } from "react";
import html2canvas from "html2canvas";
import POGReview from "./POGReview";
import { usePogStore } from "../store/pogStore";

const POGIssue: React.FC = () => {
  const clickedCell = usePogStore((state) => state.clickedCell);
  const issueData = usePogStore((state) => state.issueData);
  const updateIssueData = usePogStore((state) => state.updateIssueData);
  const [preview, setPreview] = useState<string | null>(null);

  const handlePOGIssue = async () => {
    if (!clickedCell) return;

    const planoDiv = document.querySelector<HTMLDivElement>(".plano");
    if (!planoDiv) return;

    // hide overlay temporarily
    const overlay = document.querySelector<HTMLElement>(".overlay");
    const oldDisplay = overlay?.style.display;
    if (overlay) overlay.style.display = "none";

    try {
      await new Promise(requestAnimationFrame); // wait for DOM update
      const canvas = await html2canvas(planoDiv);
      const ctx = canvas.getContext("2d");

      if (ctx) {
        const table = planoDiv.querySelector("table");
        const cell =
          table?.rows[clickedCell.row]?.cells[clickedCell.col] ?? null;

        if (cell) {
          const rect = cell.getBoundingClientRect();

          ctx.strokeStyle = "red";
          ctx.lineWidth = 5;
          ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
        }
      }

      const imgURL = canvas.toDataURL("image/png");
      setPreview(imgURL);

      //update some of the issue data
      updateIssueData({
        planogramImage: imgURL,
        productName: clickedCell.productName,
        productUPC: clickedCell.productUPC,
      });
    } finally {
      if (overlay && oldDisplay !== undefined)
        overlay.style.display = oldDisplay;
    }
  };

  return (
    <div>
      <button onClick={handlePOGIssue} disabled={!clickedCell}>
        POG Issue
      </button>
      {/* pop up the review component */}
      {issueData && <POGReview />}
    </div>
  );
};

export default POGIssue;
