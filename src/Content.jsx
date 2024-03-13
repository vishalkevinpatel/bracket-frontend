import axios from "axios";
import { useState, useEffect } from "react";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { BracketsIndex } from "./BracketsIndex";
import { BracketsShow } from "./BracketsShow";
import { BracketsNew } from "./BracketsNew";

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

  const handleCreateBracket = (params, successCallback) => {
    console.log("handleCreateBracket", params);
    axios.post("http://localhost:3000/brackets.json", params).then((response) => {
      setBrackets([...brackets, response.data]);
      successCallback();
    });
  };

  useEffect(handleIndexBrackets, []);

  return (
    <div>
      <Login />
      <Signup />
      <BracketsNew onCreateBracket={handleCreateBracket} />
      <BracketsIndex brackets={brackets} onShowBracket={handleShowBracket} />
      <BracketsShow matches={matches} />
    </div>
  );
}
