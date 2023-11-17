import { useUser } from "@clerk/clerk-react";
import useSWRFetch from "../useSWRFetch";

export default () => {
  const { user } = useUser();

  // For test purposes
  // const apiUrl = `http://localhost:3000/api/habit/${user.id}`;
  const apiUrl = `https://bet-habit-backend.vercel.app/api/habit/${user.id}`;

  const { data } = useSWRFetch(apiUrl); // 發送 GET 請求

  return data;
};
