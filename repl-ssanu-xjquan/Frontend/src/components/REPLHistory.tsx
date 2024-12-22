import React from "react";

// Each History should contain a string and a HTML table
export type History = {
  commandLine: string;
  table?: JSX.Element[];
};

// Props should have a list of type History and a mode to determine brief or verbose
interface REPLHistoryProps {
  history: History[];
  mode: boolean;
}

// Function to render your record/history
export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history" aria-label="history">
      {/* Display the current mode */}
      {props.mode ? <p style={{color: "black"}}>MODE BRIEF</p> : <p style={{ color: "black" }}>MODE VERBOSE</p>}

      {/* Display command history */}
      {props.history.map((entry, index) => (
        <div key={index}>
          {props.mode ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              
              }}
            >
              {Array.isArray(entry.table) ? entry.table : null}
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <p>{entry.commandLine}</p>
              {Array.isArray(entry.table) ? entry.table : null}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
