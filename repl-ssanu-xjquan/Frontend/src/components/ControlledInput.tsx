import '../styles/main.css';
import { Dispatch, SetStateAction } from 'react';

// Remember that parameter names don't necessarily need to overlap;
// I could use different variable names in the actual function.
interface ControlledInputProps {
  value: string;
  // This type comes from React+TypeScript. VSCode can suggest these.
  //   Concretely, this means "a function that sets a state containing a string"
  setValue: Dispatch<SetStateAction<string>>;
  ariaLabel: string;
  onEnter: () => void;
}
  
  // Input boxes contain state. We want to make sure React is managing that state,
  //   so we have a special component that wraps the input box.
  export function ControlledInput({value, setValue, ariaLabel, onEnter}: ControlledInputProps) {
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
        event.preventDefault();
        onEnter(); // Call the onEnter callback when Enter key is pressed
      }
    };
    return (
      <input
        type="text"
        className="repl-command-box"
        value={value}
        placeholder="Enter command here!"
        style={{ color: "white" }}
        onChange={(ev) => setValue(ev.target.value)}
        aria-label={ariaLabel}
        onKeyPress={handleKeyPress}
      ></input>
    );
  }