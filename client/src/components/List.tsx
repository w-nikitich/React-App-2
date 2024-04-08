import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Button from "../components/Button";
import { TaskCreationPrimary } from "../stories/Button/Button.stories";
import { getAllTasksByListId, getAllTasks } from "../requests/task.requests";
import { setAllTasks } from "../redux/reducers/taskSlice";
import Task from "./Task";
import Actions from "./Actions";
import { DeleteList, EditList } from "../stories/Actions/Actions.stories";
import { updateList } from "../requests/list.requests";
import { updateListData } from "../redux/reducers/listSlice";
import ModalWindow from "./ModalWindow";

type ListProps = {
  listId: number;
  name: string;
  amount: number;
};

interface IState {
  actions: string;
  isActionsOpened: boolean;
  isEditMode: boolean;
  name: string;
  taskId: number;
  visibility: string;
}

function List({ listId, name, amount }: ListProps) {
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const dispatch = useDispatch();

  const updateState = (newState: Partial<IState>): void =>
    setState((prevState) => ({ ...prevState, ...newState }));
  const [state, setState] = useState<IState>({
    actions: "hidden",
    isActionsOpened: false,
    isEditMode: false,
    name: name,
    taskId: 0,
    visibility: "hidden",
  });

  function handleActions() {
    updateState({ isActionsOpened: !state.isActionsOpened });
  }

  useEffect(() => {
    getAllTasks().then((res: any) => {
      dispatch(setAllTasks(res));
    });

    if (state.isActionsOpened) {
      updateState({ actions: "visible" });
    } else {
      updateState({ actions: "hidden" });
    }
  }, [dispatch, state.isActionsOpened]);

  function findAmount(listId: number) {
    let amount = 0;

    tasks.forEach((task) => {
      if (task?.listId === listId) {
        amount++;
      }
    });

    return amount;
  }

  function handleKeyDown(e: any) {
    if (e.key === "Enter") {
      const newData = updateList(listId, { name: state.name });
      dispatch(updateListData({ data: newData }));
      updateState({ isEditMode: false });
    }
  }

  function handleTaskId(taskId: number) {
    updateState({ taskId: taskId, visibility: "visible" });
  }

  function handleVisibility() {
    if (state.visibility === "hidden") {
      updateState({ visibility: "visible" });
    } else {
      updateState({ visibility: "hidden" });
    }
  }

  return (
    <div className="list">
      <ModalWindow
        taskId={state.taskId}
        visibility={state.visibility}
        defineId={handleTaskId}
        visibilityChange={handleVisibility}
      />
      <div className="list-element">
        <div className="list-details">
          {state.isEditMode ? (
            <input
              className="list__name-change"
              type="text"
              value={state.name}
              onChange={(e) => updateState({ name: e.target.value })}
              onKeyDown={handleKeyDown}
            />
          ) : (
            <p className="list-name">{state.name}</p>
          )}

          <p className="list-amount">{findAmount(listId)}</p>
        </div>
        <p
          className="actions"
          onClick={() => {
            handleActions();
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </p>

        {state.actions === "visible" ? (
          <div>
            <Actions
              id={listId}
              {...EditList.args}
              onClick={() => updateState({ isEditMode: true })}
            />
            <Actions id={listId} {...DeleteList.args} />
          </div>
        ) : null}
      </div>
      <div className="list-add-task">
        <Button clickedParam={listId} {...TaskCreationPrimary.args} />
      </div>

      <div className="tasks">
        {tasks
          .filter((task) => task.listId === listId)
          .map((task, index) => {
            return (
              <Task
                taskId={task.id}
                taskName={task.name}
                taskDescription={task.description}
                taskDate={task.date}
                taskPriority={task.priority}
                listId={listId}
                handleTaskId={handleTaskId}
              />
            );
          })}
      </div>
    </div>
  );
}

export default List;
