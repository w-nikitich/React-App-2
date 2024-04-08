import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { createDesk } from "../redux/reducers/deskSlice";
import { createList } from "../redux/reducers/listSlice";
import { createNewTask } from "../redux/reducers/taskSlice";

type ButtonProps = {
  icon?: string;
  text?: string;
  className?: string;
  onClick?: any;
  deskId?: number;
  listId?: number;
  clickedParam?: number;
};

const Button: React.FC<ButtonProps> = ({
  icon,
  text,
  className,
  clickedParam,
  deskId,
  listId,
  onClick,
}) => {
  const dispatch = useDispatch();

  return (
    <button
      className={`${className}`}
      onClick={async () => {
        const data = await onClick(clickedParam);

        switch (className) {
          case "create-desk secondary":
          case "create-desk primary":
            dispatch(
              createDesk({ id: data.id, name: data.name, amount: data.amount })
            );
            break;
          case "create-list primary":
            dispatch(
              createList({
                id: data.id,
                deskId: data.deskId,
                name: data.name,
                amount: data.amount,
              })
            );
            break;
          case "create-task primary":
            dispatch(
              createNewTask({
                id: data.id,
                listId: data.listId,
                name: data.name,
                date: data.date,
                priority: data.priority,
                description: data.description,
              })
            );
            break;
          default:
            break;
        }
      }}
    >
      <img src={icon} />
      <p>{text}</p>
    </button>
  );
};

export default Button;
