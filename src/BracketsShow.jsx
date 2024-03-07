export function BracketsShow(props) {
  return (
    <div>
      <h1>Bracket Information</h1>
      <h2>{}</h2>
      {props.matches.map((match) => (
        <div key={match.id}>
          <p>{match.pick_team_id}</p>
          <p></p>
        </div>
      ))}
    </div>
  );
}
