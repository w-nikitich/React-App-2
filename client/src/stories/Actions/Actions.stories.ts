import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Actions from "../../components/Actions";
import deleteIcon from "../assets/trash_icon.png";
import editIcon from "../assets/edit_icon.png";
import "../../styles/App.module.scss";
import { createList, deleteList } from "../../requests/list.requests";
import {
  createTask,
  deleteTask,
  updateTask,
} from "../../requests/task.requests";
import { deleteDesk, updateDesk } from "../../requests/desk.requests";

const meta = {
  title: "Example/Actions",
  component: Actions,
} satisfies Meta<typeof Actions>;

export default meta;

export const DeleteList: StoryObj<typeof Actions> = {
  args: {
    icon: `${deleteIcon}`,
    text: "Delete",
    handleState: "delete list",
    onClick: (listId: number) => {
      return deleteList(listId);
    },
  },
};

export const EditDesk: StoryObj<typeof Actions> = {
  args: {
    icon: `${editIcon}`,
    text: "Edit",
    handleState: "edit desk",
    onClick: (deskId: number, updateData: object) => {
      return "edit task";
    },
  },
};

export const DeleteDesk: StoryObj<typeof Actions> = {
  args: {
    icon: `${deleteIcon}`,
    text: "Delete",
    handleState: "delete desk",
    onClick: (deskId: number) => {
      return deleteDesk(deskId);
    },
  },
};

export const DeleteTask: StoryObj<typeof Actions> = {
  args: {
    icon: `${deleteIcon}`,
    text: "Delete",
    handleState: "delete task",
    onClick: (taskId: number) => {
      return deleteTask(taskId);
    },
  },
};

export const EditList: StoryObj<typeof Actions> = {
  args: {
    icon: `${editIcon}`,
    text: "Edit",
    handleState: "edit list",
    onClick: (listId: number) => {
      return "edit list";
    },
  },
};
