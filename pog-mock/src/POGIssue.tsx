// POGIssue.tsx
import React from "react";
import html2canvas from "html2canvas";

interface POGIssueProps {
  planoSelector: string; // CSS selector for the planogram div
  clickedCell: { row: number; col: number } | null;
  rows: number;
  cols: number;
}

const POGIssue: React.FC<POGIssueProps> = ({
  planoSelector,
  clickedCell,
  rows,
  cols,
}) => {
  const handlePOGIssue = async () => {
    if (!clickedCell) return;

    const planoDiv = document.querySelector<HTMLDivElement>(planoSelector);
    if (!planoDiv) return;

    // Hide overlay temporarily
    const overlay = document.querySelector<HTMLElement>(".overlay");
    if (overlay) overlay.style.display = "none";

    // Capture screenshot
    const canvas = await html2canvas(planoDiv);
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Use actual table cell coordinates
      const table = planoDiv.querySelector("table");
      const cell = table?.rows[clickedCell.row]?.cells[clickedCell.col] ?? null;

      if (cell) {
        const rect = cell.getBoundingClientRect();
        const planoRect = planoDiv.getBoundingClientRect();

        const scaleX = canvas.width / planoRect.width;
        const scaleY = canvas.height / planoRect.height;

        const x = (rect.left - planoRect.left) * scaleX;
        const y = (rect.top - planoRect.top) * scaleY;
        const width = rect.width * scaleX;
        const height = rect.height * scaleY;

        // Draw bounding box
        ctx.strokeStyle = "red";
        ctx.lineWidth = 5;
        ctx.strokeRect(x, y, width, height);
      }
    }

    // Save image
    const imgURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = imgURL;
    link.download = `POG_Issue_Row${clickedCell.row + 1}_Col${
      clickedCell.col + 1
    }.png`;
    link.click();

    // Restore overlay
    if (overlay) overlay.style.display = "flex";
  };

  return (
    <button onClick={handlePOGIssue} disabled={!clickedCell}>
      POG Issue
    </button>
  );
};

export default POGIssue;
