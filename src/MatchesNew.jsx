/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";

export function MatchesNew(props) {
  const [newMatches, setNewMatches] = useState([]);

  const getTeamNameById = (teamId) => {
    const team = props.teams.find((team) => team.id === teamId);
    return team ? team.name : "TBD"; // Return "TBD" if team not found
  };

  const processedBracket = [
    [1, null, null, null, null, null, null, null, null, null, 17],
    [2, 33, null, null, null, null, null, null, null, 41, 18],
    [3, null, 49, null, null, null, null, null, 53, null, 19],
    [4, 34, null, null, null, null, null, null, null, 42, 20],
    [5, null, null, 57, null, null, null, 59, null, null, 21],
    [6, 35, null, null, null, null, null, null, null, 43, 22],
    [7, null, 50, null, null, null, null, null, 54, null, 23],
    [8, 36, null, null, null, null, null, null, null, 44, 24],
    [9, null, null, null, 61, 63, 62, null, null, null, 25],
    [10, 37, null, null, null, null, null, null, null, 45, 26],
    [11, null, 51, null, null, null, null, null, 55, null, 27],
    [12, 38, null, null, null, null, null, null, null, 46, 28],
    [13, null, null, 58, null, null, null, 60, null, null, 29],
    [14, 39, null, null, null, null, null, null, null, 47, 30],
    [15, null, 52, null, null, null, null, null, 56, null, 31],
    [16, 40, null, null, null, null, null, null, null, 48, 32],
  ];

  useEffect(() => {
    if (props.bracketId) {
      axios
        .get(`http://localhost:3000/filter_by_bracket/${props.bracketId}.json`)
        .then((response) => {
          setNewMatches(response.data);
        })
        .catch((error) => console.error("Fetching matches error:", error));
    }
  }, [props.bracketId]);

  const getMatchByGameId = (gameId) => {
    return newMatches.find((match) => match.game_matrix === gameId);
  };

  const handleSelectWinner = (matchId, teamId) => {
    console.log("Selecting winner for match", matchId, "Team ID:", teamId);
    axios
      .patch(`http://localhost:3000/matches/${matchId}.json`, { pick_team_id: teamId })
      .then(() => {
        const updatedMatches = newMatches.map((match) => {
          if (match.id === matchId) {
            return { ...match, pick_team_id: teamId };
          }
          return match;
        });
        setNewMatches(updatedMatches);
      })
      .catch((error) => console.error("Error updating match pick_team_id:", error));
  };

  // structure for dependencies using matrix games
  const gameDependencies = {
    33: [1, 2],
    34: [3, 4],
    35: [5, 6],
    36: [7, 8],
    37: [9, 10],
    38: [11, 12],
    39: [13, 14],
    40: [15, 16],
    41: [17, 18],
    42: [19, 20],
    43: [21, 22],
    44: [23, 24],
    45: [25, 26],
    46: [27, 28],
    47: [29, 30],
    48: [31, 32],
    49: [33, 34],
    50: [35, 36],
    51: [37, 38],
    52: [39, 40],
    53: [41, 42],
    54: [43, 44],
    55: [45, 46],
    56: [47, 48],
    57: [49, 50],
    58: [51, 52],
    59: [53, 54],
    60: [55, 56],
    61: [57, 58],
    62: [59, 60],
    63: [61, 62],
  };

  const getDependentTeamInfo = (gameId) => {
    let homeTeamId = null;
    let awayTeamId = null;

    // Check if this game has dependencies
    if (gameDependencies[gameId]) {
      const [homeDependentGameId, awayDependentGameId] = gameDependencies[gameId];
      const homeMatch = newMatches.find((match) => match.game_matrix === homeDependentGameId);
      const awayMatch = newMatches.find((match) => match.game_matrix === awayDependentGameId);
      homeTeamId = homeMatch?.pick_team_id;
      awayTeamId = awayMatch?.pick_team_id;
    } else {
      // Handle non-dependent games or games where dependencies aren't fulfilled
      const currentMatch = newMatches.find((match) => match.game_matrix === gameId);
      homeTeamId = currentMatch?.home_team_id ?? null;
      awayTeamId = currentMatch?.away_team_id ?? null;
    }

    const homeTeamName = getTeamNameById(homeTeamId);
    const awayTeamName = getTeamNameById(awayTeamId);

    return {
      homeTeamId,
      homeTeamName,
      awayTeamId,
      awayTeamName,
    };
  };

  const empty = {
    margin: "0",
    width: "80px",
    height: "20px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    paddingTop: "10px",
    paddingBottom: "10px",
    textAlign: "center",
  };

  const filled = {
    border: "1px solid #ddd",
    margin: "0",
    backgroundColor: "lightgrey",
    width: "80px",
    height: "20px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    textAlign: "center",
  };

  const displayBracket = processedBracket.map((row, rowIndex) => (
    <tr key={rowIndex}>
      {row.map((gameId, colIndex) => {
        if (gameId === null) {
          return <td key={colIndex} style={empty}></td>;
        } else {
          const match = getMatchByGameId(gameId);
          const { homeTeamId, homeTeamName, awayTeamId, awayTeamName } = getDependentTeamInfo(gameId);

          // Use the dynamic check for dependent games
          const isDependentGame = gameId in gameDependencies;

          const homeName = isDependentGame ? homeTeamName : match?.home_team;
          const awayName = isDependentGame ? awayTeamName : match?.away_team;

          return (
            <td key={colIndex} style={filled}>
              <div>
                <div>
                  <button onClick={() => handleSelectWinner(match?.id, homeTeamId)}>{homeName}</button>
                </div>
                <div>
                  <button onClick={() => handleSelectWinner(match?.id, awayTeamId)}>{awayName}</button>
                </div>
              </div>
            </td>
          );
        }
      })}
    </tr>
  ));

  return (
    <div>
      <h1>Match Selection</h1>
      <h2>Picks are saved on click</h2>
      <h3>go home to exit page</h3>
      <table>
        <tbody>{displayBracket}</tbody>
      </table>
    </div>
  );
}
