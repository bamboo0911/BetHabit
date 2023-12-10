import { useState, useEffect } from "react";
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

export default function DialogWithForm({
  open,
  handleOpen,
  sharedHabit,
  isLoading,
}) {
  const [isImage, setIsImage] = useState(false);

  useEffect(() => {
    if (sharedHabit && Object.keys(sharedHabit).length !== 0 && !open)
      setIsImage(false);
  }, [open]);

  return (
    <Dialog
      size="xs"
      open={open}
      handler={handleOpen}
      className="bg-transparent shadow-none"
      isLoaded={isLoading && !sharedHabit}
      FooterWithSocialLinks 
    >
      <Card
        className="mx-auto w-full max-w-[24rem]"
        style={{ backgroundColor: "#fce6d4" }}
      >
        <CardBody id="Share" className="flex flex-col gap-3">
          {!isImage && (
            <>
              <div className="text-center m-2">
                <Typography variant="h5" style={{ color: "#263238" }}>
                  NOSAYSAY
                </Typography>
              </div>
              <div className="text-center">
                <Typography
                  variant="h2"
                  style={{ color: "#263238", fontFamily: "Monsterrat" }}
                >
                  {sharedHabit?.userName} 正在養成{" "}
                  {sharedHabit?.habitTitle.toUpperCase()} 習慣
                </Typography>
              </div>
              <div className="text-center m-0">
                <>
                  <Typography
                    className="p-2"
                    variant="h5"
                    style={{ color: "#263238", fontFamily: "Monsterrat" }}
                  >
                    {sharedHabit?.userName} 下注{" "}
                    {sharedHabit?.bets[0].userStake}
                  </Typography>
                  <Typography
                    variant="h5"
                    className="p-2 mx-auto w-1/2 rounded-lg"
                    style={{
                      backgroundColor: "rgba(260, 200, 45)", // 添加背景色
                      fontFamily: "Monsterrat",
                    }}
                  >
                    v.s.
                  </Typography>
                  <Typography
                    className="p-2"
                    variant="h5"
                    style={{ color: "#263238", fontFamily: "Monsterrat" }}
                  >
                    {sharedHabit?.bets[0].betPartner} 下注{" "}
                    {sharedHabit?.bets[0].partnerStake}
                  </Typography>
                  <Typography
                    className="p-2 my-3"
                    variant="h5"
                    style={{ color: "#263238", fontFamily: "Monsterrat" }}
                  >
                    到期日： {sharedHabit?.dueDate.substring(0, 10)}
                  </Typography>
                </>
              </div>
            </>
          )}
        </CardBody>
        <DownloadButton isImage={isImage} setIsImage={setIsImage} />
        <FooterWithSocialLinks isImage={isImage} setIsImage={setIsImage} />
      </Card>
    </Dialog>
  );
}
