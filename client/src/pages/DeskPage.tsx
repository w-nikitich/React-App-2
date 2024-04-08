import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getAllLists } from "../redux/reducers/listSlice";
import { getAllListsByDeskId } from "../requests/list.requests";
import Button from "../components/Button";
import {
  ListCreationPrimary,
  TaskCreationPrimary,
} from "../stories/Button/Button.stories";
import { getAllTasksByListId } from "../requests/task.requests";
import { setAllTasks } from "../redux/reducers/taskSlice";
import List from "../components/List";
import ModalWindow from "../components/ModalWindow";

interface IState {
  actions: string;
  tasks: any[];
}

function DeskPage() {
  const params = useParams();

  const updateState = (newState: Partial<IState>): void =>
    setState((prevState) => ({ ...prevState, ...newState }));
  const [state, setState] = useState<IState>({
    actions: "hidden",
    tasks: [],
  });

  const lists = useSelector((state: RootState) => state.list.lists);
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    const deskId = Number(params.id);
    getAllListsByDeskId(deskId).then((res: any) => {
      dispatch(getAllLists(res));
    });
  }, [dispatch, params.id]);

  return (
    <div className="desk">
      <Button clickedParam={Number(params.id)} {...ListCreationPrimary.args} />

      {lists.map((list, index) => {
        return (
          <div className="list">
            <List listId={list.id} name={list.name} amount={list.amount} />
          </div>
        );
      })}

      <p>{params.name}</p>
    </div>
  );
}

export default DeskPage;
