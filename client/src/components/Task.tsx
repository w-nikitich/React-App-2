import React from "react";
import calendarIcon from "../assets/calendar_icon.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

type taskProps = {
  taskId: number;
  taskName: string;
  taskDescription?: string;
  taskDate?: string;
  taskPriority?: string;
};

function Task({
  taskId,
  taskName,
  taskDescription,
  taskDate,
  taskPriority,
}: taskProps) {
  const lists = useSelector((state: RootState) => state.list.lists);
  const dispatch = useDispatch();

  return (
    <div className="task__block">
      <div className="task__name-block">
        <p className="task__name">{taskName}</p>

        <p
          className="actions"
          onClick={
            () => console.log("log")
            // handleActions()
          }
        >
          <span></span>
          <span></span>
          <span></span>
        </p>

        {/* {actions === "visible" ? (
          <Actions
            visibility={actions}
            isTaskList={false}
            isEditMode={isEditMode}
            setIsEditMode={updateState}
            deleteTask={deleteTask}
            nameOfBlock={"task"}
          />
        ) : null} */}
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
        <div className="task__move">
          <p>Move to:</p>
          <span></span>

          {/* add ${moveTo} to class*/}
          <div className={`task__move-list`}>
            {lists.map((list: any) => {
              // onClick={() => updateList(id, list.id)}
              return <p>{list.name}</p>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task;
