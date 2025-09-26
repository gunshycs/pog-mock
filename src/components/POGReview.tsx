import React, { useState, useEffect } from "react";
import "../pogReview.css";
import { usePogStore } from "../store/pogStore";

interface POGReviewProps {
  onClose?: () => void; // optional prop
}

const POGReview: React.FC<POGReviewProps> = ({ onClose }) => {
  const issueData = usePogStore((state) => state.issueData);
  const setIssueData = usePogStore((state) => state.setIssueData);
  const clearIssue = usePogStore((state) => state.clearIssue);

  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [step, setStep] = useState<number>(0);
  const [badgeInImage, setBadgeInImage] = useState<string | null>(null);
  const [cartImage, setCartImage] = useState<string | null>(null);
  const [storeName, setStoreName] = useState<string>("");
  const [reviewerName, setReviewerName] = useState<string>("");

  useEffect(() => {
    if (issueData) {
      requestAnimationFrame(() => setIsOpen(true));
    }
  }, [issueData]);

  if (!issueData) return null;

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose(); // call parent close function
  };

  const handleTransitionEnd = () => {
    if (!isOpen) {
      clearIssue();
    }
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, 2));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleConfirm = () => {
    setIssueData({
      ...issueData,
      badgeInImage: badgeInImage || "",
      cartImage: cartImage || "",
      storeMeta: {
        storeName,
        reviewerName,
      },
    });
    alert("Issue data saved!");
    handleClose(); // close modal after saving
  };

  return (
    <div
      className={`pog-review-panel ${isOpen ? "open" : ""}`}
      onTransitionEnd={handleTransitionEnd}
    >
      <button className="close-btn" onClick={handleClose}>
        ✕
      </button>

      <div className="pog-review-panel-items">
        <h4>POG Issue Review</h4>

        {step === 0 && (
          <div className="plano-sc-section">
            <p>Planogram Screenshot</p>
            {issueData.planogramImage && (
              <img
                src={issueData.planogramImage}
                alt="Planogram"
                className="planogram-image"
              />
            )}
          </div>
        )}

        {step === 1 && (
          <div className="badge-in-image-section">
            <p>Badge-In Image</p>
          </div>
        )}

        {step === 2 && (
          <ul className="meta-section">
            <p>Meta Data Section</p>
            <li>ProductName: {issueData.productName}</li>
            <li>ProductUPC: {issueData.productUPC}</li>
            <li>Store Name: {issueData.storeMeta.storeName}</li>
          </ul>
        )}

        <div className="review-buttons">
          {(step === 1 || step === 2) && <button onClick={handleBack}>Back</button>}
          {step < 2 && <button onClick={handleNext}>Next</button>}
          {step === 2 && <button onClick={handleConfirm}>Confirm & Save</button>}
        </div>
      </div>
    </div>
  );
};

export default POGReview;
