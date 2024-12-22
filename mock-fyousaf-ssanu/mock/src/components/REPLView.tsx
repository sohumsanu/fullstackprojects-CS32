/**
 * Imports the main CSS file for styling and necessary React components and dependencies.
 */
import "../styles/main.css";
import { Component, Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";

/**
 * Describes the expected properties that the REPLView component can receive.
 */
interface REPLViewProps {
  file: String[][];
  search: String[][];
}
/**
 * Describes the properties required for rendering a table.
 */

interface TableProps {
  heading: String[];
  body: String[][];
}

/**
 * Describes the properties required for rendering a table row.
 */
interface TableRowProps {
  rowContent: String[];
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)

/**
 * Represents a table component that renders a table with the provided heading and body.
 */
class Table extends Component<TableProps> {
  render() {
    const { heading, body } = this.props;
    return (
      <table style={{ width: 500 }}>
        <thead>
          <tr>
            {heading.map((head, headID) => (
              <th key={headID}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((rowContent, rowID) => (
            <TableRow rowContent={rowContent} key={rowID} />
          ))}
        </tbody>
      </table>
    );
  }
}
/**
 * Represents a table row component that renders a row with the provided content.
 */
class TableRow extends Component<TableRowProps> {
  render() {
    const { rowContent } = this.props;
    return (
      <tr>
        {rowContent.map((val, rowID) => (
          <td key={rowID}>{val}</td>
        ))}
      </tr>
    );
  }
}

/**
 * The REPLView component is used to display a table in the web application.
 * It can render the table with different data sources based on the provided props.
 *
 * @param {REPLViewProps} file - The data for the table from the file source.
 * @param {REPLViewProps} search - The data for the table from the search source.
 */
export function REPLView({ file, search }: REPLViewProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  /**
   * We suggest breaking down this component into smaller components, think about the individual pieces
   * of the REPL and how they connect to each other...
   */
  return (
    <div className="repl-display-table">
      {search.length === 1 ? (
        <Table heading={file[0]} body={file.slice(1, file.length)} />
      ) : (
        <Table heading={search[0]} body={search.slice(1, file.length)} />
      )}
    </div>
  );
}
