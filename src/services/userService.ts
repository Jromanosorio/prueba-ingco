import type { User } from "../models/User";

const API_URL = "https://api.fake-rest.refine.dev/users";

export const getUsers = async (): Promise<User[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error fetching users");
  return res.json();
};
