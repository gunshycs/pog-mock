import { create } from "zustand";

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface clickedCell {
  row: number;
  col: number;
  image: string;
  rect: Rect;
}

interface IssueData {
  planogramImage: string;
  productName: string;
  productUPC: string;
  badgeInImage: string;
  cartImage: string;
  storeMeta: {
    storeName: string;
    reviewerName: string;
  };
}

interface POGState {
  clickedCell: clickedCell | null;
  issueData: IssueData | null;

  setClickedCell: (cell: clickedCell | null) => void;
  setIssueData: (data: IssueData | null) => void;
  clearIssue: () => void;
}

export const usePogStore = create<POGState>((set) => ({
  clickedCell: null,
  issueData: null,

  setClickedCell: (cell) => set({ clickedCell: cell }),
  setIssueData: (data) => set({ issueData: data }),
  clearIssue: () => set({ clickedCell: null, issueData: null }),
}));
