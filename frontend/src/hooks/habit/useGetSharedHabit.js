import { useState, useEffect } from "react";
import useSWRFetch from "../useSWRFetch";

export default function useGetSharedHabit(habitId) {
  const [apiUrl, setApiUrl] = useState("");

  useEffect(() => {
    if (habitId !== "") {
      // For test purposes
      // setApiUrl(`http://localhost:3000/api/habit/share/${habitId}`);
      setApiUrl(
        `https://bet-habit-backend.vercel.app/api/habit/share/${habitId}`
      );
    }
  }, [habitId]);

  const { data, isLoading } = useSWRFetch(apiUrl);

  // 如果 habitId 是空的，則不進行請求，直接返回 null 和 false
  if (habitId === "") {
    return { data: null, isLoading: false };
  }
  const sharedHabit = data;
  return { sharedHabit, isLoading };
}
