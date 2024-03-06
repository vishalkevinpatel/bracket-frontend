import axios from "axios";
import { useState, useEffect } from "react";
import { BracketsIndex } from "./BracketsIndex";

export function Content() {
  const [brackets, setBrackets] = useState([]);

  const handleIndexBrackets = () => {
    console.log("handleIndexBrackets");
    axios.get("http://localhost:3000/brackets.json").then((response) => {
      console.log(response.data);
      setBrackets(response.data);
    });
  };

  useEffect(handleIndexBrackets, []);

  return (
    <div>
      <BracketsIndex brackets={brackets} />
    </div>
  );
}
