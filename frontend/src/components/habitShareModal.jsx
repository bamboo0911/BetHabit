import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Dialog,
} from "@material-tailwind/react";
import FooterWithSocialLinks from "./shareFooter";
import DownloadButton from "./downloadPic";
import User1 from "../images/cutecat.jpg";
import User2 from "../images/yawningcat.jpg";

export default function DialogWithForm({
  open,
  handleOpen,
  sharedHabit,
  isMutating,
}) {
  const [habitTitle, setHabitTitle] = useState("");
  const [betPartner, setBetPartner] = useState("");
  const [userName, setUserName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [finishedRate, setFinishedRate] = useState("");
  const [winner, setWinner] = useState("");
  const [loser, setLoser] = useState("");
  const [stake, setStake] = useState(0);
  const [isImage, setIsImage] = useState(false);

  useEffect(() => {
    if (sharedHabit && Object.keys(sharedHabit).length !== 0 && open) {
      const { habitTitle, betPartner, userName, dueDate, finishedRate, stake } =
        sharedHabit;
      setHabitTitle(habitTitle);
      setBetPartner(betPartner);
      setUserName(userName);
      setDueDate(dueDate);
      setFinishedRate(finishedRate);
      setStake(stake);
    }
  }, [sharedHabit, open]);

  useEffect(() => {
    if (sharedHabit && Object.keys(sharedHabit).length !== 0 && !open) {
      setIsImage(false);
    }
  }, [sharedHabit, open]);

  const firstTenChars = dueDate.substring(0, 10);

  return (
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
          style={{ backgroundColor: "#fce6d4" }}
        >
          <CardBody id="Share" className="flex flex-col gap-3">
            {!isImage && (
              <>
                <div className="text-center m-2">
                  <Typography variant="h5" style={{ color: "#263238" }}>
                    BetHabit
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
                    <Typography variant="h5" style={{ color: "#01579b" }}>
                      {userName}
                    </Typography>
                    <Avatar
                      style={{ borderColor: "#01579b" }}
                      size="xxl"
                      variant="circular"
                      alt="Winner"
                      className="border-3 hover:z-30 focus:z-30 m-2"
                      src={User1}
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
                      {betPartner}
                    </Typography>
                    <Avatar
                      style={{ borderColor: "#01579b" }}
                      size="xxl"
                      variant="circular"
                      alt="Loser"
                      className="border-3 border-white hover:z-10 focus:z-10 m-2"
                      src={User2}
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
                      {userName} 和 {betPartner} 賭了
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
                      className="p-2 my-3"
                      variant="h5"
                      style={{ color: "#263238", fontFamily: "Monsterrat" }}
                    >
                      到期日： {firstTenChars}
                    </Typography>
                  </>
                </div>
              </>
            )}
          </CardBody>
          <DownloadButton isImage={isImage} setIsImage={setIsImage} />
          <FooterWithSocialLinks isImage={isImage} setIsImage={setIsImage} />
        </Card>
      )}
    </Dialog>
  );
}
