import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ActivityLog {
  id: number;
  taskId?: number;
  listName?: string;
  taskName?: string;
  oldData?: string;
  newData?: string;
  listId?: number;
  type: string;
  text?: string;
  createdAt: Date;
}

export interface ActivityLogState {
  activityLog: ActivityLog[];
}

const initialState: ActivityLogState = {
  activityLog: [],
};

export const activityLogSlice = createSlice({
  name: "activityLog",
  initialState,
  reducers: {
    createNewActivity: (state, action: PayloadAction<{ createdLog: any }>) => {
      state.activityLog.push(action.payload.createdLog);
    },
    updateActivityLog: (state, action: PayloadAction<ActivityLog[]>) => {
      state.activityLog = action.payload;
    },
    resetActivityLog: (state, action: PayloadAction<{ id: number }>) => {
      state.activityLog = state.activityLog.filter(
        (activityLog) => activityLog.id !== action.payload.id
      );
    },
  },
});

export const { createNewActivity, updateActivityLog, resetActivityLog } =
  activityLogSlice.actions;

export default activityLogSlice.reducer;
