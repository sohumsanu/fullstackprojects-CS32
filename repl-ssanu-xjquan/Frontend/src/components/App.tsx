import '../styles/App.css';
import {REPL, commanddict } from './REPL';
import {
  handleview,
  handleload,
  handlemode,
  handsearch,
  handlebroadband
} from "./REPLbasefunctions";
import { inputProps } from './REPLbasefunctions';
import { History } from "./REPLHistory";

/**
 * This is the highest level component!
 */

export function newchar(props: inputProps): History[] | void {
  const args = props.args;
  const charname = args[1];
  const newHistoryEntry: History = {
    commandLine: `New Character Created: ${charname}`,
    table: undefined,
  };
  props.setHistory([...props.history, newHistoryEntry]);
}

function App() {
    const acomdict = new commanddict();
    acomdict.addCommand("view", handleview);
    acomdict.addCommand("load", handleload);
    acomdict.addCommand("search", handsearch);
    acomdict.addCommand("mode", handlemode);
    acomdict.addCommand("broadband", handlebroadband);
    // acomdict.addCommand("newchar", newchar);
   
  return (
    <div className="App">
      <p className="App-header">
        <h1 style={{color: 'black'}}>REPL</h1>
      </p>
      <REPL commandmap={acomdict} />      
    </div>
  );
}

export default App;
