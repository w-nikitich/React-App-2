import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Button from "../../components/Button";
import plusIcon from "../assets/plus_icon.png";
import { createdDesk } from "../../requests/desk.requests";
import "../../styles/App.module.scss";
import { createList } from "../../requests/list.requests";
import { createTask } from "../../requests/task.requests";

const meta = {
  title: "Example/Button",
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

export const DeskCreationPrimary: StoryObj<typeof Button> = {
  args: {
    icon: `${plusIcon}`,
    text: "Create new desk",
    className: "create-desk primary",
    onClick: () => {
      return createdDesk({ name: "New Desk", amount: 0 });
    },
  },
};

export const DeskCreationSecondary: StoryObj<typeof Button> = {
  args: {
    icon: `${plusIcon}`,
    className: "create-desk secondary",
    onClick: () => {
      return createdDesk({ name: "New Desk", amount: 0 });
    },
  },
};

export const ListCreationPrimary: StoryObj<typeof Button> = {
  args: {
    icon: `${plusIcon}`,
    className: "create-list primary",
    onClick: (deskId: number) => {
      return createList({
        name: "To Do",
        amount: 0,
        deskId: deskId,
      });
    },
  },
};

export const TaskCreationPrimary: StoryObj<typeof Button> = {
  args: {
    icon: `${plusIcon}`,
    className: "create-task primary",
    onClick: (listId: number) => {
      return createTask({
        name: "New Task",
        date: "Tue, 9 Apr",
        priority: "Low",
        description: "This is my new task.",
        listId: listId,
      });
    },
  },
};
