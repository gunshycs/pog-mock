import React, { useState, useEffect } from "react";
import "../pogReview.css";
import { usePogStore } from "../store/pogStore";

interface POGReviewProps {
  onClose?: () => void;
}

const POGReview: React.FC<POGReviewProps> = ({ onClose }) => {
  const issueData = usePogStore((state) => state.issueData);
  const updateIssueData = usePogStore((state) => state.updateIssueData);
  const clearIssue = usePogStore((state) => state.clearIssue);

  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [step, setStep] = useState<number>(0);
  const [badgeInImage, setBadgeInImage] = useState<string>("");
  const [cartImage, setCartImage] = useState<string>("");
  const [storeName, setStoreName] = useState<string>("");
  const [reviewerName, setReviewerName] = useState<string>("");

  useEffect(() => {
    if (issueData) {
      //initialize local state from existing issueData
      setBadgeInImage(issueData.badgeInImage || "");
      setCartImage(issueData.cartImage || "");
      setStoreName(issueData.storeName || "");
      setReviewerName(issueData.reviewerName || "");
      requestAnimationFrame(() => setIsOpen(true));
    }
  }, [issueData]);

  if (!issueData) return null;

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  const handleTransitionEnd = () => {
    if (!isOpen) {
    }
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, 2));
  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleConfirm = () => {
    updateIssueData({
      badgeInImage,
      cartImage,
      storeName,
      reviewerName,
    });
    alert("Issue data saved!");
    console.log("Saved Issue Data:", { issueData })
    handleClose();
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
            <li>Store: {issueData.storeName}</li>
            <li>Reviewer's Name: {issueData.reviewerName}</li>
          </ul>
        )}

        <div className="review-buttons">
          {(step === 1 || step === 2) && (
            <button onClick={handleBack}>Back</button>
          )}
          {step < 2 && <button onClick={handleNext}>Next</button>}
          {step === 2 && (
            <button onClick={handleConfirm}>Confirm & Save</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default POGReview;
