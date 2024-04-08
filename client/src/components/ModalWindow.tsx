import React, {
  useEffect,
  useState,
  useRef,
  KeyboardEvent,
  useReducer,
} from "react";
import Calendar from "react-calendar";
import type { RootState } from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { updateTaskData, resetTask } from "../redux/reducers/taskSlice";
import { getOneTask, updateTask } from "../requests/task.requests";
import statusIcon from "../assets/status_icon.png";
import calendarIcon from "../assets/calendar_icon.png";
import priorityIcon from "../assets/priority_icon.png";
import { getOneList } from "../requests/list.requests";
import {
  createActivityLog,
  getLogsByTaskId,
} from "../requests/activity.requests";
import {
  createNewActivity,
  updateActivityLog,
} from "../redux/reducers/activityLogSlice";
import Activity from "./Activity";

type ModalWindowProps = {
  visibility?: string;
  visibilityChange?: any;
  defineId: any;
  taskId: number;
  listId?: number;
};

type Task = {
  id: number;
  name: string;
  listId: number;
  date: string;
  priority: string;
  description: string;
};

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function ModalWindow({
  visibility,
  visibilityChange,
  defineId,
  taskId,
  listId,
}: ModalWindowProps) {
  const activityLogs = useSelector(
    (state: RootState) => state.activityLog.activityLog
  );
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const lists = useSelector((state: RootState) => state.list.lists);
  const dispatch = useDispatch();

  const [isEditMode, setIsEditMode] = useState({
    isName: false,
    isStatus: false,
    isDate: false,
    isPriority: false,
    isDescription: false,
  });
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logs, setLogs] = useState<any>([]);
  const [task, setTask] = useState<Task>({
    id: 0,
    name: "",
    listId: 0,
    date: "",
    priority: "",
    description: "",
  });
  //   const [taskId, setTaskId] = useState(0);
  const [listObj, setListObj] = useState<any>({});
  const [date, setDate] = useState<Value>(new Date());

  useEffect(() => {
    const fetchData = async () => {
      if (visibility === "visible") {
        const curTask = await findTask(taskId);
        setName(curTask.name);
        const logs = await getLogsByTaskId(taskId);
        dispatch(updateActivityLog(logs));
        // setLogs(logs);
      }
    };

    fetchData();
  }, [visibility, defineId, dispatch]);

  async function findTask(taskId: number) {
    const task = await getOneTask(taskId);
    const list = await getOneList(task.listId);
    setTask(task);
    setListObj(list);
    return task;
  }

  //   useEffect(() => {
  //     if (visibility === "visible") {
  //       findTask();
  //       setName(tasks[taskId].name);

  //       axios.get("http://localhost:8001/history").then((res) => {
  //         dispatch(updateHistory(res.data));
  //       });
  //     }
  //   }, [visibility, taskId, listObj, task]);

  async function handleKeyDown(
    e: KeyboardEvent<HTMLInputElement> | KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (e.key === "Enter") {
      const oldTask = { ...task } as Task;
      const updatedTask = {
        ...task,
        name: name,
        description: description,
      } as Task;
      setTask(updatedTask);

      if (description !== "") {
        const newTask = await updateTask(taskId, {
          description: updatedTask.description,
        });
        dispatch(updateTaskData({ id: taskId, updatedTask: newTask }));

        const newLog = await createActivityLog({
          taskId: taskId,
          taskName: newTask.name,
          type: "change description",
        });
        dispatch(createNewActivity({ createdLog: newLog }));
      }

      if (name !== "") {
        const newTask = await updateTask(taskId, { name: updatedTask.name });
        dispatch(updateTaskData({ id: taskId, updatedTask: newTask }));

        const newLog = await createActivityLog({
          taskId: taskId,
          taskName: newTask.name,
          type: "rename task",
          oldData: `${oldTask.name}`,
        });
        dispatch(createNewActivity({ createdLog: newLog }));
      }

      setIsEditMode((prevState) => ({
        ...prevState,
        isName: false,
        isDescription: false,
      }));
    }
  }

  function handleDateChange(date: any) {
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "short" });
    const day = date.toLocaleDateString("en-US", { day: "numeric" });
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const chosenDate = `${dayOfWeek}, ${day} ${month}`;
    setDate(date);
    const newData = updateTask(taskId, { date: chosenDate });
    dispatch(updateTaskData({ id: taskId, updatedTask: newData }));
  }

  function handlePriorityChange(priority: string, curPriority?: string) {
    const newData = updateTask(taskId, { priority: priority });
    dispatch(updateTaskData({ id: taskId, updatedTask: newData }));
    setTask((prevState: any) => ({ ...prevState, priority: priority }));

    // axios
    //   .post("http://localhost:8001/history", {
    //     taskId: id,
    //     taskName: name,
    //     newData: priority,
    //     type: "change priority",
    //     oldData: `${curPriority}`,
    //   })
    //   .then((res) => {
    //     dispatch(createNewActivity({ createdLog: res.data }));
    //   });
  }

  return (
    <div className={`modal-window ${visibility}`}>
      <div className="modal-window__close-block">
        <span
          className="close"
          onClick={() => {
            visibilityChange("hidden");
            setIsEditMode({
              isName: false,
              isDate: false,
              isStatus: false,
              isPriority: false,
              isDescription: false,
            });
          }}
        ></span>
      </div>

      <div className="modal-window__info">
        <div className="modal-window__data-block">
          <div className="modal-window__name-block">
            {isEditMode.isName ? (
              <input
                className="modal-window__name edit"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            ) : (
              <p className="modal-window__name visible">{name}</p>
            )}

            <div
              className="modal-window__edit-block"
              onClick={() => {
                if (
                  (isEditMode.isName ||
                    isEditMode.isDate ||
                    isEditMode.isStatus ||
                    isEditMode.isPriority ||
                    isEditMode.isDescription) === true
                ) {
                  setIsEditMode({
                    isName: false,
                    isDate: false,
                    isStatus: false,
                    isPriority: false,
                    isDescription: false,
                  });
                } else {
                  setIsEditMode({
                    isName: true,
                    isDate: true,
                    isStatus: false,
                    isPriority: false,
                    isDescription: true,
                  });
                }
              }}
            >
              <p className="modal-window__edit">Edit task</p>
            </div>
          </div>

          <div className="modal-window__details-block">
            <div className="modal-window__details">
              <div className="modal-window__details-title">
                <img className="icon" src={statusIcon} alt="status icon" />
                <p className="modal-window__title">Status</p>
              </div>

              <div
                className="modal-window__data"
                onClick={() => {
                  setIsEditMode((prevState) => ({
                    ...prevState,
                    isStatus: !isEditMode.isStatus,
                  }));
                }}
              >
                <p className="modal-window__status">{listObj?.name}</p>

                {isEditMode.isStatus ? (
                  <div className="modal-window__status-change">
                    {lists.map((list, index) => {
                      return (
                        <p
                          className="modal-window__status"
                          onClick={async () => {
                            const newTask = await updateTask(taskId, {
                              listId: list.id,
                            });
                            dispatch(
                              updateTaskData({
                                id: taskId,
                                updatedTask: newTask,
                              })
                            );

                            setListObj((prevState: any) => ({
                              ...prevState[0],
                              name: list.name,
                            }));

                            const newLog = await createActivityLog({
                              taskId: taskId,
                              taskName: name,
                              listId: list.id,
                              listName: list.name,
                              type: "move task",
                              oldData: `${listObj?.name}`,
                            });

                            dispatch(createNewActivity({ createdLog: newLog }));
                          }}
                        >
                          {list.name}
                        </p>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="modal-window__details">
              <div className="modal-window__details-title">
                <img
                  className="icon calendar"
                  src={calendarIcon}
                  alt="calendar icon"
                />
                <p className="modal-window__title">Due date</p>
              </div>

              <div
                className="modal-window__data"
                onClick={() => {
                  setIsEditMode((prevState) => ({
                    ...prevState,
                    isDate: true,
                  }));
                }}
              >
                <p className="modal-window__date">{task?.date}</p>

                {isEditMode.isDate ? (
                  <div className="modal-window__date-change">
                    <Calendar
                      className="custom-calendar"
                      value={date}
                      onChange={handleDateChange}
                    ></Calendar>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="modal-window__details">
              <div className="modal-window__details-title">
                <img
                  className="icon priority"
                  src={priorityIcon}
                  alt="priority icon"
                />
                <p className="modal-window__title">Priority</p>
              </div>

              <div
                className="modal-window__data"
                onClick={() => {
                  setIsEditMode((prevState) => ({
                    ...prevState,
                    isPriority: !isEditMode.isPriority,
                  }));
                }}
              >
                <p className="modal-window__priority">{task?.priority}</p>

                {isEditMode.isPriority ? (
                  <div className="modal-window__priority-change">
                    <p
                      className="modal-window__priority"
                      onClick={() => {
                        handlePriorityChange("Low", task?.priority);
                      }}
                    >
                      Low
                    </p>
                    <p
                      className="modal-window__priority"
                      onClick={() => {
                        handlePriorityChange("Medium", task?.priority);
                      }}
                    >
                      Medium
                    </p>
                    <p
                      className="task-creation__priority"
                      onClick={() => {
                        handlePriorityChange("High", task?.priority);
                      }}
                    >
                      High
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="modal-window__description-block">
            <p className="modal-window__description-title">Description</p>

            {isEditMode.isDescription ? (
              <textarea
                className="modal-window__description edit"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onKeyDown={handleKeyDown}
              ></textarea>
            ) : (
              <p className="modal-window__description">{task?.description}</p>
            )}
          </div>
        </div>

        <div className="modal-window__activity-block">
          <p className="modal-window__activity-title">Activity</p>

          {activityLogs.map((log, index: any) => {
            if (log.taskId === taskId) {
              return <Activity type={log.type} log={log} />;
            } else return null;
          })}
        </div>
      </div>
    </div>
  );
}

export default ModalWindow;
