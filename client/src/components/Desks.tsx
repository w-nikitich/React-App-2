import React, { useEffect, useState } from "react";
import { DeskCreationSecondary } from "../stories/Button/Button.stories";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { createDesk, getDesks } from "../redux/reducers/deskSlice";
import { getAllDesks } from "../requests/desk.requests";

function Desks() {
  const desks = useSelector((state: RootState) => state.desk.desks);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllDesks().then((res) => {
      dispatch(getDesks(res));
    });
  }, [dispatch]);

  return (
    <div className="desks">
      <Button {...DeskCreationSecondary.args} />

      {desks.map((desk) => {
        return (
          <div className="desk-element">
            <span></span>
            <div className="desk-data">
              <h2 className="desk-name">{desk.name}</h2>
              <p className="desk-amount">You have {desk.amount} lists here</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Desks;
