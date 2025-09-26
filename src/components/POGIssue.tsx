import React, { useState } from "react";
import html2canvas from "html2canvas";
import POGReview from "./POGReview";
import { usePogStore } from "../store/pogStore";
import { useCartStore } from "../store/cartStore";

const POGIssue: React.FC = () => {
  const clickedCell = usePogStore((state) => state.clickedCell);
  const issueData = usePogStore((state) => state.issueData);
  const cartItems = useCartStore();
  const updateIssueData = usePogStore((state) => state.updateIssueData);
  const [preview, setPreview] = useState<string | null>(null);
  const [showReview, setShowReview] = useState(false); // control panel visibility

  const handlePOGIssue = async () => {
    if (!clickedCell) return;

    const planoDiv = document.querySelector<HTMLDivElement>(".plano");
    if (!planoDiv) return;

    const overlay = document.querySelector<HTMLElement>(".overlay");
    const oldDisplay = overlay?.style.display;
    if (overlay) overlay.style.display = "none";

    try {
      await new Promise(requestAnimationFrame);
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

      // update issue data
      updateIssueData({
        planogramImage: imgURL,
        productName: clickedCell.productName,
        productUPC: clickedCell.productUPC,
        cartItems: cartItems.cartItems.map((item) => ({
          upc: item.upc,
          name: item.name,
          quantity: item.quantity,
        })),
      });

      setShowReview(true); // open panel only after clicking the button
    } finally {
      if (overlay && oldDisplay !== undefined)
        overlay.style.display = oldDisplay;
    }
  };

  return (
    <div>
      <button
        onClick={handlePOGIssue}
        disabled={!clickedCell}
        className="pill-btn"
        style={{ display: "flex", alignItems: "center", gap: "5px" }}
      >
        <i className="bi bi-journal-check"></i> POG Issue
      </button>

      {/* Render review panel only when showReview is true */}
      {showReview && issueData && (
        <POGReview onClose={() => setShowReview(false)} />
      )}
    </div>
  );
};

export default POGIssue;
