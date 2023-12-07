import { PlusIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Spinner,
} from "@material-tailwind/react";
import useAddHabit from "../hooks/habit/useAddHabit";

export default function DialogWithForm({ open, handleOpen }) {
  const [next, setNext] = useState(false);
  const handleNext = () => {
    setNext(!next);
  };

  const [habitTitle, setHabitTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [bets, setBets] = useState([
    { betPartner: "", userStake: "", partnerStake: "" },
  ]);

  const { trigger: addHabit, isMutating } = useAddHabit();

  const addNewBet = () => {
    setBets([...bets, { betPartner: "", userStake: "", partnerStake: "" }]);
  };

  const updateBet = (index, field, value) => {
    const newBets = [...bets];
    newBets[index][field] = value;
    setBets(newBets);
  };

  const handleAddHabit = async () => {
    const isAnyFieldEmpty = bets.some(
      (bet) =>
        bet.betPartner === "" || bet.userStake === "" || bet.partnerStake === ""
    );
    if (isAnyFieldEmpty) {
      alert("請填寫所有欄位");
      return;
    }
    console.log(bets);
    await addHabit({
      dueDate,
      habitTitle,
      bets,
    });
    handleOpen();
  };

  useEffect(() => {
    if (!open) {
      setNext(false);
      setHabitTitle("");
      setDueDate("");
      setBets([{ betPartner: "", userStake: "", partnerStake: "" }]);
    }
  }, [open]);

  return (
    <>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none h-128 overflow-y-scroll"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            {next && (
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
                onClick={handleNext}
              >
                Back
              </Typography>
            )}

            <Typography variant="h3" color="blue-gray">
              {next ? "確認打賭內容" : "建立你的習慣"}
            </Typography>

            {!next ? (
              <>
                {/* Habit Title and Due Date Input */}
                <Input
                  label="想養成什麼習慣呢？"
                  size="lg"
                  value={habitTitle}
                  onChange={(e) => setHabitTitle(e.target.value)}
                />
                <Typography className="-mb-2" variant="h6">
                  到期日
                </Typography>
                <input
                  type="date"
                  name="dueDate"
                  className="w-full border rounded"
                  placeholder="What’s the date?"
                  min={new Date().toISOString().split("T")[0]}
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </>
            ) : (
              <>
                {/* Bets Input */}
                {bets.map((bet, index) => (
                  <>
                    <Typography className="-mb-2" variant="h6">
                      打賭 {index + 1}
                    </Typography>
                    <div key={index} className="flex flex-col gap-2">
                      <Input
                        label="打賭對象"
                        size="lg"
                        value={bet.betPartner}
                        onChange={(e) =>
                          updateBet(index, "betPartner", e.target.value)
                        }
                      />
                      <Input
                        label="你的賭注"
                        size="lg"
                        value={bet.userStake}
                        onChange={(e) =>
                          updateBet(index, "userStake", e.target.value)
                        }
                      />
                      <Input
                        label="對方的賭注"
                        size="lg"
                        value={bet.partnerStake}
                        onChange={(e) =>
                          updateBet(index, "partnerStake", e.target.value)
                        }
                      />
                    </div>
                  </>
                ))}
                {/* 新增賭注按鈕 */}
                <PlusIcon
                  className=" m-auto h-6 w-6 cursor-pointer  text-white rounded-full bg-orange-500 hover:bg-orange-600"
                  onClick={addNewBet}
                />
              </>
            )}
          </CardBody>
          <CardFooter className="pt-0">
            {isMutating ? (
              <div className=" flex justify-center">
                <Spinner className="h-10 w-10 text-gray-900/50" />
              </div>
            ) : (
              <Button
                color="deep-orange"
                variant="gradient"
                onClick={next ? handleAddHabit : handleNext}
                fullWidth
              >
                {next ? "建立！" : "下一步，建立賭注！"}
              </Button>
            )}

            <Typography variant="small" className="mt-4 flex justify-center">
              {next ? "下好離手，開賭啦～" : ""}
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
