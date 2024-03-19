import axios from "axios";
import { useState, useEffect } from "react";
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

  useEffect(handleIndexBrackets, []);
  const [showBracket, setShowBracket] = useState(false);

  const handleShowBracket = (bracketId) => {
    handleMatchesIndex(bracketId);
    setShowBracket(true);
  };

  return (
    <div>
      <BracketsIndex brackets={brackets} onShowBracket={handleShowBracket} />
      {showBracket && <BracketsShow matches={matches} />}
    </div>
  );
}
