import { useUser } from "@clerk/clerk-react";
import useSWRPost from "../useSWRPost";

export default () => {
  const { user } = useUser();

  const apiUrl = `http://localhost:3000/habit/${user.id}`;

  const { trigger } = useSWRPost(apiUrl); // 發送 POST 請求

  return { trigger };
};
