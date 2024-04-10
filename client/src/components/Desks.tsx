import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeskCreationSecondary } from "../stories/Button/Button.stories";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  createDesk,
  getDesks,
  updateDeskData,
} from "../redux/reducers/deskSlice";
import { getAllDesks, updateDesk } from "../requests/desk.requests";
import Actions from "./Actions";
import { DeleteDesk, EditDesk } from "../stories/Actions/Actions.stories";

function Desks() {
  const desks = useSelector((state: RootState) => state.desk.desks);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const allDesks = await getAllDesks();
      dispatch(getDesks(allDesks));
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="desks">
      <Button {...DeskCreationSecondary.args} />

      {desks.map((desk) => {
        return <Desk deskId={desk.id} desk={desk} />;
      })}
    </div>
  );
}

function Desk(desk: any, deskId: number) {
  const navigate = useNavigate();
  const [isActionsOpened, setIsActionsOpened] = useState(false);
  const [actions, setActions] = useState("hidden");
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState(desk.desk.name);

  const lists = useSelector((state: RootState) => state.list.lists);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isActionsOpened) {
      setActions("visible");
    } else {
      setActions("hidden");
    }
  }, [isActionsOpened]);

  function findAmount(deskId: number) {
    let amount = 0;

    lists.forEach((list) => {
      if (list?.deskId === deskId) {
        amount++;
      }
    });

    return amount;
  }

  function openDesk() {
    navigate(`/desk/${desk.deskId}`);
  }

  function handleActions() {
    setIsActionsOpened(!isActionsOpened);
  }

  async function handleKeyDown(e: any, id: number) {
    if (e.key === "Enter") {
      const newData = await updateDesk(id, { name: name });
      dispatch(updateDeskData({ data: newData }));
      setIsEditMode(false);
    }
  }

  return (
    <div className="desk-block">
      <div
        className="actions"
        onClick={() => {
          handleActions();
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`${actions}`}>
        <Actions
          id={desk.deskId}
          {...EditDesk.args}
          onClick={() => {
            setIsEditMode(true);
          }}
        />
        <Actions id={desk.deskId} {...DeleteDesk.args} />
      </div>

      <div className="desk-element" onClick={openDesk}>
        <div className="desk-data">
          {isEditMode ? (
            <input
              className="desk-data-change"
              type="text"
              value={name}
              onClick={(e) => {
                e.stopPropagation();
              }}
              onChange={(e) => {
                setName(e.target.value);
              }}
              onKeyDown={async (e) => await handleKeyDown(e, desk.deskId)}
            />
          ) : (
            <h2 className="desk-name">{desk.desk.name}</h2>
          )}
          <p className="desk-amount">
            You have {findAmount(desk.deskId)} lists here
          </p>
        </div>
      </div>
    </div>
  );
}

export default Desks;
