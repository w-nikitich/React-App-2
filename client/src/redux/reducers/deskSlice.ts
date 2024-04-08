import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Desk {
  id: number;
  name: string;
  amount: number;
}

interface DeskState {
  desks: Desk[];
}

const initialState: DeskState = {
  desks: [],
};

export const DesksSlice = createSlice({
  name: "desks",
  initialState,
  reducers: {
    createDesk: (
      state,
      action: PayloadAction<{
        id: number;
        name: string;
        amount: number;
      }>
    ) => {
      state.desks.push({
        id: action.payload.id,
        name: action.payload.name,
        amount: action.payload.amount,
      });
    },
    updateDeskData: (state, action: PayloadAction<{ data: any }>) => {
      const deskIndex = state.desks.findIndex(
        (desk) => desk.id === action.payload.data.id
      );
      state.desks[deskIndex] = action.payload.data;
    },
    getDesks: (state, action: PayloadAction<Desk[]>) => {
      state.desks = action.payload;
    },
    resetDesk: (state, action: PayloadAction<{ id: number }>) => {
      const deskIndex = state.desks.findIndex(
        (desk) => desk.id === action.payload.id
      );
      state.desks.splice(deskIndex, deskIndex);
    },
  },
});

export const { createDesk, updateDeskData, getDesks, resetDesk } =
  DesksSlice.actions;

export default DesksSlice.reducer;
