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
  const [stake, setStake] = useState(0);
  const [betPartner, setBetPartner] = useState("");

  const { trigger: addHabit, isMutating } = useAddHabit();

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
              {next ? "建立賭注" : "建立你的習慣"}
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              {next
                ? "輸入打賭夥伴、籌碼"
                : "輸入習慣名稱、到期日"}
            </Typography>
            <Typography className="-mb-2" variant="h6">
              {next ? "打賭夥伴" : "習慣名稱"}
            </Typography>
            <Input
              label={next ? "打賭夥伴" : "習慣名稱"}
              size="lg"
              value={next ? betPartner : habitTitle}
              onChange={(e) =>
                next
                  ? setBetPartner(e.target.value)
                  : setHabitTitle(e.target.value)
              }
            />
            <Typography className="-mb-2" variant="h6">
              {next ? "籌碼" : "到期日"}
            </Typography>
            {next ? (
              <Input
                label="籌碼"
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
            {isMutating ? (
              <div className=" flex justify-center">
                <Spinner className="h-10 w-10 text-gray-900/50" />
              </div>
            ) : (
              <Button
                variant="gradient"
                onClick={next ? handleAddHabit : handleNext}
                fullWidth
              >
                {next ? "建立!" : "下一步"}
              </Button>
            )}

            <Typography variant="small" className="mt-4 flex justify-center">
              {next ? "一起培養習慣吧" : "下一步 建立打賭"}
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
