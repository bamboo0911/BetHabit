import { useState, useEffect } from "react";
import { Avatar } from "@material-tailwind/react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import FooterWithSocialLinks from "./shareFooter";
import Winner from "../images/IMG_3909.jpg"
import Loser from "../images/IMG_3863.jpg"

export default function DialogWithForm({
  open,
  handleOpen,
  sharedHabit,
  isMutating,
}) {
  const [winner, setWinner] = useState("");
  const [loser, setLoser] = useState("");
  const [stake, setStake] = useState(0);
  const [habitTitle, setHabitTitle] =useState("");
  const [finishedRate, setFinishedRate] = useState(0);
  const [isImage, setIsImage] = useState(false);

  useEffect(() => {
    if (sharedHabit && Object.keys(sharedHabit).length !== 0 && open) {
      sharedHabit.result === "win"
        ? (setWinner(sharedHabit.userName), setLoser(sharedHabit.betPartner))
        : (setWinner(sharedHabit.betPartner), setLoser(sharedHabit.userName));
      setStake(sharedHabit.stake);
      setFinishedRate(sharedHabit.finishedRate);
      console.log(sharedHabit);
      setHabitTitle(sharedHabit.habitTitle);
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
          <Card className="mx-auto w-full max-w-[24rem]" style={{ backgroundColor: "#fbe9e7"}}>
            <CardBody className="flex flex-col gap-4">
              <div className="text-center m-2">
                <Typography variant="h2" style={{ color: '#263238' }}>
                  Who won?
                </Typography>
              </div>
              <div className="text-center">
                <Typography variant="h3" style={{ color: '#263238', fontFamily:"Monsterrat" }}>
                  {habitTitle.toUpperCase()}
                </Typography>
              </div>
              <div className="flex justify-between m-2">
                <div>
                  <Typography variant="h5" style={{color:'#ad1457'}}>
                    Winner: {winner}
                  </Typography>
                  <Avatar 
                    style={{borderColor:'#ad1457'}}
                    size="xxl"
                    variant="circular"
                    alt="Winner"
                    className="border-3 hover:z-30 focus:z-30 m-2 "
                    src={Winner}
                  />
                </div>
                <div>
                  <Typography variant="h5" style={{color:'#01579b'}}>
                    Loser: {loser}
                  </Typography>
                  <Avatar
                    style={{borderColor:'#01579b'}}
                    size="xxl"
                    variant="circular"
                    alt="Loser"
                    className="border-3 border-white hover:z-10 focus:z-10 m-2"
                    src={Loser}
                  />
                </div>
              </div>
              <div className="text-center m-4">
                <Typography variant="h6" color="text-secondary" 
                style={{
                  fontStyle: 'italic',
                  border: '2px solid #fdd835',
                  padding: '10px',
                  borderRadius: '10px', // 添加边框角弧度
                  backgroundColor: 'rgba(253, 216, 53, 0.2)', // 添加背景色
                }}>
                {`$$  ${winner} won ${stake} SSD from ${loser}   $$`}   
                </Typography>
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              
            <Button variant="h5" fullWidth onClick={handleOpen} style={{ fontSize: '15px' }}>
              {sharedHabit.result === "win"
                ? `${sharedHabit.userName} is no longer a SaySayMonster`
                : `${sharedHabit.userName} is definitely a SaySayMonster`}
            </Button>
  
            </CardFooter>
            <FooterWithSocialLinks
              setIsImage={setIsImage}
            />
          </Card>
        )}
      </Dialog>
    </>
  );
}
