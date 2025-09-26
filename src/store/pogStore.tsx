import { create } from "zustand";

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ClickedCell {
  row: number;
  col: number;
  image: string;
  rect: Rect;
  productName: string;
  productUPC: string;
}

interface IssueData {
  planogramImage: string;
  badgeInImage: string;
  cartImage: string;
  productName: string;
  productUPC: string;
  storeName: string;
  reviewerName: string;
}

interface POGState {
  clickedCell: ClickedCell | null;
  issueData: IssueData;

  setClickedCell: (cell: ClickedCell | null) => void;
  updateIssueData: (data: Partial<IssueData>) => void;
  clearIssue: () => void;
}

// Initialize all fields as empty strings
export const usePogStore = create<POGState>((set) => ({
  clickedCell: null,
  issueData: {
    planogramImage: "",
    badgeInImage: "",
    cartImage: "",
    productName: "",
    productUPC: "",
    storeName: "",
    reviewerName: "",
  },

  setClickedCell: (cell) => set({ clickedCell: cell }),

  updateIssueData: (data) =>
    set((state) => ({
      issueData: { ...state.issueData, ...data },
    })),

  clearIssue: () =>
    set({
      clickedCell: null,
      issueData: {
        planogramImage: "",
        badgeInImage: "",
        cartImage: "",
        productName: "",
        productUPC: "",
        storeName: "",
        reviewerName: "",
      },
    }),
}));
