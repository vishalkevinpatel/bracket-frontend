import axios from "axios";
import { useState, useEffect } from "react";
import { BracketsIndex } from "./BracketsIndex";
import { BracketsShow } from "./BracketsShow";

export function Content() {
  const [brackets, setBrackets] = useState([]);

  const handleIndexBrackets = () => {
    console.log("handleIndexBrackets");
    axios.get("http://localhost:3000/brackets.json").then((response) => {
      console.log(response.data);
      setBrackets(response.data);
    });
  };

  // const matches = [
  //   { id: 1, pick_team_id: "Alabama" },
  //   { id: 2, pick_team_id: "Arkansas" },
  //   { id: 3, pick_team_id: "UCLA" },
  //   { id: 4, pick_team_id: "UNC" },
  //   { id: 5, pick_team_id: "KSU" },
  // ];

  const [matches, setMatches] = useState([]);

  // to go inside BracketShow.jsx
  const handleMatchesIndex = () => {
    console.log("handleMatchesIndex");
    axios.get("http://localhost:3000/matches.json").then((response) => {
      console.log(response.data);
      setMatches(response.data);
    });
  };

  useEffect(handleIndexBrackets, []);

  useEffect(handleMatchesIndex, []);

  return (
    <div>
      <BracketsIndex brackets={brackets} />
      <BracketsShow matches={matches} />
    </div>
  );
}
