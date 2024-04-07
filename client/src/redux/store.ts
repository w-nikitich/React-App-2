import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./reducers/taskSlice";
import listReducer from "./reducers/listSlice";
import activityLogReducer from "./reducers/activityLogSlice";
import deskReducer from "./reducers/deskSlice";

export const store = configureStore({
  reducer: {
    task: taskReducer,
    list: listReducer,
    activityLog: activityLogReducer,
    desk: deskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
