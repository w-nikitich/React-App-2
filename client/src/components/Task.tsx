import React, { useEffect, useState } from "react";
import calendarIcon from "../assets/calendar_icon.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Actions from "./Actions";
import { DeleteTask } from "../stories/Actions/Actions.stories";
import ModalWindow from "./ModalWindow";
import { updateList } from "../requests/list.requests";
import { updateTask } from "../requests/task.requests";
import { updateListData } from "../redux/reducers/listSlice";

type taskProps = {
  taskId: number;
  taskName: string;
  taskDescription?: string;
  taskDate?: string;
  taskPriority?: string;
  listId: number;
  handleTaskId?: any;
};

interface IState {
  actions: string;
  isActionsOpened: boolean;
  moveTo: string;
  isMoveMenuOpened: boolean;
}

function Task({
  taskId,
  taskName,
  taskDescription,
  taskDate,
  taskPriority,
  listId,
  handleTaskId,
}: taskProps) {
  const lists = useSelector((state: RootState) => state.list.lists);
  const dispatch = useDispatch();

  const updateState = (newState: Partial<IState>): void =>
    setState((prevState) => ({ ...prevState, ...newState }));
  const [state, setState] = useState<IState>({
    actions: "hidden",
    isActionsOpened: false,
    moveTo: "hidden",
    isMoveMenuOpened: false,
  });

  useEffect(() => {
    if (state.isActionsOpened) {
      updateState({ actions: "visible" });
    } else {
      updateState({ actions: "hidden" });
    }
  }, [state.isActionsOpened]);

  useEffect(() => {
    console.log(state.isMoveMenuOpened);
    if (state.isMoveMenuOpened) {
      updateState({ moveTo: "visible" });
    } else {
      updateState({ moveTo: "hidden" });
    }
  }, [state.isMoveMenuOpened]);

  function handleActions() {
    updateState({ isActionsOpened: !state.isActionsOpened });
  }

  function handleClick() {
    updateState({ isMoveMenuOpened: !state.isMoveMenuOpened });
  }

  return (
    <div
      className="task__block"
      onClick={(e) => {
        e.stopPropagation();
        handleTaskId(taskId);
      }}
    >
      <div className="task__name-block">
        <p className="task__name">{taskName}</p>

        <p
          className="actions"
          onClick={(e) => {
            e.stopPropagation();
            handleActions();
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </p>

        {state.actions === "visible" ? (
          <Actions id={taskId} {...DeleteTask.args} />
        ) : null}
      </div>

      <div
        className="task__data-wrapper"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          const target = e.target as HTMLElement;

          if (target !== e.currentTarget) {
            e.stopPropagation();
          } else {
            // editTask(id);
          }
        }}
      >
        <p className="task__description">{taskDescription}</p>

        <div className="task__date-block">
          <img className="icon" src={calendarIcon} alt="calendar icon" />
          <p className="task__date">{taskDate}</p>
        </div>

        <div className="task__priority-block">
          <span className={taskPriority?.toLowerCase()}></span>
          <p className="task__priority">{taskPriority}</p>
        </div>

        {/*  onClick={handleClick} */}
        <div className="task__move" onClick={() => handleClick()}>
          <p>Move to:</p>
          <span></span>

          {/* add ${moveTo} to class*/}
          <div className={`task__move-list ${state.moveTo}`}>
            {lists.map((list: any) => {
              return (
                <p
                  onClick={() => {
                    updateTask(taskId, { listId: list.id }).then((res) => {
                      updateListData(res);
                    });
                  }}
                >
                  {list.name}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task;
