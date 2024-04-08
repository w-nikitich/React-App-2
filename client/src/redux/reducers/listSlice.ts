import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface List {
  id: number;
  deskId: number;
  name: string;
  amount: number;
}

interface ListState {
  lists: List[];
}

const initialState: ListState = {
  lists: [],
};

export const ListsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    createList: (
      state,
      action: PayloadAction<{
        id: number;
        deskId: number;
        name: string;
        amount: number;
      }>
    ) => {
      state.lists.push({
        id: action.payload.id,
        deskId: action.payload.deskId,
        name: action.payload.name,
        amount: action.payload.amount,
      });
    },
    updateListData: (state, action: PayloadAction<{ data: any }>) => {
      const listIndex = state.lists.findIndex(
        (list) => list.id === action.payload.data.id
      );
      state.lists[listIndex] = action.payload.data;
    },
    getAllLists: (state, action: PayloadAction<List[]>) => {
      state.lists = action.payload;
    },
    resetList: (state, action: PayloadAction<{ id: number }>) => {
      const listIndex = state.lists.findIndex(
        (list) => list.id === action.payload.id
      );
      state.lists.splice(listIndex, listIndex);
    },
  },
});

export const { createList, updateListData, getAllLists, resetList } =
  ListsSlice.actions;

export default ListsSlice.reducer;
