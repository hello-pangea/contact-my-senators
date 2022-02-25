import { Senator } from "interfaces/senator";
import { get } from "./apiHelper";

export function fetchMembers() {
  return get<{
    results: {
      members: Senator[];
    }[];
  }>(`https://api.propublica.org/congress/v1/117/senate/members.json`);
}
