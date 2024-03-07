export function BracketsShow(props) {
  return (
    <div>
      <h1>Bracket Information</h1>
      {props.matches.map((match) => (
        <div key={match.id}>
          <p>{match.pick_team_id}</p>
        </div>
      ))}
    </div>
  );
}
