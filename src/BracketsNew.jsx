export function BracketsNew(props) {
  const userid = localStorage.getItem("user_id");

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onCreateBracket(params, () => event.target.reset());
  };

  return (
    <div>
      <h1>Build a New Bracket</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="hidden" name="user_id" value={userid} />
        </div>
        <div>
          Name your bracket: <input name="name" type="text" />
        </div>
        <button type="submit">Create Bracket</button>
      </form>
    </div>
  );
}
