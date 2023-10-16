import { useUser } from "@clerk/clerk-react";
import useSWRFetch from "../useSWRFetch";

export default () => {
  const { user } = useUser();

  const apiUrl = `http://localhost:3000/habit/${user.id}`;

  const { data } = useSWRFetch(apiUrl); // 發送 GET 請求

  return data;
};
