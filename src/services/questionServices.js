import { URL } from "../lib/constants";

export const get = async (q = "?amount=5") => {
  const res = await fetch(`${URL}/${q}`);
  return res.json();
};
