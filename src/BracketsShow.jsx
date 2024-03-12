/* eslint-disable react/prop-types */
// export function BracketsShow(props) {
//   return (
//     <div>
//       <h1>Bracket Information</h1>
//       {props.matches.map((match) => (
//         <div key={match.id}>
//           <p>game:{match.game_id} </p>
//           {/* conditional rendering, if home team = pick team, then bold home team, otherwise show regular */}
//           <p>
//             {match.home_team === match.pick_team_id ? <strong>{match.home_team}</strong> : match.home_team} vs.
//             {match.away_team === match.pick_team_id ? <strong>{match.away_team}</strong> : match.away_team}
//           </p>
//           <p>My pick: {match.pick_team_id}</p>
//           <p>
//             Winner:
//             {match.winner_team_id === match.pick_team_id ? (
//               <strong>{match.winner_team_id}</strong>
//             ) : (
//               match.winner_team_id
//             )}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }

export function BracketsShow(props) {
  // dummy table, numbers match to game_id
  const processedBracket = [
    [5, null, null, null, null, null, null, null, null, null, 21],
    [6, 37, null, null, null, null, null, null, null, 45, 22],
    [7, null, 53, null, null, null, null, null, 57, null, 23],
    [8, 38, null, null, null, null, null, null, null, 46, 24],
    [9, null, null, 61, null, null, null, 63, null, null, 25],
    [10, 39, null, null, null, null, null, null, null, 47, 26],
    [11, null, 54, null, null, null, null, null, 58, null, 27],
    [12, 40, null, null, null, null, null, null, null, 48, 28],
    [13, null, null, null, 65, 67, 66, null, null, null, 29],
    [14, 41, null, null, null, null, null, null, null, 49, 30],
    [15, null, 55, null, null, null, null, null, 59, null, 31],
    [16, 42, null, null, null, null, null, null, null, 50, 32],
    [17, null, null, 62, null, null, null, 64, null, null, 33],
    [18, 43, null, null, null, null, null, null, null, 51, 34],
    [19, null, 56, null, null, null, null, null, 60, null, 35],
    [20, 44, null, null, null, null, null, null, null, 52, 36],
  ];

  //matches game_id int from dummy table and connects to match.game_id object
  const getMatchByGameId = (gameId) => {
    return props.matches.find((match) => match.game_id === gameId);
  };

  //basic styling around each table data box, totally temporary
  const tdStyle = {
    border: "1px solid black",
    padding: "10px",
    textAlign: "center",
  };
  //basic styling for underlining the winner
  const winnerStyle = {
    textDecoration: "underline",
  };

  return (
    <div>
      <h1>Bracket Information</h1>
      <h3>Bracket Key:</h3>
      <h4>Bold is your pick</h4>
      <h4>Underline is the winner</h4>
      <table>
        <tbody>
          {/* iterates over each row */}
          {processedBracket.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {/* iterates over each thing in row */}
              {row.map((gameId, colIndex) => (
                // creates the box for each data value
                <td
                  key={`${rowIndex}-${colIndex}`}
                  style={gameId ? tdStyle : {}} // Apply tdStyle only if gameId exists
                >
                  {" "}
                  {/* if gameid exists in dummy table it'll show up here */}
                  {gameId ? `Game ID: ${gameId}` : ""}
                  {/* if gameid exists and can be connected to object properly */}
                  {gameId && getMatchByGameId(gameId) && (
                    <div>
                      <p
                        style={
                          getMatchByGameId(gameId).winner_team_id === getMatchByGameId(gameId).home_team
                            ? winnerStyle
                            : {}
                        }
                      >
                        Home:
                        {getMatchByGameId(gameId).home_team === getMatchByGameId(gameId).pick_team_id ? (
                          <strong>{getMatchByGameId(gameId).home_team}</strong>
                        ) : (
                          getMatchByGameId(gameId).home_team
                        )}
                      </p>
                      <p
                        style={
                          getMatchByGameId(gameId).winner_team_id === getMatchByGameId(gameId).away_team
                            ? winnerStyle
                            : {}
                        }
                      >
                        Away:
                        {getMatchByGameId(gameId).away_team === getMatchByGameId(gameId).pick_team_id ? (
                          <strong>{getMatchByGameId(gameId).away_team}</strong>
                        ) : (
                          getMatchByGameId(gameId).away_team
                        )}
                      </p>
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {props.matches.map((match) => (
        <div key={match.id}>
          <p>game: {match.game_id}</p>
          <p>
            {match.home_team === match.pick_team_id ? <strong>{match.home_team}</strong> : match.home_team} vs.
            {match.away_team === match.pick_team_id ? <strong>{match.away_team}</strong> : match.away_team}
          </p>
          <p>My pick: {match.pick_team_id}</p>
          <p>
            Winner:
            {match.winner_team_id === match.pick_team_id ? (
              <strong>{match.winner_team_id}</strong>
            ) : (
              match.winner_team_id
            )}
          </p>
        </div>
      ))}
    </div>
  );
}
