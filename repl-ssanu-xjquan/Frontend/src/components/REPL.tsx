import { useState } from "react";
import React, { Component } from "react";
import "../styles/main.css";
import { History, REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";
import { exampleCSVWithHeader, exampleCSVWithoutHeader } from "./mock/mockCSV";
import { REPLFunction } from "./REPLbasefunctions";

/* 
  You'll want to expand this component (and others) for the sprints! Remember 
  that you can pass "props" as function arguments. If you need to handle state 
  at a higher level, just move up the hooks and pass the state/setter as a prop.
  
  This is a great top level component for the REPL. It's a good idea to have organize all components in a component folder.
  You don't need to do that for this gearup.
*/

interface REPLProps {
  commandmap: commanddict;

}
 export class commanddict {
    commanddict: { [key: string]: REPLFunction } = {};
    constructor() {
      this.commanddict = {};
    }
    addCommand(key: string, func: REPLFunction) {
      this.commanddict[key] = func;
    }
    removeCommand(key: string) {
      delete this.commanddict[key];
    }
    getCommand(key: string) {
      return this.commanddict[key];
    }
 }

 /**
 * REPL Component for creating a Read-Eval-Print Loop interface.
 * @param {REPLProps} props - The properties passed to the REPL component.
 * @returns {JSX.Element} - The rendered REPL component.
 */
export function REPL(props: REPLProps) {
  // TODO: Add some kind of shared state that holds all the commands submitted.
  // CHANGED
  const [history, setHistory] = useState<History[]>([]);

  //Brief: true
  //Verbose: false
  const [mode, setMode] = useState<boolean>(true);

  return (
    <div className="repl">
      {/*This is where your REPLHistory might go... You also may choose to add it within your REPLInput 
      component or somewhere else depending on your component organization. What are the pros and cons of each? */}
      {/* CHANGED */}
      <REPLHistory history={history} mode={mode} />
      <hr></hr>
      {/* CHANGED */}
      <REPLInput
        history={history}
        setHistory={setHistory}
        mode={mode}
        setMode={setMode}
        commanddict={props.commandmap.commanddict}
      />
    </div>
  );
}
