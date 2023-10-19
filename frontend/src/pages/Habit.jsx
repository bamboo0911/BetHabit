import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Input, Button } from "@material-tailwind/react";
import Flatpickr from "react-flatpickr";
import useAddHabit from "../hooks/habit/useAddHabit";
import useHabit from "../hooks/habit/useHabits";
import useAddUser from "../hooks/habit/useAddUser";

export default function Habit() {
  const { user } = useUser();
  const [userName, setUserName] = useState("");
  const { trigger: addUser } = useAddUser();

  const handleAddUser = async () => {
    await addUser({ userName });
    setUserName("");
  };

  const [habitTitle, setHabitTitle] = useState("");
  const [dueDate, setDueDate] = useState({});
  const [stake, setStake] = useState(0);
  const [betPartner, setBetPartner] = useState("");

  const { trigger: addHabit } = useAddHabit();

  const handleAddHabit = async () => {
    const stakeInt = parseInt(stake, 10);
    await addHabit({
      dueDate: new Date(dueDate),
      habitTitle,
      stake: stakeInt,
      betPartner,
    });
    setHabitTitle("");
    setDueDate({});
    setStake("");
    setBetPartner("");
  };

  const data = useHabit();
  useEffect(() => {}, [data]);

  return (
    <>
      {/* 登入後會有userid */}
      <h1 className="my-3">This is user's id: {user.id}</h1>
      <div className="my-3">
        <div className="my-3">User Name</div>
        <Input
          type="text"
          placeholder="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <Button className="my-3" onClick={handleAddUser}>
          Add user
        </Button>
      </div>
      <hr />
      <div>
        <div>
          <div className="my-3">Habit Title</div>
          <Input
            type="text"
            placeholder="Habit Title"
            value={habitTitle}
            onChange={(e) => setHabitTitle(e.target.value)}
          />
        </div>
        <div>
          <div className="my-3">Bet Stake</div>
          <Input
            type="text"
            placeholder="Bet Stake"
            value={stake}
            onChange={(e) => setStake(e.target.value)}
          />
        </div>
        <div>
          <div className="my-3">Bet Partner</div>
          <Input
            type="text"
            placeholder="Bet Partner"
            value={betPartner}
            onChange={(e) => setBetPartner(e.target.value)}
          />
        </div>
        <div>
          <div className="my-3">Habit Due Date</div>
          <Flatpickr
            value={dueDate}
            options={{
              dateFormat: "Y-m-d",
              minDate: new Date().fp_incr(1), // tomorrow
            }}
            onChange={(date) => {
              setDueDate(date[0]);
            }}
          />
        </div>
        <Button className="my-3" onClick={handleAddHabit}>
          submit
        </Button>
        <hr />
        <div>
          {data?.map((item) => (
            <div key={item.id}>
              <div>{item.habitTitle}</div>
              <div>Due Date: {item.dueDate.slice(0, 10)}</div>
              <Button>{item.status}</Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
