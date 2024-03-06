import { BracketsIndex } from "./BracketsIndex";

const brackets = [
  { id: 1, name: "Perfect Bracket", user: "perfect", total_points: 0 },
  { id: 2, name: "Alex's Bracket", user: "alex", total_points: 0 },
  { id: 3, name: "Emily's Bracket", user: "emily", total_points: 0 },
];

export function Content() {
  return (
    <div>
      <BracketsIndex brackets={brackets} />
    </div>
  );
}
