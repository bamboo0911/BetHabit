import useSWRPut from "../useSWRPut";

export default (habitId) => {
  // For test purposes
  // const apiUrl = `http://localhost:3000/api/habit/dailycheck/${habitId}`;
  const apiUrl = `https://bet-habit-backend.vercel.app/api/habit/dailycheck/${habitId}`;

  const { trigger } = useSWRPut(apiUrl); // 發送 PUT 請求

  return { trigger };
};
