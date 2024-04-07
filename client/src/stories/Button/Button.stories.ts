import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import Button from "../../components/Button";
import plusIcon from "../assets/plus_icon.png";
import { createdDesk } from "../../requests/desk.requests";
import "../../styles/App.module.scss";

const meta = {
  title: "Example/Button",
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

export const DeskCreationPrimary: StoryObj<typeof Button> = {
  args: {
    icon: `${plusIcon}`,
    text: "Create new desk",
    deskCreationPrimary: true,
    onClick: () => {
      return createdDesk({ name: "New Desk", amount: 0 });
    },
  },
};

export const DeskCreationSecondary: StoryObj<typeof Button> = {
  args: {
    icon: `${plusIcon}`,
    deskCreationPrimary: false,
    onClick: () => {
      return createdDesk({ name: "New Desk", amount: 0 });
    },
  },
};
