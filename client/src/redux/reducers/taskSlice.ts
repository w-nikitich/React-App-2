import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  id: number;
  name: string;
  listId?: number;
  date?: string;
  priority?: string;
  description?: string;
}

export interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    createNewTask: (
      state,
      action: PayloadAction<{
        id: number;
        listId: number;
        name: string;
        date: string;
        priority: string;
        description: string;
      }>
    ) => {
      state.tasks.push({
        id: action.payload.id,
        listId: action.payload.listId,
        name: action.payload.name,
        date: action.payload.date,
        priority: action.payload.priority,
        description: action.payload.description,
      });
    },
    updateTaskData: (
      state,
      action: PayloadAction<{ id: number; updatedTask: any }>
    ) => {
      const taskId = state.tasks.findIndex(
        (task) => (task.id = action.payload.id)
      );
      state.tasks[taskId] = action.payload.updatedTask;
    },
    setAllTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    resetTask: (state, action: PayloadAction<{ id: number }>) => {
      state.tasks = state.tasks.filter(
        (tasks) => tasks.id !== action.payload.id
      );
    },
  },
});

export const { setAllTasks, updateTaskData, createNewTask, resetTask } =
  tasksSlice.actions;

export default tasksSlice.reducer;
