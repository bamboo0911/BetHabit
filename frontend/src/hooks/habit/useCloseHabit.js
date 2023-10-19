import useSWRPut from "../useSWRPut";

export default (habitId) => {
  const apiUrl = `http://localhost:3000/api/habit/closehabit/${habitId}`;

  const { data, trigger, isMutating } = useSWRPut(apiUrl); // 發送 PUT 請求

  return { result: data && data.message, trigger, isMutating };
};
