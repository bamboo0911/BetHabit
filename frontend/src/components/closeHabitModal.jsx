import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

export default function DialogWithForm({
  open,
  handleOpen,
  closedHabit,
  isMutating,
}) {
  // const {result, betPartner, userName, stake} = closedHabit;
  const [winner, setWinner] = useState("");
  const [loser, setLoser] = useState("");
  const [stake, setStake] = useState(0);

  useEffect(() => {
    if (closedHabit && Object.keys(closedHabit).length !== 0 && !open)
      window.location.reload();
  }, [open]);

  useEffect(() => {
    if (closedHabit && Object.keys(closedHabit).length !== 0 && open) {
      closedHabit.result === "win"
        ? (setWinner(closedHabit.userName), setLoser(closedHabit.betPartner))
        : (setWinner(closedHabit.betPartner), setLoser(closedHabit.userName));
      setStake(closedHabit.stake);
    }
  }, [closedHabit]);
  return (
    <>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
        isLoaded={isMutating && !closedHabit}
      >
        {closedHabit && (
          <Card className="mx-auto w-full max-w-[24rem]">
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" color="blue-gray">
                Who won?
              </Typography>
              <Typography className="-mb-2" variant="h6">
                Winner: {winner}
              </Typography>
              <Typography className="-mb-2" variant="h6">
                Loser: {loser}
              </Typography>
              <Typography
                className="mb-3 font-normal"
                variant="paragraph"
                color="gray"
              >
                {winner} won {stake} SaySayCoin from {loser}!
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" fullWidth onClick={handleOpen}>
                {closedHabit.result === "win"
                  ? `${closedHabit.userName} is no longer a SaySayMonster`
                  : `${closedHabit.userName} is definitely a SaySayMonster`}
              </Button>
            </CardFooter>
          </Card>
        )}
      </Dialog>
    </>
  );
}
