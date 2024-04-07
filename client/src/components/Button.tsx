import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { createDesk } from "../redux/reducers/deskSlice";

type ButtonProps = {
  icon?: string;
  text?: string;
  deskCreationPrimary?: boolean;
  onClick?: any;
};

const Button: React.FC<ButtonProps> = ({
  icon,
  text,
  deskCreationPrimary,
  onClick,
}) => {
  const desks = useSelector((state: RootState) => state.desk.desks);
  const dispatch = useDispatch();

  return (
    <button
      className={`create-desk ${deskCreationPrimary ? "primary" : "secondary"}`}
      onClick={() => {
        onClick().then((res: any) => {
          console.log(res);
          dispatch(
            createDesk({ id: res.id, name: res.name, amount: res.amount })
          );
        });
      }}
    >
      <img src={icon} />
      <p>{text}</p>
    </button>
  );
};

export default Button;
