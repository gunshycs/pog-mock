import React, { useState, useEffect } from "react";
import "../pogReview.css";
import { usePogStore } from "../store/pogStore";
import "bootstrap-icons/font/bootstrap-icons.css";

interface POGReviewProps {
  onClose?: () => void; // called when panel closes
}

const POGReview: React.FC<POGReviewProps> = ({ onClose }) => {
  const issueData = usePogStore((state) => state.issueData);
  const updateIssueData = usePogStore((state) => state.updateIssueData);

  const [isOpen, setIsOpen] = useState(false); // controls slide animation
  const [step, setStep] = useState(0);

  useEffect(() => {
    // open panel after mount to trigger slide animation
    requestAnimationFrame(() => setIsOpen(true));
  }, []);

  if (!issueData) return null;

  const handleClose = () => {
    setIsOpen(false); // trigger slide-out
  };

  const handleTransitionEnd = () => {
    // after sliding out, unmount panel
    if (!isOpen && onClose) onClose();
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, 2));
  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleConfirm = () => {
    updateIssueData({
      confirmedBadgeInImage: issueData.confirmedBadgeInImage,
      planogramImage: issueData.planogramImage,
      productName: issueData.productName,
      productUPC: issueData.productUPC,
    });
    console.log(issueData);
    alert("Issue data saved!");
    handleClose();
  };

  return (
    <div
      className={`pog-review-panel ${isOpen ? "open" : ""}`}
      onTransitionEnd={handleTransitionEnd}
    >
      <div className="pog-review-header">

      </div>
      <button onClick={handleClose} className="btn btn-arrow">
        <i className="bi bi-arrow-left"></i>
      </button>
        <h4 className="panel-header">POG Issue Review</h4>

      <div className="pog-review-panel-items">

        <div className="step-content">
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
              <p>Badge-In: Confirm Image</p>
              <ul className="badge-list-review">
                {issueData.badgeInImages?.map((img, idx) => (
                  <li key={idx}>
                    <img
                      src={img}
                      alt={`Badge In ${idx + 1}`}
                      onClick={() =>
                        updateIssueData({ confirmedBadgeInImage: img })
                      }
                      className={`badge-image ${
                        issueData.confirmedBadgeInImage === img
                          ? "selected"
                          : ""
                      }`}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
          {step === 2 && (
            <ul className="meta-section">
              <p>Meta Data Section</p>
              <li>Session ID: {issueData.sessionId}</li>
              <li>Product Name: {issueData.productName}</li>
              <li>Product UPC: {issueData.productUPC}</li>
              <li>Store: {issueData.storeName}</li>
              <li>Reviewer's Name: {issueData.reviewerName}</li>
              <p>Current Cart:</p>
              <li>
                {issueData.cartItems.length === 0 ? (
                  <p>No items in cart</p>
                ) : (
                  <ul>
                    {issueData.cartItems.map((item) => (
                      <li key={item.upc}>
                        {item.name} {item.quantity && `x${item.quantity}`}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </ul>
          )}
        </div>

        <div className={`review-buttons ${step === 0 ? "first-step" : ""}`}>
          {(step === 1 || step === 2) && (
            <button onClick={handleBack} className="btn btn-arrow">
              <i className="bi bi-arrow-left"></i>
            </button>
          )}
          {step < 2 && (
            <button onClick={handleNext} className="btn btn-arrow">
              <i className="bi bi-arrow-right"></i>
            </button>
          )}
          {step === 2 && (
            <button onClick={handleConfirm} className="btn btn-success">
              <i className="bi bi-check-lg"></i> Confirm & Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default POGReview;
