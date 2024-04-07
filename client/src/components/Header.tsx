import React from "react";
import { DeskCreationPrimary } from "../stories/Button/Button.stories";
import Button from "./Button";

function Header() {
  return (
    <header>
      <h3>My Task Desks</h3>
      <Button {...DeskCreationPrimary.args} />
    </header>
  );
}
export default Header;
