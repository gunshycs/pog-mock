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
  productName: string;
  productUPC: string;
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

  // Replace entire issueData
  setIssueData: (data: IssueData | null) => void;

  // Update individual fields
  setPlanogramImage: (img: string) => void;
  setProductName: (name: string) => void;
  setProductUPC: (upc: string) => void;
  setBadgeInImage: (img: string) => void;
  setCartImage: (img: string) => void;
  setStoreName: (name: string) => void;
  setReviewerName: (name: string) => void;

  clearIssue: () => void;
}

export const usePogStore = create<POGState>((set) => ({
  clickedCell: null,
  issueData: null,

  setClickedCell: (cell) => set({ clickedCell: cell }),
  setIssueData: (data) => set({ issueData: data }),

  setPlanogramImage: (img) =>
    set((state) => state.issueData ? { issueData: { ...state.issueData, planogramImage: img } } : {}),
  setProductName: (name) =>
    set((state) => state.issueData ? { issueData: { ...state.issueData, productName: name } } : {}),
  setProductUPC: (upc) =>
    set((state) => state.issueData ? { issueData: { ...state.issueData, productUPC: upc } } : {}),
  setBadgeInImage: (img) =>
    set((state) => state.issueData ? { issueData: { ...state.issueData, badgeInImage: img } } : {}),
  setCartImage: (img) =>
    set((state) => state.issueData ? { issueData: { ...state.issueData, cartImage: img } } : {}),
  setStoreName: (name) =>
    set((state) => state.issueData ? { issueData: { ...state.issueData, storeMeta: { ...state.issueData.storeMeta, storeName: name } } } : {}),
  setReviewerName: (name) =>
    set((state) => state.issueData ? { issueData: { ...state.issueData, storeMeta: { ...state.issueData.storeMeta, reviewerName: name } } } : {}),

  clearIssue: () => set({ clickedCell: null, issueData: null }),
}));
