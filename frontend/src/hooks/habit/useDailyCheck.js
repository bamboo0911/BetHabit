import useSWRPut from "../useSWRPut";

export default (habitId) => {
  const apiUrl = `http://localhost:3000/api/habit/dailycheck/${habitId}`;

  const { trigger } = useSWRPut(apiUrl); // 發送 PUT 請求

  return { trigger };
};
