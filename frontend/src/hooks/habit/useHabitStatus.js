import useSWRPut from "../useSWRPut";

export default (habitId) => {
  // For test purposes
  // const apiUrl = `http://localhost:3000/api/habit/getstatus/${habitId}`;
  const apiUrl = `https://bet-habit-backend.vercel.app/api/habit/getstatus/${habitId}`;

  const { data, trigger, isMutating } = useSWRPut(apiUrl); // 發送 PUT 請求

  return { result: data && data, trigger, isMutating };
};
