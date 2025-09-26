import React from "react";
import { usePogStore } from "../store/pogStore";
import product1 from "../products/product1.png";
import product2 from "../products/product2.png";
import product3 from "../products/product3.png";

const images = [product1, product2, product3];


interface Product {
  image: string;
  name: string;
  upc: string;
}

const products: Product[] = [
  { image: product1, name: "Hot Cheetoes", upc: "123456789012" },
  { image: product2, name: "Lays Lime", upc: "234567890123" },
  { image: product3, name: "Fritos Original", upc: "345678901234" },
];


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
              const productIndex = (rowIndex * cols + colIndex) % products.length;
              const product = products[productIndex];

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
                      image: product.image,
                      rect: {
                        x: rect.left,
                        y: rect.top,
                        width: rect.width,
                        height: rect.height,
                      },
                      productName: product.name,
                      productUPC: product.upc,
                    });
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
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
