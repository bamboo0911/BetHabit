// 引入React及相关的hooks和组件
import React, { useState, useEffect, useRef } from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  Typography,
  Dialog,
} from "@material-tailwind/react";
import FooterWithSocialLinks from "./shareFooter";
import TriangleButton from "./TriangleButton"; // 引入自定义的TriangleButton组件
import html2canvas from "html2canvas";

// 定义DialogWithForm组件
export default function DialogWithForm({
  open,
  handleOpen,
  sharedHabit,
  isMutating,
}) {
  const canvasRef = useRef(null);
  // 使用useState定义state变量
  const [isImage, setIsImage] = useState(false);
  const [activeBetIndex, setActiveBetIndex] = useState(0);

  // 使用useEffect处理组件的副作用
  useEffect(() => {
    // 根据条件设置isImage状态
    if (sharedHabit && Object.keys(sharedHabit).length !== 0 && !open) {
      setIsImage(false);
    }
  }, [open, sharedHabit]); // 依赖于open和sharedHabit的变化

  // 定义处理下一个赌注的函数
  const handleNextBet = () => {
    setActiveBetIndex((prevIndex) => (prevIndex + 1) % sharedHabit.bets.length);
  };

  // 定义处理上一个赌注的函数
  const handlePrevBet = () => {
    setActiveBetIndex((prevIndex) =>
      (prevIndex - 1 + sharedHabit.bets.length) % sharedHabit.bets.length
    );
  };

  // 生成圖片
  const CanvasComponent = () => {
    useEffect(() => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
  
      // Set canvas size
      canvas.width = 400;
      canvas.height = 400;
    
      // Calculate center position for the text
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw text
      // NOSAYSAY
      context.fillStyle = '#F75928';
      context.font = 'bold 24px Roboto';
      const NoSaySay = 'NOSAYSAY';
      const NoSaySayWidth = context.measureText(NoSaySay).width;
      context.fillText(NoSaySay, centerX - NoSaySayWidth / 2, 50);
      // userName 正在養成
      context.fillStyle = '#263238';
      context.font = '20px Monsterrat';
      const userName1 = `${sharedHabit?.userName} 正在養成`;
      const userNameWidth1 = context.measureText(userName1).width;
      context.fillText(userName1, centerX - userNameWidth1 / 2, 100);
      // habitTitle 的習慣
      context.font = 'bold 40px Monsterrat';
      const habitName = `${sharedHabit?.habitTitle.toUpperCase()}的習慣`;
      const habitNameWidth = context.measureText(habitName).width;
      context.fillText(`${sharedHabit?.habitTitle.toUpperCase()}的習慣`, centerX - habitNameWidth / 2, 150);
      // userName
      context.font = '20px Monsterrat';
      const userName2 = `${sharedHabit?.userName}`;
      const userNameWidth2 = context.measureText(userName2).width;
      context.fillText(userName2, centerX - userNameWidth2 / 2, 200);
      // 下注 userStake
      context.font = '16px Monsterrat';
      const userStake = `下注 ${sharedHabit?.bets[activeBetIndex].userStake}`
      const userStakeWidth = context.measureText(userStake).width;
      context.fillText(userStake, centerX - userStakeWidth / 2, 230);
      // V.S.
      context.fillStyle = '#FF0000';
      context.font = 'bold 20px Monsterrat';
      const Vs = 'V.S.'
      const VsWidth = context.measureText(Vs).width;
      context.fillText(Vs, centerX - VsWidth / 2, 270);
      // betPartner
      context.fillStyle = '#263238';
      context.font = '20px Monsterrat';
      const betPartner = `${sharedHabit?.bets[activeBetIndex].betPartner}`
      const betPartnerWidth = context.measureText(betPartner).width;
      context.fillText(betPartner, centerX - betPartnerWidth / 2, 310);
      // 下注 partnerStake
      context.font = '16px Monsterrat';
      const partnerStake = `下注 ${sharedHabit?.bets[activeBetIndex].partnerStake}`
      const partnerStakeWidth = context.measureText(partnerStake).width;
      context.fillText(partnerStake, centerX - partnerStakeWidth / 2, 340);
  
      context.font = '16px Monsterrat';
      const dueDate = `DUE： ${sharedHabit?.dueDate.substring(0, 10)}`
      const dueDateWidth = context.measureText(dueDate).width;
      context.fillText(dueDate, centerX - dueDateWidth / 2, 390);
    }, [sharedHabit, activeBetIndex]); // Include dependencies

    return null; // Ensure that a component is returned
  };

  // 渲染Dialog组件
  return (
    <Dialog
      size="xs"
      open={open}
      handler={handleOpen}
      className="bg-transparent shadow-none"
      isLoaded={isMutating && !sharedHabit}
    >
      {sharedHabit && ( // 如果有sharedHabit对象
        <Card
          className="mx-auto w-full max-w-[24rem]"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <CardBody id="Share" className="flex flex-col gap-3">
                {/* header */}
                <div className="mb-4 modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                  <Typography
                    variant="h5"
                    className="font-medium leading-normal text-gray-800"
                    id="exampleModalLabel"
                  >
                    查看賭注
                  </Typography>
                </div>

                {/* content */} 
                <canvas ref={canvasRef} />
                <CanvasComponent />
                {/* 這邊是原本網頁的程式碼
                <div className="text-center">
                  <Typography
                    variant="h4"
                    className="font-black"
                    style={{ color: "#F75928", fontFamily: "Roboto" }}
                  >
                    NOSAYSAY
                  </Typography>
                </div>
                <div className="text-center ">
                  <Typography
                    variant="h4"
                    style={{ color: "#263238", fontFamily: "Monsterrat" }}
                  >
                    {sharedHabit?.userName} 正在養成{" "}
                  </Typography>
                </div>
                <div className="text-center ">
                  <Typography
                    variant="h2"
                    style={{ color: "#263238", fontFamily: "Monsterrat" }}
                  >
                    {sharedHabit?.habitTitle.toUpperCase()}的習慣
                  </Typography>
                </div>
                <div className="text-center">
                  <>
                    <Typography
                      className="p-2 -mb-3"
                      variant="h5"
                      style={{ color: "#263238", fontFamily: "Monsterrat" }}
                    >
                      {sharedHabit?.bets[activeBetIndex].userName}
                    </Typography>
                    <Typography
                      className="p-2"
                      variant="h6"
                      style={{ fontFamily: "Monsterrat" }}
                    >
                      <span style={{ color: "#263238" }}>下注{" "}</span>{" "}
                      <span style={{ color: "#F75928" }}>
                        {sharedHabit?.bets[activeBetIndex].userStake}
                      </span>
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
                      {sharedHabit?.bets[activeBetIndex].betPartner}
                    </Typography>
                    <Typography
                      className="p-2"
                      variant="h6"
                      style={{ color: "#263238", fontFamily: "Monsterrat" }}
                    >
                      <span style={{ color: "#263238" }}>下注{" "}</span>{" "}
                      <span style={{ color: "#F75928" }}>
                        {sharedHabit?.bets[activeBetIndex].partnerStake}
                      </span>
                    </Typography>
                    <Typography
                      className="p-2 my-3"
                      variant="h6"
                      style={{ color: "#263238", fontFamily: "Monsterrat" }}
                    >
                      DUE：{" "}
                      {sharedHabit?.dueDate.substring(0, 10)}
                    </Typography>
                  </>
                </div>
              </>
              */}
          </CardBody>
          
          <footer
            style={{
              borderTop: "1px solid #ccc",
              padding: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TriangleButton direction="left" onClick={handlePrevBet} />
            <span
              style={{
                fontFamily: "Monsterrat",
                color: "#263238",
                fontWeight: "bold",
              }}
            >
              {activeBetIndex + 1}/{sharedHabit.bets.length}
            </span>
            <TriangleButton direction="right" onClick={handleNextBet} />
          </footer>
        </Card>
      )}
    </Dialog>
  );
}
