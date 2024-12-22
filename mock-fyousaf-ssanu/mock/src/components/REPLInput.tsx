/**
 * Imports the main CSS file for styling and necessary React components and dependencies.
 */

import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";

/**
 * Describes the expected properties that the REPLInput component can receive.
 */
interface REPLInputProps {
  history: Array<String>; //An array to store command history
  setHistory: Dispatch<SetStateAction<String[]>>; //function to set command history state
  mode: Boolean; // boolean value representing mode (verbose or brief)
  setMode: Dispatch<SetStateAction<Boolean>>; // a function to set the mode state
  setView: Dispatch<SetStateAction<Boolean>>; // a function to set the view state
  setFile: Dispatch<SetStateAction<string>>; // a function to set the file state
  setSearch: Dispatch<SetStateAction<Array<String>>>; // a function to set the search state
  setSearchb: Dispatch<SetStateAction<Boolean>>; // a function to set the searchb state
  mapdict: Map<string, Array<Array<String>>>;
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)

/**
 * The REPLInput component is responsible for user input in the REPL (Read-Eval-Print Loop).
 * It handles command input and various modes.
 *
 * @param {REPLInputProps} history - An array to store the command history.
 * @param {REPLInputProps} setHistory - A function to set the command history state.
 * @param {REPLInputProps} mode - A boolean value representing the mode (verbose or brief).
 * @param {REPLInputProps} setMode - A function to set the mode state.
 * @param {REPLInputProps} setView - A function to set the view state.
 * @param {REPLInputProps} setFile - A function to set the file state.
 * @param {REPLInputProps} setSearch - A function to set the search state.
 * @param {REPLInputProps} setSearchb - A function to set the searchb state.
 */
export function REPLInput({
  history,
  setHistory,
  mode,
  setMode,
  setView,
  setFile,
  setSearch,
  setSearchb,
  mapdict,
}: REPLInputProps) {
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  const [count, setCount] = useState<number>(0);
  /**
   * We suggest breaking down this component into smaller components, think about the individual pieces
   * of the REPL and how they connect to each other...
   */

  /**
   * Handles the submission of a command.
   * @param {String} command - The command to be processed.
   */
  function handleSubmit(command: String) {
    let output = "";
    const split_array = command.split(" ");
    if (split_array.length > 3) {
      console.error("Invalid command");
    } else {
      if (split_array[0] == "load_file") {
        console.log(split_array[1]);
        console.log(mapdict.has(split_array[1]));
        if (!(mapdict.has(split_array[1]))) {
          console.error("File not found");
          output = split_array[1] + " File Not Found";
        } else {
           setFile(split_array[1]);
           output = split_array[1] + " File loaded";
        }
      } else if (split_array[0] == "view") {
        setView(true);
        setSearchb(false);
        output = "View mode toggled";
      } else if (split_array[0] == "search") {
        if(split_array.length == 1) {
          output = "Invalid number of arguments";
        } else {
        setSearch(split_array.slice(1, split_array.length));
        setSearchb(true);
        setView(false);
        output = "searching table"
        }
      } else if (split_array[0] == "mode") {
          setMode(!mode);
      } else {
        console.error("Invalid command");
        output = "Invalid command";
      }
    }
    if (!mode) {
      setHistory([command, ...history]);
    } else {
      setHistory(["command: " + command + "\n output: " + output, ...history]);
    }
    console.log(history);
    handleSubmit3();
  }
  function handleSubmit2(command: String) {
    setMode(!mode);
    console.log(mode);
  }

  function handleSubmit3() {
    setCount(count + 1);
  }

  return (
    <div className="repl-input">
      {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
      {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      <button> Submitted {count} times</button>
      {/* TODO WITH TA: Build a handleSubmit function that increments count and displays the text in the button */}
      {/* TODO: Currently this button just counts up, can we make it push the contents of the input box to the history?*/}

      <br></br>
      <div style={{ display: "flex", margin: "auto" }}>
        <span style={{ display: "inline" }}>
          <input
            type="button"
            onClick={() => handleSubmit(commandString)}
            value="Submit"
          />
          <input
            type="button"
            onClick={() => handleSubmit2(commandString)}
            value="Mode"
          />
          {/* <input
            type="button"
            onClick={() => handleSubmit3(commandString)}
            value={"Submitted"}
          /> */}
          <div className="ppadding">
            <p >The mode is {mode ? "verbose" : "brief"}</p>
            <br></br>
            <br></br>
          </div>
        </span>
      </div>
    </div>
  );
}
