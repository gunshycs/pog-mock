import React from "react";
import { usePogStore } from "../store/pogStore";
import product1 from "../products/product1.png";
import product2 from "../products/product2.png";
import product3 from "../products/product3.png";

const images = [product1, product2, product3];

interface DataTableProps {
  rows: number;
  cols: number;
  //onCellClick?: (row: number, col: number, image: string) => void;
}

const DataTable: React.FC<DataTableProps> = ({ rows, cols }) => {
  const setClickedCell = usePogStore((state) => state.setClickedCell);

  return (
    <table className="data-table">
      <tbody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <tr key={rowIndex}>
            {Array.from({ length: cols }).map((_, colIndex) => {
              const imgIndex = (rowIndex * cols + colIndex) % images.length;
              const imgSrc = images[imgIndex];

              return (
                <td
                  key={colIndex}
                  className="clickable-cell"
                  onClick={(e) => {
                    const cellEl = e.currentTarget as HTMLElement;
                    const rect = cellEl.getBoundingClientRect();

                    setClickedCell({
                      row: rowIndex,
                      col: colIndex,
                      image: imgSrc,
                      rect: {
                        x: rect.left,
                        y: rect.top,
                        width: rect.width,
                        height: rect.height,
                      },
                    });
                  }}
                >
                  <img
                    src={imgSrc}
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
