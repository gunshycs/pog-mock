import React from "react";

const images = [
  "products/product1.png",
  "products/product2.png",
  "products/product3.png",
];

interface DataTableProps {
  rows: number;
  cols: number;
  onCellClick?: (row: number, col: number) => void;
}

const DataTable: React.FC<DataTableProps> = ({ rows, cols, onCellClick }) => {
  return (
    <table className="data-table">
      <tbody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <tr key={rowIndex}>
            {Array.from({ length: cols }).map((_, colIndex) => {
              const imgIndex = (rowIndex * cols + colIndex) % images.length; // cycle images
              return (
                <td
                  key={colIndex}
                  className="clickable-cell"
                  onClick={() => onCellClick?.(rowIndex, colIndex)}
                >
                  <img
                    src={images[imgIndex]}
                    alt={`Product ${imgIndex + 1}`}
                    className="cell-image"
                  />
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
