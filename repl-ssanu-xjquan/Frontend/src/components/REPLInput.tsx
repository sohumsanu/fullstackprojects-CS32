import React, { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { ControlledInput } from "./ControlledInput";
import { History } from "./REPLHistory";
import { REPLFunction } from "./REPLbasefunctions";

interface REPLInputProps {
  history: History[];
  setHistory: Dispatch<SetStateAction<History[]>>;
  mode: boolean;
  setMode: Dispatch<SetStateAction<boolean>>;
  commanddict: { [key: string]: REPLFunction };
}

/**
 * REPLInput Component for handling user input in the REPL interface.
 * @param {REPLInputProps} props - The properties passed to the REPLInput component.
 * @returns {JSX.Element} - The rendered REPLInput component.
 */
export function REPLInput(props: REPLInputProps) {
  const [commandString, setCommandString] = useState<string>("");
  const [fileString, setFileString] = useState<string>("");
  let commanddict = props.commanddict;

  function handleSubmit() {
    const args = commandString.split(" ");
    const command = args[0];
    
    if(Object.keys(commanddict).length === 0) {
      alert("No commands loaded")
    }

   else if (command in commanddict) {
      commanddict[command]({
        history: props.history,
        setHistory: props.setHistory,
        args: args,
        fileString: fileString,
        setFileString: setFileString,
        setMode: props.setMode,
      });
    } else {
      alert("Invalid command entered");
    }
    setCommandString("");
  }

  return (
    <div className="repl-input">
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
          onEnter={handleSubmit}
        />
      </fieldset>
      <button onClick={handleSubmit} role="button" aria-label="Submit Command">
        Submit
      </button>
    </div>
  );
}
