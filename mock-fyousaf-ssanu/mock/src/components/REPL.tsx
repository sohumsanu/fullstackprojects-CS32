import { useState } from "react";
import "../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";
import Papa from "papaparse";
import { REPLView } from "./REPLView";

/* 
  You'll want to expand this component (and others) for the sprints! Remember 
  that you can pass "props" as function arguments. If you need to handle state 
  at a higher level, just move up the hooks and pass the state/setter as a prop.
  
  This is a great top level component for the REPL. It's a good idea to have organize all components in a component folder.
  You don't need to do that for this gearup.
*/

export default function REPL() {
  const [history, setHistory] = useState<Array<String>>([]);
  const [mode, setMode] = useState<Boolean>(false);
  const [view, setView] = useState<Boolean>(false);
  const [file, setFile] = useState<Array<Array<String>>>([[]]);
  const [filename, setFilename] = useState<string>("");
  const [search, setSearch] = useState<Array<String>>([]);
  const [searchb, setSearchb] = useState<Boolean>(false);

  const ten_star = [
    ["StarID", "ProperName", "X", "Y", "Z"],
    ["0", "Sol", "0", "0", "0"],
    ["1", "AlphaCentauri", "3.937", "0", "0"],
    ["2", "Barnard's Star", "5.959", "0", "0"],
    ["3", "Wolf 359", "7.86", "0", "0"],
    ["4", "Lalande 21185", "8.29", "0", "0"],
    ["5", "Sirius", "8.582", "0", "0"],
    ["6", "BL Ceti", "8.728", "0", "0"],
    ["7", "Ross 154", "9.681", "0", "0"],
    ["8", "Ross 248", "10.322", "0", "0"],
    ["9", "Epsilon Eridani", "10.522", "0", "0"],
    ["10", "Lacaille 9352", "10.742", "0", "0"],
  ];
  const simple1 = [
    ["Name", "Major", "Age"],
    ["Alice", "CS", "20"],
    ["Bob", "Biology", "21"],
    ["Charlie", "CS", "22"],
    ["Diana", "MCM", "23"],
  ];
  const dog = [
    ["Name", "Breed", "Color"],
    ["Alice", "Poodle", "White"],
    ["Bob", "Poodle", "Black"],
    ["Charlie", "Poodle", "Brown"],
    ["Diana", "Poodle", "Grey"],
    ["Eve", "Poodle", "Red"],
    ["Frank", "Poodle", "Orange"],
    ["Grace", "Poodle", "Yellow"],
    ["Heidi", "Poodle", "Green"],
  ];
  const mapdict = new Map();
  mapdict.set("./ten_star.csv", ten_star);
  mapdict.set("./simple1.csv", simple1);
  mapdict.set("./dog.csv", dog);
  const searchmap = new Map();
  searchmap.set("StarID 7", [ten_star[0], ten_star[8]]);
  searchmap.set("ProperName Ross", [ten_star[0], ten_star[8], ten_star[9]]);
  searchmap.set("Y 0", ten_star);
  searchmap.set("1 Ross", [ten_star[0], ten_star[8], ten_star[9]]);
  searchmap.set("Name Bob", [simple1[0], simple1[1]]);
  searchmap.set("2 22", [simple1[0], simple1[2]]);
  searchmap.set("1 Poodle", dog);

  let filen = [[]];
  if (view && !mapdict.has(filename)) {
    console.error("File not found");
    setView(false);
  } else {
    filen = mapdict.get(filename);
  }
  let newsearch = [[]];
  if (!(search.length === 0)) {
    if (!searchmap.has(search.join(" "))) {
      console.error(search + "Name not found");
      console.log(searchmap);
      console.log(searchmap.has("StarID 7"));
    } else {
      newsearch = searchmap.get(search.join(" "));
    }
  }

  return (
    <div className="repl">
      {/*This is where your REPLHistory might go... You also may choose to add it within your REPLInput 
      component or somewhere else depending on your component organization. What are the pros and cons of each? */}
      {/* TODO: Update your REPLHistory and REPLInput to take in new shared state as props */}
      {view ? (
        <REPLView file={mapdict.get(filename)} search={[[]]} />
      ) : (
        <div></div>
      )}
      {searchb ? (
        <REPLView file={mapdict.get(filename)} search={newsearch} />
      ) : (
        <div></div>
      )}
      <br></br>
      <hr></hr>
      <REPLInput
        history={history}
        setHistory={setHistory}
        mode={mode}
        setMode={setMode}
        setView={setView}
        setFile={setFilename}
        setSearch={setSearch}
        setSearchb={setSearchb}
        mapdict={mapdict}
      />
      <br></br>
      <br></br>
      <REPLHistory history={history} />
    </div>
  );
}
