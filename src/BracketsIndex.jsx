export function BracketsIndex(props) {
  return (
    <div>
      <h1>All brackets</h1>
      {props.brackets.map((bracket) => (
        <div key={bracket.id}>
          <h2>{bracket.name}</h2>
          <p>{bracket.user_id}</p>
          <p>{bracket.total_points}</p>
        </div>
      ))}
    </div>
  );
}
