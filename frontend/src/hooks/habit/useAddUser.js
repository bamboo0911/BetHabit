import { useUser } from "@clerk/clerk-react";
import useSWRPost from "../useSWRPost";

export default () => {
  const { user } = useUser();
  // For test purposes
  // const apiUrl = `http://localhost:3000/api/user/${user.id}`;
  const apiUrl = `https://bet-habit-backend.vercel.app/api/user/${user.id}`;

  const { trigger } = useSWRPost(apiUrl); // 發送 POST 請求

  return { trigger };
};
