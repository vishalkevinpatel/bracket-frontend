import axios from "axios";
import { useState, useEffect } from "react";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { BracketsIndex } from "./BracketsIndex";
import { BracketsShow } from "./BracketsShow";

export function Content() {
  const [brackets, setBrackets] = useState([]);
  const [matches, setMatches] = useState([]);

  const handleIndexBrackets = () => {
    console.log("handleIndexBrackets");
    axios.get("http://localhost:3000/brackets.json").then((response) => {
      console.log(response.data);
      setBrackets(response.data);
    });
  };

  // to go inside BracketShow.jsx
  const handleMatchesIndex = (bracketId) => {
    console.log("handleMatchesIndex");
    axios.get(`http://localhost:3000/filter_by_bracket/${bracketId}.json`).then((response) => {
      console.log(response.data);
      setMatches(response.data);
    });
  };

  const handleShowBracket = (bracketId) => {
    handleMatchesIndex(bracketId);
  };

  useEffect(handleIndexBrackets, []);

  return (
    <div>
      <Login />
      <Signup />
      <BracketsIndex brackets={brackets} onShowBracket={handleShowBracket} />
      <BracketsShow matches={matches} />
    </div>
  );
}
