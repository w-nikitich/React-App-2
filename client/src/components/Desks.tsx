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

interface IState {
  actions: string;
  isActionsOpened: boolean;
  isEditMode: boolean;
  name: string;
}

function Desks() {
  const desks = useSelector((state: RootState) => state.desk.desks);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateState = (newState: Partial<IState>): void =>
    setState((prevState) => ({ ...prevState, ...newState }));
  const [state, setState] = useState<IState>({
    actions: "hidden",
    isActionsOpened: false,
    isEditMode: false,
    name: "New Desk",
  });

  useEffect(() => {
    getAllDesks().then((res) => {
      dispatch(getDesks(res));
    });

    if (state.isActionsOpened) {
      updateState({ actions: "visible" });
    } else {
      updateState({ actions: "hidden" });
    }
  }, [dispatch, state.isActionsOpened, state.name]);

  function openDesk(desk: any) {
    navigate(`/desk/${desk.id}`);
  }

  function handleActions() {
    updateState({ isActionsOpened: !state.isActionsOpened });
  }

  async function handleKeyDown(e: any, id: number) {
    if (e.key === "Enter") {
      const newData = await updateDesk(id, { name: state.name });
      dispatch(updateDeskData({ data: newData }));
      updateState({ isEditMode: false });
      console.log(newData);
    }
  }

  return (
    <div className="desks">
      <Button {...DeskCreationSecondary.args} />

      {desks.map((desk) => {
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

            {state.actions === "visible" ? (
              <div>
                <Actions
                  id={desk.id}
                  {...EditDesk.args}
                  onClick={() => {
                    updateState({ isEditMode: true });
                  }}
                />
                <Actions id={desk.id} {...DeleteDesk.args} />
              </div>
            ) : null}

            <div
              className="desk-element"
              onClick={() => {
                openDesk(desk);
              }}
            >
              <div className="desk-data">
                {state.isEditMode ? (
                  <input
                    className="desk-data-change"
                    type="text"
                    value={state.name}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    onChange={(e) => {
                      updateState({ name: e.target.value });
                    }}
                    onKeyDown={async (e) => await handleKeyDown(e, desk.id)}
                  />
                ) : (
                  <h2 className="desk-name">{desk.name}</h2>
                )}
                <p className="desk-amount">You have {desk.amount} lists here</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Desks;
