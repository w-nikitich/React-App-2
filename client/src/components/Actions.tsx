import React from "react";
import { useDispatch } from "react-redux";
import { resetList } from "../redux/reducers/listSlice";
import { resetDesk, updateDeskData } from "../redux/reducers/deskSlice";
import { resetTask } from "../redux/reducers/taskSlice";

type ActionsProps = {
  text?: string;
  icon?: string;
  id: number;
  handleState?: any;
  onClick?: any;
};

function Actions({ text, icon, id, handleState, onClick }: ActionsProps) {
  const dispatch = useDispatch();
  return (
    <div
      className={`actions-block`}
      onClick={async () => {
        const changedElement = await onClick(id);

        switch (handleState) {
          case "delete list":
            dispatch(resetList({ id }));
            break;
          case "delete desk":
            dispatch(resetDesk({ id }));
            break;
          case "delete task":
            dispatch(resetTask({ id }));
            break;
          default:
            break;
        }
      }}
    >
      <img src={icon} />
      <p>{text}</p>
    </div>
  );
}

export default Actions;
