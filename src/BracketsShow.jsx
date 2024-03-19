/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";

const LargeScreenComponent = ({ matches }) => {
  // processedBracket defined here if it's only relevant to LargeScreenComponent
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

  //matches game_id int from dummy table and connects to match.game_id object
  const getMatchByGameId = (gameId) => {
    return matches.find((match) => match.game_matrix === gameId);
  };

  //basic styling around each table data box, totally temporary
  // const tdStyle = {
  //   border: "1px solid black",
  //   padding: "10px",
  //   textAlign: "center",
  // };

  //basic styling for underlining the winner
  const winnerStyle = {
    textDecoration: "underline",
    margin: "0",
    backgroundColor: "lightgrey",
    width: "80px",
    height: "20px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    border: "1px solid grey",
  };

  const notWinnerStyle = {
    margin: "0",
    backgroundColor: "lightgrey",
    width: "80px",
    height: "20px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    border: "1px solid grey",
  };

  // const tdRef = useRef();
  // const [transformStyle, setTransformStyle] = useState({});

  // useEffect(() => {
  //   if (tdRef) {
  //     setTransformStyle({
  //       transform: `translateY(-${tdRef.current.clientHeight / 2}px)`,
  //  </div>   });
  //   }
  // }, []);

  // const tdstyle2 = {
  //   border: "1px solid black",
  //   textAlign: "center",
  //   transform: `translateY(-${tdRef.current.clientHeight / 2}px)`,
  // };

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Set the mounted state to true after component mounts
  }, []);

  // move the games up by half of the height of the td element to create bracket shape
  const dynamicTdStyle = isMounted ? { transform: "translateY(-50%)" } : {};

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
              {row.map((gameId, colIndex) => {
                // Skip rendering the td element when colIndex is 4
                // if (colIndex > 2 && rowIndex > 3) {
                //   return null;
                // }
                return (
                  // creates the box for each data value
                  <td
                    key={`${rowIndex}-${colIndex}`}
                    style={{
                      ...(gameId > 32 ? { ...dynamicTdStyle } : {}),
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      textAlign: "center",
                    }}
                  >
                    {/* if gameid exists and can be connected to object properly */}
                    {gameId && getMatchByGameId(gameId) && (
                      <div>
                        <p
                          style={
                            getMatchByGameId(gameId).winner_team_id === getMatchByGameId(gameId).home_team
                              ? winnerStyle
                              : notWinnerStyle
                          }
                        >
                          {/* Home:&nbsp; */}
                          {getMatchByGameId(gameId).home_team === getMatchByGameId(gameId).pick_team_id ? (
                            <strong>{getMatchByGameId(gameId).home_team}</strong>
                          ) : (
                            getMatchByGameId(gameId).home_team
                          )}
                        </p>{" "}
                        <p
                          style={
                            getMatchByGameId(gameId).winner_team_id === getMatchByGameId(gameId).away_team
                              ? winnerStyle
                              : notWinnerStyle
                          }
                        >
                          {/* Away:&nbsp; */}
                          {getMatchByGameId(gameId).away_team === getMatchByGameId(gameId).pick_team_id ? (
                            <strong>{getMatchByGameId(gameId).away_team}</strong>
                          ) : (
                            getMatchByGameId(gameId).away_team
                          )}
                        </p>
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const SmallScreenComponent = ({ matches }) => {
  const processedBracketSouth = [
    [1, null, null, null, null],
    [2, 33, null, null, null],
    [3, null, 49, null, null],
    [4, 34, null, null, null],
    [5, null, null, 57, null],
    [6, 35, null, null, null],
    [7, null, 50, null, null],
    [8, 36, null, null, null],
  ];
  const processedBracketEast = [
    [9, null, null, null, null],
    [10, 37, null, null, null],
    [11, null, 51, null, null],
    [12, 38, null, null, null],
    [13, null, null, 58, null],
    [14, 39, null, null, null],
    [15, null, 52, null, null],
    [16, 40, null, null, null],
  ];

  const processedBracketMidwest = [
    [null, null, null, null, 17],
    [null, null, null, 41, 18],
    [null, null, 53, null, 19],
    [null, null, null, 42, 20],
    [null, 59, null, null, 21],
    [null, null, null, 43, 22],
    [null, null, 54, null, 23],
    [null, null, null, 44, 24],
  ];

  const processedBracketWest = [
    [null, null, null, null, 25],
    [null, null, null, 45, 26],
    [null, null, 55, null, 27],
    [null, null, null, 46, 28],
    [null, 60, null, null, 29],
    [null, null, null, 47, 30],
    [null, null, 56, null, 31],
    [null, null, null, 48, 32],
  ];

  const processedEight = [
    [57, null, null, null, 59],
    [58, null, null, null, 60],
  ];

  const processedFour = [
    [null, 61, null, 62, null],
    [null, null, 63, null, null],
  ];

  //matches game_id int from dummy table and connects to match.game_id object
  const getMatchByGameId = (gameId) => {
    return matches.find((match) => match.game_matrix === gameId);
  };

  //basic styling around each table data box, totally temporary
  // const tdStyle = {
  //   border: "1px solid black",
  //   padding: "10px",
  //   textAlign: "center",
  // };

  //basic styling for underlining the winner
  const winnerStyle = {
    textDecoration: "underline",
    margin: "0",
    backgroundColor: "lightgrey",
    width: "100px",
    height: "20px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    border: "1px solid grey",
  };

  const notWinnerStyle = {
    margin: "0",
    backgroundColor: "lightgrey",
    width: "100px",
    height: "20px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    border: "1px solid grey",
  };

  // const tdRef = useRef();
  // const [transformStyle, setTransformStyle] = useState({});

  // useEffect(() => {
  //   if (tdRef) {
  //     setTransformStyle({
  //       transform: `translateY(-${tdRef.current.clientHeight / 2}px)`,
  //  </div>   });
  //   }
  // }, []);

  // const tdstyle2 = {
  //   border: "1px solid black",
  //   textAlign: "center",
  //   transform: `translateY(-${tdRef.current.clientHeight / 2}px)`,
  // };

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Set the mounted state to true after component mounts
  }, []);

  // move the games up by half of the height of the td element to create bracket shape
  const dynamicTdStyle = isMounted ? { transform: "translateY(-50%)" } : {};

  return (
    <div>
      <h1>Bracket Information</h1>
      <h3>Bracket Key:</h3>
      <h4>Bold is your pick</h4>
      <h4>Underline is the winner</h4>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>South</div>
      <table style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <tbody>
          {/* iterates over each row */}
          {processedBracketSouth.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {/* iterates over each thing in row */}
              {row.map((gameId, colIndex) => {
                // Skip rendering the td element when colIndex is 4
                // if (colIndex > 2 && rowIndex > 3) {
                //   return null;
                // }
                return (
                  // creates the box for each data value
                  <td
                    key={`${rowIndex}-${colIndex}`}
                    style={{
                      ...(gameId > 32 ? { ...dynamicTdStyle } : {}),
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      textAlign: "center",
                    }}
                  >
                    {/* if gameid exists and can be connected to object properly */}
                    {gameId && getMatchByGameId(gameId) && (
                      <div>
                        <p
                          style={
                            getMatchByGameId(gameId).winner_team_id === getMatchByGameId(gameId).home_team
                              ? winnerStyle
                              : notWinnerStyle
                          }
                        >
                          {/* Home:&nbsp; */}
                          {getMatchByGameId(gameId).home_team === getMatchByGameId(gameId).pick_team_id ? (
                            <strong>{getMatchByGameId(gameId).home_team}</strong>
                          ) : (
                            getMatchByGameId(gameId).home_team
                          )}
                        </p>{" "}
                        <p
                          style={
                            getMatchByGameId(gameId).winner_team_id === getMatchByGameId(gameId).away_team
                              ? winnerStyle
                              : notWinnerStyle
                          }
                        >
                          {/* Away:&nbsp; */}
                          {getMatchByGameId(gameId).away_team === getMatchByGameId(gameId).pick_team_id ? (
                            <strong>{getMatchByGameId(gameId).away_team}</strong>
                          ) : (
                            getMatchByGameId(gameId).away_team
                          )}
                        </p>
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>East</div>
      <table style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <tbody>
          {/* iterates over each row */}
          {processedBracketEast.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {/* iterates over each thing in row */}
              {row.map((gameId, colIndex) => {
                // Skip rendering the td element when colIndex is 4
                // if (colIndex > 2 && rowIndex > 3) {
                //   return null;
                // }
                return (
                  // creates the box for each data value
                  <td
                    key={`${rowIndex}-${colIndex}`}
                    style={{
                      ...(gameId > 32 ? { ...dynamicTdStyle } : {}),
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      textAlign: "center",
                    }}
                  >
                    {/* if gameid exists and can be connected to object properly */}
                    {gameId && getMatchByGameId(gameId) && (
                      <div>
                        <p
                          style={
                            getMatchByGameId(gameId).winner_team_id === getMatchByGameId(gameId).home_team
                              ? winnerStyle
                              : notWinnerStyle
                          }
                        >
                          {/* Home:&nbsp; */}
                          {getMatchByGameId(gameId).home_team === getMatchByGameId(gameId).pick_team_id ? (
                            <strong>{getMatchByGameId(gameId).home_team}</strong>
                          ) : (
                            getMatchByGameId(gameId).home_team
                          )}
                        </p>{" "}
                        <p
                          style={
                            getMatchByGameId(gameId).winner_team_id === getMatchByGameId(gameId).away_team
                              ? winnerStyle
                              : notWinnerStyle
                          }
                        >
                          {/* Away:&nbsp; */}
                          {getMatchByGameId(gameId).away_team === getMatchByGameId(gameId).pick_team_id ? (
                            <strong>{getMatchByGameId(gameId).away_team}</strong>
                          ) : (
                            getMatchByGameId(gameId).away_team
                          )}
                        </p>
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>Midwest</div>
      <table style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <tbody>
          {/* iterates over each row */}
          {processedBracketMidwest.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {/* iterates over each thing in row */}
              {row.map((gameId, colIndex) => {
                // Skip rendering the td element when colIndex is 4
                // if (colIndex > 2 && rowIndex > 3) {
                //   return null;
                // }
                return (
                  // creates the box for each data value
                  <td
                    key={`${rowIndex}-${colIndex}`}
                    style={{
                      ...(gameId > 32 ? { ...dynamicTdStyle } : {}),
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      textAlign: "center",
                    }}
                  >
                    {/* if gameid exists and can be connected to object properly */}
                    {gameId && getMatchByGameId(gameId) && (
                      <div>
                        <p
                          style={
                            getMatchByGameId(gameId).winner_team_id === getMatchByGameId(gameId).home_team
                              ? winnerStyle
                              : notWinnerStyle
                          }
                        >
                          {/* Home:&nbsp; */}
                          {getMatchByGameId(gameId).home_team === getMatchByGameId(gameId).pick_team_id ? (
                            <strong>{getMatchByGameId(gameId).home_team}</strong>
                          ) : (
                            getMatchByGameId(gameId).home_team
                          )}
                        </p>{" "}
                        <p
                          style={
                            getMatchByGameId(gameId).winner_team_id === getMatchByGameId(gameId).away_team
                              ? winnerStyle
                              : notWinnerStyle
                          }
                        >
                          {/* Away:&nbsp; */}
                          {getMatchByGameId(gameId).away_team === getMatchByGameId(gameId).pick_team_id ? (
                            <strong>{getMatchByGameId(gameId).away_team}</strong>
                          ) : (
                            getMatchByGameId(gameId).away_team
                          )}
                        </p>
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>West</div>
      <table style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <tbody>
          {/* iterates over each row */}
          {processedBracketWest.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {/* iterates over each thing in row */}
              {row.map((gameId, colIndex) => {
                // Skip rendering the td element when colIndex is 4
                // if (colIndex > 2 && rowIndex > 3) {
                //   return null;
                // }
                return (
                  // creates the box for each data value
                  <td
                    key={`${rowIndex}-${colIndex}`}
                    style={{
                      ...(gameId > 32 ? { ...dynamicTdStyle } : {}),
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      textAlign: "center",
                    }}
                  >
                    {/* if gameid exists and can be connected to object properly */}
                    {gameId && getMatchByGameId(gameId) && (
                      <div>
                        <p
                          style={
                            getMatchByGameId(gameId).winner_team_id === getMatchByGameId(gameId).home_team
                              ? winnerStyle
                              : notWinnerStyle
                          }
                        >
                          {/* Home:&nbsp; */}
                          {getMatchByGameId(gameId).home_team === getMatchByGameId(gameId).pick_team_id ? (
                            <strong>{getMatchByGameId(gameId).home_team}</strong>
                          ) : (
                            getMatchByGameId(gameId).home_team
                          )}
                        </p>{" "}
                        <p
                          style={
                            getMatchByGameId(gameId).winner_team_id === getMatchByGameId(gameId).away_team
                              ? winnerStyle
                              : notWinnerStyle
                          }
                        >
                          {/* Away:&nbsp; */}
                          {getMatchByGameId(gameId).away_team === getMatchByGameId(gameId).pick_team_id ? (
                            <strong>{getMatchByGameId(gameId).away_team}</strong>
                          ) : (
                            getMatchByGameId(gameId).away_team
                          )}
                        </p>
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: "grid", placeItems: "center", rowGap: "30px" }}>
        <div>Elite Eight</div>
        <table>
          <tbody>
            {/* iterates over each row */}
            {processedEight.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {/* iterates over each thing in row */}
                {row.map((gameId, colIndex) => {
                  // Skip rendering the td element when colIndex is 4
                  // if (colIndex > 2 && rowIndex > 3) {
                  //   return null;
                  // }
                  return (
                    // creates the box for each data value
                    <td
                      key={`${rowIndex}-${colIndex}`}
                      style={{
                        ...(gameId > 32 ? { ...dynamicTdStyle } : {}),
                        paddingTop: "10px",
                        paddingBottom: "10px",
                        textAlign: "center",
                      }}
                    >
                      {/* if gameid exists and can be connected to object properly */}
                      {gameId && getMatchByGameId(gameId) && (
                        <div>
                          <p
                            style={
                              getMatchByGameId(gameId).winner_team_id === getMatchByGameId(gameId).home_team
                                ? winnerStyle
                                : notWinnerStyle
                            }
                          >
                            {/* Home:&nbsp; */}
                            {getMatchByGameId(gameId).home_team === getMatchByGameId(gameId).pick_team_id ? (
                              <strong>{getMatchByGameId(gameId).home_team}</strong>
                            ) : (
                              getMatchByGameId(gameId).home_team
                            )}
                          </p>{" "}
                          <p
                            style={
                              getMatchByGameId(gameId).winner_team_id === getMatchByGameId(gameId).away_team
                                ? winnerStyle
                                : notWinnerStyle
                            }
                          >
                            {/* Away:&nbsp; */}
                            {getMatchByGameId(gameId).away_team === getMatchByGameId(gameId).pick_team_id ? (
                              <strong>{getMatchByGameId(gameId).away_team}</strong>
                            ) : (
                              getMatchByGameId(gameId).away_team
                            )}
                          </p>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: "grid", placeItems: "center", rowGap: "30px" }}>
        <div>Final Four</div>
        <table>
          <tbody>
            {/* iterates over each row */}
            {processedFour.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {/* iterates over each thing in row */}
                {row.map((gameId, colIndex) => {
                  // Skip rendering the td element when colIndex is 4
                  // if (colIndex > 2 && rowIndex > 3) {
                  //   return null;
                  // }
                  return (
                    // creates the box for each data value
                    <td
                      key={`${rowIndex}-${colIndex}`}
                      style={{
                        ...(gameId > 32 ? { ...dynamicTdStyle } : {}),
                        paddingTop: "10px",
                        paddingBottom: "10px",
                        textAlign: "center",
                      }}
                    >
                      {/* if gameid exists and can be connected to object properly */}
                      {gameId && getMatchByGameId(gameId) && (
                        <div>
                          <p
                            style={
                              getMatchByGameId(gameId).winner_team_id === getMatchByGameId(gameId).home_team
                                ? winnerStyle
                                : notWinnerStyle
                            }
                          >
                            {/* Home:&nbsp; */}
                            {getMatchByGameId(gameId).home_team === getMatchByGameId(gameId).pick_team_id ? (
                              <strong>{getMatchByGameId(gameId).home_team}</strong>
                            ) : (
                              getMatchByGameId(gameId).home_team
                            )}
                          </p>{" "}
                          <p
                            style={
                              getMatchByGameId(gameId).winner_team_id === getMatchByGameId(gameId).away_team
                                ? winnerStyle
                                : notWinnerStyle
                            }
                          >
                            {/* Away:&nbsp; */}
                            {getMatchByGameId(gameId).away_team === getMatchByGameId(gameId).pick_team_id ? (
                              <strong>{getMatchByGameId(gameId).away_team}</strong>
                            ) : (
                              getMatchByGameId(gameId).away_team
                            )}
                          </p>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export function BracketsShow(props) {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 950);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 950);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isSmallScreen ? (
    <SmallScreenComponent matches={props.matches} />
  ) : (
    <LargeScreenComponent matches={props.matches} />
  );
}
