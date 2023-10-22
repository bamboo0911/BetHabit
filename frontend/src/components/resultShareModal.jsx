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
  sharedHabit,
  isMutating,
}) {
  const [winner, setWinner] = useState("");
  const [loser, setLoser] = useState("");
  const [stake, setStake] = useState(0);
  const [finishedRate, setFinishedRate] = useState(0);

  useEffect(() => {
    if (sharedHabit && Object.keys(sharedHabit).length !== 0 && open) {
      sharedHabit.result === "win"
        ? (setWinner(sharedHabit.userName), setLoser(sharedHabit.betPartner))
        : (setWinner(sharedHabit.betPartner), setLoser(sharedHabit.userName));
      setStake(sharedHabit.stake);
      console.log(sharedHabit.finishedRate);
    }
  }, [sharedHabit]);
  return (
    <>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
        isLoaded={isMutating && !sharedHabit}
      >
        {sharedHabit && (
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
                {sharedHabit.result === "win"
                  ? `${sharedHabit.userName} is no longer a SaySayMonster`
                  : `${sharedHabit.userName} is definitely a SaySayMonster`}
              </Button>
  
            </CardFooter>
          </Card>
        )}
      </Dialog>
    </>
  );
}
