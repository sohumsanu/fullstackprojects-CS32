import React, { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { ControlledInput } from "./ControlledInput";
import { History } from "./REPLHistory";
import { createTableFromJSON, createTableFromBroadbandJSON } from "./REPLtable";

export interface REPLFunction {
  (args: inputProps): History[] | void;
}

export interface inputProps {
    history: History[];
    setHistory: Dispatch<SetStateAction<History[]>>;
    args: Array<string>;
    fileString: string;
    setFileString: Dispatch<SetStateAction<string>>;
    setMode: Dispatch<SetStateAction<boolean>>;
}

/**
 * Handles the 'viewcsv' command, displaying the content of the loaded CSV file in the history.
 * @param {inputProps} props - The properties containing input parameters.
 * @returns {History[] | void} - Updated history or void in case of an error.
 */
export function handleview(props: inputProps): History[] | void {
  if (props.fileString === "") {
    alert("File not loaded");
  } else {
    fetch(`http://localhost:3232/viewcsv`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {   
        const newHistoryEntry: History = {
          commandLine: `View file: ${props.fileString}`,
          table: createTableFromJSON(data),
        };
        props.setHistory([...props.history, newHistoryEntry]);
      })
      .catch((error) => {
        alert("Error viewing the file: " + error.message);
      });
  }
}

/**
 * Handles the 'searchcsv' command, performing a search on the loaded CSV file and updating the history.
 * @param {inputProps} props - The properties containing input parameters.
 * @returns {History[] | void} - Updated history or void in case of an error.
 */
export function handsearch(props: inputProps): History[] | void {
  if (props.fileString === "") {
    alert("File not loaded");
  } else {
    const commandString = props.args.join(" ");
    const args = (commandString?.match(/(".*?"|[^"\s]+)+/g) || []).map(
      (arg) => arg.replace(/"/g, "")
    ); 
    if (args.length < 3) {
      alert("Invalid search command. Please specify both a column and a value.");
    } else {
      let searchValue = encodeURIComponent(args[2].toString());
      let column = encodeURIComponent(args[1].toString());
      fetch(`http://localhost:3232/searchcsv?value=${searchValue}&column=${column}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Data received from the API:", data);
          const newHistoryEntry: History = {
            commandLine: `Searched column ${args[1]} for value ${args[2]}`,
            table: createTableFromJSON(data),
          };
          props.setHistory([...props.history, newHistoryEntry]);
        })
        .catch((error) => {
          alert(
            `No searches found given column ${args[1]} and value ${args[2]}`
          );
        });
      }
    }
}

/**
 * Handles the 'loadcsv' command, loading a CSV file and updating the history.
 * @param {inputProps} props - The properties containing input parameters.
 * @returns {History[] | void} - Updated history or void in case of an error.
 */
export function handleload(props: inputProps): History[] | void {
  fetch(`http://localhost:3232/loadcsv?filepath=${props.args[1]}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const table = createTableFromJSON(data);
      const loadHistory: History = {
        commandLine: `Loaded file: ${props.args[1]}`,
        table: table,
      };
      props.setHistory([...props.history, loadHistory]);
    })
    .catch((error) => {
      alert("Error loading the file: " + error.message);
    });
  props.setFileString(props.args[1]);
} 

/**
 * Handles the 'mode' command, changing the display mode (Brief or Verbose) and updating the history.
 * @param {inputProps} props - The properties containing input parameters.
 * @returns {History[] | void} - Updated history or void in case of an error.
 */
export function handlemode(props: inputProps): History[] | void {
  if (props.args[1].toLowerCase() === "brief") {
    props.setMode(true);
  } else if (props.args[1].toLowerCase() === "verbose") {
    props.setMode(false);
  } else {
    alert("Please enter 'brief' or 'verbose");
  }
}

/**
 * Handles the 'broadband' command, searching for broadband data based on state and county.
 * @param {inputProps} props - The properties containing input parameters.
 * @returns {History[] | void} - Updated history or void in case of an error.
 */
export function handlebroadband(props: inputProps): History[] | void {
  fetch(`http://localhost:3232/broadband?state=${props.args[1]}&county=${props.args[2]}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const table = createTableFromBroadbandJSON(data);
      console.log(data);
      const loadHistory: History = {
        commandLine: `Searched broadband given state ${props.args[1]} and county ${props.args[2]}`,
        table: table,
      };
      props.setHistory([...props.history, loadHistory]);
    })
    .catch((error) => {
      alert("Error loading broadband given error: " + error.message);
    });
}
