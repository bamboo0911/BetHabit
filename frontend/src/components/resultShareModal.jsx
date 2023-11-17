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
import DownloadButton from "./downloadPic";
import Winner from "../images/IMG_3909.jpg";
import Loser from "../images/IMG_3863.jpg";

export default function DialogWithForm({
  open,
  handleOpen,
  sharedHabit,
  isMutating,
}) {
  const [winner, setWinner] = useState("");
  const [loser, setLoser] = useState("");
  const [stake, setStake] = useState(0);
  const [habitTitle, setHabitTitle] = useState("");
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

  useEffect(() => {
    if (sharedHabit && Object.keys(sharedHabit).length !== 0 && !open)
      setIsImage(false);
  }, [open]);

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
          <Card
            className="mx-auto w-full max-w-[24rem]"
            style={{ backgroundColor: "#fce6d4" }} // ADD transform: "scale(0.8)" (?)
          >
            <CardBody id="Share" className="flex flex-col gap-3">
              {!isImage && (
                <>
                  <div className="text-center m-2">
                    <Typography variant="h5" style={{ color: "#263238" }}>
                      看看誰贏啦
                    </Typography>
                  </div>
                  <div className="text-center">
                    <Typography
                      variant="h2"
                      style={{ color: "#263238", fontFamily: "Monsterrat" }}
                    >
                      {habitTitle.toUpperCase()}
                    </Typography>
                  </div>
                  <div className="flex justify-between m-2">
                    <div
                      style={{
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h5" style={{ color: "#ad1457" }}>
                        贏家： {winner}
                      </Typography>
                      <Avatar
                        style={{ borderColor: "#ad1457" }}
                        size="xxl"
                        variant="circular"
                        alt="Winner"
                        className="border-3 hover:z-30 focus:z-30 m-2"
                        src={Winner}
                      />
                    </div>
                    <div
                      style={{
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h5" style={{ color: "#01579b" }}>
                        輸家： {loser}
                      </Typography>
                      <Avatar
                        style={{ borderColor: "#01579b" }}
                        size="xxl"
                        variant="circular"
                        alt="Loser"
                        className="border-3 border-white hover:z-10 focus:z-10 m-2"
                        src={Loser}
                      />
                    </div>
                  </div>
                  <div className="text-center m-0">
                    <>
                      <Typography
                        className="p-2"
                        variant="h5"
                        style={{ color: "#263238", fontFamily: "Monsterrat" }}
                      >
                        {winner} 贏走 {loser} 的
                      </Typography>
                      <Typography
                        variant="h5"
                        className="p-2 mx-auto w-1/2 rounded-lg"
                        style={{
                          backgroundColor: "rgba(260, 200, 45)", // 添加背景色
                          fontFamily: "Monsterrat",
                        }}
                      >
                        {stake} 枚說說幣
                      </Typography>
                      <Typography
                        className="p-2 my-5 font-bold"
                        variant="h4"
                        color="orange"
                        style={{ fontFamily: "Monsterrat" }}
                      >
                        {sharedHabit.result === "win"
                          ? `${sharedHabit.userName}  才不是說說怪！`
                          : `${sharedHabit.userName}  完全就是說說怪！`}
                      </Typography>
                    </>
                  </div>
                  {/* <div className="text-center m-0 pb-0">
                    <Typography
                      variant="h6"
                      color="text-secondary"
                      style={{
                        padding: "8px",
                        borderRadius: "10px", // 添加边框角弧度
                        //backgroundColor: "rgba(260, 200, 45)", // 添加背景色
                        fontFamily: "Monsterrat",
                        width: "auto",
                        marginLeft: "auto",
                        marginRight: "auto",
                        color: "#F06A0D",
                        fontSize: "18px",
                      }}
                    >
                      {`${winner} 贏走 ${loser} 的 ${stake} 枚說說幣！`}
                    </Typography>
                  </div> */}
                  {/* <Button
                    variant="h5 text"
                    onClick={false}
                    style={{
                      fontSize: "15px",
                    }}
                    ripple={false}
                    className="my-5 bg-slate-600 mx-auto w-3/4"
                  >
                    {sharedHabit.result === "win"
                      ? `${sharedHabit.userName}  才不是說說怪！`
                      : `${sharedHabit.userName}  完全就是說說怪！`}
                  </Button> */}
                </>
              )}
            </CardBody>
            <DownloadButton isImage={isImage} setIsImage={setIsImage} />
            <FooterWithSocialLinks isImage={isImage} setIsImage={setIsImage} />
          </Card>
        )}
      </Dialog>
    </>
  );
}
