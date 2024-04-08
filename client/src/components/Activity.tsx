import React from "react";

type ActivityProps = {
  log: any;
  type: string;
  text?: string;
};

function Activity({ log, type, text }: ActivityProps) {
  const output = () => {
    let output = "";
    switch (type) {
      case "rename task":
        output = `You renamed ${log.oldData} to ${log.taskName}`;
        break;
      case "change description":
        output = `You changed description`;
        break;
      case "move task":
        output = `You changed status from ${log.oldData} to ${log.listName}`;
        break;
      default:
        break;
    }

    return output;
  };

  return <div className="activity">{output()}</div>;
}
export default Activity;
