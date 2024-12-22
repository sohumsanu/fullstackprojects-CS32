import "../styles/main.css";

/**
 * Describes the expected properties that the REPLHistory component can receive.
 */
interface REPLHistoryProps {
  history: Array<String>;
}

/**
 * Represents a single history item, displaying a command.
 * @param {String} command - The command to be displayed.
 */
function HistoryItem(command: String) {
  return <div className="history-item">{command}</div>;
}

/**
 * The REPLHistory component is responsible for displaying a history of previously entered commands.
 *
 * @param {REPLHistoryProps} historyprops - The properties containing the command history to be displayed.
 */
export function REPLHistory(historyprops: REPLHistoryProps) {
  return (
    <div className="repl-history">
      <h1>History</h1>
      {historyprops.history.map((command: String) => {
        return HistoryItem(command);
      })}
    </div>
  );
}
