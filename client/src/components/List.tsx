import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Button from "../components/Button";
import { TaskCreationPrimary } from "../stories/Button/Button.stories";
import { getAllTasksByListId, getAllTasks } from "../requests/task.requests";
import { setAllTasks } from "../redux/reducers/taskSlice";
import Task from "./Task";

type ListProps = {
  listId: number;
  name: string;
  amount: number;
};

// interface IState {
//   actions: string;
//   tasks: any[];
// }

function List({ listId, name, amount }: ListProps) {
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const dispatch = useDispatch();

  // const updateState = (newState: Partial<IState>): void =>
  //   setState((prevState) => ({ ...prevState, ...newState }));
  // const [state, setState] = useState<IState>({
  //   actions: "hidden",
  //   tasks: [],
  // });

  useEffect(() => {
    console.log(listId);
    getAllTasks().then((res: any) => {
      dispatch(setAllTasks(res));
    });
  }, [dispatch]);

  return (
    <div className="list">
      <div className="list-element">
        <div className="list-details">
          {/* {actions === "visible" ? (
              <Actions
                visibility={actions}
                isTaskList={true}
                isEditMode={isEditMode}
                setIsEditMode={updateState}
                createTask={createTask}
                deleteList={deleteList}
                nameOfBlock={"list"}
              />
            ) : null} */}
          <p className="list-name">{name}</p>
          <p className="list-amount">{amount}</p>
        </div>
        <p
          className="actions"
          // onClick={() => {
          //   handleActions();
          // }}
        >
          <span></span>
          <span></span>
          <span></span>
        </p>
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
              />
            );
          })}
      </div>
    </div>
  );
}

export default List;
