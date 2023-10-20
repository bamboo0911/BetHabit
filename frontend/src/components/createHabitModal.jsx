import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";
import useAddHabit from "../hooks/habit/useAddHabit";

export default function DialogWithForm({ open, handleOpen }) {
  const [next, setNext] = useState(false);
  const handleNext = () => {
    setNext(!next);
  };

  const [habitTitle, setHabitTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
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
    setDueDate("");
    setStake("");
    setBetPartner("");
    handleOpen();
  };

  useEffect(() => {
    if (!open) {
      setNext(false);
      setHabitTitle("");
      setDueDate("");
      setStake("");
      setBetPartner("");
    }
  }, [open]);

  return (
    <>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
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

            <Typography variant="h4" color="blue-gray">
              {next ? "Create Bet" : "Create Your Habit"}
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              {next
                ? "Enter who you want to bet with and the stake."
                : "Enter the habit you want to create and the due date."}
            </Typography>
            <Typography className="-mb-2" variant="h6">
              {next ? "Bet Partner" : "Habit Title"}
            </Typography>
            <Input
              label={next ? "Bet Partner" : "Habit Title"}
              size="lg"
              value={next ? betPartner : habitTitle}
              onChange={(e) =>
                next
                  ? setBetPartner(e.target.value)
                  : setHabitTitle(e.target.value)
              }
            />
            <Typography className="-mb-2" variant="h6">
              {next ? "Stake" : "Due Date"}
            </Typography>
            {next ? (
              <Input
                label="stake"
                size="lg"
                value={stake}
                onChange={(e) => setStake(e.target.value)}
              />
            ) : (
              <input
                type="date"
                name="dueDate"
                className="w-full border rounded"
                placeholder="What’s the date?"
                min={new Date().fp_incr(1).toISOString().split("T")[0]}
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            )}
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              onClick={next ? handleAddHabit : handleNext}
              fullWidth
            >
              {next ? "Create!" : "Next"}
            </Button>
            <Typography variant="small" className="mt-4 flex justify-center">
              {next ? "Let go and create habits!" : "Next, plan your bet!"}
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
