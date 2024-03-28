import axios from "axios";
import { useState, useEffect } from "react";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { BracketsIndex } from "./BracketsIndex";
import { BracketsShow } from "./BracketsShow";
import { BracketsNew } from "./BracketsNew";
import { MatchesNew } from "./MatchesNew";

export function Content() {
  const [brackets, setBrackets] = useState([]);
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);
  const [currentBracketId, setCurrentBracketId] = useState(null);

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

  // gets teams from teams.json
  useEffect(() => {
    axios
      .get("http://localhost:3000/teams.json")
      .then((response) => {
        setTeams(response.data);
      })
      .catch((error) => console.error("Error fetching teams:", error));
  }, []);

  // gets games from games.json
  useEffect(() => {
    axios
      .get("http://localhost:3000/games.json")
      .then((response) => {
        setGames(response.data);
      })
      .catch((error) => console.error("Error fetching games:", error));
  }, []);

  useEffect(handleIndexBrackets, []);
  const [showBracket, setShowBracket] = useState(false);

  const handleShowBracket = (bracketId) => {
    handleMatchesIndex(bracketId);
    setShowBracket(true);
  };

  // const handleCreateBracket = (params, successCallback) => {
  //   console.log("handleCreateBracket", params);
  //   axios.post("http://localhost:3000/brackets.json", params).then((response) => {
  //     setBrackets([...brackets, response.data]);
  //     successCallback();
  //   });
  // };

  const handleCreateBracket = (params, successCallback) => {
    console.log("handleCreateBracket", params);

    axios.post("http://localhost:3000/brackets.json", params).then((response) => {
      // Assuming response.data includes the new bracket's ID
      const newBracketId = response.data.id;
      setBrackets([...brackets, response.data]);

      // Iterate through game IDs 1-32 and create a match for each
      for (let gameId = 1; gameId <= 67; gameId++) {
        const matchParams = {
          bracket_id: newBracketId,
          game_id: gameId,
          // Include any default or necessary params for pick_team_id or others
        };

        axios
          .post("http://localhost:3000/matches.json", matchParams)
          .then((matchResponse) => {
            console.log(`Match ${gameId} created for Bracket ${newBracketId}`, matchResponse.data);
            // Optionally update some state or perform an action after each match creation
          })
          .catch((error) => {
            console.error(`Error creating match ${gameId} for Bracket ${newBracketId}`, error);
            // Handle errors (e.g., display an error message)
          });
      }

      setCurrentBracketId(newBracketId);
      console.log(newBracketId); // Save the new bracket ID
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
      {showBracket && (
        <BracketsShow matches={matches} games={games} teams={teams} brackets={brackets} bracketId={currentBracketId} />
      )}
      {currentBracketId && <MatchesNew bracketId={currentBracketId} matches={matches} teams={teams} games={games} />}
    </div>
  );
}
