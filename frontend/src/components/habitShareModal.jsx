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
import Footer from "./footer";

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
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <CardBody id="Share" className="flex flex-col gap-3">
            {!isImage && (
              <>
              {/* header */}
              <div className="mb-4 modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                <Typography variant="h5" className="font-medium leading-normal text-gray-800" id="exampleModalLabel">
                  查看賭注
                </Typography>
              </div>
              {/* content */}
                <div className="text-center">
                  <Typography variant="h4" className="font-black" style={{ color: "#F75928", fontFamily: "Roboto" }}>
                    NOSAYSAY
                  </Typography>
                </div>
                <div className="text-center ">
                  <Typography
                    variant="h4"
                    style={{ color: "#263238", fontFamily: "Monsterrat" }}>
                    {userName}正在養成
                    </Typography>
                    <Typography
                    variant="h2"
                    style={{ color: "#263238", fontFamily: "Monsterrat" }}>
                    {habitTitle}的習慣
                    {/* {habitTitle.toUpperCase()}*/}
                  </Typography>
                </div>
                <div className="text-center">
                  <>
                  <Typography
                      className="p-2 -mb-3"
                      variant="h5"
                      style={{ color: "#263238", fontFamily: "Monsterrat" }}
                    >
                      {userName}
                      </Typography>
                      <Typography
                      className="p-2"
                      variant="h6"
                      style={{fontFamily: "Monsterrat" }}
                    >
                      <span style={{ color: "#263238" }}>下注</span> <span style={{ color: "#F75928" }}>十杯十杯</span>
                      </Typography>
                      <Typography
                      className="p-2"
                      variant="h5"
                      style={{ color: "#FF0000", fontFamily: "Monsterrat" }}
                    >
                      V.S.
                      </Typography>
                      <Typography
                      className="p-2 -mb-3"
                      variant="h5"
                      style={{ color: "#263238", fontFamily: "Monsterrat" }}
                    >
                      {betPartner}
                      </Typography>
                      <Typography
                      className="p-2"
                      variant="h6"
                      style={{ color: "#263238", fontFamily: "Monsterrat" }}
                    >
                      <span style={{ color: "#263238" }}>下注</span> <span style={{ color: "#F75928" }}>一張 711 禮券</span>
                    </Typography>
                    <Typography
                      className="p-2 my-3"
                      variant="h6"
                      style={{ color: "#263238", fontFamily: "Monsterrat" }}
                    >
                      DUE： {firstTenChars}
                    </Typography>
                  </>
                </div>
              </>
            )}
          </CardBody>
          <Footer/>
          {/* 
          <DownloadButton isImage={isImage} setIsImage={setIsImage} />
          <FooterWithSocialLinks isImage={isImage} setIsImage={setIsImage} />
          */}
        </Card>
      )}
    </Dialog>
  );
}
