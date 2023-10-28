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

            <Typography variant="h3" color="blue-gray">
              {next ? "確認打賭內容" : "建立你的習慣"}
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              {next
                ? "輸入打賭的對象以及賭注大小"
                : "輸入習慣的名稱以及到期日"}
            </Typography>
            <Typography className="-mb-2" variant="h6">
              {next ? "打賭的對象" : "習慣名稱"}
            </Typography>
            <Input
              label={next ? "想跟誰打賭？" : "想養成什麼習慣呢？"}
              size="lg"
              value={next ? betPartner : habitTitle}
              onChange={(e) =>
                next
                  ? setBetPartner(e.target.value)
                  : setHabitTitle(e.target.value)
              }
            />
            <Typography className="-mb-2" variant="h6">
              {next ? "賭注大小" : "到期日"}
            </Typography>
            {next ? (
              <Input
                label="要賭多少呢？"
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
          <CardFooter className="pt-0" >
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
              {next ? "下好離手，開賭啦～" : "" }
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
